import { Outlet } from "react-router-dom";
import { useState } from "react";
import LibraryStaffHeader from "./LibraryStaffHeader";
import { initialPendingStudents } from "../../../Data/students";

export default function LibraryStaffLayout() {
  const [staffPending, setStaffPending] = useState(initialPendingStudents);
  const [staffSent, setStaffSent] = useState([]); // Sent to Librarian list
  const [staffPartial, setStaffPartial] = useState([]); // Partially Accepted
  const [staffRejected, setStaffRejected] = useState([]);
  const getKey = (s) => s?.id ?? s?.roll;

  const moveToLibrarian = (student) => {
    const key = getKey(student);

    setStaffPending((prev) => prev.filter((x) => getKey(x) !== key));
    setStaffSent((prev) => [student, ...prev.filter((x) => getKey(x) !== key)]);
  };

  const moveToPartial = (student, payload) => {
    const key = getKey(student);

    const record = {
      ...student,
      partial: {
        reason: payload.reason,
        details: payload.details,
        at: new Date().toISOString(),
      },
    };

    setStaffPending((prev) => prev.filter((x) => getKey(x) !== key));
    setStaffPartial((prev) => [record, ...prev.filter((x) => getKey(x) !== key)]);
  };

  const partialSendToLibrarian = (student) => {
    const key = getKey(student);
    setStaffPartial((prev) => prev.filter((x) => getKey(x) !== key));
    setStaffSent((prev) => [student, ...prev.filter((x) => getKey(x) !== key)]);
  };

  // NEW: Partial -> Rejected (store reason string)
  const partialMoveToRejected = (student, finalReason) => {
    const key = getKey(student);
    const record = {
      ...student,
      rejected: {
        reason: finalReason,
        at: new Date().toISOString(),
      },
    };

    setStaffPartial((prev) => prev.filter((x) => getKey(x) !== key));
    setStaffRejected((prev) => [record, ...prev.filter((x) => getKey(x) !== key)]);
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



  return (
    <div className="min-h-screen bg-neutral-900">
      <LibraryStaffHeader pendingCount={staffPending.length} />

      <main className="mx-auto max-w-7xl px-6 py-8">
        <Outlet
          context={{
            staffPending,
            staffSent,
            staffPartial,
            staffRejected,

            moveToLibrarian,
            moveToPartial,
            partialSendToLibrarian,
            partialMoveToRejected,

            setStaffPending,
            setStaffSent,
            setStaffPartial,
            setStaffRejected,
            pendingMoveToRejected,
          }}
        />
      </main>
    </div>
  );
}
