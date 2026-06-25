"use client";

import { dashboardSelectors } from "@/features/dashboard/dashboardSelectors";
import { useAppStore } from "@/store/appStore";

const SNAPSHOT_CARDS = [
  {
    label: "Activities Count",
    selector: dashboardSelectors.activityCount,
  },
  {
    label: "Decisions Count",
    selector: dashboardSelectors.decisionCount,
  },
  {
    label: "Memories Count",
    selector: dashboardSelectors.memoryCount,
  },
  {
    label: "Overdue Routines",
    selector: dashboardSelectors.overdueRoutineCount,
    isWarning: true,
  },
];

export default function DashboardSnapshotGrid() {
  return (
    <section className="mb-12 grid grid-cols-2 gap-4">
      {SNAPSHOT_CARDS.map((card) => (
        <SnapshotCard key={card.label} {...card} />
      ))}
    </section>
  );
}

function SnapshotCard({ label, selector, isWarning = false }) {
  const value = useAppStore(selector);

  return (
    <div className="border border-[#c4c7c7] bg-white p-6">
      <div className="mb-4 font-mono text-xs font-medium uppercase leading-none tracking-widest text-[#5d5f5d]">
        {label}
      </div>
      <div
        className={`font-serif text-2xl font-medium leading-[1.3] ${
          isWarning && value > 0 ? "text-[#ba1a1a]" : "text-black"
        }`}
      >
        {value}
      </div>
    </div>
  );
}

