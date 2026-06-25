"use client";

import { useMemo } from "react";
import { appStoreSelectors, useAppStore } from "@/store/appStore";

const DAY_IN_MS = 24 * 60 * 60 * 1000;

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

function addDays(date, days) {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + days);
  return nextDate;
}

function dueDateForRoutine(routine) {
  const dueDate = toDate(routine.dueDate);

  if (dueDate) {
    return dueDate;
  }

  const lastPerformed = toDate(routine.lastPerformed);
  const intervalDays = Number(routine.intervalDays);

  if (!lastPerformed || !Number.isFinite(intervalDays) || intervalDays <= 0) {
    return null;
  }

  return addDays(lastPerformed, intervalDays);
}

function dueInformation(routine) {
  const dueDate = dueDateForRoutine(routine);

  if (!dueDate) {
    return "Overdue";
  }

  const overdueDays = Math.max(
    1,
    Math.floor((Date.now() - dueDate.getTime()) / DAY_IN_MS),
  );

  return `Overdue ${overdueDays} ${overdueDays === 1 ? "day" : "days"}`;
}

export default function DueMaintenance() {
  const routines = useAppStore((state) => state.routines);
  const overdueRoutines = useMemo(
    () => appStoreSelectors.overdueRoutines({ routines }),
    [routines],
  );

  return (
    <section className="mb-12">
      <h2 className="mb-6 font-mono text-xs font-medium uppercase leading-none tracking-widest text-black">
        Due Maintenance
      </h2>

      {overdueRoutines.length ? (
        <ul className="space-y-2">
          {overdueRoutines.map((routine) => (
            <li
              className="group flex items-center gap-3 font-sans text-base leading-6"
              key={routine.id}
            >
              <span className="text-[#c4c7c7] transition-colors group-hover:text-black">
                -
              </span>
              <span className="flex-grow text-black">
                {routine.title || "Untitled routine"}
              </span>
              <span className="border border-[#ba1a1a] px-2 py-1 font-mono text-xs font-medium leading-none tracking-[0.05em] text-[#ba1a1a]">
                {dueInformation(routine)}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="border border-[#c4c7c7] bg-white p-4 font-sans text-base leading-6 text-[#5d5f5d]">
          No overdue routines.
        </p>
      )}
    </section>
  );
}
