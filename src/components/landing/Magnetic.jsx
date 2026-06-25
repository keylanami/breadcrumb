"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Magnetic({
  as = "div",
  children,
  className = "",
  strength = 0.22,
  ...props
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.25 });
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.25 });
  const Component = motion[as] || motion.div;

  function handlePointerMove(event) {
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * strength);
    y.set((event.clientY - rect.top - rect.height / 2) * strength);
  }

  function resetPosition() {
    x.set(0);
    y.set(0);
  }

  return (
    <Component
      className={className}
      onPointerLeave={resetPosition}
      onPointerMove={handlePointerMove}
      style={{ x: springX, y: springY }}
      {...props}
    >
      {children}
    </Component>
  );
}
