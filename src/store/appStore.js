"use client";

import { create } from "zustand";
import { activityService } from "@/services/activityService";
import { decisionService } from "@/services/decisionService";
import { memoryService } from "@/services/memoryService";
import { routineService } from "@/services/routineService";
import { useAuthStore } from "@/store/authStore";

const RECENT_LIMIT = 5;

const initialState = {
  activities: [],
  decisions: [],
  memories: [],
  routines: [],
  isLoadingActivities: false,
  isLoadingDecisions: false,
  isLoadingMemories: false,
  isLoadingRoutines: false,
  activitiesError: "",
  decisionsError: "",
  memoriesError: "",
  routinesError: "",
};

function getCurrentUserId() {
  const currentUser = useAuthStore.getState().currentUser;

  if (!currentUser?.uid) {
    throw new Error("You must be signed in to load your data.");
  }

  return currentUser.uid;
}

function errorMessage(error, fallback) {
  return error?.message || fallback;
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

  if (typeof value === "number" || typeof value === "string") {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  return null;
}

function getCreatedAtTime(item) {
  return toDate(item?.createdAt)?.getTime() || 0;
}

function recentItems(items, count = RECENT_LIMIT) {
  return [...items]
    .sort((first, second) => getCreatedAtTime(second) - getCreatedAtTime(first))
    .slice(0, count);
}

function isRoutineOverdue(routine, now = new Date()) {
  const intervalDays = Number(routine?.intervalDays);

  if (!Number.isFinite(intervalDays) || intervalDays <= 0) {
    return false;
  }

  const lastPerformed = toDate(routine?.lastPerformed);
  const createdAt = toDate(routine?.createdAt);
  const baseDate = lastPerformed || createdAt;

  if (!baseDate) {
    return false;
  }

  const dueAt = new Date(baseDate);
  dueAt.setDate(dueAt.getDate() + intervalDays);

  return dueAt < now;
}

export const useAppStore = create((set, get) => ({
  ...initialState,

  loadActivities: async () => {
    set({ isLoadingActivities: true, activitiesError: "" });

    try {
      const activities = await activityService.list(getCurrentUserId());
      set({ activities, isLoadingActivities: false, activitiesError: "" });
      return activities;
    } catch (error) {
      const activitiesError = errorMessage(error, "Unable to load activities.");
      set({ isLoadingActivities: false, activitiesError });
      throw error;
    }
  },

  loadDecisions: async () => {
    set({ isLoadingDecisions: true, decisionsError: "" });

    try {
      const decisions = await decisionService.list(getCurrentUserId());
      set({ decisions, isLoadingDecisions: false, decisionsError: "" });
      return decisions;
    } catch (error) {
      const decisionsError = errorMessage(error, "Unable to load decisions.");
      set({ isLoadingDecisions: false, decisionsError });
      throw error;
    }
  },

  loadMemories: async () => {
    set({ isLoadingMemories: true, memoriesError: "" });

    try {
      const memories = await memoryService.list(getCurrentUserId());
      set({ memories, isLoadingMemories: false, memoriesError: "" });
      return memories;
    } catch (error) {
      const memoriesError = errorMessage(error, "Unable to load memories.");
      set({ isLoadingMemories: false, memoriesError });
      throw error;
    }
  },

  loadRoutines: async () => {
    set({ isLoadingRoutines: true, routinesError: "" });

    try {
      const routines = await routineService.list(getCurrentUserId());
      set({ routines, isLoadingRoutines: false, routinesError: "" });
      return routines;
    } catch (error) {
      const routinesError = errorMessage(error, "Unable to load routines.");
      set({ isLoadingRoutines: false, routinesError });
      throw error;
    }
  },

  refreshAll: async () => {
    const { loadActivities, loadDecisions, loadMemories, loadRoutines } = get();

    return Promise.allSettled([
      loadActivities(),
      loadDecisions(),
      loadMemories(),
      loadRoutines(),
    ]);
  },

  resetAppState: () => {
    set(initialState);
  },
}));

export const selectRecentActivities = (state) => recentItems(state.activities);
export const selectRecentDecisions = (state) => recentItems(state.decisions);
export const selectRecentMemories = (state) => recentItems(state.memories);
export const selectOverdueRoutines = (state) =>
  state.routines.filter((routine) => isRoutineOverdue(routine));

export const appStoreSelectors = {
  recentActivities: selectRecentActivities,
  recentDecisions: selectRecentDecisions,
  recentMemories: selectRecentMemories,
  overdueRoutines: selectOverdueRoutines,
};

