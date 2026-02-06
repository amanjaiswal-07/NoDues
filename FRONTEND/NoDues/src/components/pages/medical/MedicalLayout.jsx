import { Outlet } from "react-router-dom";
import { useState } from "react";
import Header from "../../Header/Header"
import { initialPendingStudents } from "../../../Data/students";
// const initialPending = [
//   { id: 1, name: "Aman Jaiswal", roll: "23UEC513", email: "23UEC513@lnmiit.ac.in" },
//   { id: 2, name: "Parth Nalwaya", roll: "23UEC587", email: "23UEC587@lnmiit.ac.in" },
//   { id: 3, name: "Sujal Jain", roll: "23UCS719", email: "23UCS719@lnmiit.ac.in" },
//   // { id: 4, name: "Soodle", roll: "23UCS789", email: "23UCS789@lnmiit.ac.in" },
// ];


export default function MedicalLayout() {
  // const [pending, setPending] = useState(initialPending);
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


  // const moveApprovedToRejected = (student) => {
  // setApproved((a) => a.filter((x) => x.id !== student.id));

  // setRejected((r) => {
  //   // remove if already present, then add to top
  //   const rest = r.filter((x) => x.id !== student.id);
  //   return [student, ...rest];
  //   });
  // };
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

  const rejectStudent = (student, rejectionReason) => {
  setPending((p) => p.filter((x) => x.id !== student.id));

  const rejectedStudent = {
    ...student,
    rejectionReason,      // store reason
    rejectedAt: new Date().toISOString(),
  };

  setRejected((r) => {
    const rest = r.filter((x) => x.id !== student.id);
    return [rejectedStudent, ...rest];
    });
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      <Header role="medical" pendingCount={pending.length}/>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <Outlet
          context={{
            pending,
            approved,
            rejected,
            approveStudent,
            moveApprovedToRejected,
            moveRejectedToApproved,
            rejectStudent
          }}
        />
      </main>
    </div>
  );
}
