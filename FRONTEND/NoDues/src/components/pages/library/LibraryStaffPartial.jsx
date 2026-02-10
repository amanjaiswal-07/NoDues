// import { useOutletContext } from "react-router-dom";
// import { EyeIcon } from "@heroicons/react/24/outline";

// export default function LibraryStaffPartial() {
//   const { staffPartial } = useOutletContext();

//   return (
//     <div className="mx-auto w-full max-w-7xl">
//       <div className="mb-6">
//         <h1 className="text-2xl font-semibold text-white">
//           Central Library - Staff | Partially Accepted
//         </h1>
//         <p className="mt-1 text-sm text-white/60">
//           Requests with missing requirements (reason and details recorded).
//         </p>
//       </div>

//       <div className="space-y-4">
//         {staffPartial.length === 0 ? (
//           <div className="rounded-2xl border border-white/15 bg-white/5 p-8 text-center text-white">
//             <p className="text-lg font-semibold">No partially accepted requests</p>
//             <p className="mt-1 text-sm text-white/60">Nothing to track right now.</p>
//           </div>
//         ) : (
//           staffPartial.map((s, idx) => (
//             <div
//               key={s.id ?? s.roll}
//               className="flex flex-nowrap items-center gap-4 rounded-2xl border border-white/15 bg-white/5 px-5 py-4 text-white shadow-sm"
//             >
//               <div className="w-10 shrink-0 text-white/80">{idx + 1}.</div>
//               <div className="min-w-[220px] flex-1 font-medium">{s.name}</div>
//               <div className="min-w-[140px] shrink-0 text-white/80">{s.roll}</div>
//               <div className="min-w-[260px] flex-1 text-white/70">{s.email}</div>

//               <div className="ml-auto flex shrink-0 items-center gap-3">
//                 <button
//                   type="button"
//                   className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-4 py-2 text-sm font-medium text-white/90 hover:bg-white/10"
//                   onClick={() => console.log("View details:", s)}
//                 >
//                   <EyeIcon className="h-5 w-5" />
//                   View details
//                 </button>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { EyeIcon } from "@heroicons/react/24/outline";
import ConfirmModal from "../../Modal/ConfirmModal";
import RejectModal from "../../Modal/RejectModal";
import ViewDetailsModal from "../../Modal/ViewDetailsModal";

export default function LibraryStaffPartial() {
  const { staffPartial, partialSendToLibrarian, partialMoveToRejected } = useOutletContext();

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [sendSelected, setSendSelected] = useState(null);

  const [rejectOpen, setRejectOpen] = useState(false);
  const [rejectSelected, setRejectSelected] = useState(null);

  const [viewOpen, setViewOpen] = useState(false);
  const [viewStudent, setViewStudent] = useState(null);


  // Library reject reasons (DETAILS mandatory -> make requiresText true for all)
  const LIB_REJECT_REASONS = [
    { value: "rfid_missing", label: "Student RFID missing", requiresText: true },
    { value: "fine_pending", label: "Pending fine", requiresText: true },
    { value: "books_not_returned", label: "Issued books not returned", requiresText: true },
    { value: "btp_report_unsigned", label: "BTP report not signed by supervisor", requiresText: true },
    { value: "misc", label: "Miscellaneous", requiresText: true },
  ];

  const openSendConfirm = (s) => {
    setSendSelected(s);
    setConfirmOpen(true);
  };

  const confirmSend = () => {
    if (sendSelected) partialSendToLibrarian(sendSelected);
    setConfirmOpen(false);
    setSendSelected(null);
  };

  const openReject = (s) => {
    setRejectSelected(s);
    setRejectOpen(true);
  };

  const confirmReject = (finalReason) => {
    // finalReason already includes details (because requiresText true)
    if (rejectSelected) partialMoveToRejected(rejectSelected, finalReason);
    setRejectOpen(false);
    setRejectSelected(null);
  };

  return (
    <>
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-white">
            Central Library - Staff | Partially Accepted
          </h1>
          <p className="mt-1 text-sm text-white/60">
            Requests with missing requirements (reason and details recorded).
          </p>
        </div>

        <div className="space-y-4">
          {staffPartial.length === 0 ? (
            <div className="rounded-2xl border border-white/15 bg-white/5 p-8 text-center text-white">
              <p className="text-lg font-semibold">No partially accepted requests</p>
              <p className="mt-1 text-sm text-white/60">Nothing to track right now.</p>
            </div>
          ) : (
            staffPartial.map((s, idx) => (
              <div
                key={s.id ?? s.roll}
                className="flex flex-nowrap items-center gap-4 rounded-2xl border border-white/15 bg-white/5 px-5 py-4 text-white shadow-sm"
              >
                <div className="w-10 shrink-0 text-white/80">{idx + 1}.</div>
                <div className="min-w-[220px] flex-1 font-medium">{s.name}</div>
                <div className="min-w-[140px] shrink-0 text-white/80">{s.roll}</div>
                <div className="min-w-[260px] flex-1 text-white/70">{s.email}</div>

                <div className="ml-auto flex shrink-0 items-center gap-3">
                  <button
                    type="button"
                    onClick={() => openSendConfirm(s)}
                    className="rounded-xl border border-emerald-400/40 px-4 py-2 text-sm font-medium text-emerald-300 hover:bg-emerald-500/10"
                  >
                    Send to Librarian
                  </button>

                  <button
                    type="button"
                    onClick={() => openReject(s)}
                    className="rounded-xl border border-rose-400/40 px-4 py-2 text-sm font-medium text-rose-300 hover:bg-rose-500/10"
                  >
                    Move to Rejected
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setViewStudent(s);
                      setViewOpen(true);
                    }}
                    className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-4 py-2 text-sm font-medium text-white/90 hover:bg-white/10"
                  >
                    <EyeIcon className="h-5 w-5" />
                    View details
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Confirm: Partial -> Sent */}
      <ConfirmModal
        open={confirmOpen}
        title="Send to Librarian?"
        message={
          sendSelected
            ? `Send ${sendSelected.name} (${sendSelected.roll}) to Librarian for final approval?`
            : "Send this request to Librarian for final approval?"
        }
        confirmText="Yes, send"
        cancelText="Cancel"
        onClose={() => {
          setConfirmOpen(false);
          setSendSelected(null);
        }}
        onConfirm={confirmSend}
      />

      {/* Reject: Partial -> Rejected */}
      <RejectModal
        open={rejectOpen}
        student={rejectSelected}
        onClose={() => {
          setRejectOpen(false);
          setRejectSelected(null);
        }}
        onConfirm={confirmReject}
        title="Move to Rejected"
        confirmText="Confirm Reject"
        reasons={LIB_REJECT_REASONS}
        placeholder="Write details (mandatory)..."
      />

      <ViewDetailsModal
        open={viewOpen}
        student={viewStudent}
        status="partial"
        showLibraryFields={true}
        onClose={() => {
          setViewOpen(false);
          setViewStudent(null);
        }}
      />


    </>
  );
}

