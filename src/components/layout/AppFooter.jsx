export default function AppFooter() {
  return (
    <footer className="mt-12 flex w-full flex-col items-center justify-between border-t border-dashed border-[#c4c7c7] bg-white py-8 md:flex-row">
      <div className="mb-4 font-mono text-xs font-medium leading-none tracking-[0.05em] text-black md:mb-0">
        (C) 2024 Notebook System
      </div>
      <nav className="flex gap-6">
        {["Archive", "Systems", "Index", "Privacy"].map((item) => (
          <a
            className="font-mono text-xs font-medium leading-none tracking-[0.05em] text-[#5d5f5d] transition-colors hover:text-black"
            href="#"
            key={item}
          >
            {item}
          </a>
        ))}
      </nav>
    </footer>
  );
}
