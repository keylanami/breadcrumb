export default function InsightObservationCard({ observation }) {
  return (
    <div className="group relative overflow-hidden border border-[#c4c7c7] bg-white p-8 md:p-12">
      <div className="absolute left-0 top-0 h-1 w-full origin-left scale-x-0 bg-black transition-transform duration-500 group-hover:scale-x-100" />
      <div className="flex flex-col gap-4">
        <span className="font-serif text-3xl text-[#5d5f5d]" aria-hidden="true">
          &quot;
        </span>
        <p className="max-w-lg font-serif text-2xl font-medium leading-relaxed text-black">
          {observation}
        </p>
        <span className="mt-4 font-mono text-xs font-medium leading-none tracking-[0.05em] text-[#444748]">
          System Observation
        </span>
      </div>
    </div>
  );
}

