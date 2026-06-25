export default function InsightTagRow({ count, label }) {
  return (
    <div className="group flex cursor-default items-center justify-between">
      <span className="font-mono text-xs font-medium leading-none tracking-[0.05em] text-black group-hover:underline">
        #{label}
      </span>
      <span className="mx-4 h-px flex-grow bg-[#c4c7c7]" />
      <span className="font-mono text-xs font-medium leading-none tracking-[0.05em] text-[#5d5f5d]">
        {count} {count === 1 ? "entry" : "entries"}
      </span>
    </div>
  );
}

