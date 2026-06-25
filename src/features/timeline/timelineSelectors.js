import {
  buildTimelineEvents,
  getRecentTimelineEvents,
  groupTimelineByDate,
} from "@/features/timeline/timelineAdapter";

function latestItem(items = [], getTimestamp) {
  return [...items]
    .filter((item) => getTimestamp(item))
    .sort((first, second) => getTimestamp(second) - getTimestamp(first))[0] || null;
}

function toTime(value) {
  if (!value) {
    return null;
  }

  if (value instanceof Date) {
    return value.getTime();
  }

  if (typeof value.toDate === "function") {
    return value.toDate().getTime();
  }

  const date = new Date(value);
  const time = date.getTime();

  return Number.isNaN(time) ? null : time;
}

function routineTimestamp(routine) {
  return (
    toTime(routine?.updatedAt) ||
    toTime(routine?.dueDate) ||
    toTime(routine?.createdAt)
  );
}

export const selectTimelineEvents = (state) => buildTimelineEvents(state);
export const selectGroupedTimelineEvents = (state) =>
  groupTimelineByDate(selectTimelineEvents(state));
export const selectRecentTimelineEvents = (state) =>
  getRecentTimelineEvents(state);

export const selectLatestActivity = (state) =>
  latestItem(state.activities, (activity) => toTime(activity?.createdAt));
export const selectLatestDecision = (state) =>
  latestItem(state.decisions, (decision) => toTime(decision?.createdAt));
export const selectLatestMemory = (state) =>
  latestItem(state.memories, (memory) => toTime(memory?.createdAt));
export const selectLatestRoutine = (state) =>
  latestItem(state.routines, routineTimestamp);

export const timelineSelectors = {
  timelineEvents: selectTimelineEvents,
  groupedTimelineEvents: selectGroupedTimelineEvents,
  recentTimelineEvents: selectRecentTimelineEvents,
  latestActivity: selectLatestActivity,
  latestDecision: selectLatestDecision,
  latestMemory: selectLatestMemory,
  latestRoutine: selectLatestRoutine,
};

