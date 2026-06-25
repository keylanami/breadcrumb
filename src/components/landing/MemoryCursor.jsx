"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function MemoryCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const rippleX = useSpring(cursorX, { stiffness: 120, damping: 24, mass: 0.3 });
  const rippleY = useSpring(cursorY, { stiffness: 120, damping: 24, mass: 0.3 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      return undefined;
    }

    function onPointerMove(event) {
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
      setIsVisible(true);
    }

    function onPointerDown() {
      setIsPressed(true);
    }

    function onPointerUp() {
      setIsPressed(false);
    }

    function onPointerLeave() {
      setIsVisible(false);
    }

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    document.documentElement.addEventListener("mouseleave", onPointerLeave);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      document.documentElement.removeEventListener("mouseleave", onPointerLeave);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 border border-black bg-black md:block"
        style={{ x: cursorX, y: cursorY }}
        animate={{ opacity: isVisible ? 1 : 0, scale: isPressed ? 0.72 : 1 }}
        transition={{ duration: 0.16 }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[99] hidden h-16 w-16 -translate-x-1/2 -translate-y-1/2 border border-[#747878] mix-blend-multiply md:block"
        style={{ x: rippleX, y: rippleY }}
        animate={{
          opacity: isVisible ? 0.26 : 0,
          scale: isPressed ? 0.72 : 1,
        }}
        transition={{ duration: 0.18 }}
      />
    </>
  );
}

