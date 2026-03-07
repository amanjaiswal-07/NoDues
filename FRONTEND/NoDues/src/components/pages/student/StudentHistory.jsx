import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import ConfirmModal from "../../Modal/ConfirmModal";

function StatusBadge({ status }) {
  const base =
    "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold";

  if (status === "ONGOING") {
    return (
      <span className={`${base} border-amber-400/40 bg-amber-500/10 text-amber-300`}>
        ONGOING
      </span>
    );
  }

  if (status === "REJECTED") {
    return (
      <span className={`${base} border-rose-400/40 bg-rose-500/10 text-rose-300`}>
        REJECTED
      </span>
    );
  }

  return (
    <span className={`${base} border-emerald-400/40 bg-emerald-500/10 text-emerald-300`}>
      COMPLETED
    </span>
  );
}

export default function StudentHistory() {
  const { applications, currentApplication, createApplication } = useOutletContext();

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [reapplyTarget, setReapplyTarget] = useState(null);

  const hasOngoingApplication = Boolean(currentApplication);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white/10 p-8 text-white shadow-lg backdrop-blur">
        <h1 className="text-3xl font-semibold">Application History</h1>
        <p className="mt-2 text-white/70">
          View all your previous No Dues applications and their status.
        </p>
      </div>

      <div className="grid gap-5">
        {applications.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border border-white/15 bg-white/5 p-6 text-white"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <h2 className="text-lg font-semibold">{item.id}</h2>
                <p className="mt-1 text-sm text-white/60">
                  Applied on {item.createdAt}
                </p>
              </div>

              <StatusBadge status={item.status} />
            </div>

            {item.status === "ONGOING" ? (
              <div className="mt-5 rounded-xl border border-amber-400/20 bg-amber-500/10 p-4">
                <p className="text-sm text-amber-100">
                  Current department:
                  <span className="ml-2 font-semibold">{item.currentDepartment}</span>
                </p>
              </div>
            ) : null}

            {item.status === "REJECTED" ? (
              <div className="mt-5 rounded-xl border border-rose-400/20 bg-rose-500/10 p-4">
                <p className="text-sm font-medium text-rose-200">
                  Rejected by: {item.rejectedBy}
                </p>
                <p className="mt-2 text-sm text-rose-100/90">
                  Reason: {item.rejectionReason}
                </p>
              </div>
            ) : null}

            {item.status === "REJECTED" && !hasOngoingApplication ? (
              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setReapplyTarget(item);
                    setConfirmOpen(true);
                  }}
                  className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Reapply
                </button>
              </div>
            ) : null}

            {item.status === "COMPLETED" ? (
              <div className="mt-5 rounded-xl border border-emerald-400/20 bg-emerald-500/10 p-4">
                <p className="text-sm text-emerald-100">
                  Application completed successfully.
                </p>
              </div>
            ) : null}
          </div>
        ))}
      </div>
      <ConfirmModal
        open={confirmOpen}
        title="Reapply for No Dues?"
        message={
          reapplyTarget
            ? `Create a new No Dues application after rejection of ${reapplyTarget.id}?`
            : ""
        }
        confirmText="Yes, reapply"
        cancelText="Cancel"
        onClose={() => {
          setConfirmOpen(false);
          setReapplyTarget(null);
        }}
        onConfirm={() => {
          createApplication();
          setConfirmOpen(false);
          setReapplyTarget(null);
        }}
      />
    </div>
  );
}