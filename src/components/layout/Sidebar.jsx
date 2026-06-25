import SidebarBrand from "@/components/layout/SidebarBrand";
import SidebarNav from "@/components/layout/SidebarNav";
import SignOutButton from "@/components/layout/SignOutButton";
import UserProfileSection from "@/components/layout/UserProfileSection";

export default function Sidebar() {
  return (
    <nav className="flex h-screen w-64 shrink-0 flex-col border-r border-[#c4c7c7] bg-[#fbf9f9] px-6 py-12">
      <SidebarBrand />
      <SidebarNav />
      <div className="flex-grow" />
      <div className="mt-8 flex flex-col gap-4">
        <UserProfileSection />
        <SignOutButton />
        <button
          className="flex w-full cursor-pointer items-center justify-center gap-2 border border-black bg-black px-4 py-3 font-mono text-xs font-medium leading-none tracking-[0.05em] text-white transition-opacity hover:opacity-90"
          type="button"
        >
          <span aria-hidden="true">+</span>
          Create Entry
        </button>
      </div>
    </nav>
  );
}
