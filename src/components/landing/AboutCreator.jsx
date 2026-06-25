"use client";

import Magnetic from "@/components/landing/Magnetic";

export default function AboutCreator() {
  return (
    <section className="border-b border-[#c4c7c7] px-5 py-12 md:px-12 md:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 h-px w-full bg-[#1b1c1c]" />
        <p className="mb-8 font-mono text-xs font-medium uppercase tracking-[0.2em] text-[#747878]">
          final page {"//"} maker note
        </p>
        <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="font-serif text-[clamp(2.8rem,7vw,6rem)] font-semibold leading-[0.96]">
              Keyla Na
            </h2>
            <p className="mt-5 font-mono text-xs uppercase tracking-[0.16em] text-[#444748]">
              software engineer
              <br />
              ux researcher
              <br />
              project manager
            </p>
          </div>
          <div>
            <p className="font-serif text-3xl font-medium leading-[1.2] text-black">
              Breadcrumb exists because a life is too textured to be reduced to
              tasks completed or notes filed away.
            </p>
            <p className="mt-8 font-sans text-base leading-7 text-[#444748]">
              I wanted a private system for the softer records: the decision
              before the result, the room around a memory, the routine that
              quietly held a season together.
            </p>
            <nav className="mt-10 flex flex-wrap gap-3 font-mono text-xs uppercase tracking-[0.14em]">
              {[
                ["GitHub", "https://github.com/"],
                ["LinkedIn", "https://www.linkedin.com/"],
                ["email", "mailto:hello@example.com"],
              ].map(([label, href]) => (
                <Magnetic as="a" className="border border-[#c4c7c7] px-4 py-3 text-black hover:border-black" href={href} key={label} strength={0.1}>
                  {label}
                </Magnetic>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
}
