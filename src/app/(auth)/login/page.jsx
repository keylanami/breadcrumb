"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

function GoogleIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="currentColor"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="currentColor"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="currentColor"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="currentColor"
      />
    </svg>
  );
}

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentUser = useAuthStore((state) => state.currentUser);
  const loading = useAuthStore((state) => state.loading);
  const error = useAuthStore((state) => state.error);
  const login = useAuthStore((state) => state.login);
  const initAuthListener = useAuthStore((state) => state.initAuthListener);

  const nextPath = searchParams.get("next") || "/dashboard";

  useEffect(() => {
    initAuthListener();
  }, [initAuthListener]);

  useEffect(() => {
    if (!loading && currentUser) {
      router.replace(nextPath);
    }
  }, [currentUser, loading, nextPath, router]);

  async function handleLogin() {
    try {
      await login();
      router.replace(nextPath);
    } catch {
      // The store owns the user-facing error message.
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#fbf9f9] text-[#1b1c1c] md:flex-row">
      <div className="hidden flex-col justify-center border-r border-[#c4c7c7] bg-[#f5f3f3] px-12 py-12 md:flex md:w-[60%] lg:w-3/5">
        <div className="mx-auto w-full max-w-[720px]">
          <div className="mb-12 font-mono text-xs font-medium uppercase tracking-widest text-black">
            REFLECTION_OS // Breadcrumb
          </div>
          <h1 className="mb-8 max-w-2xl font-serif text-5xl font-semibold leading-[1.1] tracking-[-0.02em] text-black">
            Remember what you did.
            <br />
            Remember why you did it.
            <br />
            Remember what happened after.
          </h1>
          <div className="mb-8 font-mono text-xs text-[#c4c7c7]">
            ------------------------
          </div>
          <p className="max-w-xl text-lg leading-[1.6] text-[#444748]">
            A personal operating system for your memories, decisions,
            activities, and reflections. High-fidelity storage for deep thought.
          </p>
        </div>
      </div>

      <div className="flex w-full flex-1 flex-col items-center justify-center bg-white px-5 py-12 md:w-[40%] lg:w-2/5">
        <div className="w-full max-w-sm">
          <div className="mb-8 text-center font-mono text-xs font-medium uppercase tracking-widest text-black md:hidden">
            REFLECTION_OS // Breadcrumb
          </div>

          <div className="border border-[#c4c7c7] bg-white p-8">
            <div className="space-y-6">
              <button
                className="flex w-full items-center justify-center gap-3 border border-black bg-[#fbf9f9] py-3 font-mono text-xs font-medium uppercase tracking-[0.05em] text-black transition-colors duration-200 hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
                type="button"
                onClick={handleLogin}
                disabled={loading}
              >
                <GoogleIcon />
                {loading ? "Connecting" : "Continue with Google"}
              </button>

              <p className="text-center font-mono text-[10px] uppercase tracking-tight text-[#444748] opacity-60">
                Secure Single Sign-On
              </p>

              {error ? (
                <p className="border border-[#ba1a1a] bg-[#ffdad6] p-3 text-center text-sm leading-5 text-[#93000a]">
                  {error}
                </p>
              ) : null}
            </div>
          </div>

          <div className="mt-8 text-center">
            <span className="font-mono text-xs font-medium text-[#444748]">
              Return to System Status
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#fbf9f9] px-5 text-[#1b1c1c]">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.05em] text-[#444748]">
            Loading authentication
          </p>
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
