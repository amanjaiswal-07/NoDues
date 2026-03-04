import { Outlet, useOutletContext } from "react-router-dom";
import Header from "../../Header/Header";

export default function LibraryStaffLayout() {
  // receive context from LibraryRootLayout
  const ctx = useOutletContext();
  const { staffPending } = ctx;

  return (
    <div className="min-h-screen bg-neutral-900">
      <Header
        role="library"
        subTitle="Staff"
        pendingCount={staffPending.length}
        basePath="/library/staff"
        paths={{
          pending: "/library/staff/pending",
          approved: "/library/staff/sent",
          rejected: "/library/staff/rejected",
        }}
        labels={{
          approved: "Move to Librarian",
        }}
      />

      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* ✅ IMPORTANT: forward context to children */}
        <Outlet context={ctx} />
      </main>
    </div>
  );
}