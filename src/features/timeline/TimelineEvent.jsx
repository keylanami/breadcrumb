import TimelineMarker from "@/features/timeline/TimelineMarker";
import TimelineTypeBadge from "@/features/timeline/TimelineTypeBadge";

function formatTime(value) {
  if (!value) {
    return "--:--";
  }

  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    hour12: false,
    minute: "2-digit",
  }).format(value);
}

export default function TimelineEvent({ event }) {
  return (
    <div className="group relative">
      <TimelineMarker type={event.type} />
      <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:gap-6">
        <time className="w-16 shrink-0 font-mono text-xs font-medium leading-none tracking-[0.05em] text-[#5d5f5d]">
          {formatTime(event.timestamp)}
        </time>
        <div className="flex items-center gap-3">
          <TimelineTypeBadge type={event.type} />
          <h3 className="font-serif text-[20px] font-medium leading-tight text-black">
            {event.title || "Untitled event"}
          </h3>
        </div>
      </div>

      {event.description ? (
        <div className="mt-4 max-w-lg md:ml-[88px]">
          <p className="border-l-2 border-[#c4c7c7] py-1 pl-4 font-sans text-base leading-6 text-[#444748]">
            {event.description}
          </p>
        </div>
      ) : null}
    </div>
  );
}
