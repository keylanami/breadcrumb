const RESULT_LIMIT_PER_GROUP = 20;
const SUGGESTION_LIMIT = 8;

function toSearchText(value) {
  if (Array.isArray(value)) {
    return value.join(" ");
  }

  if (value === undefined || value === null) {
    return "";
  }

  return String(value);
}

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

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function resultDate(item) {
  return toDate(item.updatedAt) || toDate(item.createdAt) || toDate(item.dueDate);
}

function normalizeQuery(query) {
  return query.trim().toLowerCase();
}

function includesQuery(fields, query) {
  const normalizedQuery = normalizeQuery(query);

  if (!normalizedQuery) {
    return false;
  }

  return fields
    .map(toSearchText)
    .join(" ")
    .toLowerCase()
    .includes(normalizedQuery);
}

function excerptFromFields(fields) {
  const text = fields.map(toSearchText).find((field) => field.trim()) || "";

  if (!text) {
    return "";
  }

  return text.length > 140 ? `${text.slice(0, 137)}...` : text;
}

function sortByDate(results) {
  return [...results].sort((first, second) => {
    const firstTime = first.date?.getTime() || 0;
    const secondTime = second.date?.getTime() || 0;

    return secondTime - firstTime;
  });
}

function createResult({ item, type, typeLabel, title, excerptFields }) {
  return {
    id: `${type}:${item.id}`,
    sourceId: item.id,
    type,
    typeLabel,
    title: title || "Untitled",
    excerpt: excerptFromFields(excerptFields),
    date: resultDate(item),
  };
}

function searchActivities(activities = [], query) {
  return sortByDate(
    activities
      .filter((activity) =>
        includesQuery(
          [
            activity.title,
            activity.name,
            activity.description,
            activity.note,
            activity.category,
          ],
          query,
        ),
      )
      .map((activity) =>
        createResult({
          item: activity,
          type: "activity",
          typeLabel: "Activity",
          title: activity.title || activity.name,
          excerptFields: [
            activity.description,
            activity.note,
            activity.category,
          ],
        }),
      ),
  ).slice(0, RESULT_LIMIT_PER_GROUP);
}

function searchDecisions(decisions = [], query) {
  return sortByDate(
    decisions
      .filter((decision) =>
        includesQuery(
          [
            decision.title,
            decision.description,
            decision.note,
            decision.expectedOutcome,
          ],
          query,
        ),
      )
      .map((decision) =>
        createResult({
          item: decision,
          type: "decision",
          typeLabel: "Decision",
          title: decision.title,
          excerptFields: [
            decision.description,
            decision.note,
            decision.expectedOutcome,
          ],
        }),
      ),
  ).slice(0, RESULT_LIMIT_PER_GROUP);
}

function searchMemories(memories = [], query) {
  return sortByDate(
    memories
      .filter((memory) =>
        includesQuery(
          [memory.title, memory.content, memory.notes, memory.note, memory.tags],
          query,
        ),
      )
      .map((memory) =>
        createResult({
          item: memory,
          type: "memory",
          typeLabel: "Memory",
          title: memory.title,
          excerptFields: [memory.content, memory.notes, memory.note, memory.tags],
        }),
      ),
  ).slice(0, RESULT_LIMIT_PER_GROUP);
}

function searchRoutines(routines = [], query) {
  return sortByDate(
    routines
      .filter((routine) =>
        includesQuery(
          [
            routine.title,
            routine.description,
            routine.note,
            routine.notes,
            routine.tags,
          ],
          query,
        ),
      )
      .map((routine) =>
        createResult({
          item: routine,
          type: "routine",
          typeLabel: "Routine",
          title: routine.title,
          excerptFields: [
            routine.description,
            routine.note,
            routine.notes,
            routine.intervalDays ? `Every ${routine.intervalDays} days` : "",
          ],
        }),
      ),
  ).slice(0, RESULT_LIMIT_PER_GROUP);
}

function uniqueSuggestions(values) {
  const seen = new Set();

  return values
    .map((value) => toSearchText(value).trim())
    .filter(Boolean)
    .filter((value) => {
      const key = value.toLowerCase();

      if (seen.has(key)) {
        return false;
      }

      seen.add(key);
      return true;
    })
    .slice(0, SUGGESTION_LIMIT);
}

export function selectSearchResults(state, query) {
  return {
    activities: searchActivities(state.activities, query),
    decisions: searchDecisions(state.decisions, query),
    memories: searchMemories(state.memories, query),
    routines: searchRoutines(state.routines, query),
  };
}

export function selectSearchSuggestions(state) {
  const memoryTags = (state.memories || []).flatMap((memory) =>
    Array.isArray(memory.tags)
      ? memory.tags
      : toSearchText(memory.tags)
          .split(",")
          .map((tag) => tag.trim()),
  );
  const routineNames = (state.routines || []).map((routine) => routine.title);
  const activityCategories = (state.activities || []).map(
    (activity) => activity.category,
  );

  return uniqueSuggestions([...memoryTags, ...routineNames, ...activityCategories]);
}

export function hasSearchResults(results) {
  return Object.values(results).some((group) => group.length > 0);
}

export const searchSelectors = {
  searchResults: selectSearchResults,
  searchSuggestions: selectSearchSuggestions,
  hasSearchResults,
};

