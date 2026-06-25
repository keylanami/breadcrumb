import AppFooter from "@/components/layout/AppFooter";

export default function MainCanvas({ children, showFooter = true }) {
  return (
    <main className="h-screen flex-1 overflow-y-auto bg-white">
      <div className="mx-auto flex min-h-full w-full max-w-[720px] flex-col px-5 py-12 md:px-0">
        <div className="flex-grow">{children}</div>
        {showFooter ? <AppFooter /> : null}
      </div>
    </main>
  );
}
