import { Outlet } from "react-router-dom";
import { useState } from "react";
import Header from "../../Header/Header";
import { initialPendingStudents } from "../../../Data/students";

export default function SportsLayout() {
  const [pending, setPending] = useState(initialPendingStudents);
  const [approved, setApproved] = useState([]);
  const [rejected, setRejected] = useState([]);

  const approveStudent = (student) => {
    setPending((p) => p.filter((x) => x.id !== student.id));
    setApproved((a) => {
      const rest = a.filter((x) => x.id !== student.id);
      return [student, ...rest];
    });
  };

  const rejectStudent = (student, rejectionReason) => {
    setPending((p) => p.filter((x) => x.id !== student.id));
    const rejectedStudent = {
      ...student,
      rejectionReason,
      rejectedAt: new Date().toISOString(),
    };
    setRejected((r) => {
      const rest = r.filter((x) => x.id !== student.id);
      return [rejectedStudent, ...rest];
    });
  };

  const moveApprovedToRejected = (student, rejectionReason) => {
    setApproved((a) => a.filter((x) => x.id !== student.id));
    const rejectedStudent = {
      ...student,
      rejectionReason,
      rejectedAt: new Date().toISOString(),
    };
    setRejected((r) => {
      const rest = r.filter((x) => x.id !== student.id);
      return [rejectedStudent, ...rest];
    });
  };

  const moveRejectedToApproved = (student) => {
    setRejected((r) => r.filter((x) => x.id !== student.id));
    setApproved((a) => {
      const rest = a.filter((x) => x.id !== student.id);
      return [student, ...rest];
    });
  };

  return (
    <div className="min-h-screen bg-neutral-900">
      <Header role="sports" pendingCount={pending.length} />
      <main className="mx-auto max-w-7xl px-6 py-8">
        <Outlet
          context={{
            pending,
            approved,
            rejected,
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
