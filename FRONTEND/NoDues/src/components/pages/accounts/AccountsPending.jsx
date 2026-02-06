import { useState } from "react";
import { useOutletContext } from "react-router-dom";

import PendingRequests from "../../Request/PendingRequests";
import RejectModal from "../../Modal/RejectModal";
import ViewDetailsModal from "../../Modal/ViewDetailsModal";

const ACCOUNTS_REASONS = [
  { value: "fees_pending", label: "Institute fee payment pending (fees not fully deposited)", requiresText: true },
  { value: "other_dues", label: "Pending dues reported by other departments", requiresText: true },
  { value: "fine_pending", label: "Fine/penalty pending", requiresText: true },
  { value: "misc", label: "Miscellaneous", requiresText: true },
];

export default function AccountsPending() {
  const { pending, approveStudent, rejectStudent } = useOutletContext();

  const [rejectOpen, setRejectOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const [viewOpen, setViewOpen] = useState(false);
  const [viewStudent, setViewStudent] = useState(null);

  return (
    <>
      <PendingRequests
        title="Accounts - Pending Requests"
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
        reasons={ACCOUNTS_REASONS}
        title="Reject Request"
        confirmText="Confirm Reject"
        placeholder="Write details (amount due, reference, department name, remarks)..."
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
