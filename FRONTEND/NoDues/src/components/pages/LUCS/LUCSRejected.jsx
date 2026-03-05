import { useState } from "react";
import { useOutletContext } from "react-router-dom";

import RejectedRequests from "../../Request/RejectedRequests";
import ViewDetailsModal from "../../Modal/ViewDetailsModal";
import ConfirmModal from "../../Modal/ConfirmModal";

export default function LUCSRejected() {
  const { rejected, moveRejectedToApproved } = useOutletContext();

  const [viewOpen, setViewOpen] = useState(false);
  const [viewStudent, setViewStudent] = useState(null);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmStudent, setConfirmStudent] = useState(null);

  return (
    <>
      <RejectedRequests
        title="LUCS - Rejected Requests"
        data={rejected}
        onMoveToApproved={(s) => {
          setConfirmStudent(s);
          setConfirmOpen(true);
        }}
        onView={(s) => {
          setViewStudent(s);
          setViewOpen(true);
        }}
      />

      <ConfirmModal
        open={confirmOpen}
        title="Move to Approved?"
        message={
          confirmStudent
            ? `Move ${confirmStudent.name} (${confirmStudent.roll}) to Approved?`
            : ""
        }
        confirmText="Yes, move"
        cancelText="Cancel"
        onClose={() => {
          setConfirmOpen(false);
          setConfirmStudent(null);
        }}
        onConfirm={() => {
          if (confirmStudent) moveRejectedToApproved(confirmStudent);
          setConfirmOpen(false);
          setConfirmStudent(null);
        }}
      />

      <ViewDetailsModal
        open={viewOpen}
        student={viewStudent}
        status="rejected"
        rejectionReason={viewStudent?.rejectionReason || ""}
        onClose={() => {
          setViewOpen(false);
          setViewStudent(null);
        }}
      />
    </>
  );
}