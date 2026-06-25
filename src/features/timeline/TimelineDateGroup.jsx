import TimelineEvent from "@/features/timeline/TimelineEvent";

export default function TimelineDateGroup({ group }) {
  return (
    <section className="mb-12">
      <div className="mb-8 flex items-center gap-4 font-mono text-xs font-medium leading-none tracking-[0.05em] text-[#5d5f5d]">
        <span className="text-[#747878]">+-</span>
        <span className="tracking-widest">{group.label.toUpperCase()}</span>
        <div className="flex-grow border-t border-dashed border-[#c4c7c7]" />
      </div>

      <div className="relative space-y-12 pl-8 md:pl-16">
        <div className="absolute bottom-0 left-[15px] top-4 w-px bg-[#c4c7c7] md:left-[31px]" />
        {group.events.map((event) => (
          <TimelineEvent event={event} key={event.id} />
        ))}
      </div>
    </section>
  );
}

