"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarNavItem({ href, icon, label }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  const className = isActive
    ? "flex items-center gap-3 border-l-2 border-black py-2 pl-4 font-bold text-black transition-colors hover:bg-[#efeded]"
    : "flex items-center gap-3 py-2 pl-4 text-[#444748] opacity-70 transition-colors hover:bg-[#efeded] hover:opacity-100";

  return (
    <li>
      <Link className={className} href={href}>
        <span className="text-[18px]" aria-hidden="true">
          {icon}
        </span>
        <span>{label}</span>
      </Link>
    </li>
  );
}
