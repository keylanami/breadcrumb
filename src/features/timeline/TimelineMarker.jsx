const MARKERS = {
  activity: "*",
  decision: "?",
  memory: "M",
  routine: "R",
};

const MARKER_STYLES = {
  activity: "bg-[#e4e2e2]",
  decision: "bg-white",
  memory: "bg-[#efeded]",
  routine: "bg-[#f5f3f3]",
};

export default function TimelineMarker({ type }) {
  return (
    <div
      className={`absolute -left-[31px] top-0 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-[#c4c7c7] transition-colors group-hover:border-black md:-left-[47px] ${
        MARKER_STYLES[type] || "bg-[#e4e2e2]"
      }`}
    >
      <span className="font-mono text-xs font-medium leading-none tracking-[0.05em] text-[#5d5f5d] group-hover:text-black">
        {MARKERS[type] || "+"}
      </span>
    </div>
  );
}

