const RECENT_DAYS = 30;

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

function countBy(values) {
  return values.reduce((counts, value) => {
    const key = String(value || "").trim();

    if (!key) {
      return counts;
    }

    counts[key] = (counts[key] || 0) + 1;
    return counts;
  }, {});
}

function sortedCounts(counts) {
  return Object.entries(counts)
    .map(([label, count]) => ({ label, count }))
    .sort((first, second) => second.count - first.count || first.label.localeCompare(second.label));
}

function numericConfidence(decision) {
  const confidence = Number(decision?.confidence);

  return Number.isFinite(confidence) ? confidence : null;
}

function dueDateForRoutine(routine) {
  const dueDate = toDate(routine?.dueDate);

  if (dueDate) {
    return dueDate;
  }

  const lastPerformed = toDate(routine?.lastPerformed);
  const intervalDays = Number(routine?.intervalDays);

  if (!lastPerformed || !Number.isFinite(intervalDays) || intervalDays <= 0) {
    return null;
  }

  const nextDueDate = new Date(lastPerformed);
  nextDueDate.setDate(nextDueDate.getDate() + intervalDays);

  return nextDueDate;
}

function isRoutineOverdue(routine, now = new Date()) {
  const dueDate = dueDateForRoutine(routine);
  return dueDate ? dueDate < now : false;
}

function memoryTags(memory) {
  if (Array.isArray(memory?.tags)) {
    return memory.tags;
  }

  if (typeof memory?.tags === "string") {
    return memory.tags.split(",");
  }

  return [];
}

function cleanTag(tag) {
  return String(tag || "").trim().replace(/^#/, "");
}

export function selectActivityInsights(state) {
  const activities = state.activities || [];
  const categoryCounts = sortedCounts(
    countBy(activities.map((activity) => activity.category)),
  );

  return {
    totalActivities: activities.length,
    mostCommonCategory: categoryCounts[0]?.label || "",
    categoryCounts,
  };
}

export function selectDecisionInsights(state) {
  const decisions = state.decisions || [];
  const decisionsWithConfidence = decisions
    .map((decision) => ({
      decision,
      confidence: numericConfidence(decision),
    }))
    .filter((item) => item.confidence !== null);
  const confidenceTotal = decisionsWithConfidence.reduce(
    (sum, item) => sum + item.confidence,
    0,
  );
  const highestConfidenceDecision =
    [...decisionsWithConfidence].sort(
      (first, second) => second.confidence - first.confidence,
    )[0] || null;

  return {
    totalDecisions: decisions.length,
    averageConfidence: decisionsWithConfidence.length
      ? confidenceTotal / decisionsWithConfidence.length
      : null,
    highestConfidenceDecision: highestConfidenceDecision?.decision || null,
    highestConfidenceValue: highestConfidenceDecision?.confidence ?? null,
  };
}

export function selectRoutineInsights(state) {
  const routines = state.routines || [];
  const overdueRoutines = routines.filter((routine) => isRoutineOverdue(routine));
  const completedRoutines = routines.filter((routine) =>
    Boolean(
      routine.completedAt ||
        routine.lastCompletedAt ||
        routine.lastPerformed ||
        routine.completionCount ||
        routine.completedCount,
    ),
  );
  const healthyRoutines = routines.filter((routine) => !isRoutineOverdue(routine));

  return {
    totalRoutines: routines.length,
    overdueRoutinesCount: overdueRoutines.length,
    overdueRoutines,
    completedRoutinesCount: completedRoutines.length,
    healthyRoutines,
  };
}

export function selectMemoryInsights(state) {
  const memories = state.memories || [];
  const recentSince = new Date();
  recentSince.setDate(recentSince.getDate() - RECENT_DAYS);
  const tagCounts = sortedCounts(
    countBy(memories.flatMap((memory) => memoryTags(memory).map(cleanTag))),
  );
  const recentMemoryCount = memories.filter((memory) => {
    const createdAt = toDate(memory.createdAt);
    return createdAt ? createdAt >= recentSince : false;
  }).length;

  return {
    totalMemories: memories.length,
    mostCommonTags: tagCounts,
    recentMemoryCount,
  };
}

export function selectInsightObservations(state) {
  const activityInsights = selectActivityInsights(state);
  const decisionInsights = selectDecisionInsights(state);
  const routineInsights = selectRoutineInsights(state);
  const memoryInsights = selectMemoryInsights(state);
  const observations = [];

  if (activityInsights.mostCommonCategory) {
    observations.push(
      `${activityInsights.mostCommonCategory} is your most common activity category.`,
    );
  }

  if (memoryInsights.mostCommonTags[0]) {
    observations.push(
      `Most captured memories relate to ${memoryInsights.mostCommonTags[0].label}.`,
    );
  }

  if (decisionInsights.highestConfidenceDecision) {
    observations.push(
      `"${decisionInsights.highestConfidenceDecision.title || "Untitled decision"}" is your highest confidence decision.`,
    );
  }

  if (routineInsights.overdueRoutinesCount > 0) {
    observations.push(
      `${routineInsights.overdueRoutinesCount} routine${
        routineInsights.overdueRoutinesCount === 1 ? " is" : "s are"
      } overdue.`,
    );
  }

  return observations;
}

export function selectInsightsSummary(state) {
  const activityInsights = selectActivityInsights(state);
  const decisionInsights = selectDecisionInsights(state);
  const routineInsights = selectRoutineInsights(state);
  const memoryInsights = selectMemoryInsights(state);
  const observations = selectInsightObservations(state);
  const totalItems =
    activityInsights.totalActivities +
    decisionInsights.totalDecisions +
    routineInsights.totalRoutines +
    memoryInsights.totalMemories;

  return {
    activityInsights,
    decisionInsights,
    routineInsights,
    memoryInsights,
    observations,
    hasInsights: totalItems > 0,
  };
}

export const insightsSelectors = {
  activityInsights: selectActivityInsights,
  decisionInsights: selectDecisionInsights,
  routineInsights: selectRoutineInsights,
  memoryInsights: selectMemoryInsights,
  observations: selectInsightObservations,
  summary: selectInsightsSummary,
};

