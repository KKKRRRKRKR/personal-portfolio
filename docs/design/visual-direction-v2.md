# Visual Direction v2: Engineering Evidence Editorial

## Intent

The portfolio uses a quiet, mature editorial shell to make real engineering work legible. It should make the nature of the work, the constraints behind it, and the evidence supporting it easier to inspect. The shell stays neutral so that a black interface, a map, or a project-specific green accent can remain native to the project rather than becoming a site brand device.

## Principles

- Let a project’s interface, system model, and decisions carry the visual interest.
- Use hierarchy, alignment, and whitespace before borders, containers, labels, or effects.
- Keep explanatory prose narrow; let evidence and system structures use a wider field.
- Treat status, discipline, and project facts as quiet context, never as the primary subject.
- Prefer honest incomplete evidence to decorative stand-ins.

## Foundations

### Color

| Role | Value |
| --- | --- |
| Canvas and primary surface | `#FFFFFF` |
| Primary text | `#101010` |
| Secondary text | `#666666` |
| Quiet text | `#828282` |
| Divider | `#E6E6E6` |
| Neutral surface | `#F6F6F6` |

There is no global blue or green accent. Links, current navigation, rules, and focus treatment use near-black or neutral gray. Shure-style green is permitted only inside a genuine project screenshot, tool, diagram, or other project evidence.

### Typography

Use the existing native sans-serif stack for a durable, dependency-free interface. Display type is compact and dark with modest negative tracking; body copy is normal-weight, 16–18px, and comfortably spaced. Use mono only for genuine identifiers or values; it must not be a decorative editorial voice. Uppercase and wide tracking are exceptional, not a system default.

### Grid, widths, and spacing

The layout uses a conceptual 12-column field without exposing it visually:

- Reading width: 42rem / 672px maximum.
- Standard content width: 75rem / 1200px maximum.
- Wide evidence width: 87.5rem / 1400px maximum.

Sections use 96–128px desktop spacing, with project transitions reaching 144px where the narrative changes. Internal spacing follows a consistent 8px-derived scale. Mobile contracts spacing without crowding copy or evidence.

### Borders, radius, and shadow

Use a one-pixel neutral divider only where it communicates a real boundary. General interface radius is zero; screenshots may use up to 6px. Do not use floating cards or prominent shadows. Project evidence may use an exceptionally soft shadow only if it needs separation from the white page.

## Page language

### Homepage

Open with a direct professional thesis and a short supporting sentence. Follow it with two large selected projects, then concise working principles and portfolio paths. Avoid a capability-card grid, decorative project numbering, technology tags, logo walls, generic photography, and competing CTAs.

### Projects index

Use a calm, vertically paced project index. Each project presents its title, problem statement, quiet facts, and a text detail link. Separate entries with whitespace and a light rule only when needed. Do not form a card gallery or make tags the primary content.

### Project detail

Use a large opening title, quiet facts, and a clear statement of evidence availability. Organize the narrative around a project thesis, context and constraints, selected decisions, system model, and outcome and boundaries. Keep prose narrow; allow system models and genuine interface evidence to expand wider. Do not number the story mechanically or turn it into a development log.

## Image and interface treatment

Real dashboard screens, map views, rule models, structured outputs, and before/after evidence are preferred. Display them large enough to inspect, with an explanatory caption where needed, and do not wrap every image in a decorative card. Until a public-safe asset exists, state that limitation plainly; do not create fake dashboard mockups, stock technical images, abstract technology art, circuit motifs, or random code imagery.

## Anti-patterns

- Warm, cream, beige, or aged-paper backgrounds.
- Global blue or green navigation, buttons, labels, and decorative accents.
- SaaS-style large radii, strong shadows, card walls, badge groups, and KPI rows.
- Decorative grids, HUD treatments, coordinates, code, or repeated section numbering.
- Monospace used as a visual shortcut for technical credibility.
- Screenshots that are too small to inspect or imagery that merely occupies space.

## Visual QA checklist

- [ ] Canvas is white, text is neutral black/gray, and no global blue or green remains.
- [ ] Headings establish clear hierarchy without aggressive tracking or excess uppercase.
- [ ] Reading text, standard content, and evidence use meaningfully different widths.
- [ ] Desktop and mobile have no horizontal overflow, clipped text, or broken aspect ratios.
- [ ] Navigation, links, focus styles, and reduced-motion behavior remain usable.
- [ ] Project facts are secondary to title, problem, decisions, and evidence.
- [ ] Borders, radii, and shadows are restrained and purposeful.
- [ ] Every project image is real, inspectable, and relevant; missing imagery is stated honestly.
