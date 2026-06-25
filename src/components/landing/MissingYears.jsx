"use client";

import { motion } from "framer-motion";

const fadedYears = ["2019", "2020", "2021", "2022", "2023", "2024"];
const entries = [
  "a note from the week everything changed",
  "the room you left behind",
  "why you chose the harder answer",
  "the routine that kept you steady",
];
const disappearing = ["names", "rooms", "weather", "reasons", "routes", "voices"];

export default function MissingYears() {
  return (
    <section className="border-b border-[#c4c7c7] px-5 py-14 md:px-12 md:py-36">
      <div className="mx-auto max-w-6xl">
        <motion.p
          className="mb-5 font-mono text-xs font-medium uppercase tracking-[0.2em] text-[#747878]"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          03 {"//"} the missing years
        </motion.p>
        <div className="grid gap-14 md:grid-cols-[1fr_1.1fr] md:items-start">
          <motion.h2
            className="font-serif text-[clamp(3rem,7vw,7rem)] font-semibold leading-[0.94]"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.8 }}
          >
            The years do not vanish at once.
          </motion.h2>

          <div>
            <div className="mb-8 grid grid-cols-2 gap-2 border-y border-[#c4c7c7] py-4 font-mono text-[10px] uppercase tracking-[0.18em] text-[#747878] md:grid-cols-3">
              {disappearing.map((word, index) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 1, filter: "blur(0px)" }}
                  whileInView={{
                    opacity: index % 2 === 0 ? 0.22 : 0.68,
                    filter: index % 2 === 0 ? "blur(1.2px)" : "blur(0px)",
                  }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.8, delay: index * 0.06 }}
                >
                  {word}
                </motion.span>
              ))}
            </div>
            <div className="mb-10 grid grid-cols-3 gap-3 font-serif text-[clamp(2.5rem,6vw,6rem)] leading-none text-[#c4c7c7] md:grid-cols-2">
              {fadedYears.map((year, index) => (
                <motion.span
                  key={year}
                  initial={{ opacity: 0.18 }}
                  whileInView={{ opacity: index > 2 ? 0.62 : 0.28 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                >
                  {year}
                </motion.span>
              ))}
            </div>
            <div className="border-l border-[#1b1c1c] pl-6">
              <p className="mb-8 font-serif text-2xl font-medium italic leading-[1.25] text-[#1b1c1c]">
                Breadcrumb preserves the context around the event, not just the
                event.
              </p>
              {entries.map((entry, index) => (
                <motion.p
                  className="mb-5 font-sans text-lg leading-8 text-[#1b1c1c]"
                  key={entry}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className="mr-3 font-mono text-xs uppercase tracking-[0.15em] text-[#747878]">
                    recovered
                  </span>
                  {entry}
                </motion.p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
