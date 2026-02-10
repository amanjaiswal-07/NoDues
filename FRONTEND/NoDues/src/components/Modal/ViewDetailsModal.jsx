// import { XMarkIcon, IdentificationIcon, EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";

// function StatusPill({ status }) {
//   const base = "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold border";

//   if (status === "approved")
//     return <span className={`${base} border-emerald-400/40 text-emerald-300 bg-emerald-500/10`}>APPROVED</span>;

//   if (status === "rejected")
//     return <span className={`${base} border-rose-400/40 text-rose-300 bg-rose-500/10`}>REJECTED</span>;

//   return <span className={`${base} border-amber-400/40 text-amber-300 bg-amber-500/10`}>PENDING</span>;
// }

// export default function ViewDetailsModal({
//   open,
//   student,
//   status = "pending",          // "pending" | "approved" | "rejected"
//   rejectionReason = "",         // only for rejected
//   onClose,
// }) {
//   if (!open || !student) return null;

//   return (
//     <div className="fixed inset-0 z-[120] flex items-center justify-center">
//       {/* Backdrop - NO close on click */}
//       <div className="absolute inset-0 bg-black/70" />

//       {/* Modal */}
//       <div className="relative w-[95%] max-w-3xl rounded-2xl border border-white/15 bg-neutral-900 p-6 text-white shadow-xl">
//         {/* Header */}
//         <div className="flex items-start justify-between gap-4">
//           <div>
//             <div className="flex items-center gap-3">
//               <h2 className="text-lg font-semibold">Student Details</h2>
//               <StatusPill status={status} />
//             </div>
//             <p className="mt-1 text-sm text-white/60">
//               {student.name} ({student.roll})
//             </p>
//           </div>

//           <button
//             type="button"
//             onClick={onClose}
//             className="rounded-lg p-2 hover:bg-white/10"
//             aria-label="Close"
//           >
//             <XMarkIcon className="h-5 w-5" />
//           </button>
//         </div>

//         {/* Body */}
//         <div className="mt-6 grid gap-6 md:grid-cols-2">
//           {/* Left: info */}
//           <div className="space-y-4">
//             <InfoRow icon={<IdentificationIcon className="h-5 w-5" />} label="Roll No" value={student.roll} />
//             <InfoRow icon={<EnvelopeIcon className="h-5 w-5" />} label="Email" value={student.email} />
//             <InfoRow icon={<PhoneIcon className="h-5 w-5" />} label="Phone" value={student.phone} />

//             {status === "rejected" && (
//               <div className="rounded-xl border border-rose-400/30 bg-rose-500/10 p-4">
//                 <p className="text-sm font-semibold text-rose-200">Rejection reason</p>
//                 <p className="mt-1 text-sm text-rose-100/90">{rejectionReason || "—"}</p>
//               </div>
//             )}
//           </div>

//           {/* Right: ID card */}
//           <div className="rounded-xl border border-white/15 bg-white/5 p-4">
//             <p className="text-sm font-semibold text-white/80">ID Card</p>
//             <div className="mt-3 overflow-hidden rounded-xl border border-white/10 bg-black">
//               <img
//                 src={student.idCard}
//                 alt="ID Card"
//                 className="h-[260px] w-full object-contain"
//               />
//             </div>
//             <p className="mt-2 text-xs text-white/50">
//               (Loaded from local assets folder)
//             </p>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="mt-6 flex justify-end">
//           <button
//             type="button"
//             onClick={onClose}
//             className="rounded-xl border border-white/15 px-4 py-2 text-sm text-white/90 hover:bg-white/10"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// function InfoRow({ icon, label, value }) {
//   return (
//     <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 p-4">
//       <div className="text-white/70">{icon}</div>
//       <div>
//         <p className="text-xs text-white/60">{label}</p>
//         <p className="text-sm font-medium text-white">{value || "—"}</p>
//       </div>
//     </div>
//   );
// }

// import {
//   XMarkIcon,
//   IdentificationIcon,
//   EnvelopeIcon,
//   PhoneIcon,
//   CheckCircleIcon,
//   XCircleIcon,
//   DocumentArrowDownIcon,
// } from "@heroicons/react/24/outline";

// function StatusPill({ status }) {
//   const base =
//     "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold border";

//   if (status === "approved")
//     return (
//       <span
//         className={`${base} border-emerald-400/40 text-emerald-300 bg-emerald-500/10`}
//       >
//         APPROVED
//       </span>
//     );

//   if (status === "rejected")
//     return (
//       <span
//         className={`${base} border-rose-400/40 text-rose-300 bg-rose-500/10`}
//       >
//         REJECTED
//       </span>
//     );

//   if (status === "partial")
//     return (
//       <span
//         className={`${base} border-amber-400/40 text-amber-300 bg-amber-500/10`}
//       >
//         PARTIAL
//       </span>
//     );

//   return (
//     <span
//       className={`${base} border-amber-400/40 text-amber-300 bg-amber-500/10`}
//     >
//       PENDING
//     </span>
//   );
// }

// function RfidPill({ value }) {
//   const base =
//     "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold border";
//   const v = (value || "").toLowerCase();

//   if (v === "verified") {
//     return (
//       <span className={`${base} border-emerald-400/40 text-emerald-300 bg-emerald-500/10`}>
//         <CheckCircleIcon className="h-4 w-4" />
//         VERIFIED
//       </span>
//     );
//   }

//   return (
//     <span className={`${base} border-rose-400/40 text-rose-300 bg-rose-500/10`}>
//       <XCircleIcon className="h-4 w-4" />
//       NOT VERIFIED
//     </span>
//   );
// }

// export default function ViewDetailsModal({
//   open,
//   student,
//   status = "pending", // "pending" | "approved" | "rejected" | "partial"
//   rejectionReason = "",
//   onClose,

//   // NEW: library-only fields toggle
//   showLibraryFields = false,
// }) {
//   if (!open || !student) return null;

//   const rfid = student.rfidStatus || "pending";
//   const btpUrl = student.btpReportUrl;

//   return (
//     <div className="fixed inset-0 z-[120] flex items-center justify-center">
//       <div className="absolute inset-0 bg-black/70" />

//       <div className="relative w-[95%] max-w-4xl rounded-2xl border border-white/15 bg-neutral-900 p-6 text-white shadow-xl">
//         {/* Header */}
//         <div className="flex items-start justify-between gap-4">
//           <div>
//             <div className="flex items-center gap-3">
//               <h2 className="text-lg font-semibold">Student Details</h2>
//               <StatusPill status={status} />
//             </div>
//             <p className="mt-1 text-sm text-white/60">
//               {student.name} ({student.roll})
//             </p>
//           </div>

//           <button
//             type="button"
//             onClick={onClose}
//             className="rounded-lg p-2 hover:bg-white/10"
//             aria-label="Close"
//           >
//             <XMarkIcon className="h-5 w-5" />
//           </button>
//         </div>

//         {/* Body */}
//         <div className="mt-6 grid gap-6 lg:grid-cols-3">
//           {/* Left: info */}
//           <div className="space-y-4 lg:col-span-1">
//             <InfoRow
//               icon={<IdentificationIcon className="h-5 w-5" />}
//               label="Roll No"
//               value={student.roll}
//             />
//             <InfoRow
//               icon={<EnvelopeIcon className="h-5 w-5" />}
//               label="Email"
//               value={student.email}
//             />
//             <InfoRow
//               icon={<PhoneIcon className="h-5 w-5" />}
//               label="Phone"
//               value={student.phone}
//             />

//             {/* Library-only: RFID */}
//             {showLibraryFields && (
//               <div className="rounded-xl border border-white/15 bg-white/5 p-4">
//                 <p className="text-xs text-white/60">RFID Status</p>
//                 <div className="mt-2">
//                   <RfidPill value={rfid} />
//                 </div>
//               </div>
//             )}

//             {/* Rejection reason */}
//             {status === "rejected" && (
//               <div className="rounded-xl border border-rose-400/30 bg-rose-500/10 p-4">
//                 <p className="text-sm font-semibold text-rose-200">
//                   Rejection reason
//                 </p>
//                 <p className="mt-1 text-sm text-rose-100/90">
//                   {rejectionReason || "—"}
//                 </p>
//               </div>
//             )}

//             {/* Partial reason/details (if you want later) */}
//             {status === "partial" && student.partial?.details && (
//               <div className="rounded-xl border border-amber-400/30 bg-amber-500/10 p-4">
//                 <p className="text-sm font-semibold text-amber-200">
//                   Partial note
//                 </p>
//                 <p className="mt-1 text-sm text-amber-100/90">
//                   {student.partial?.details || "—"}
//                 </p>
//               </div>
//             )}
//           </div>

//           {/* Middle: ID card */}
//           <div className="rounded-xl border border-white/15 bg-white/5 p-4 lg:col-span-1">
//             <p className="text-sm font-semibold text-white/80">ID Card</p>
//             <div className="mt-3 overflow-hidden rounded-xl border border-white/10 bg-black">
//               <img
//                 src={student.idCard}
//                 alt="ID Card"
//                 className="h-[260px] w-full object-contain"
//               />
//             </div>
//             <p className="mt-2 text-xs text-white/50">
//               (Loaded from local assets folder)
//             </p>
//           </div>

//           {/* Right: Library-only BTP report */}
//           <div className="rounded-xl border border-white/15 bg-white/5 p-4 lg:col-span-1">
//             <p className="text-sm font-semibold text-white/80">BTP Report</p>

//             {!showLibraryFields ? (
//               <p className="mt-2 text-sm text-white/60">—</p>
//             ) : !btpUrl ? (
//               <p className="mt-2 text-sm text-white/60">Not uploaded</p>
//             ) : (
//               <>
//                 <div className="mt-3 flex items-center gap-2">
//                   <a
//                     href={btpUrl}
//                     target="_blank"
//                     rel="noreferrer"
//                     className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-4 py-2 text-sm font-medium text-white/90 hover:bg-white/10"
//                   >
//                     <DocumentArrowDownIcon className="h-5 w-5" />
//                     Open PDF
//                   </a>
//                 </div>

//                 <div className="mt-4 overflow-hidden rounded-xl border border-white/10 bg-black">
//                   <iframe
//                     title="BTP Report"
//                     src={btpUrl}
//                     className="h-[260px] w-full"
//                   />
//                 </div>

//                 <p className="mt-2 text-xs text-white/50">
//                   (Test PDF loaded from assets)
//                 </p>
//               </>
//             )}
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="mt-6 flex justify-end">
//           <button
//             type="button"
//             onClick={onClose}
//             className="rounded-xl border border-white/15 px-4 py-2 text-sm text-white/90 hover:bg-white/10"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// function InfoRow({ icon, label, value }) {
//   return (
//     <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 p-4">
//       <div className="text-white/70">{icon}</div>
//       <div>
//         <p className="text-xs text-white/60">{label}</p>
//         <p className="text-sm font-medium text-white">{value || "—"}</p>
//       </div>
//     </div>
//   );
// }
// import {
//   XMarkIcon,
//   IdentificationIcon,
//   EnvelopeIcon,
//   PhoneIcon,
//   DocumentArrowDownIcon,
// } from "@heroicons/react/24/outline";

// function StatusPill({ status }) {
//   const base =
//     "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold border";

//   if (status === "approved")
//     return (
//       <span className={`${base} border-emerald-400/40 text-emerald-300 bg-emerald-500/10`}>
//         APPROVED
//       </span>
//     );

//   if (status === "rejected")
//     return (
//       <span className={`${base} border-rose-400/40 text-rose-300 bg-rose-500/10`}>
//         REJECTED
//       </span>
//     );

//   if (status === "partial")
//     return (
//       <span className={`${base} border-amber-400/40 text-amber-300 bg-amber-500/10`}>
//         PARTIAL
//       </span>
//     );

//   return (
//     <span className={`${base} border-amber-400/40 text-amber-300 bg-amber-500/10`}>
//       PENDING
//     </span>
//   );
// }

// export default function ViewDetailsModal({
//   open,
//   student,
//   status = "pending", // "pending" | "approved" | "rejected" | "partial"
//   rejectionReason = "",
//   onClose,
//   showLibraryFields = false, // only library passes true
// }) {
//   if (!open || !student) return null;

//   const btpUrl = student.btpReportUrl;

//   return (
//     <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
//       {/* Backdrop */}
//       <div className="absolute inset-0 bg-black/70" />

//       {/* Modal container */}
//       <div className="relative w-full max-w-5xl max-h-[92vh] overflow-hidden rounded-2xl border border-white/15 bg-neutral-900 text-white shadow-xl">
//         {/* Header (sticky) */}
//         <div className="sticky top-0 z-10 border-b border-white/10 bg-neutral-900/95 backdrop-blur px-6 py-4">
//           <div className="flex items-start justify-between gap-4">
//             <div>
//               <div className="flex items-center gap-3">
//                 <h2 className="text-lg font-semibold">Student Details</h2>
//                 <StatusPill status={status} />
//               </div>
//               <p className="mt-1 text-sm text-white/60">
//                 {student.name} ({student.roll})
//               </p>
//             </div>

//             <button
//               type="button"
//               onClick={onClose}
//               className="rounded-lg p-2 hover:bg-white/10"
//               aria-label="Close"
//             >
//               <XMarkIcon className="h-5 w-5" />
//             </button>
//           </div>
//         </div>

//         {/* Body (scrollable) */}
//         <div className="overflow-y-auto px-6 py-5">
//           {/* Top info row */}
//           <div className="grid gap-4 md:grid-cols-3">
//             <InfoRow
//               icon={<IdentificationIcon className="h-5 w-5" />}
//               label="Roll No"
//               value={student.roll}
//             />
//             <InfoRow
//               icon={<EnvelopeIcon className="h-5 w-5" />}
//               label="Email"
//               value={student.email}
//             />
//             <InfoRow
//               icon={<PhoneIcon className="h-5 w-5" />}
//               label="Phone"
//               value={student.phone}
//             />
//           </div>

//           {/* Rejection reason (full width) */}
//           {status === "rejected" && (
//             <div className="mt-4 rounded-xl border border-rose-400/30 bg-rose-500/10 p-4">
//               <p className="text-sm font-semibold text-rose-200">Rejection reason</p>
//               <p className="mt-1 text-sm text-rose-100/90">
//                 {rejectionReason || "—"}
//               </p>
//             </div>
//           )}

//           {/* Partial note (full width) */}
//           {status === "partial" && (
//             <div className="mt-4 rounded-xl border border-amber-400/30 bg-amber-500/10 p-4">
//               <p className="text-sm font-semibold text-amber-200">
//                 Partially accepted note
//               </p>

//               <div className="mt-2 space-y-2">
//                 <div>
//                   <p className="text-xs text-amber-100/70">Reason</p>
//                   <p className="text-sm text-amber-100/90">
//                     {student.partial?.reason || "—"}
//                   </p>
//                 </div>

//                 <div>
//                   <p className="text-xs text-amber-100/70">Details</p>
//                   <p className="text-sm text-amber-100/90">
//                     {student.partial?.details || "—"}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* 2-column grid */}
//           <div className="mt-6 grid gap-6 md:grid-cols-2">
//             {/* ID Card */}
//             <div className="rounded-xl border border-white/15 bg-white/5 p-4">
//               <p className="text-sm font-semibold text-white/80">ID Card</p>

//               <div className="mt-3 overflow-hidden rounded-xl border border-white/10 bg-black">
//                 <img
//                   src={student.idCard}
//                   alt="ID Card"
//                   className="w-full object-contain h-[42vh] md:h-[44vh] max-h-[420px]"
//                 />
//               </div>

//               <p className="mt-2 text-xs text-white/50">
//                 (Loaded from local assets folder)
//               </p>
//             </div>

//             {/* BTP Report (ONLY library) */}
//             {showLibraryFields ? (
//               <div className="rounded-xl border border-white/15 bg-white/5 p-4">
//                 <p className="text-sm font-semibold text-white/80">BTP Report</p>

//                 {!btpUrl ? (
//                   <p className="mt-2 text-sm text-white/60">Not uploaded</p>
//                 ) : (
//                   <>
//                     <div className="mt-3">
//                       <a
//                         href={btpUrl}
//                         target="_blank"
//                         rel="noreferrer"
//                         className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-4 py-2 text-sm font-medium text-white/90 hover:bg-white/10"
//                       >
//                         <DocumentArrowDownIcon className="h-5 w-5" />
//                         Open PDF
//                       </a>
//                     </div>

//                     <div className="mt-4 overflow-hidden rounded-xl border border-white/10 bg-black">
//                       <iframe
//                         title="BTP Report"
//                         src={btpUrl}
//                         className="w-full h-[42vh] md:h-[44vh] max-h-[420px]"
//                       />
//                     </div>

//                     <p className="mt-2 text-xs text-white/50">
//                       (Test PDF loaded from assets)
//                     </p>
//                   </>
//                 )}
//               </div>
//             ) : (
//               <div className="hidden md:block" />
//             )}
//           </div>

//           <div className="h-6" />
//         </div>

//         {/* Footer (sticky) */}
//         <div className="sticky bottom-0 z-10 border-t border-white/10 bg-neutral-900/95 backdrop-blur px-6 py-4">
//           <div className="flex justify-end">
//             <button
//               type="button"
//               onClick={onClose}
//               className="rounded-xl border border-white/15 px-4 py-2 text-sm text-white/90 hover:bg-white/10"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function InfoRow({ icon, label, value }) {
//   return (
//     <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 p-4">
//       <div className="text-white/70">{icon}</div>
//       <div>
//         <p className="text-xs text-white/60">{label}</p>
//         <p className="text-sm font-medium text-white">{value || "—"}</p>
//       </div>
//     </div>
//   );
// }
import { useEffect } from "react";
import {
  XMarkIcon,
  IdentificationIcon,
  EnvelopeIcon,
  PhoneIcon,
  DocumentArrowDownIcon,
} from "@heroicons/react/24/outline";

function StatusPill({ status }) {
  const base =
    "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold border";

  if (status === "approved")
    return (
      <span
        className={`${base} border-emerald-400/40 text-emerald-300 bg-emerald-500/10`}
      >
        APPROVED
      </span>
    );

  if (status === "rejected")
    return (
      <span
        className={`${base} border-rose-400/40 text-rose-300 bg-rose-500/10`}
      >
        REJECTED
      </span>
    );

  if (status === "partial")
    return (
      <span
        className={`${base} border-amber-400/40 text-amber-300 bg-amber-500/10`}
      >
        PARTIAL
      </span>
    );

  return (
    <span
      className={`${base} border-amber-400/40 text-amber-300 bg-amber-500/10`}
    >
      PENDING
    </span>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 p-4">
      <div className="text-white/70">{icon}</div>
      <div className="min-w-0">
        <p className="text-xs text-white/60">{label}</p>
        <p className="truncate text-sm font-medium text-white">{value || "—"}</p>
      </div>
    </div>
  );
}

export default function ViewDetailsModal({
  open,
  student,
  status = "pending", // "pending" | "approved" | "rejected" | "partial"
  rejectionReason = "",
  onClose,
  showLibraryFields = false, // only library passes true
}) {
  useEffect(() => {
    if (!open) return;

    // lock background scroll
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // escape to close
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open || !student) return null;

  const btpUrl = student.btpReportUrl;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      {/* Backdrop (click outside closes) */}
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-[2px]"
        aria-label="Close modal backdrop"
      />

      {/* Whole modal scrolls (Option B) */}
      <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-2xl border border-white/15 bg-neutral-900 text-white shadow-2xl">
        {/* Header */}
        <div className="border-b border-white/10 bg-neutral-900/90 backdrop-blur px-6 py-4">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-semibold">Student Details</h2>
                <StatusPill status={status} />
              </div>
              <p className="mt-1 text-sm text-white/60 truncate">
                {student.name} ({student.roll})
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-2 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
              aria-label="Close"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          {/* Top info row */}
          <div className="grid gap-4 md:grid-cols-3">
            <InfoRow
              icon={<IdentificationIcon className="h-5 w-5" />}
              label="Roll No"
              value={student.roll}
            />
            <InfoRow
              icon={<EnvelopeIcon className="h-5 w-5" />}
              label="Email"
              value={student.email}
            />
            <InfoRow
              icon={<PhoneIcon className="h-5 w-5" />}
              label="Phone"
              value={student.phone}
            />
          </div>

          {/* Rejection reason (full width) */}
          {status === "rejected" && (
            <div className="mt-5 rounded-xl border border-rose-400/30 bg-rose-500/10 p-4">
              <p className="text-sm font-semibold text-rose-200">
                Rejection reason
              </p>
              <p className="mt-1 text-sm text-rose-100/90">
                {rejectionReason || "—"}
              </p>
            </div>
          )}

          {/* Partial note (full width) */}
          {status === "partial" && (
            <div className="mt-4 rounded-xl border border-amber-400/30 bg-amber-500/10 p-4">
              <p className="text-sm font-semibold text-amber-200">
                Partially accepted note
              </p>

              <div className="mt-2 space-y-2">
                <div>
                  <p className="text-xs text-amber-100/70">Reason</p>
                  <p className="text-sm text-amber-100/90">
                    {student.partial?.reason || "—"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-amber-100/70">Details</p>
                  <p className="text-sm text-amber-100/90">
                    {student.partial?.details || "—"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Divider */}
          <div className="my-6 h-px bg-white/10" />

          {/* 2-column grid */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* ID Card */}
            <div className="rounded-xl border border-white/15 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white/80">ID Card</p>

              <div className="mt-3 overflow-hidden rounded-xl border border-white/10 bg-black">
                <img
                  src={student.idCard}
                  alt="ID Card"
                  className="w-full object-contain h-[42vh] md:h-[44vh] max-h-[420px]"
                  loading="lazy"
                />
              </div>

              <p className="mt-2 text-xs text-white/50">
                (Loaded from local assets folder)
              </p>
            </div>

            {/* BTP Report (ONLY library) */}
            {showLibraryFields ? (
              <div className="rounded-xl border border-white/15 bg-white/5 p-4">
                <p className="text-sm font-semibold text-white/80">BTP Report</p>

                {!btpUrl ? (
                  <p className="mt-2 text-sm text-white/60">Not uploaded</p>
                ) : (
                  <>
                    <div className="mt-3">
                      <a
                        href={btpUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-4 py-2 text-sm font-medium text-white/90 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
                      >
                        <DocumentArrowDownIcon className="h-5 w-5" />
                        Open PDF
                      </a>
                    </div>

                    <div className="mt-4 overflow-hidden rounded-xl border border-white/10 bg-black">
                      <iframe
                        title="BTP Report"
                        src={btpUrl}
                        className="w-full h-[42vh] md:h-[44vh] max-h-[420px]"
                      />
                    </div>

                    <p className="mt-2 text-xs text-white/50">
                      (Test PDF loaded from assets)
                    </p>
                  </>
                )}
              </div>
            ) : (
              <div className="hidden md:block" />
            )}
          </div>

          {/* Footer */}
          <div className="mt-7 flex justify-end border-t border-white/10 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-white/15 px-4 py-2 text-sm text-white/90 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
            >
              Close
            </button>
          </div>

          <div className="h-2" />
        </div>
      </div>

      {/* Optional: add this CSS in your global stylesheet if you want nicer scrollbars everywhere */}
      {/*
        .scrollbar-thin::-webkit-scrollbar { width: 8px; }
        .scrollbar-thin::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 999px; }
        .scrollbar-thin::-webkit-scrollbar-track { background: transparent; }
      */}
    </div>
  );
}
