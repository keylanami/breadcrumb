# Breadcrumb Roadmap

## Phase 0 — Audit

Goals:

* Analyze existing codebase
* Compare against PROJECT_VISION.md
* Identify missing architecture
* Identify missing features
* Create implementation plan

Deliverables:

* Gap analysis
* Architecture review

---

## Phase 1 — Foundation

Goals:

* Configure Firebase
* Configure Firestore
* Configure Zustand
* Configure shadcn/ui
* Environment variables setup

Deliverables:

* lib/firebase.js
* lib/firestore.js
* Base project configuration

---

## Phase 2 — Authentication

Goals:

* Google Authentication
* Persistent session
* Auth Guard
* Protected routes
* User document creation

Deliverables:

* authStore.js
* AuthGuard.jsx
* Login page
* User profile handling

---

## Phase 3 — Firestore Services

Goals:

* Activity CRUD
* Decision CRUD
* Memory CRUD
* Routine CRUD

Deliverables:

* activityService.js
* decisionService.js
* memoryService.js
* routineService.js

---

## Phase 4 — Global State

Goals:

* Create appStore
* Sync Firestore data
* Centralized state management

Deliverables:

* appStore.js
* Firestore integration

---

## Phase 5 — Timeline Engine

Goals:

* Aggregate activities
* Aggregate decisions
* Aggregate memories
* Aggregate routines

Requirements:

* No timeline collection
* Dynamic aggregation

Deliverables:

* timeline utilities
* timeline hooks

---

## Phase 6 — Dashboard

Goals:

* Today's Activities
* Today's Memories
* Overdue Routines
* Recent Decisions
* Recent Timeline Events

Deliverables:

* Dashboard data layer
* Dashboard widgets

---

## Phase 7 — Quick Capture

Goals:

* Single CaptureDialog
* Dynamic forms
* Optimistic updates

Deliverables:

* CaptureDialog.jsx
* Entity creation flow

---

## Phase 8 — Search

Goals:

* Unified search
* Activities
* Decisions
* Memories
* Routines

Deliverables:

* Search page
* Search indexing

---

## Phase 9 — Insights

Goals:

* Most Active Category
* Most Captured Tags
* Average Confidence
* Overdue Routines
* Activity Trends

Deliverables:

* Insights dashboard
* Analytics calculations

---

## Phase 10 — Polish

Goals:

* Framer Motion integration
* Loading states
* Empty states
* Error handling
* Performance optimization

Deliverables:

* Production-ready MVP

---

## Phase 11 — Deployment

Goals:

* Vercel deployment
* Environment validation
* Production testing

Deliverables:

* Production release
