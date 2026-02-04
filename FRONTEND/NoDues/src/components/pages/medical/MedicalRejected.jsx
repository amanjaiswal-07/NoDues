import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import RejectedRequests from "../../Request/RejectedRequests.jsx";
import ViewDetailsModal from "../../Modal/ViewDetailsModal.jsx"


export default function MedicalRejected() {
  const { rejected , moveRejectedToApproved  } = useOutletContext();

  const [viewOpen, setViewOpen] = useState(false);
  const [viewStudent, setViewStudent] = useState(null);

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
      <RejectedRequests
        title="Medical - Rejected Requests"
        data={rejected}
        onMoveToApproved={moveRejectedToApproved}
        onView={openView}
      />

      <ViewDetailsModal
        open={viewOpen}
        student={viewStudent}
        status="rejected"
        rejectionReason={viewStudent?.rejectionReason || ""}
        onClose={closeView}
      />
    </>
  );
}
