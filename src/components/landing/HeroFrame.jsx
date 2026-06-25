"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import Magnetic from "@/components/landing/Magnetic";

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
      className="relative min-h-[132vh] border-b border-[#c4c7c7]"
      aria-labelledby="landing-opening-title"
    >
      <div className="sticky top-0 flex min-h-screen flex-col justify-between px-5 py-6 md:px-12 md:py-9">
        <motion.p
          className="font-mono text-xs font-medium uppercase leading-none tracking-[0.22em] text-[#444748]"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          BREADCRUMB {"//"} REFLECTION_OS
        </motion.p>

        <div className="mx-auto grid w-full max-w-6xl gap-8 py-8 md:grid-cols-[1fr_360px] md:items-end md:py-10">
          <motion.div style={{ scale }}>
            <motion.h1
              id="landing-opening-title"
              className="font-serif text-[clamp(3.4rem,10vw,9.5rem)] font-semibold leading-[0.92] tracking-[-0.01em]"
              initial={{ opacity: 0.2, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <motion.span className="block" style={{ x: leftX }}>
                You remember
              </motion.span>
              <span className="block overflow-hidden">
                <motion.span className="block italic" style={{ y: wordY }}>
                  moments.
                </motion.span>
              </span>
              <motion.span className="block text-right md:text-left" style={{ x: rightX }}>
                Not timelines.
              </motion.span>
            </motion.h1>
          </motion.div>

          <motion.div
            className="border-l border-[#1b1c1c] pl-5"
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <p className="font-sans text-lg leading-8 text-[#1b1c1c]">
              A reflection operating system for remembering your life:
              activities, decisions, memories, and routines connected into one
              living archive.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row md:flex-col">
              <Magnetic as="div" strength={0.12}>
                <Link
                  className="inline-flex w-full justify-center border border-black bg-black px-6 py-4 font-mono text-xs font-medium uppercase tracking-[0.16em] text-white transition-opacity hover:opacity-90"
                  href="/login"
                >
                  Get Started
                </Link>
              </Magnetic>
              <Magnetic as="div" strength={0.12}>
                <a
                  className="inline-flex w-full justify-center border border-black bg-transparent px-6 py-4 font-mono text-xs font-medium uppercase tracking-[0.16em] text-black transition-colors hover:bg-white"
                  href="#system-preview"
                >
                  Explore the System
                </a>
              </Magnetic>
            </div>
          </motion.div>
        </div>

        <div className="grid gap-8 md:grid-cols-[1fr_360px] md:items-end">
          <motion.div
            className="h-px bg-[#1b1c1c]"
            style={{ width: ruleWidth }}
          />
          <motion.p
            className="max-w-xl font-mono text-xs uppercase leading-5 tracking-[0.14em] text-[#747878] md:justify-self-end md:text-right"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            scroll to watch the archive rearrange itself
          </motion.p>
        </div>
      </div>
    </section>
  );
}
