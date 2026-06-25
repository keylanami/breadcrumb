"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const decisions = [
  {
    label: "decision",
    title: "Move across the city.",
    detail: "Confidence: 62%",
    connector: "choice",
  },
  {
    label: "confidence",
    title: "The commute disappeared.",
    detail: "Outcome reviewed after 90 days.",
    connector: "measurement",
  },
  {
    label: "outcome",
    title: "Say no to the obvious path.",
    detail: "Confidence: 41%",
    connector: "consequence",
  },
  {
    label: "reflection",
    title: "The smaller door opened wider.",
    detail: "Reflection changed the meaning.",
    connector: "meaning",
  },
];

export default function DecisionJourney() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-28%"]);
  const lineScale = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);
  const reasonOpacity = useTransform(scrollYProgress, [0.18, 0.38, 0.78], [0, 1, 1]);

  return (
    <section ref={sectionRef} className="relative min-h-[160vh] border-b border-[#c4c7c7]">
      <div className="sticky top-0 flex min-h-screen flex-col justify-center overflow-hidden px-5 py-20 md:px-12">
        <div className="mx-auto mb-16 w-full max-w-6xl">
          <p className="mb-5 font-mono text-xs font-medium uppercase tracking-[0.2em] text-[#747878]">
            02 {"//"} decision record
          </p>
          <h2 className="max-w-3xl font-serif text-[clamp(2.6rem,6vw,5.4rem)] font-semibold leading-[1]">
            Most apps store tasks. Breadcrumb stores why.
          </h2>
        </div>

        <div className="relative">
          <motion.div
            className="absolute left-0 top-1/2 h-px w-full origin-left bg-[#1b1c1c]"
            style={{ scaleX: lineScale }}
          />
          <motion.div
            className="absolute left-6 top-1/2 hidden -translate-y-1/2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#444748] md:block"
            style={{ opacity: reasonOpacity }}
          >
            decision - confidence - outcome - reflection
          </motion.div>
          <motion.div className="flex w-[240vw] gap-6 md:w-[180vw]" style={{ x }}>
            {decisions.map((decision, index) => (
              <article
                className="relative min-h-[300px] w-[72vw] border border-[#c4c7c7] bg-[#fbf9f9] p-8 md:w-[34vw]"
                key={`${decision.label}-${decision.title}`}
              >
                {index < decisions.length - 1 ? (
                  <div className="absolute -right-6 top-1/2 hidden h-px w-6 bg-[#1b1c1c] md:block" />
                ) : null}
                <span className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-[#747878]">
                  {decision.label} {"//"} 0{index + 1}
                </span>
                <div className="mt-5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.16em] text-[#444748]">
                  <span>{decision.connector}</span>
                  <span className="h-px flex-1 bg-[#c4c7c7]" />
                </div>
                <h3 className="mt-16 font-serif text-[clamp(2rem,4vw,3.8rem)] font-medium leading-[1.02]">
                  {decision.title}
                </h3>
                <p className="mt-8 max-w-xs font-sans text-base leading-7 text-[#444748]">
                  {decision.detail}
                </p>
              </article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
