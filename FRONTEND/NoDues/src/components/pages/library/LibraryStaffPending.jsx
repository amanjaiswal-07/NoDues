import { useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import PendingRequests from "../../Request/PendingRequests";
import ConfirmModal from "../../Modal/ConfirmModal";
import PartiallyAcceptedModal from "../../Modal/PartiallyAcceptedModal";
import RejectModal from "../../Modal/RejectModal";
import ViewDetailsModal from "../../Modal/ViewDetailsModal";

export default function LibraryStaffPendingPage() {
  const {
    staffPending,
    moveToLibrarian,
    moveToPartial,
    pendingMoveToRejected, // NEW from layout
  } = useOutletContext();

  // Move to librarian confirm
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  // Partial modal
  const [partialOpen, setPartialOpen] = useState(false);
  const [partialSelected, setPartialSelected] = useState(null);

  // Reject modal
  const [rejectOpen, setRejectOpen] = useState(false);
  const [rejectSelected, setRejectSelected] = useState(null);

  //view details modal
  const [viewOpen, setViewOpen] = useState(false);
  const [viewStudent, setViewStudent] = useState(null);
  const [viewStatus, setViewStatus] = useState("pending");
  const [viewRejectReason, setViewRejectReason] = useState("");


  const title = useMemo(() => "Central Library - Staff | Pending Requests", []);

  // Approve button -> Move to Librarian
  const handleMoveClick = (student) => {
    setSelected(student);
    setConfirmOpen(true);
  };

  const handleConfirmMove = () => {
    if (selected) moveToLibrarian(selected);
    setConfirmOpen(false);
    setSelected(null);
  };

  // Extra button -> Partially Accepted
  const handlePartialClick = (student) => {
    setPartialSelected(student);
    setPartialOpen(true);
  };

  const handleConfirmPartial = (payload) => {
    if (partialSelected) moveToPartial(partialSelected, payload);
    setPartialOpen(false);
    setPartialSelected(null);
  };

  // Reject button -> open RejectModal
  const handleRejectClick = (student) => {
    setRejectSelected(student);
    setRejectOpen(true);
  };

  const handleConfirmReject = (finalReason) => {
    // finalReason already includes details because we enforce text mandatory
    if (rejectSelected) pendingMoveToRejected(rejectSelected, finalReason);
    setRejectOpen(false);
    setRejectSelected(null);
  };
  

  // Library reject reasons (details mandatory)
  const LIB_REJECT_REASONS = [
    { value: "rfid_missing", label: "Student RFID missing", requiresText: true },
    { value: "fine_pending", label: "Pending fine", requiresText: true },
    { value: "books_not_returned", label: "Issued books not returned", requiresText: true },
    { value: "btp_report_unsigned", label: "BTP report not signed by supervisor", requiresText: true },
    { value: "misc", label: "Miscellaneous", requiresText: true },
  ];

  return (
    <>
      <PendingRequests
        title={title}
        data={staffPending}
        // 1) Approve -> Move to Librarian
        showApprove={true}
        approveLabel="Move to Librarian"
        approveIcon="send"
        onApprove={handleMoveClick}
        // 2) Extra -> Partially Accepted
        extraActionLabel="Partially Accepted"
        onExtraAction={handlePartialClick}
        // 3) Reject -> Reject
        showReject={true}
        rejectLabel="Reject"
        onReject={handleRejectClick}
        // 4) View details
        onView={(s) => {
          setViewStudent(s);
          setViewStatus("pending");
          setViewRejectReason("");
          setViewOpen(true);
        }}

      />

      {/* Confirm: Send to Librarian */}
      <ConfirmModal
        open={confirmOpen}
        title="Send to Librarian?"
        message={
          selected
            ? `Send ${selected.name} (${selected.roll}) to Librarian for final approval?`
            : "Send this request to Librarian for final approval?"
        }
        confirmText="Yes, send"
        cancelText="Cancel"
        onClose={() => {
          setConfirmOpen(false);
          setSelected(null);
        }}
        onConfirm={handleConfirmMove}
      />

      {/* Partially Accepted modal */}
      <PartiallyAcceptedModal
        open={partialOpen}
        student={partialSelected}
        onClose={() => {
          setPartialOpen(false);
          setPartialSelected(null);
        }}
        onConfirm={handleConfirmPartial}
      />

      {/* Reject modal (Pending -> Rejected) */}
      <RejectModal
        open={rejectOpen}
        student={rejectSelected}
        onClose={() => {
          setRejectOpen(false);
          setRejectSelected(null);
        }}
        onConfirm={handleConfirmReject}
        title="Reject Request"
        confirmText="Confirm Reject"
        reasons={LIB_REJECT_REASONS}
        placeholder="Write details (mandatory)..."
      />

      <ViewDetailsModal
        open={viewOpen}
        student={viewStudent}
        status={viewStatus}
        rejectionReason={viewRejectReason}
        showLibraryFields={true}
        onClose={() => {
          setViewOpen(false);
          setViewStudent(null);
        }}
      />

    </>
  );
}
