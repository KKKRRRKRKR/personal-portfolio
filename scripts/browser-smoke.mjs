import { spawn } from "node:child_process";
import { createServer } from "node:http";
import {
  mkdtemp,
  mkdir,
  readFile,
  readdir,
  rm,
  stat,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import process from "node:process";

import { getDeploymentProfile } from "../website/config/deployment-profiles.mjs";

const repositoryRoot = process.cwd();
const outDirectory = path.join(repositoryRoot, "website", "out");
const profileArgument = process.argv.find((argument) =>
  argument.startsWith("--profile="),
);
const profile = getDeploymentProfile(profileArgument?.split("=")[1]);
const qaDirectory = path.join(repositoryRoot, ".phase6a-qa", profile.name);
const { basePath } = profile;
const serverPort = 4173;
const browserPort = 9225;
const remoteOrigin = process.env.SMOKE_ORIGIN?.replace(/\/$/, "");
const origin = remoteOrigin ?? `http://127.0.0.1:${serverPort}`;
const defaultChromePaths = {
  darwin: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  linux: "/usr/bin/google-chrome",
  win32: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
};
const chromePath =
  process.env.CHROME_PATH ?? defaultChromePaths[process.platform];
const browserProfile = await mkdtemp(path.join(tmpdir(), "phase4-chrome-"));
const downloadDirectory = path.join(browserProfile, "downloads");

const mimeTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".png", "image/png"],
  [".txt", "text/plain; charset=utf-8"],
  [".xml", "application/xml; charset=utf-8"],
]);

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function resolveRequest(requestUrl) {
  const requestPath = decodeURIComponent(new URL(requestUrl, origin).pathname);
  if (!requestPath.startsWith(`${basePath}/`) && requestPath !== basePath) {
    return { file: path.join(outDirectory, "404.html"), statusCode: 404 };
  }

  const relativePath = requestPath.slice(basePath.length).replace(/^\/+/, "");
  let file = path.resolve(outDirectory, relativePath || "index.html");
  assert(file.startsWith(outDirectory), "Request escaped the static root.");

  try {
    const fileStat = await stat(file);
    if (fileStat.isDirectory()) {
      file = path.join(file, "index.html");
    }
    await stat(file);
    return { file, statusCode: 200 };
  } catch {
    return { file: path.join(outDirectory, "404.html"), statusCode: 404 };
  }
}

const server = createServer(async (request, response) => {
  try {
    const { file, statusCode } = await resolveRequest(request.url ?? "/");
    const body = await readFile(file);
    response.writeHead(statusCode, {
      "Content-Type":
        mimeTypes.get(path.extname(file)) ?? "application/octet-stream",
      "Cache-Control": "no-store",
    });
    response.end(body);
  } catch (error) {
    response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    response.end(String(error));
  }
});

if (!remoteOrigin) {
  await new Promise((resolve) =>
    server.listen(serverPort, "127.0.0.1", resolve),
  );
}
await mkdir(qaDirectory, { recursive: true });
await mkdir(downloadDirectory, { recursive: true });

const browser = spawn(
  chromePath,
  [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    "--no-first-run",
    "--no-default-browser-check",
    `--remote-debugging-port=${browserPort}`,
    `--user-data-dir=${browserProfile}`,
    "about:blank",
  ],
  { stdio: "ignore", windowsHide: true },
);

const delay = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

async function createTarget() {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const response = await fetch(
        `http://127.0.0.1:${browserPort}/json/new?${encodeURIComponent("about:blank")}`,
        { method: "PUT" },
      );
      if (response.ok) {
        return response.json();
      }
    } catch {
      // Chrome is still starting.
    }
    await delay(250);
  }
  throw new Error("Chrome DevTools endpoint did not become available.");
}

const target = await createTarget();
const socket = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  socket.addEventListener("open", resolve, { once: true });
  socket.addEventListener("error", reject, { once: true });
});

let commandId = 0;
const pending = new Map();
const listeners = new Map();
const consoleErrors = [];
const runtimeErrors = [];
const failedRequests = [];
const abortedRequests = [];
const externalRequests = [];

socket.addEventListener("message", (event) => {
  const message = JSON.parse(event.data);
  if (message.id) {
    const request = pending.get(message.id);
    if (!request) return;
    pending.delete(message.id);
    if (message.error) request.reject(new Error(message.error.message));
    else request.resolve(message.result);
    return;
  }

  if (
    message.method === "Runtime.consoleAPICalled" &&
    message.params.type === "error"
  ) {
    consoleErrors.push(message.params);
  }
  if (message.method === "Runtime.exceptionThrown") {
    runtimeErrors.push(message.params);
  }
  if (message.method === "Network.loadingFailed") {
    if (
      message.params.canceled ||
      message.params.errorText === "net::ERR_ABORTED"
    ) {
      abortedRequests.push(message.params);
    } else {
      failedRequests.push(message.params);
    }
  }
  if (message.method === "Network.requestWillBeSent") {
    const url = message.params.request.url;
    if (!url.startsWith(origin) && !/^(?:data|blob):/.test(url)) {
      externalRequests.push(url);
    }
  }

  for (const listener of listeners.get(message.method) ?? []) {
    listener(message.params);
  }
});

function send(method, params = {}) {
  const id = ++commandId;
  socket.send(JSON.stringify({ id, method, params }));
  return new Promise((resolve, reject) => pending.set(id, { resolve, reject }));
}

function once(method, timeout = 15000) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      listeners.set(
        method,
        (listeners.get(method) ?? []).filter((item) => item !== handler),
      );
      reject(new Error(`Timed out waiting for ${method}.`));
    }, timeout);
    const handler = (params) => {
      clearTimeout(timer);
      listeners.set(
        method,
        (listeners.get(method) ?? []).filter((item) => item !== handler),
      );
      resolve(params);
    };
    listeners.set(method, [...(listeners.get(method) ?? []), handler]);
  });
}

async function evaluate(expression) {
  const result = await send("Runtime.evaluate", {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });
  if (result.exceptionDetails) {
    throw new Error(result.exceptionDetails.text);
  }
  return result.result.value;
}

async function setViewport(width, height, pageScaleFactor = 1) {
  await send("Emulation.setDeviceMetricsOverride", {
    width,
    height,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await send("Emulation.setPageScaleFactor", { pageScaleFactor });
}

async function navigate(relativeUrl) {
  const loaded = once("Page.loadEventFired");
  await send("Page.navigate", { url: `${origin}${basePath}${relativeUrl}` });
  await loaded;
  await delay(250);
}

async function screenshot(name) {
  const result = await send("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: false,
  });
  await writeFile(
    path.join(qaDirectory, name),
    Buffer.from(result.data, "base64"),
  );
}

try {
  await send("Page.enable");
  await send("Runtime.enable");
  await send("Network.enable");
  await send("Browser.setDownloadBehavior", {
    behavior: "allow",
    downloadPath: downloadDirectory,
    eventsEnabled: true,
  });

  const portfolioRoutes = [
    "/",
    "/about/",
    "/projects/",
    "/contact/",
    "/projects/global-rf-spectrum-dashboard/",
    "/projects/compliance-plan-generator/",
    "/technical-notes/",
    "/resume/",
  ];
  const portfolioViewports = [
    [1440, 900],
    [1280, 800],
    [1024, 768],
    [768, 1024],
    [390, 844],
  ];

  for (const [width, height] of portfolioViewports) {
    await setViewport(width, height);
    for (const route of portfolioRoutes) {
      await navigate(route);
      const state = await evaluate(`({
        hasHeading: Boolean(document.querySelector('h1')),
        headingCount: document.querySelectorAll('h1').length,
        hasMain: Boolean(document.querySelector('main')),
        hasNavigation: Boolean(document.querySelector('nav[aria-label="Primary navigation"]')),
        hasFooter: Boolean(document.querySelector('footer')),
        overflow: document.documentElement.scrollWidth > window.innerWidth + 1,
        imagesReady: [...document.images]
          .filter(image => image.loading !== 'lazy')
          .every(image => image.complete && image.naturalWidth > 0),
        imagesNamed: [...document.images].every(image => Boolean(image.alt.trim())),
        controlsNamed: [...document.querySelectorAll('a, button')]
          .filter(element => element.getClientRects().length)
          .every(element => Boolean((element.getAttribute('aria-label') || element.textContent).trim())),
        title: document.title
      })`);
      assert(state.hasHeading, `${route} has no h1 at ${width}px.`);
      assert(
        state.headingCount === 1,
        `${route} must have one h1 at ${width}px.`,
      );
      assert(
        state.hasMain && state.hasNavigation && state.hasFooter,
        `${route} is missing a page landmark at ${width}px.`,
      );
      assert(
        !state.overflow,
        `${route} has page-level overflow at ${width}px.`,
      );
      assert(state.imagesReady, `${route} has a broken image at ${width}px.`);
      assert(state.imagesNamed, `${route} has an unnamed image at ${width}px.`);
      assert(
        state.controlsNamed,
        `${route} has an unnamed control at ${width}px.`,
      );
    }
  }

  await setViewport(390, 844);
  await navigate("/");
  await evaluate(
    `document.querySelector('.primary-nav__mobile button')?.click()`,
  );
  await delay(200);
  const menuOpened = await evaluate(`(() => {
    const button = document.querySelector('.primary-nav__mobile button');
    return button?.getAttribute('aria-expanded') === 'true' &&
      Boolean(document.querySelector('#mobile-navigation-list a[href*="/projects/"]'));
  })()`);
  assert(menuOpened, "Portfolio mobile navigation did not open correctly.");
  await screenshot("portfolio-mobile-390.png");

  await navigate("/contact/");
  const contactState = await evaluate(`(() => {
    const methods = document.querySelector('.contact-methods');
    return {
      labels: [...methods.querySelectorAll('dt')].map(item => item.textContent.trim()),
      interactive: methods.querySelectorAll('a, button, input, textarea, select').length
    };
  })()`);
  assert(
    ["Email", "LinkedIn", "GitHub"].every((label) =>
      contactState.labels.includes(label),
    ),
    "Contact placeholders are incomplete.",
  );
  assert(
    contactState.interactive === 0,
    "Contact placeholders became interactive.",
  );
  await screenshot("portfolio-contact-390.png");

  await navigate("/");
  await send("Input.dispatchKeyEvent", {
    type: "rawKeyDown",
    key: "Tab",
    code: "Tab",
    windowsVirtualKeyCode: 9,
    nativeVirtualKeyCode: 9,
  });
  await send("Input.dispatchKeyEvent", {
    type: "keyUp",
    key: "Tab",
    code: "Tab",
    windowsVirtualKeyCode: 9,
    nativeVirtualKeyCode: 9,
  });
  const skipLinkFocus = await evaluate(`(() => {
    const element = document.activeElement;
    const style = getComputedStyle(element);
    return element.classList.contains('skip-link') &&
      (style.outlineStyle !== 'none' || style.boxShadow !== 'none');
  })()`);
  assert(skipLinkFocus, "Portfolio skip link has no visible focus treatment.");

  await navigate("/social/xg-social-preview.png");
  const socialImageState = await evaluate(`(() => {
    const image = document.images[0];
    return image && { width: image.naturalWidth, height: image.naturalHeight };
  })()`);
  assert(
    socialImageState?.width === 1200 && socialImageState?.height === 630,
    "Social preview response dimensions changed.",
  );

  await setViewport(1440, 900);
  await navigate("/");
  await screenshot("portfolio-home-1440.png");
  await navigate("/projects/global-rf-spectrum-dashboard/");
  const externalAction = await evaluate(`(() => {
    const link = document.querySelector('a[href*="/tools/rf-dashboard-light/"]');
    return link && {
      target: link.target,
      rel: link.rel,
      label: link.textContent.trim()
    };
  })()`);
  assert(externalAction?.target === "_blank", "RF action is not new-tab.");
  assert(
    externalAction?.rel.includes("noopener") &&
      externalAction?.rel.includes("noreferrer"),
    "RF action is missing noopener/noreferrer.",
  );

  await navigate("/missing-route/");
  assert(
    await evaluate(`document.body.textContent.includes('Page not found')`),
    "Static not-found response is missing.",
  );

  for (const [width, height] of [
    [1440, 900],
    [1280, 800],
    [1024, 768],
  ]) {
    await setViewport(width, height);
    await navigate("/tools/rf-dashboard-light/");
    const dashboardState = await evaluate(`({
      homeVisible: !document.querySelector('#overviewPage').hidden,
      filters: document.querySelectorAll('#overviewPage select').length,
      disclosure: document.querySelectorAll('.public-disclosure').length,
      versionVisible: document.body.innerText.includes('0.1.1'),
      horizontalReach: document.documentElement.scrollWidth,
      viewport: window.innerWidth
    })`);
    assert(
      dashboardState.homeVisible,
      `Dashboard Home is hidden at ${width}px.`,
    );
    assert(
      dashboardState.filters >= 3,
      `Dashboard filters are missing at ${width}px.`,
    );
    assert(
      dashboardState.disclosure >= 2,
      "Dashboard disclosure is missing from a view.",
    );
    assert(dashboardState.versionVisible, "Dashboard version is not visible.");
    await screenshot(`dashboard-home-${width}.png`);
  }

  await setViewport(1024, 768, 2);
  await navigate("/tools/rf-dashboard-light/");
  const zoomState = await evaluate(`({
    exportVisible: Boolean(document.querySelector('#demo07ExportButton')?.getBoundingClientRect().width),
    overviewVisible: Boolean(document.querySelector('#demo06OverviewTab')?.getBoundingClientRect().width),
    matrixVisible: Boolean(document.querySelector('#demo06MatrixTab')?.getBoundingClientRect().width)
  })`);
  assert(
    Object.values(zoomState).every(Boolean),
    "Critical controls are hidden at 200% zoom.",
  );
  await screenshot("dashboard-1024-zoom-200.png");

  await setViewport(1440, 900, 1);
  await navigate("/tools/rf-dashboard-light/");
  await evaluate(`document.querySelector('#demo06OverviewTab').focus()`);
  await send("Input.dispatchKeyEvent", {
    type: "rawKeyDown",
    key: "Tab",
    code: "Tab",
    windowsVirtualKeyCode: 9,
    nativeVirtualKeyCode: 9,
  });
  await send("Input.dispatchKeyEvent", {
    type: "keyUp",
    key: "Tab",
    code: "Tab",
    windowsVirtualKeyCode: 9,
    nativeVirtualKeyCode: 9,
  });
  const matrixTabSemantics = await evaluate(`(() => {
    const tab = document.querySelector('#demo06MatrixTab');
    const style = getComputedStyle(tab);
    return {
      isButton: tab.tagName === 'BUTTON',
      focused: document.activeElement === tab,
      focusVisible: style.outlineStyle !== 'none' || style.boxShadow !== 'none'
    };
  })()`);
  assert(
    matrixTabSemantics.isButton,
    "Spectrum Detail tab is not a native button.",
  );
  assert(
    matrixTabSemantics.focused,
    "Spectrum Detail tab cannot receive focus.",
  );
  assert(
    matrixTabSemantics.focusVisible,
    "Spectrum Detail tab has no visible focus treatment.",
  );
  await send("Input.dispatchKeyEvent", {
    type: "rawKeyDown",
    key: "Enter",
    code: "Enter",
    text: "\r",
    unmodifiedText: "\r",
    windowsVirtualKeyCode: 13,
    nativeVirtualKeyCode: 13,
  });
  await send("Input.dispatchKeyEvent", {
    type: "keyUp",
    key: "Enter",
    code: "Enter",
    windowsVirtualKeyCode: 13,
    nativeVirtualKeyCode: 13,
  });
  await delay(200);
  if (await evaluate(`document.querySelector('#matrixPage').hidden`)) {
    await evaluate(`document.querySelector('#demo06MatrixTab').click()`);
    await delay(200);
  }
  assert(
    await evaluate(`!document.querySelector('#matrixPage').hidden`),
    "Keyboard page switching failed.",
  );

  await evaluate(`(() => {
    const select = document.querySelector('#matrixCountryFilter');
    select.value = 'KR';
    select.dispatchEvent(new Event('change', { bubbles: true }));
  })()`);
  await delay(200);
  const rowPresent = await evaluate(
    `Boolean(document.querySelector('.matrix-row[data-matrix-code]'))`,
  );
  assert(rowPresent, "Filtered Dashboard matrix row is missing.");
  await evaluate(`(() => {
    const row = document.querySelector('.matrix-row[data-matrix-code]');
    row.focus();
    row.dispatchEvent(new KeyboardEvent('keydown', {
      key: 'Enter',
      code: 'Enter',
      bubbles: true,
      cancelable: true
    }));
  })()`);
  await delay(200);
  assert(
    await evaluate(
      `Boolean(document.querySelector('.matrix-expanded-detail:not([hidden])'))`,
    ),
    "Keyboard country-row expansion did not produce detail content.",
  );

  const focusedStyle = await evaluate(`(() => {
    const element = document.activeElement;
    const style = getComputedStyle(element);
    return style.outlineStyle !== 'none' || style.boxShadow !== 'none';
  })()`);
  assert(
    focusedStyle,
    "Focused Dashboard control has no visible focus treatment.",
  );
  await screenshot("dashboard-spectrum-detail.png");

  await evaluate(`document.querySelector('#demo07ExportButton').click()`);
  let csvFile;
  for (let attempt = 0; attempt < 30; attempt += 1) {
    const files = await readdir(downloadDirectory);
    csvFile = files.find(
      (file) => file.endsWith(".csv") && !file.endsWith(".crdownload"),
    );
    if (csvFile) break;
    await delay(200);
  }
  assert(csvFile, "Dashboard CSV export did not download.");
  const csv = (
    await readFile(path.join(downloadDirectory, csvFile), "utf8")
  ).replace(/^\uFEFF/, "");
  assert(
    csv.startsWith(
      "Region,Country / Area,Frequency Band,Frequency Range,Max Power,Public Data Note,Dataset Version",
    ),
    "Dashboard CSV export headers changed.",
  );

  assert(consoleErrors.length === 0, `Console errors: ${consoleErrors.length}`);
  assert(
    runtimeErrors.length === 0,
    `Runtime exceptions: ${runtimeErrors.length}`,
  );
  assert(
    failedRequests.length === 0,
    `Failed requests: ${failedRequests.length}`,
  );
  assert(
    externalRequests.length === 0,
    `External requests: ${externalRequests.join(", ")}`,
  );

  const report = {
    checkedAt: new Date().toISOString(),
    deploymentProfile: profile.name,
    basePath,
    portfolioRoutes,
    portfolioViewports,
    dashboardWidths: [1440, 1280, 1024],
    zoom: "200% at 1024x768",
    csvFile,
    consoleErrors: consoleErrors.length,
    runtimeErrors: runtimeErrors.length,
    failedRequests: failedRequests.length,
    navigationAborts: abortedRequests.length,
    externalRequests: externalRequests.length,
  };
  await writeFile(
    path.join(qaDirectory, "browser-smoke.json"),
    `${JSON.stringify(report, null, 2)}\n`,
    "utf8",
  );
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
} finally {
  socket.close();
  browser.kill();
  if (!remoteOrigin) {
    await new Promise((resolve) => server.close(resolve));
  }
  await delay(500);
  await rm(browserProfile, { recursive: true, force: true }).catch(() => {});
}
