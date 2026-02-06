import { useState } from "react";
import { useOutletContext } from "react-router-dom";

import RejectedRequests from "../../Request/RejectedRequests";
import ViewDetailsModal from "../../Modal/ViewDetailsModal";

export default function NadRejected() {
  const { rejected, moveRejectedToApproved } = useOutletContext();

  const [viewOpen, setViewOpen] = useState(false);
  const [viewStudent, setViewStudent] = useState(null);

  return (
    <>
      <RejectedRequests
        title="NAD Cell - Rejected Requests"
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
  );
}
