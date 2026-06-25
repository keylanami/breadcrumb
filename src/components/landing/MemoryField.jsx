"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const fragments = [
  {
    label: "coffee after rain",
    detail: "A place becomes memorable when it holds a decision.",
    className: "left-[6%] top-[18%]",
  },
  {
    label: "called mother",
    detail: "Small routines become proof of care.",
    className: "right-[8%] top-[10%]",
  },
  {
    label: "almost quit",
    detail: "Doubt is data when it can be revisited.",
    className: "left-[18%] bottom-[20%]",
  },
  {
    label: "new apartment key",
    detail: "An object can anchor a whole season.",
    className: "right-[18%] bottom-[16%]",
  },
];

export default function MemoryField() {
  const [activeFragment, setActiveFragment] = useState(fragments[0]);

  return (
    <section className="border-b border-[#c4c7c7] px-5 py-10 md:px-12 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-3xl">
          <p className="mb-5 font-mono text-xs font-medium uppercase tracking-[0.2em] text-[#747878]">
            04 {"//"} memory field
          </p>
          <h2 className="font-serif text-[clamp(2.6rem,6vw,5.5rem)] font-semibold leading-[1]">
            Touch a fragment. Move it closer to meaning.
          </h2>
        </div>

        <div className="relative min-h-[620px] overflow-hidden border border-[#c4c7c7] bg-white">
          <div className="absolute left-1/2 top-1/2 h-px w-[84%] -translate-x-1/2 bg-[#e4e2e2]" />
          <div className="absolute left-1/2 top-[12%] h-[76%] w-px bg-[#e4e2e2]" />
          <div className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-black bg-[#fbf9f9] text-center font-mono text-xs uppercase tracking-[0.14em]">
            life
            <br />
            archive
          </div>

          {fragments.map((fragment) => (
            <motion.article
              drag
              dragConstraints={{ left: -80, right: 80, top: -80, bottom: 80 }}
              onFocus={() => setActiveFragment(fragment)}
              onHoverStart={() => setActiveFragment(fragment)}
              tabIndex={0}
              whileHover={{ scale: 1.04, borderColor: "#1b1c1c" }}
              whileTap={{ scale: 0.98 }}
              className={`group absolute w-[230px] cursor-grab border border-[#c4c7c7] bg-[#fbf9f9] p-4 active:cursor-grabbing ${fragment.className}`}
              key={fragment.label}
            >
              <p className="font-serif text-2xl font-medium leading-[1.15]">
                {fragment.label}
              </p>
              <p className="mt-4 max-h-0 overflow-hidden font-sans text-sm leading-6 text-[#444748] transition-all duration-300 group-hover:max-h-32">
                {fragment.detail}
              </p>
            </motion.article>
          ))}
          <motion.aside
            className="absolute bottom-6 left-1/2 w-[min(86%,420px)] -translate-x-1/2 border border-black bg-white p-5"
            key={activeFragment.label}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[#747878]">
              selected fragment
            </p>
            <p className="font-serif text-2xl font-medium leading-tight">
              {activeFragment.label}
            </p>
            <p className="mt-3 font-sans text-sm leading-6 text-[#444748]">
              {activeFragment.detail}
            </p>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
