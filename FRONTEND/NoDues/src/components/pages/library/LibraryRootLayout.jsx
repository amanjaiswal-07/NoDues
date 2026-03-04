import { Outlet } from "react-router-dom";
import { useState } from "react";
import { initialPendingStudents } from "../../../Data/students";

export default function LibraryRootLayout() {
  // STAFF buckets
  const [staffPending, setStaffPending] = useState(initialPendingStudents);
  const [staffRejected, setStaffRejected] = useState([]);
  const [staffSent, setStaffSent] = useState([]); // tracking list

  // LIBRARIAN buckets
  const [librarianPending, setLibrarianPending] = useState(initialPendingStudents);
  const [librarianApproved, setLibrarianApproved] = useState([]);
  const [librarianRejected, setLibrarianRejected] = useState([]);

  const getKey = (s) => s?.id ?? s?.roll;

  // STAFF: Pending -> Sent + Librarian Pending
  const staffMoveToLibrarian = (student) => {
    const key = getKey(student);

    const trackingRecord = {
      ...student,
      tracking: {
        status: "Pending by Librarian",
        updatedAt: new Date().toISOString(),
        librarianReason: "",
      },
    };

    setStaffPending((prev) => prev.filter((x) => getKey(x) !== key));
    setStaffSent((prev) => [trackingRecord, ...prev.filter((x) => getKey(x) !== key)]);
    
    // send to librarian pending (store raw student, no tracking needed)
    setLibrarianPending((prev) => [student, ...prev.filter((x) => getKey(x) !== key)]);
    console.log("After move, librarianPending will contain:", student);
  };

  // STAFF: Pending -> Rejected (staff-only)
  const staffReject = (student, finalReason) => {
    const key = getKey(student);
    const record = {
      ...student,
      rejected: { reason: finalReason, at: new Date().toISOString() },
    };

    setStaffPending((prev) => prev.filter((x) => getKey(x) !== key));
    setStaffRejected((prev) => [record, ...prev.filter((x) => getKey(x) !== key)]);
  };

  // LIBRARIAN: Pending -> Approved
  const librarianApprove = (student) => {
    const key = getKey(student);

    setLibrarianPending((prev) => prev.filter((x) => getKey(x) !== key));
    setLibrarianApproved((prev) => [student, ...prev.filter((x) => getKey(x) !== key)]);

    // update staff tracking
    setStaffSent((prev) =>
      prev.map((x) =>
        getKey(x) === key
          ? {
              ...x,
              tracking: {
                ...(x.tracking || {}),
                status: "Approved by Librarian",
                librarianReason: "",
                updatedAt: new Date().toISOString(),
              },
            }
          : x
      )
    );
  };

  // LIBRARIAN: Pending -> Rejected
  const librarianReject = (student, finalReason) => {
    const key = getKey(student);

    const record = {
      ...student,
      rejected: { reason: finalReason, at: new Date().toISOString() },
    };

    setLibrarianPending((prev) => prev.filter((x) => getKey(x) !== key));
    setLibrarianRejected((prev) => [record, ...prev.filter((x) => getKey(x) !== key)]);

    // update staff tracking
    setStaffSent((prev) =>
      prev.map((x) =>
        getKey(x) === key
          ? {
              ...x,
              tracking: {
                ...(x.tracking || {}),
                status: "Rejected by Librarian",
                librarianReason: finalReason,
                updatedAt: new Date().toISOString(),
              },
            }
          : x
      )
    );
  };

  // LIBRARIAN: Approved -> Rejected (optional “move to rejected”)
  const librarianMoveApprovedToRejected = (student, finalReason) => {
    const key = getKey(student);

    const record = {
      ...student,
      rejected: { reason: finalReason, at: new Date().toISOString() },
    };

    setLibrarianApproved((prev) => prev.filter((x) => getKey(x) !== key));
    setLibrarianRejected((prev) => [record, ...prev.filter((x) => getKey(x) !== key)]);

    setStaffSent((prev) =>
      prev.map((x) =>
        getKey(x) === key
          ? {
              ...x,
              tracking: {
                ...(x.tracking || {}),
                status: "Rejected by Librarian",
                librarianReason: finalReason,
                updatedAt: new Date().toISOString(),
              },
            }
          : x
      )
    );
  };

  // LIBRARIAN: Rejected -> Approved (optional “move to approved”)
  const librarianMoveRejectedToApproved = (student) => {
    const key = getKey(student);

    setLibrarianRejected((prev) => prev.filter((x) => getKey(x) !== key));
    setLibrarianApproved((prev) => [student, ...prev.filter((x) => getKey(x) !== key)]);

    setStaffSent((prev) =>
      prev.map((x) =>
        getKey(x) === key
          ? {
              ...x,
              tracking: {
                ...(x.tracking || {}),
                status: "Approved by Librarian",
                librarianReason: "",
                updatedAt: new Date().toISOString(),
              },
            }
          : x
      )
    );
  };

  return (
    <Outlet
      context={{
        // staff
        staffPending,
        staffRejected,
        staffSent,
        staffMoveToLibrarian,
        staffReject,

        // librarian
        librarianPending,
        librarianApproved,
        librarianRejected,
        librarianApprove,
        librarianReject,
        librarianMoveApprovedToRejected,
        librarianMoveRejectedToApproved,
      }}
    />
  );
}