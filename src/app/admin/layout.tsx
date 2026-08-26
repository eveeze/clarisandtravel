import { auth } from "@/lib/auth";
import AdminNav from "./components/AdminNav";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-slate-100">
      <AdminNav email={session.user?.email ?? ""} />
      <main className="flex-1 ml-56 p-8">{children}</main>
    </div>
  );
}
