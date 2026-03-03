import { Outlet } from "react-router-dom";
import { useState } from "react";
import LibraryStaffHeader from "./LibraryStaffHeader";
import { initialPendingStudents } from "../../../Data/students";

export default function LibraryStaffLayout() {
  const [staffPending, setStaffPending] = useState(initialPendingStudents);
  const [staffSent, setStaffSent] = useState([]); // Move to Librarian (tracking)
  const [staffRejected, setStaffRejected] = useState([]);

  const getKey = (s) => s?.id ?? s?.roll;

  // Pending -> Move to Librarian (tracking status added)
  const moveToLibrarian = (student) => {
    const key = getKey(student);

    const record = {
      ...student,
      tracking: {
        status: "Pending by Librarian", // default when forwarded
        updatedAt: new Date().toISOString(),
        librarianReason: "", // if later rejected by librarian
      },
    };

    setStaffPending((prev) => prev.filter((x) => getKey(x) !== key));
    setStaffSent((prev) => [record, ...prev.filter((x) => getKey(x) !== key)]);
  };

  // Pending -> Rejected (store reason string)
  const pendingMoveToRejected = (student, finalReason) => {
    const key = getKey(student);

    const record = {
      ...student,
      rejected: {
        reason: finalReason,
        at: new Date().toISOString(),
      },
    };

    setStaffPending((prev) => prev.filter((x) => getKey(x) !== key));
    setStaffRejected((prev) => [record, ...prev.filter((x) => getKey(x) !== key)]);
  };

  // (For future) librarian will update tracking status in staffSent
  // Example use later:
  // updateSentTracking(studentKey, { status: "Approved by Librarian", librarianReason: "" })
  const updateSentTracking = (studentKey, updates) => {
    setStaffSent((prev) =>
      prev.map((x) =>
        getKey(x) === studentKey
          ? {
              ...x,
              tracking: {
                ...(x.tracking || {}),
                ...updates,
                updatedAt: new Date().toISOString(),
              },
            }
          : x
      )
    );
  };

  return (
    <div className="min-h-screen bg-neutral-900">
      <LibraryStaffHeader pendingCount={staffPending.length} />

      <main className="mx-auto max-w-7xl px-6 py-8">
        <Outlet
          context={{
            staffPending,
            staffSent,
            staffRejected,

            moveToLibrarian,
            pendingMoveToRejected,

            // expose this for librarian integration later
            updateSentTracking,

            // setters if you still need them
            setStaffPending,
            setStaffSent,
            setStaffRejected,
          }}
        />
      </main>
    </div>
  );
}