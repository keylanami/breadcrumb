export default function InsightSection({ children, icon, title }) {
  return (
    <section className="flex flex-col gap-8">
      <div className="flex items-center gap-4 border-l-2 border-black pl-4">
        <span className="font-mono text-xs font-medium text-[#5d5f5d]" aria-hidden="true">
          {icon}
        </span>
        <h2 className="font-serif text-2xl font-medium leading-[1.3] text-black">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

