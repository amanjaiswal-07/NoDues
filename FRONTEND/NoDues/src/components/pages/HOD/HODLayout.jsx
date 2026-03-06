import { Outlet, useParams } from "react-router-dom";
import { useMemo, useState } from "react";

import Header from "../../Header/Header";
import { initialPendingStudents } from "../../../Data/students";

function prettyDepartmentName(department) {
  const map = {
    ece: "ECE",
    cse: "CSE",
    cce: "CCE",
    mech: "Mechanical",
  };

  return map[department] || department?.toUpperCase() || "";
}

export default function HODLayout() {
  const { department } = useParams();

  const initialDepartmentStudents = useMemo(
    () => initialPendingStudents.filter((s) => s.department === department),
    [department]
  );

  const [pending, setPending] = useState(initialDepartmentStudents);
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
      <Header
        role="hod"
        basePath={`/hod/${department}`}
        pendingCount={pending.length}
        subTitle={prettyDepartmentName(department)}
      />

      <main className="mx-auto max-w-7xl px-6 py-8">
        <Outlet
          context={{
            department,
            departmentLabel: prettyDepartmentName(department),
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