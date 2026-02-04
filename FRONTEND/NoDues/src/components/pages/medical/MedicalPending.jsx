import { useState } from "react";
import { useOutletContext } from "react-router-dom";

import PendingRequests from "../../Request/PendingRequests";
import RejectModal from "../../Modal/RejectModal";
import ViewDetailsModal from "../../Modal/ViewDetailsModal";


export default function MedicalPending() {
  const { pending, approveStudent, rejectStudent } = useOutletContext();
  //Reject modal
  const [rejectOpen, setRejectOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  // View modal
  const [viewOpen, setViewOpen] = useState(false);
  const [viewStudent, setViewStudent] = useState(null);

  const openReject = (student) => {
    setSelectedStudent(student);
    setRejectOpen(true);
  };

  const closeReject = () => {
    setRejectOpen(false);
    setSelectedStudent(null);
  };

  const confirmReject = (finalReason) => {
    if (!selectedStudent) return;
    rejectStudent(selectedStudent, finalReason);
    closeReject();
  };

  const openView = (student) => {
    setViewStudent(student);
    setViewOpen(true);
  };

  const closeView = () => {
    setViewOpen(false);
    setViewStudent(null);
  };
  return (
    <>
      <PendingRequests
        title="Medical - Pending Requests"
        data={pending}
        onApprove={approveStudent}
        onReject={openReject}
        onView={openView}
      />

      <RejectModal
        open={rejectOpen}
        student={selectedStudent}
        onClose={closeReject}
        onConfirm={confirmReject}
      />

      <ViewDetailsModal
        open={viewOpen}
        student={viewStudent}
        status="pending"
        onClose={closeView}
      />
    </>
  );
}
