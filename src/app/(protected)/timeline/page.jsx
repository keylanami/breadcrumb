"use client";

import { useEffect, useMemo, useState } from "react";
import TimelineDateGroup from "@/features/timeline/TimelineDateGroup";
import TimelineFooterMarker from "@/features/timeline/TimelineFooterMarker";
import { timelineSelectors } from "@/features/timeline/timelineSelectors";
import { useAppStore } from "@/store/appStore";

export default function TimelinePage() {
  const refreshAll = useAppStore((state) => state.refreshAll);
  const activities = useAppStore((state) => state.activities);
  const decisions = useAppStore((state) => state.decisions);
  const memories = useAppStore((state) => state.memories);
  const routines = useAppStore((state) => state.routines);
  const [hasLoaded, setHasLoaded] = useState(false);
  const groupedTimelineEvents = useMemo(
    () =>
      timelineSelectors.groupedTimelineEvents({
        activities,
        decisions,
        memories,
        routines,
      }),
    [activities, decisions, memories, routines],
  );

  useEffect(() => {
    let isMounted = true;

    refreshAll().finally(() => {
      if (isMounted) {
        setHasLoaded(true);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [refreshAll]);

  return (
    <div className="flex w-full flex-col items-center">
      <header className="mb-16 w-full max-w-[720px] text-center">
        <h1 className="mb-4 font-serif text-4xl font-semibold leading-[1.2] tracking-[-0.01em] text-black md:text-5xl">
          TIMELINE
        </h1>
        <p className="font-sans text-lg leading-[1.6] text-[#5d5f5d]">
          A chronological record of your life.
        </p>
      </header>

      <div className="relative w-full max-w-[720px]">
        {groupedTimelineEvents.length ? (
          <>
            {groupedTimelineEvents.map((group) => (
              <TimelineDateGroup group={group} key={group.label} />
            ))}
            <TimelineFooterMarker />
          </>
        ) : hasLoaded ? (
          <p className="border border-[#c4c7c7] bg-white p-6 text-center font-sans text-base leading-6 text-[#5d5f5d]">
            No timeline events yet.
          </p>
        ) : (
          <p className="font-mono text-xs font-medium uppercase leading-none tracking-[0.05em] text-[#5d5f5d]">
            Loading timeline
          </p>
        )}
      </div>
    </div>
  );
}

