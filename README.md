# Breadcrumb

> Remember what you did.
> Remember why you did it.
> Remember what happened after.

Breadcrumb is a personal reflection operating system designed to help people preserve the context of their lives.

Unlike productivity tools that focus on future tasks, Breadcrumb focuses on the past and present: the decisions you made, the memories you captured, the activities you completed, and the routines that shaped your life.

The goal is simple:

**Store experiences before they disappear.**

---

## Why Breadcrumb?

Most tools answer questions like:

* What do I need to do next?
* What task is due tomorrow?
* What project am I working on?

Breadcrumb answers different questions:

* Why did I make that decision?
* What happened after?
* When did this memory occur?
* How have my routines changed over time?
* What patterns exist across my life?

Breadcrumb acts as a personal archive for reflection rather than a productivity dashboard.

---

## Core Concepts

### Activities

Records of things you've done.

Examples:

* Finished reading a book
* Went to a conference
* Started a side project
* Completed a workout

---

### Decisions

Captures choices together with reasoning and confidence.

Examples:

* Accepted a job offer
* Moved to a new city
* Chose a technology stack
* Started a business idea

Each decision can later be reviewed against its outcome.

---

### Memories

Important moments worth preserving.

Examples:

* A meaningful conversation
* A lesson learned
* A personal milestone
* A memorable experience

---

### Routines

Recurring behaviors and maintenance activities.

Examples:

* Weekly review
* Journaling
* Exercise
* Reading habit

---

## Features

### Google Authentication

Secure sign-in using Firebase Authentication.

### Timeline

A unified chronological view generated from:

* Activities
* Decisions
* Memories
* Routines

No separate timeline collection is stored.

---

### Search

Unified search across all captured entries.

Search supports:

* Titles
* Descriptions
* Notes
* Categories
* Tags
* Outcomes

---

### Insights

Automatically generated insights based on stored data.

Examples:

* Most common activity categories
* Most frequent memory tags
* Decision confidence patterns
* Routine completion observations

---

### Quick Capture

Fast entry creation for:

* Activities
* Decisions
* Memories
* Routines

Designed to minimize friction while capturing information.

---

## Tech Stack

### Frontend

* Next.js 15
* React
* Tailwind CSS
* Framer Motion
* Zustand

### Backend

* Firebase Authentication
* Cloud Firestore

### Deployment

* Vercel

---

## Architecture

```text
Users
 └─ {uid}
     ├─ activities
     ├─ decisions
     ├─ memories
     └─ routines
```

Timeline, search, and insights are generated from existing data rather than stored separately.

This keeps the data model simple and avoids duplication.

---

## Design Philosophy

Breadcrumb follows a deliberately minimal visual language:

* Monochrome palette
* Editorial typography
* Calm interactions
* Reflection-first experience
* No productivity-gamification patterns

The interface is designed to feel more like a personal archive than a task manager.

---

## Local Development

Install dependencies:

```bash
npm install
```

Create:

```bash
.env.local
```

Add Firebase configuration:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

Run development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## Roadmap

Planned future improvements:

* Entry editing
* Entry deletion
* Advanced analytics
* Rich timeline filtering
* Export functionality
* AI-assisted reflection
* Knowledge graph visualization

---

## License

MIT License
