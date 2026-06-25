const RECENT_TIMELINE_LIMIT = 5;

function toDate(value) {
  if (!value) {
    return null;
  }

  if (value instanceof Date) {
    return value;
  }

  if (typeof value.toDate === "function") {
    return value.toDate();
  }

  if (typeof value === "number" || typeof value === "string") {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  return null;
}

function addDays(date, days) {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + days);
  return nextDate;
}

function buildRoutineDueDate(routine) {
  const intervalDays = Number(routine?.intervalDays);
  const lastPerformed = toDate(routine?.lastPerformed);

  if (!Number.isFinite(intervalDays) || intervalDays <= 0 || !lastPerformed) {
    return null;
  }

  return addDays(lastPerformed, intervalDays);
}

function getRoutineTimestamp(routine) {
  return (
    toDate(routine?.updatedAt) ||
    toDate(routine?.dueDate) ||
    buildRoutineDueDate(routine) ||
    toDate(routine?.createdAt)
  );
}

function createTimelineEvent({ source, type, title, description, timestamp }) {
  if (!source?.id || !timestamp) {
    return null;
  }

  return {
    id: `${type}:${source.id}`,
    type,
    title: title || "Untitled",
    description: description || "",
    timestamp,
    sourceId: source.id,
  };
}

function mapActivity(activity) {
  return createTimelineEvent({
    source: activity,
    type: "activity",
    title: activity.name || activity.title,
    description: activity.note || activity.category,
    timestamp: toDate(activity.createdAt),
  });
}

function mapDecision(decision) {
  return createTimelineEvent({
    source: decision,
    type: "decision",
    title: decision.title,
    description: decision.expectedOutcome,
    timestamp: toDate(decision.createdAt),
  });
}

function mapMemory(memory) {
  return createTimelineEvent({
    source: memory,
    type: "memory",
    title: memory.title,
    description: memory.content,
    timestamp: toDate(memory.createdAt),
  });
}

function mapRoutine(routine) {
  return createTimelineEvent({
    source: routine,
    type: "routine",
    title: routine.title,
    description: routine.note || "",
    timestamp: getRoutineTimestamp(routine),
  });
}

function isSameDate(firstDate, secondDate) {
  return (
    firstDate.getFullYear() === secondDate.getFullYear() &&
    firstDate.getMonth() === secondDate.getMonth() &&
    firstDate.getDate() === secondDate.getDate()
  );
}

function formatDateGroup(date, now = new Date()) {
  if (isSameDate(date, now)) {
    return "Today";
  }

  const yesterday = addDays(now, -1);

  if (isSameDate(date, yesterday)) {
    return "Yesterday";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function sortTimelineEvents(events = []) {
  return [...events].sort(
    (first, second) => second.timestamp.getTime() - first.timestamp.getTime(),
  );
}

export function buildTimelineEvents(state = {}) {
  const events = [
    ...(state.activities || []).map(mapActivity),
    ...(state.decisions || []).map(mapDecision),
    ...(state.memories || []).map(mapMemory),
    ...(state.routines || []).map(mapRoutine),
  ].filter(Boolean);

  return sortTimelineEvents(events);
}

export function groupTimelineByDate(events = [], now = new Date()) {
  return sortTimelineEvents(events).reduce((groups, event) => {
    const label = formatDateGroup(event.timestamp, now);
    const existingGroup = groups.find((group) => group.label === label);

    if (existingGroup) {
      existingGroup.events.push(event);
      return groups;
    }

    groups.push({
      label,
      date: event.timestamp,
      events: [event],
    });

    return groups;
  }, []);
}

export function getRecentTimelineEvents(state = {}, count = RECENT_TIMELINE_LIMIT) {
  return buildTimelineEvents(state).slice(0, count);
}

