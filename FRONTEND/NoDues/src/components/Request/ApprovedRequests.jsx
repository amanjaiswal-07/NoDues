import { EyeIcon, ArrowRightCircleIcon } from "@heroicons/react/24/outline";

export default function ApprovedRequests({
  title = "Approved Requests",
  data = [],
  onMoveToRejected,
  onView,
}) {
  return (
    <div className="mx-auto w-full max-w-7xl">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-white">{title}</h1>
        <p className="mt-1 text-sm text-white/60">
          Approved students. You can still move a student to rejected if needed.
        </p>
      </div>

      <div className="space-y-4">
        {data.length === 0 ? (
          <EmptyState text="No approved requests" />
        ) : (
          data.map((s, idx) => (
            <Row
              key={s.id || `${s.roll}-${idx}`}
              idx={idx}
              s={s}
              onMoveToRejected={onMoveToRejected}
              onView={onView}
            />
          ))
        )}
      </div>
    </div>
  );
}

function Row({ idx, s, onMoveToRejected, onView }) {
  return (
    <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-white/15 bg-white/5 px-5 py-4 text-white shadow-sm">
      <div className="w-10 text-white/80">{idx + 1}.</div>

      <div className="min-w-[200px] flex-1 font-medium">{s.name}</div>
      <div className="min-w-[120px] text-white/80">{s.roll}</div>
      <div className="min-w-[220px] flex-1 text-white/70">{s.email}</div>

      <div className="ml-auto flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => onView?.(s)}
          className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-4 py-2 text-sm font-medium text-white/90 hover:bg-white/10"
        >
          <EyeIcon className="h-5 w-5" />
          View details
        </button>

        <button
          type="button"
          onClick={() => onMoveToRejected?.(s)}
          className="inline-flex items-center gap-2 rounded-xl border border-amber-400/40 px-4 py-2 text-sm font-medium text-amber-300 hover:bg-amber-500/10"
        >
          <ArrowRightCircleIcon className="h-5 w-5" />
          Move to Rejected
        </button>
      </div>
    </div>
  );
}

function EmptyState({ text }) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/5 p-8 text-center text-white">
      <p className="text-lg font-semibold">{text}</p>
      <p className="mt-1 text-sm text-white/60">Nothing here yet.</p>
    </div>
  );
}
