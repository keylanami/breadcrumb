export default function TimelineTypeBadge({ type }) {
  return (
    <span className="border border-[#c4c7c7] px-2 py-1 font-mono text-[10px] uppercase text-[#5d5f5d]">
      {type || "event"}
    </span>
  );
}

