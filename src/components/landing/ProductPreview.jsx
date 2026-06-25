"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Magnetic from "@/components/landing/Magnetic";

const timelineEvents = ["09:00 Activity", "14:20 Memory", "18:00 Decision"];
const searchTerms = ["taiwan", "coffee", "first week"];
const insightRows = ["work 18", "travel 7", "routine 4"];

export default function ProductPreview() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const dashboardX = useTransform(scrollYProgress, [0, 0.55, 1], ["-12%", "0%", "18%"]);
  const timelineX = useTransform(scrollYProgress, [0, 0.55, 1], ["18%", "0%", "-16%"]);
  const searchY = useTransform(scrollYProgress, [0, 0.55, 1], ["22%", "0%", "-12%"]);
  const insightsY = useTransform(scrollYProgress, [0, 0.55, 1], ["-14%", "0%", "14%"]);
  const spread = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 0.96]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[120vh] border-b border-[#c4c7c7]"
      id="system-preview"
    >
      <div className="sticky top-0 flex min-h-screen items-center px-5 py-6 md:px-12">
        <div className="mx-auto grid w-full max-w-6xl gap-10 md:grid-cols-[0.78fr_1.22fr] md:items-center">
          <div>
            <p className="mb-5 font-mono text-xs font-medium uppercase tracking-[0.2em] text-[#747878]">
              preview {"//"} living interface
            </p>
            <Magnetic as="div" strength={0.08}>
              <h2 className="font-serif text-[clamp(2.6rem,6vw,5.8rem)] font-semibold leading-[0.98]">
                The archive is not static. It rearranges around meaning.
              </h2>
            </Magnetic>
            <p className="mt-6 max-w-md font-sans text-base leading-7 text-[#444748]">
              Dashboard, timeline, search, and insights are not separate
              products. They are different ways to look at the same remembered
              life.
            </p>
          </div>

          <motion.div className="relative min-h-[620px]" style={{ scale: spread }}>
            <PreviewPanel
              className="left-0 top-6 w-[76%] md:w-[58%]"
              style={{ x: dashboardX }}
              title="Today"
              label="dashboard"
            >
              <div className="grid grid-cols-2 gap-3">
                {["Activities 12", "Memories 03", "Decisions 04", "Routines 02"].map((item) => (
                  <div className="border border-[#c4c7c7] bg-white p-3 font-mono text-xs uppercase tracking-[0.12em]" key={item}>
                    {item}
                  </div>
                ))}
              </div>
            </PreviewPanel>

            <PreviewPanel
              className="right-0 top-24 w-[78%] md:w-[62%]"
              style={{ x: timelineX }}
              title="June 25"
              label="timeline"
            >
              <div className="space-y-3 border-l border-[#c4c7c7] pl-4">
                {timelineEvents.map((event) => (
                  <div className="font-mono text-xs uppercase tracking-[0.12em]" key={event}>
                    {event}
                  </div>
                ))}
              </div>
            </PreviewPanel>

            <PreviewPanel
              className="left-[8%] bottom-24 w-[74%] md:w-[56%]"
              style={{ y: searchY }}
              title="Find anything"
              label="search"
            >
              <div className="border-b border-black py-2 font-sans text-base">
                conversation changed mind
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {searchTerms.map((term) => (
                  <span className="border border-[#c4c7c7] px-2 py-1 font-mono text-[10px]" key={term}>
                    {term}
                  </span>
                ))}
              </div>
            </PreviewPanel>

            <PreviewPanel
              className="right-[4%] bottom-6 w-[72%] md:w-[54%]"
              style={{ y: insightsY }}
              title="Patterns"
              label="insights"
            >
              <div className="space-y-3">
                {insightRows.map((row) => (
                  <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.12em]" key={row}>
                    <span>{row}</span>
                    <span className="h-px flex-1 bg-[#c4c7c7]" />
                  </div>
                ))}
              </div>
            </PreviewPanel>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function PreviewPanel({ children, className, label, style, title }) {
  return (
    <motion.article
      className={`absolute border border-[#1b1c1c] bg-[#fbf9f9] p-5 ${className}`}
      style={style}
    >
      <Magnetic as="div" strength={0.06}>
        <div className="mb-8 flex items-center justify-between border-b border-[#c4c7c7] pb-3">
          <h3 className="font-serif text-2xl font-medium leading-tight">{title}</h3>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#747878]">
            {label}
          </span>
        </div>
        {children}
      </Magnetic>
    </motion.article>
  );
}
