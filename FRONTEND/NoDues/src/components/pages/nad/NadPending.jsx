import { useState } from "react";
import { useOutletContext } from "react-router-dom";

import PendingRequests from "../../Request/PendingRequests";
import RejectModal from "../../Modal/RejectModal";
import ViewDetailsModal from "../../Modal/ViewDetailsModal";

const NAD_REASONS = [
  { value: "apaar", label: "APAAR ID not submitted / verified", requiresText: true },
  { value: "abc", label: "ABC ID not submitted / verified", requiresText: true },
  { value: "digilocker", label: "DigiLocker marksheets not fetched / verified", requiresText: true },
  { value: "admission_docs", label: "Required admission documents pending / incomplete", requiresText: true },
  { value: "misc", label: "Miscellaneous", requiresText: true },
];

export default function NadPending() {
  const { pending, approveStudent, rejectStudent } = useOutletContext();

  const [rejectOpen, setRejectOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const [viewOpen, setViewOpen] = useState(false);
  const [viewStudent, setViewStudent] = useState(null);

  return (
    <>
      <PendingRequests
        title="NAD Cell - Pending Requests"
        data={pending}
        onApprove={approveStudent}
        onReject={(s) => {
          setSelectedStudent(s);
          setRejectOpen(true);
        }}
        onView={(s) => {
          setViewStudent(s);
          setViewOpen(true);
        }}
      />

      <RejectModal
        open={rejectOpen}
        student={selectedStudent}
        onClose={() => {
          setRejectOpen(false);
          setSelectedStudent(null);
        }}
        onConfirm={(finalReason) => {
          rejectStudent(selectedStudent, finalReason);
          setRejectOpen(false);
          setSelectedStudent(null);
        }}
        reasons={NAD_REASONS}
        title="Reject Request"
        confirmText="Confirm Reject"
        placeholder="Write details (what is missing, reference number, remarks)..."
      />

      <ViewDetailsModal
        open={viewOpen}
        student={viewStudent}
        status="pending"
        onClose={() => {
          setViewOpen(false);
          setViewStudent(null);
        }}
      />
    </>
  );
}
