import { useState } from "react";
import { useOutletContext } from "react-router-dom";

import PendingRequests from "../../Request/PendingRequests";
import RejectModal from "../../Modal/RejectModal";
import ViewDetailsModal from "../../Modal/ViewDetailsModal";
import HostelGuard from "../../common/HostelGuard";

const WARDEN_REASONS = [
  { value: "inventory", label: "Hostel inventory dues pending", requiresText: true },
  { value: "misc", label: "Miscellaneous", requiresText: true },
];

export default function WardenPending() {
  const { selectedHostel, pending, approveStudent, rejectStudent } = useOutletContext();

  const [rejectOpen, setRejectOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const [viewOpen, setViewOpen] = useState(false);
  const [viewStudent, setViewStudent] = useState(null);

  return (
    <HostelGuard selectedHostel={selectedHostel}>
      {pending.length === 0 ? (
        <EmptyHostelState hostel={selectedHostel} />
      ) : (
        <>
          <PendingRequests
            title={`Warden - ${selectedHostel} | Pending Requests`}
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
            reasons={WARDEN_REASONS}
            title="Reject Request"
            confirmText="Confirm Reject"
            placeholder="Write details (item name, quantity, remarks)..."
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
      )}
    </HostelGuard>
  );
}

function EmptyHostelState({ hostel }) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/5 p-10 text-center text-white">
      <p className="text-lg font-semibold">No requests in this hostel</p>
      <p className="mt-1 text-sm text-white/60">
        No pending requests found for <span className="font-semibold text-white">{hostel}</span>.
      </p>
    </div>
  );
}
