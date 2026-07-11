# Visual Design System

## Purpose

This document defines the visual direction for the personal portfolio website. It establishes a clean, minimal, premium engineering aesthetic that supports technical credibility and long-term maintainability.

## Design Philosophy

The design should feel precise, calm, and deliberate. A white-first canvas, restrained color use, strong typography, and clear information hierarchy allow the work itself to carry the page.

The visual system should communicate professional engineering practice rather than a temporary showcase. It avoids flashy cyberpunk motifs, decorative noise, and excessive gradients. Visual emphasis is earned through structure, contrast, whitespace, and useful technical evidence.

## Color System

| Token | Role | Recommended direction |
| --- | --- | --- |
| **Background** | Main page canvas and primary surfaces. | Near-white or white with a subtle cool-neutral cast. |
| **Primary text** | Headings, important labels, and main reading content. | Deep neutral charcoal or navy-black for high contrast. |
| **Secondary text** | Supporting copy, metadata, captions, and less prominent labels. | Muted cool gray that remains accessible against the background. |
| **Accent color** | Links, active states, selected controls, and sparing emphasis. | A restrained technical blue or deep blue-green. Use consistently and selectively. |

Supporting borders, dividers, and quiet surface fills should use neutral grays close to the background. Gradients are not part of the default system; use a subtle tonal transition only when it has a clear structural purpose.

## Typography Principles

- Use a highly legible sans-serif typeface for interface and body text.
- Establish a clear hierarchy through size, weight, line height, and spacing rather than decorative type treatments.
- Keep headings concise, confident, and scannable; use body copy for technical explanation and context.
- Use monospaced text only for code, commands, measurements, technical identifiers, and small data labels.
- Preserve comfortable reading widths and generous line height for long-form case studies and technical notes.
- Maintain accessible contrast, avoid ultra-light weights for essential text, and do not rely on text color alone to communicate state.

## Layout Principles

- Use a responsive centered content container with a consistent spacing scale.
- Favor single-column reading flows for narrative content and structured two-column layouts only where comparison or metadata benefits from it.
- Create hierarchy with whitespace and alignment; avoid dense dashboard-like layouts on editorial pages.
- Align page headers, section headings, controls, and content blocks to a coherent grid.
- Keep project case studies calm and modular, separating context, architecture, evidence, and outcomes into distinct sections.
- Design mobile layouts as first-class experiences by preserving reading order, touch targets, and essential context.

## Component Style

### Cards

Cards group related project summaries, notes, or metadata. They use generous padding, restrained borders, small corner radii, and minimal elevation. Avoid heavy shadows, glass effects, and decorative gradients. A card should read as an organized content surface, not a visual ornament.

### Buttons

Buttons have a clear primary and secondary hierarchy. Primary buttons use the accent color with accessible text contrast; secondary buttons use a quiet outlined or neutral treatment. Labels should use direct action language, and hover or focus changes should be subtle but unmistakable.

### Navigation

Navigation is compact, stable, and readable. Active destinations use the accent color and/or a restrained indicator in addition to text. Navigation should never compete with the page title or project evidence, and its responsive form must retain access to every primary destination.

### Project Sections

Project sections prioritize technical story and proof. Use clear section headings, concise metadata, diagrams, implementation details, and validation evidence. Give important architecture visuals and outcomes sufficient space; use dividers or spacing to separate phases without fragmenting the narrative.

## Image and Diagram Style

Images should be intentional, relevant, and high quality. Prefer product views, engineering artifacts, data visualizations, and contextual photography over generic decorative imagery.

Diagrams should use a simple neutral base with the accent color reserved for emphasis, active paths, or key decisions. Apply consistent labels, line weights, spacing, and legend conventions. Screenshots and diagrams should have clean crops, clear captions, and enough resolution for technical review.

## Animation and Interaction Principles

- Animation should clarify hierarchy, state change, or user feedback; it should not create spectacle.
- Prefer short, restrained transitions for hover, focus, navigation, disclosure, and content entry.
- Avoid continuous decorative motion, dramatic parallax, blinking effects, and motion that delays reading or navigation.
- Respect reduced-motion preferences and ensure all information and actions remain available without animation.
- Provide visible keyboard focus and clear feedback for interactive controls, form submission, and asynchronous states.

## Design Consistency Rules

- Use the defined color roles, spacing scale, typography hierarchy, and component patterns across all pages.
- Do not introduce a new visual motif, accent color, shadow style, or border radius without a system-level reason.
- Use the accent color sparingly so links, actions, and active states retain meaning.
- Keep labels, button verbs, metadata patterns, and project section order consistent wherever the same concept appears.
- Prefer reusable components and design tokens over one-off styling decisions.
- Review each new page for visual hierarchy, contrast, responsive behavior, and alignment with the professional engineering aesthetic.
