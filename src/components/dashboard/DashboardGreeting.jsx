"use client";

import { getFirstName } from "@/lib/getFirstName";
import { useAuthStore } from "@/store/authStore";

export default function DashboardGreeting() {
  const displayName = useAuthStore((state) => state.displayName);
  const firstName = getFirstName(displayName);

  return (
    <h1 className="font-serif text-4xl font-semibold leading-[1.2] tracking-[-0.01em] text-black md:text-5xl">
      {firstName ? `Welcome back, ${firstName}` : "Welcome back"}
    </h1>
  );
}
