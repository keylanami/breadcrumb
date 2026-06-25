import SidebarNavItem from "@/components/layout/SidebarNavItem";

const NAV_ITEMS = [
  {
    href: "/dashboard",
    icon: "[]",
    label: "Dashboard",
  },
  {
    href: "/timeline",
    icon: "--",
    label: "Timeline",
  },
  {
    href: "/search",
    icon: "?",
    label: "Search",
  },
  {
    href: "/insights",
    icon: "<>",
    label: "Insights",
  },
];

export default function SidebarNav() {
  return (
    <ul className="flex flex-col gap-2 font-mono text-xs font-medium leading-none tracking-[0.05em]">
      {NAV_ITEMS.map((item) => (
        <SidebarNavItem key={item.href} {...item} />
      ))}
    </ul>
  );
}
