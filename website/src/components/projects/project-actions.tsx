import { TextLink } from "@/components/ui/text-link";
import {
  hasCaseStudy,
  type LiveToolDestination,
  type ProjectRecord,
  type PublicDestination,
} from "@/content/projects";

type ProjectActionsProps = {
  caseStudyLabel?: string;
  project: ProjectRecord;
  showCaseStudy?: boolean;
};

type ExternalAction = {
  accessibilityDescription?: string;
  href: string;
  label: string;
  openInNewTab: boolean;
};

function isSafePublicUrl(url: string) {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.protocol === "https:" || parsedUrl.protocol === "http:";
  } catch {
    return false;
  }
}

function getLiveToolAction(
  destination: LiveToolDestination,
): ExternalAction | undefined {
  if (
    (destination.availability !== "preview" &&
      destination.availability !== "available") ||
    !isSafePublicUrl(destination.url)
  ) {
    return undefined;
  }

  return {
    accessibilityDescription: destination.accessibilityDescription,
    href: destination.url,
    label: destination.label ?? "Open live tool",
    openInNewTab: destination.externalBehavior !== "same-tab",
  };
}

function getPublicDestinationAction(
  destination: PublicDestination,
  defaultLabel: string,
): ExternalAction | undefined {
  if (
    destination.availability !== "available" ||
    !isSafePublicUrl(destination.url)
  ) {
    return undefined;
  }

  return {
    accessibilityDescription: destination.accessibilityDescription,
    href: destination.url,
    label: destination.label ?? defaultLabel,
    openInNewTab: destination.externalBehavior !== "same-tab",
  };
}

export function ProjectActions({
  caseStudyLabel = "Open case study",
  project,
  showCaseStudy = true,
}: ProjectActionsProps) {
  const externalActions = [
    getLiveToolAction(project.destinations.liveTool),
    getPublicDestinationAction(
      project.destinations.repository,
      "View repository",
    ),
    getPublicDestinationAction(
      project.destinations.documentation,
      "Read documentation",
    ),
  ].filter((action): action is ExternalAction => action !== undefined);

  const showCaseStudyAction =
    showCaseStudy && project.visibility === "public" && hasCaseStudy(project);

  if (!showCaseStudyAction && externalActions.length === 0) {
    return null;
  }

  return (
    <div className="project-actions" aria-label="Project destinations">
      {showCaseStudyAction ? (
        <TextLink href={`/projects/${project.slug}`}>{caseStudyLabel}</TextLink>
      ) : null}
      {externalActions.map((action) => (
        <TextLink
          ariaLabel={action.accessibilityDescription}
          external
          href={action.href}
          key={action.href}
          openInNewTab={action.openInNewTab}
        >
          {action.label}
        </TextLink>
      ))}
    </div>
  );
}
