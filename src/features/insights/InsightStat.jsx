export default function InsightStat({
  label,
  value,
  bordered = false,
  compact = false,
}) {
  return (
    <div
      className={`flex flex-col gap-2 ${
        bordered ? "border-b border-[#c4c7c7] pb-4 md:border-b-0 md:pb-0" : ""
      }`}
    >
      <span className="font-mono text-xs font-medium uppercase leading-none tracking-widest text-[#5d5f5d]">
        {label}
      </span>
      <span
        className={
          compact
            ? "mt-auto font-serif text-2xl font-medium leading-[1.3] text-black"
            : "font-serif text-4xl font-semibold leading-[1.2] tracking-[-0.01em] text-black"
        }
      >
        {value}
      </span>
    </div>
  );
}

