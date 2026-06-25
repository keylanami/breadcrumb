"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className="flex min-h-screen items-center px-5 py-24 md:px-12">
      <div className="mx-auto grid w-full max-w-6xl gap-12">
        <motion.p
          className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-[#747878]"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          breadcrumb {"//"} begin remembering
        </motion.p>
        <motion.h2
          className="max-w-5xl font-serif text-[clamp(3.4rem,9vw,9rem)] font-semibold leading-[0.94] tracking-[-0.01em]"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8 }}
        >
          The life you lived deserves to be remembered.
        </motion.h2>
        <div className="flex flex-col gap-6 border-t border-[#1b1c1c] pt-8 md:flex-row md:items-center md:justify-between">
          <p className="max-w-md font-sans text-base leading-7 text-[#444748]">
            Continue into the private archive. Google sign-in is the only key.
          </p>
          <Link
            className="inline-flex w-full items-center justify-center border border-black bg-black px-8 py-4 font-mono text-xs font-medium uppercase tracking-[0.16em] text-white transition-opacity hover:opacity-90 md:w-auto"
            href="/login"
          >
            Continue with Google
          </Link>
        </div>
      </div>
    </section>
  );
}
