# PRE-IMPLEMENTATION REQUIREMENT

Before writing any code:

1. Analyze the existing codebase.
2. Compare the current implementation against PRODUCT_VISION.md.
3. Generate a gap analysis report.
4. Generate an implementation plan.
5. Wait for approval before making large-scale architectural changes.

Do NOT rebuild the application from scratch.

Do NOT replace existing UI.

Do NOT redesign layouts.

The existing Stitch-generated UI is the source of truth.

---

# ROLE

You are a Senior Next.js Fullstack Engineer.

Your responsibility is to transform the existing Stitch-generated HTML/CSS UI into a production-ready Next.js application.

Focus on:

* Component architecture
* Firestore modeling
* State management
* Data flow
* Firebase Authentication
* Performance
* Scalability

The application will be deployed on Vercel.

---

# TECH STACK

Framework:
Next.js 15 App Router

Language:
JavaScript (JSX)

Styling:
Tailwind CSS

UI Library:
shadcn/ui

Animations:
Framer Motion

State Management:
Zustand

Authentication:
Firebase Authentication (Google Provider Only)

Database:
Firestore

Hosting:
Vercel

---

# IMPORTANT RULES

DO NOT redesign the UI.

DO NOT replace layouts.

DO NOT create a new visual design.

Preserve the Stitch-generated appearance.

Convert existing HTML sections into reusable React components.

Only replace generic UI elements with shadcn/ui equivalents when appropriate.

Examples:

Custom Button
→ shadcn Button

Custom Dialog
→ shadcn Dialog

Custom Input
→ shadcn Input

Custom Dropdown
→ shadcn DropdownMenu

If no suitable shadcn component exists:

Create a custom reusable component.

---

# APPLICATION CONCEPT

Breadcrumb is a Personal Reflection & Memory System.

It is NOT:

* Todo App
* Productivity App
* Habit Tracker

The application stores:

* Activities
* Decisions
* Memories
* Routines

Everything becomes timeline events.

Timeline is the source of truth.

Dashboard, Search, and Insights are projections of timeline data.

---

# APPLICATION ARCHITECTURE

/app

(auth)
/login

(protected)
/dashboard
/timeline
/search
/insights

/components

/features
/activities
/decisions
/memories
/routines
/timeline
/search

/lib
firebase.js
firestore.js

/store
authStore.js
appStore.js

/hooks

/services

---

# FIREBASE AUTH

Use Firebase Authentication.

Provider:

* Google Authentication Only

Do NOT implement:

* Email/Password Login
* Registration Form
* Password Reset
* Forgot Password

Required Features:

* Google Sign-In
* Logout
* Persistent Session
* Auth Guard
* Protected Routes
* User Profile Retrieval

Use:

onAuthStateChanged()

Persist auth state using Zustand.

Use Firebase Modular SDK v9+.

Do NOT use Firebase compat API.

---

# USER DOCUMENT

Create user profile document on first login.

Collection:

users/{userId}

Document:

{
uid,
displayName,
email,
photoURL,
createdAt
}

---

# ROUTE PROTECTION

Unauthenticated users:

redirect("/login")

Authenticated users:

access protected routes

Prefer client-side auth guard for MVP.

---

# FIRESTORE SECURITY ASSUMPTIONS

All data is user-owned.

Users can only access their own documents.

Every Firestore query must be scoped to:

currentUser.uid

Never query global application data.

---

# FIRESTORE DATA MODEL

users/{userId}

users/{userId}/activities

users/{userId}/decisions

users/{userId}/memories

users/{userId}/routines

---

# ACTIVITY DOCUMENT

{
id,
title,
category,
note,
createdAt
}

---

# DECISION DOCUMENT

{
id,
title,
confidence,
expectedOutcome,
reviewDate,
createdAt
}

---

# MEMORY DOCUMENT

{
id,
title,
content,
tags,
createdAt
}

---

# ROUTINE DOCUMENT

{
id,
title,
intervalDays,
lastPerformed,
createdAt
}

---

# TIMELINE AGGREGATION

Do NOT create a timeline collection.

Timeline must be generated dynamically.

Aggregate:

* activities
* decisions
* memories
* routines

Normalize:

{
id,
type,
title,
timestamp
}

Sort descending by timestamp.

Dashboard and Timeline must consume the same aggregated source.

---

# DASHBOARD REQUIREMENTS

Dashboard must be fully data-driven.

Data Sources:

* Activities
* Decisions
* Memories
* Routines
* Timeline

Dashboard should display:

* Today's Activities Count
* Today's Memories Count
* Overdue Routines
* Recent Decisions
* Recent Timeline Events
* Current User

No mock data.

No hardcoded statistics.

---

# QUICK CAPTURE SYSTEM

Quick Capture is the primary interaction pattern.

Create:

CaptureDialog.jsx

Use:

* shadcn Dialog
* Dynamic Form Rendering

Supported Types:

* Activity
* Decision
* Memory
* Routine

Requirements:

* Submit directly to Firestore
* Optimistic UI Updates
* Close modal after success
* Refresh state immediately

Do NOT create separate modal components for each entity type.

Use one reusable dialog component.

---

# SEARCH PAGE

Search across:

* Activities
* Decisions
* Memories
* Routines

For MVP:

Implement client-side unified search.

Requirements:

* Fetch user data
* Build searchable index
* Filter while typing
* No submit button
* No page reload

Structure code so Firestore-powered search can be implemented later.

---

# INSIGHTS PAGE

Generate analytics locally from Firestore data.

Examples:

* Most Active Category
* Most Captured Tags
* Average Decision Confidence
* Decision Count
* Overdue Routine Count
* Recent Activity Trend

Do NOT use external analytics services.

---

# STATE MANAGEMENT

Use Zustand.

Create:

authStore

appStore

Auth Store:

* currentUser
* loading
* login
* logout

App Store:

* activities
* decisions
* memories
* routines
* timeline
* dashboardStats
* searchResults

---

# DATA FETCHING

Create service layer.

Examples:

services/activityService.js

services/decisionService.js

services/memoryService.js

services/routineService.js

Each service handles:

* create
* update
* delete
* fetch

Firestore queries must never be written directly inside UI components.

---

# FRAMER MOTION

Keep existing Stitch UI.

Only add:

* Page transitions
* Dialog transitions
* Timeline reveal animations
* Search result reveal animations
* List stagger animations

Duration:

200ms–300ms

Avoid excessive motion.

---

# PERFORMANCE

Use Firestore query limits.

Lazy load pages.

Memoize expensive calculations.

Avoid unnecessary rerenders.

Target Lighthouse score above 90.

---

# ENVIRONMENT VARIABLES

NEXT_PUBLIC_FIREBASE_API_KEY

NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN

NEXT_PUBLIC_FIREBASE_PROJECT_ID

NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET

NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID

NEXT_PUBLIC_FIREBASE_APP_ID

---

# DEPLOYMENT

Deploy on Vercel.

Application must be fully functional without local-only storage.

All persistent data must come from Firestore.
