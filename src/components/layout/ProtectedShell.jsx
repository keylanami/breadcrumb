import MainCanvas from "@/components/layout/MainCanvas";
import Sidebar from "@/components/layout/Sidebar";

export default function ProtectedShell({ children }) {
  return (
    <div className="flex h-screen w-full flex-row bg-[#fbf9f9] text-[#1b1c1c]">
      <Sidebar />
      <MainCanvas>{children}</MainCanvas>
    </div>
  );
}
