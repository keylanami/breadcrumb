import DashboardGreeting from "@/components/dashboard/DashboardGreeting";
import AsciiDivider from "@/components/layout/AsciiDivider";

export default function DashboardPage() {
  return (
    <section className="mb-12">
      <p className="mb-6 font-mono text-xs font-medium uppercase tracking-[0.05em] text-[#444748]">
        Dashboard
      </p>
      <DashboardGreeting />
      <p className="mt-2 font-sans text-base leading-6 text-[#5d5f5d]">
        A snapshot of your life today.
      </p>
      <AsciiDivider />
    </section>
  );
}
