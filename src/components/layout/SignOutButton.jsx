"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

export default function SignOutButton() {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);
  const loading = useAuthStore((state) => state.loading);
  const error = useAuthStore((state) => state.error);

  async function handleSignOut() {
    try {
      await logout();
      router.replace("/login");
    } catch {
      // The store owns the visible error state.
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        className="w-full border border-[#c4c7c7] bg-transparent px-4 py-3 font-mono text-xs font-medium uppercase leading-none tracking-[0.05em] text-[#444748] transition-colors hover:border-black hover:text-black disabled:cursor-not-allowed disabled:opacity-60"
        type="button"
        onClick={handleSignOut}
        disabled={loading}
      >
        {loading ? "Signing out" : "Sign Out"}
      </button>
      {error ? (
        <p className="font-mono text-[10px] font-medium uppercase leading-4 tracking-[0.05em] text-[#93000a]">
          {error}
        </p>
      ) : null}
    </div>
  );
}
