import AuthGuard from "@/components/AuthGuard";
import ProtectedShell from "@/components/layout/ProtectedShell";

export default function ProtectedLayout({ children }) {
  return (
    <AuthGuard>
      <ProtectedShell>{children}</ProtectedShell>
    </AuthGuard>
  );
}
