import { selectOverdueRoutines } from "@/store/appStore";

export const selectActivityCount = (state) => state.activities.length;
export const selectDecisionCount = (state) => state.decisions.length;
export const selectMemoryCount = (state) => state.memories.length;
export const selectOverdueRoutineCount = (state) =>
  selectOverdueRoutines(state).length;

export const dashboardSelectors = {
  activityCount: selectActivityCount,
  decisionCount: selectDecisionCount,
  memoryCount: selectMemoryCount,
  overdueRoutineCount: selectOverdueRoutineCount,
};

