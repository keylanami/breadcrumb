"use client";

import { useAuthStore } from "@/store/authStore";

function initialsFromName(displayName, email) {
  const source = displayName || email || "?";
  return source.trim().charAt(0).toUpperCase() || "?";
}

export default function UserProfileSection() {
  const displayName = useAuthStore((state) => state.displayName);
  const email = useAuthStore((state) => state.email);
  const photoURL = useAuthStore((state) => state.photoURL);

  return (
    <section className="border border-[#c4c7c7] bg-[#fbf9f9] p-3">
      <div className="flex items-center gap-3">
        <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#c4c7c7] bg-white font-mono text-xs font-medium text-black">
          {photoURL ? (
            <span
              className="h-full w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${photoURL})` }}
              aria-hidden="true"
            />
          ) : (
            <span>{initialsFromName(displayName, email)}</span>
          )}
        </div>
        <div className="min-w-0">
          <p className="truncate font-sans text-sm font-medium leading-5 text-black">
            {displayName || "Breadcrumb User"}
          </p>
          <p className="truncate font-mono text-[10px] font-medium uppercase tracking-[0.05em] text-[#444748]">
            {email || "No email"}
          </p>
        </div>
      </div>
    </section>
  );
}
