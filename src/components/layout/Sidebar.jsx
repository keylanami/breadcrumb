import SidebarBrand from "@/components/layout/SidebarBrand";
import SidebarNav from "@/components/layout/SidebarNav";
import SignOutButton from "@/components/layout/SignOutButton";
import UserProfileSection from "@/components/layout/UserProfileSection";
import CaptureDialog from "@/features/capture/CaptureDialog";

export default function Sidebar() {
  return (
    <nav className="flex h-screen w-64 shrink-0 flex-col border-r border-[#c4c7c7] bg-[#fbf9f9] px-6 py-12">
      <SidebarBrand />
      <SidebarNav />
      <div className="flex-grow" />
      <div className="mt-8 flex flex-col gap-4">
        <UserProfileSection />
        <SignOutButton />
        <CaptureDialog />
      </div>
    </nav>
  );
}
