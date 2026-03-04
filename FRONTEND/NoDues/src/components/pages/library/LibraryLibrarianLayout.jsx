import { Outlet, useOutletContext } from "react-router-dom";
import Header from "../../Header/Header";

export default function LibraryLibrarianLayout() {
  const ctx = useOutletContext();
  const { librarianPending } = ctx;

  return (
    <div className="min-h-screen bg-neutral-900">
      <Header
        role="library"
        subTitle="Librarian"
        pendingCount={librarianPending.length}
        basePath="/library/librarian"
        paths={{
          pending: "/library/librarian/pending",
          approved: "/library/librarian/approved",
          rejected: "/library/librarian/rejected",
        }}
      />

      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* ✅ forward context */}
        <Outlet context={ctx} />
      </main>
    </div>
  );
}