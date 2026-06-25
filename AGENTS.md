<!-- BEGIN:nextjs-agent-rules -->
# Breadcrumb Development Agent Rules

Always read:

* PROJECT_VISION.md
* ROADMAP.md

before making any changes.

---

## Core Rules

Do not redesign the UI.

Do not replace layouts.

Do not modify the Stitch-generated visual design.

The existing UI is the source of truth.

Convert existing HTML into reusable React components while preserving the current appearance.

---

## Development Workflow

Before implementing any feature:

1. Analyze the existing codebase.
2. Compare implementation against PROJECT_VISION.md.
3. Check current roadmap phase.
4. Work only on the current phase.
5. Avoid implementing future phases unless explicitly requested.

---

## Architecture Rules

Framework:

* Next.js 15 App Router

Language:

* JavaScript (JSX)

State Management:

* Zustand

Database:

* Firestore

Authentication:

* Firebase Authentication (Google Provider Only)

UI:

* shadcn/ui

Animations:

* Framer Motion

---

## Firebase Rules

Use Firebase Modular SDK v9+.

Never use Firebase compat API.

All Firestore data must be scoped to:

currentUser.uid

Never create global collections.

Never bypass Firestore security assumptions.

---

## Data Layer Rules

Firestore queries must never be written directly inside UI components.

All Firestore operations must go through service files.

Examples:

services/activityService.js

services/decisionService.js

services/memoryService.js

services/routineService.js

---

## Component Rules

Create reusable components whenever possible.

Prefer composition over duplication.

Do not create multiple components that solve the same problem.

Example:

Use one reusable CaptureDialog component.

Do not create:

* ActivityDialog
* MemoryDialog
* DecisionDialog
* RoutineDialog

unless explicitly required.

---

## Performance Rules

Use query limits.

Avoid unnecessary rerenders.

Memoize expensive calculations.

Lazy-load large pages when appropriate.

Target Lighthouse score above 90.

---

## Implementation Output

After completing a task:

Provide:

1. Files created
2. Files modified
3. Architectural decisions
4. Remaining work

Do not silently make major architectural changes.

<!-- END:nextjs-agent-rules -->
