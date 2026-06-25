"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Magnetic from "@/components/landing/Magnetic";

const memories = [
  "Your first day at work.",
  "The conversation that changed your mind.",
  "The restaurant you still think about.",
  "The decision that turned out to be right.",
];

export default function MemoryMorph() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const firstX = useTransform(scrollYProgress, [0, 0.55, 1], ["-18%", "0%", "12%"]);
  const secondX = useTransform(scrollYProgress, [0, 0.55, 1], ["18%", "0%", "-10%"]);
  const thirdY = useTransform(scrollYProgress, [0, 0.55, 1], ["24%", "0%", "-6%"]);
  const fourthY = useTransform(scrollYProgress, [0, 0.55, 1], ["-8%", "0%", "10%"]);
  const mergeScale = useTransform(scrollYProgress, [0, 0.55, 1], [0.92, 1, 0.72]);
  const reorderRotate = useTransform(scrollYProgress, [0.52, 1], [0, -90]);
  const reveal = useTransform(scrollYProgress, [0.45, 0.72], [0, 1]);
  const splitOpacity = useTransform(scrollYProgress, [0.68, 0.9], [0, 1]);

  const transforms = [
    { x: firstX, y: "0%", rotate: -4 },
    { x: secondX, y: "18%", rotate: 3 },
    { x: "8%", y: thirdY, rotate: -1 },
    { x: "-10%", y: fourthY, rotate: 2 },
  ];

  return (
    <section ref={sectionRef} className="relative min-h-[80vh] border-b border-[#c4c7c7]">
      <div className="sticky top-0 flex min-h-screen items-center px-5 py-3 md:px-12">
        <div className="mx-auto grid w-full max-w-6xl gap-8 md:grid-cols-[0.72fr_1.28fr] md:items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7 }}
          >
            <p className="mb-5 font-mono text-xs font-medium uppercase tracking-[0.2em] text-[#747878]">
              01 {"//"} memory morph
            </p>
            <Magnetic as="div" strength={0.08}>
              <h2 className="font-serif text-[clamp(2.6rem,6vw,5.5rem)] font-semibold leading-[1]">
                A memory is never one shape.
              </h2>
            </Magnetic>
            <p className="mt-6 max-w-sm font-sans text-base leading-7 text-[#444748]">
              It splits into place, choice, sensation, and consequence. Then it
              comes back together differently.
            </p>
          </motion.div>

          <div className="relative min-h-[560px]">
            <motion.div
              className="absolute inset-x-8 top-1/2 hidden h-px bg-[#1b1c1c] md:block"
              style={{ opacity: reveal }}
            />
            {memories.map((memory, index) => (
              <Magnetic
                as="article"
                key={memory}
                className="absolute left-1/2 top-1/2 flex min-h-[150px] w-[min(76vw,330px)] -translate-x-1/2 -translate-y-1/2 flex-col justify-between border border-[#c4c7c7] bg-white p-5 md:w-[340px]"
                strength={0.06}
              >
                <motion.div
                  style={{
                    x: transforms[index].x,
                    y: transforms[index].y,
                    rotate: index === 1 ? reorderRotate : transforms[index].rotate,
                    scale: mergeScale,
                  }}
                >
                  <p className="font-serif text-2xl font-medium leading-[1.2] text-black">
                    {memory}
                  </p>
                  <div className="mt-8 flex items-center justify-between gap-4">
                    <span className="font-mono text-xs font-medium uppercase tracking-[0.15em] text-[#747878]">
                      fragment 0{index + 1}
                    </span>
                    <motion.span
                      className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#444748]"
                      style={{ opacity: splitOpacity }}
                    >
                      {index % 2 === 0 ? "place" : "reason"}
                    </motion.span>
                  </div>
                </motion.div>
              </Magnetic>
            ))}
            <motion.div
              className="absolute left-[8%] top-[10%] hidden border-l border-[#1b1c1c] pl-3 font-mono text-[10px] uppercase tracking-[0.16em] text-[#444748] md:block"
              style={{ opacity: splitOpacity }}
            >
              hidden relationship:
              <br />
              decision changed place
            </motion.div>
            <motion.div
              className="absolute bottom-[15%] right-[6%] hidden border-r border-[#1b1c1c] pr-3 text-right font-mono text-[10px] uppercase tracking-[0.16em] text-[#444748] md:block"
              style={{ opacity: splitOpacity }}
            >
              hidden relationship:
              <br />
              place preserved feeling
            </motion.div>
            <motion.div
              className="absolute bottom-0 left-1/2 w-[min(90vw,520px)] -translate-x-1/2 border-y border-[#1b1c1c] py-5 text-center font-mono text-xs uppercase tracking-[0.18em]"
              style={{ opacity: reveal }}
            >
              the system does not flatten them. it relates them.
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
