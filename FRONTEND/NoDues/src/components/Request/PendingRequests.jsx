import {
  CheckCircleIcon,
  EyeIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

export default function PendingRequests({
  title = "Pending Requests",
  data = [],
  onApprove,
  onReject, // optional (later)
  onView,   // optional (later)
}) {
  return (
    <div className="mx-auto w-full max-w-7xl">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-white">{title}</h1>
        <p className="mt-1 text-sm text-white/60">
          Review and take action on pending student clearance requests.
        </p>
      </div>

      <div className="space-y-4">
        {data.length === 0 ? (
          <EmptyState text="No pending requests" />
        ) : (
          data.map((s, idx) => (
            <Row
              key={s.id || `${s.roll}-${idx}`}
              idx={idx}
              s={s}
              onApprove={onApprove}
              onReject={onReject}
              onView={onView}
            />
          ))
        )}
      </div>
    </div>
  );
}

function Row({ idx, s, onApprove, onReject, onView }) {
  return (
    <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-white/15 bg-white/5 px-5 py-4 text-white shadow-sm">
      <div className="w-10 text-white/80">{idx + 1}.</div>

      <div className="min-w-[200px] flex-1 font-medium">{s.name}</div>
      <div className="min-w-[120px] text-white/80">{s.roll}</div>
      <div className="min-w-[220px] flex-1 text-white/70">{s.email}</div>

      <div className="ml-auto flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => onApprove?.(s)}
          className="inline-flex items-center gap-2 rounded-xl border border-emerald-400/40 px-4 py-2 text-sm font-medium text-emerald-300 hover:bg-emerald-500/10"
        >
          <CheckCircleIcon className="h-5 w-5" />
          Approve
        </button>

        {/* Keep reject button for later (optional) */}
        <button
          type="button"
          onClick={() => onReject?.(s)}
          className="inline-flex items-center gap-2 rounded-xl border border-rose-400/40 px-4 py-2 text-sm font-medium text-rose-300 hover:bg-rose-500/10"
        >
          <XCircleIcon className="h-5 w-5" />
          Reject
        </button>

        <button
          type="button"
          onClick={() => onView?.(s)}
          className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-4 py-2 text-sm font-medium text-white/90 hover:bg-white/10"
        >
          <EyeIcon className="h-5 w-5" />
          View details
        </button>
      </div>
    </div>
  );
}

function EmptyState({ text }) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/5 p-8 text-center text-white">
      <p className="text-lg font-semibold">{text}</p>
      <p className="mt-1 text-sm text-white/60">You are all caught up.</p>
    </div>
  );
}
