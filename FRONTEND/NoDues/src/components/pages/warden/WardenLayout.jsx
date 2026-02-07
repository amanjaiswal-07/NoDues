import { Outlet } from "react-router-dom";
import { useMemo, useState } from "react";

import Header from "../../Header/Header";
import { initialPendingStudents } from "../../../Data/students";

const HOSTELS = ["BH1", "BH2", "BH3", "BH4", "BH5", "GH"];

export default function WardenLayout() {
  // "" means not selected yet
  const [selectedHostel, setSelectedHostel] = useState("");

  const [pendingAll, setPendingAll] = useState(initialPendingStudents);
  const [approvedAll, setApprovedAll] = useState([]);
  const [rejectedAll, setRejectedAll] = useState([]);

  // Filtered lists: if hostel not selected -> return empty arrays (your option A)
  const pending = useMemo(() => {
    if (!selectedHostel) return [];
    return pendingAll.filter((s) => s.hostel === selectedHostel);
  }, [pendingAll, selectedHostel]);

  const approved = useMemo(() => {
    if (!selectedHostel) return [];
    return approvedAll.filter((s) => s.hostel === selectedHostel);
  }, [approvedAll, selectedHostel]);

  const rejected = useMemo(() => {
    if (!selectedHostel) return [];
    return rejectedAll.filter((s) => s.hostel === selectedHostel);
  }, [rejectedAll, selectedHostel]);

  // Actions (apply to full arrays)
  const approveStudent = (student) => {
    setPendingAll((p) => p.filter((x) => x.id !== student.id));
    setApprovedAll((a) => {
      const rest = a.filter((x) => x.id !== student.id);
      return [student, ...rest];
    });
  };

  const rejectStudent = (student, rejectionReason) => {
    setPendingAll((p) => p.filter((x) => x.id !== student.id));
    const rejectedStudent = {
      ...student,
      rejectionReason,
      rejectedAt: new Date().toISOString(),
    };
    setRejectedAll((r) => {
      const rest = r.filter((x) => x.id !== student.id);
      return [rejectedStudent, ...rest];
    });
  };

  const moveApprovedToRejected = (student, rejectionReason) => {
    setApprovedAll((a) => a.filter((x) => x.id !== student.id));
    const rejectedStudent = {
      ...student,
      rejectionReason,
      rejectedAt: new Date().toISOString(),
    };
    setRejectedAll((r) => {
      const rest = r.filter((x) => x.id !== student.id);
      return [rejectedStudent, ...rest];
    });
  };

  const moveRejectedToApproved = (student) => {
    setRejectedAll((r) => r.filter((x) => x.id !== student.id));
    setApprovedAll((a) => {
      const rest = a.filter((x) => x.id !== student.id);
      return [student, ...rest];
    });
  };

  // Badge count rule:
  // - if no hostel selected -> badge = 0 (or hide)
  const pendingCount = selectedHostel ? pending.length : 0;

  return (
    <div className="min-h-screen bg-neutral-900">
      <Header
        role="warden"
        pendingCount={pendingCount}
        subTitle={selectedHostel ? selectedHostel : ""}
      />

      <main className="mx-auto max-w-7xl px-6 py-8">
        <Outlet
          context={{
            HOSTELS,
            selectedHostel,
            setSelectedHostel,

            pending,
            approved,
            rejected,

            // helpers so pages can show correct messages
            hostelSelected: Boolean(selectedHostel),

            approveStudent,
            rejectStudent,
            moveApprovedToRejected,
            moveRejectedToApproved,
          }}
        />
      </main>
    </div>
  );
}
