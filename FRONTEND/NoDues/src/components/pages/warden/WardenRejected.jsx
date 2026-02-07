import { useState } from "react";
import { useOutletContext } from "react-router-dom";

import RejectedRequests from "../../Request/RejectedRequests";
import ViewDetailsModal from "../../Modal/ViewDetailsModal";
import HostelGuard from "../../common/HostelGuard";

export default function WardenRejected() {
  const { selectedHostel, rejected, moveRejectedToApproved } = useOutletContext();

  const [viewOpen, setViewOpen] = useState(false);
  const [viewStudent, setViewStudent] = useState(null);

  return (
    <HostelGuard selectedHostel={selectedHostel}>
      {rejected.length === 0 ? (
        <EmptyHostelState hostel={selectedHostel} />
      ) : (
        <>
          <RejectedRequests
            title={`Warden - ${selectedHostel} | Rejected Requests`}
            data={rejected}
            onMoveToApproved={moveRejectedToApproved}
            onView={(s) => {
              setViewStudent(s);
              setViewOpen(true);
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
      )}
    </HostelGuard>
  );
}

function EmptyHostelState({ hostel }) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/5 p-10 text-center text-white">
      <p className="text-lg font-semibold">No requests in this hostel</p>
      <p className="mt-1 text-sm text-white/60">
        No rejected requests found for <span className="font-semibold text-white">{hostel}</span>.
      </p>
    </div>
  );
}
