import { XMarkIcon, IdentificationIcon, EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";

function StatusPill({ status }) {
  const base = "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold border";

  if (status === "approved")
    return <span className={`${base} border-emerald-400/40 text-emerald-300 bg-emerald-500/10`}>APPROVED</span>;

  if (status === "rejected")
    return <span className={`${base} border-rose-400/40 text-rose-300 bg-rose-500/10`}>REJECTED</span>;

  return <span className={`${base} border-amber-400/40 text-amber-300 bg-amber-500/10`}>PENDING</span>;
}

export default function ViewDetailsModal({
  open,
  student,
  status = "pending",          // "pending" | "approved" | "rejected"
  rejectionReason = "",         // only for rejected
  onClose,
}) {
  if (!open || !student) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center">
      {/* Backdrop - NO close on click */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Modal */}
      <div className="relative w-[95%] max-w-3xl rounded-2xl border border-white/15 bg-neutral-900 p-6 text-white shadow-xl">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-semibold">Student Details</h2>
              <StatusPill status={status} />
            </div>
            <p className="mt-1 text-sm text-white/60">
              {student.name} ({student.roll})
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-white/10"
            aria-label="Close"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {/* Left: info */}
          <div className="space-y-4">
            <InfoRow icon={<IdentificationIcon className="h-5 w-5" />} label="Roll No" value={student.roll} />
            <InfoRow icon={<EnvelopeIcon className="h-5 w-5" />} label="Email" value={student.email} />
            <InfoRow icon={<PhoneIcon className="h-5 w-5" />} label="Phone" value={student.phone} />

            {status === "rejected" && (
              <div className="rounded-xl border border-rose-400/30 bg-rose-500/10 p-4">
                <p className="text-sm font-semibold text-rose-200">Rejection reason</p>
                <p className="mt-1 text-sm text-rose-100/90">{rejectionReason || "—"}</p>
              </div>
            )}
          </div>

          {/* Right: ID card */}
          <div className="rounded-xl border border-white/15 bg-white/5 p-4">
            <p className="text-sm font-semibold text-white/80">ID Card</p>
            <div className="mt-3 overflow-hidden rounded-xl border border-white/10 bg-black">
              <img
                src={student.idCard}
                alt="ID Card"
                className="h-[260px] w-full object-contain"
              />
            </div>
            <p className="mt-2 text-xs text-white/50">
              (Loaded from local assets folder)
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-white/15 px-4 py-2 text-sm text-white/90 hover:bg-white/10"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 p-4">
      <div className="text-white/70">{icon}</div>
      <div>
        <p className="text-xs text-white/60">{label}</p>
        <p className="text-sm font-medium text-white">{value || "—"}</p>
      </div>
    </div>
  );
}
