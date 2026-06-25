"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function HeroFrame() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const leftX = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const rightX = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const wordY = useTransform(scrollYProgress, [0, 1], ["0%", "120%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.88]);
  const ruleWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[160vh] border-b border-[#c4c7c7]"
      aria-labelledby="landing-opening-title"
    >
      <div className="sticky top-0 flex min-h-screen flex-col justify-between px-5 py-8 md:px-12 md:py-12">
        <motion.p
          className="font-mono text-xs font-medium uppercase leading-none tracking-[0.22em] text-[#444748]"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          BREADCRUMB {"//"} REFLECTION_OS
        </motion.p>

        <motion.div
          className="mx-auto grid w-full max-w-6xl gap-3 py-20"
          style={{ scale }}
        >
          <motion.h1
            id="landing-opening-title"
            className="font-serif text-[clamp(3.5rem,11vw,10rem)] font-semibold leading-[0.92] tracking-[-0.01em]"
          >
            <motion.span className="block" style={{ x: leftX }}>
              You remember
            </motion.span>
            <span className="block overflow-hidden">
              <motion.span className="block italic" style={{ y: wordY }}>
                moments.
              </motion.span>
            </span>
            <motion.span className="block text-right" style={{ x: rightX }}>
              Not timelines.
            </motion.span>
          </motion.h1>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-[1fr_360px] md:items-end">
          <motion.div
            className="h-px bg-[#1b1c1c]"
            style={{ width: ruleWidth }}
          />
          <motion.p
            className="max-w-sm font-sans text-base leading-7 text-[#444748] md:justify-self-end"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Breadcrumb is a quiet operating system for the pieces of your life
            that do not fit inside a calendar.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
