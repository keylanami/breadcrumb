"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const pillars = [
  { name: "Activities", detail: "what happened", startX: "-28%", startY: "10%" },
  { name: "Decisions", detail: "why it mattered", startX: "22%", startY: "-12%" },
  { name: "Memories", detail: "what stayed", startX: "-12%", startY: "28%" },
  { name: "Routines", detail: "what repeated", startX: "28%", startY: "18%" },
];

export default function PillarComposition() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <section ref={sectionRef} className="relative min-h-[190vh] border-b border-[#c4c7c7]">
      <div className="sticky top-0 flex min-h-screen items-center px-5 py-24 md:px-12">
        <div className="mx-auto w-full max-w-6xl">
          <p className="mb-5 font-mono text-xs font-medium uppercase tracking-[0.2em] text-[#747878]">
            05 {"//"} what it becomes
          </p>
          <h2 className="mb-14 max-w-4xl font-serif text-[clamp(2.8rem,7vw,6.5rem)] font-semibold leading-[0.96]">
            Four ordinary inputs. One remembered life.
          </h2>

          <div className="relative min-h-[520px] border-y border-[#1b1c1c]">
            {pillars.map((pillar, index) => (
              <PillarItem
                index={index}
                key={pillar.name}
                pillar={pillar}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PillarItem({ index, pillar, scrollYProgress }) {
  const x = useTransform(scrollYProgress, [0, 0.72], [pillar.startX, "0%"]);
  const y = useTransform(scrollYProgress, [0, 0.72], [
    pillar.startY,
    `${index * 112}px`,
  ]);
  const width = useTransform(scrollYProgress, [0, 0.72], ["44%", "100%"]);

  return (
    <motion.div
      className="absolute left-0 top-8 flex min-h-20 items-center justify-between border-b border-[#c4c7c7] py-5"
      style={{ x, y, width }}
    >
      <span className="font-serif text-[clamp(2rem,5vw,4.4rem)] font-medium leading-none">
        {pillar.name}
      </span>
      <span className="font-mono text-xs uppercase tracking-[0.16em] text-[#747878]">
        {pillar.detail}
      </span>
    </motion.div>
  );
}
