import { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const REASONS = [
  { value: "rfid_pending", label: "Student RFID pending" },
  { value: "late_fine", label: "Late fine on issued books" },
  { value: "books_not_returned", label: "Issued books not returned" },
  { value: "btp_report", label: "BTP report not signed by supervisor" },
];


export default function PartiallyAcceptedModal({ open, student, onClose, onConfirm }) {
  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setReason("");
      setDetails("");
      setError("");
    }
  }, [open, student?.id, student?.roll]);

  if (!open) return null;

  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose?.();
  };

  const handleConfirm = () => {
    if (!reason) {
      setError("Please select a reason.");
      return;
    }
    if (details.trim().length === 0) {
      setError("Please write details.");
      return;
    }
    onConfirm?.({ reason, details: details.trim() });
  };

  return (
    <div
      onClick={handleBackdrop}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4"
    >
      <div className="w-full max-w-md rounded-2xl border border-white/15 bg-neutral-900 text-white shadow-xl">
        <div className="flex items-start justify-between border-b border-white/10 p-5">
          <div>
            <h3 className="text-lg font-semibold">Partially accept request</h3>
            <p className="mt-1 text-sm text-white/70">
              {student ? `${student.name} (${student.roll})` : "Select reason and add details."}
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-white/70 hover:bg-white/10 hover:text-white"
            aria-label="Close"
            type="button"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4 p-5">
          <div>
            <label className="text-sm font-medium text-white/90">What is missing?</label>
            <select
                value={reason}
                onChange={(e) => {
                    setReason(e.target.value);
                    setError("");
                }}
                style={{ colorScheme: "dark" }}
                className="mt-2 w-full rounded-xl border border-white/15 bg-neutral-950 px-3 py-2 text-sm text-white outline-none focus:border-blue-500"
                >
                <option value="">Select a reason</option>
                {REASONS.map((r) => (
                    <option key={r.value} value={r.value}>
                    {r.label}
                    </option>
                ))}
            </select>


          </div>

          <div>
            <label className="text-sm font-medium text-white/90">Details</label>
            <textarea
              value={details}
              onChange={(e) => {
                setDetails(e.target.value);
                setError("");
              }}
              rows={4}
              placeholder="Write what is pending and what the student needs to do..."
              className="mt-2 w-full resize-none rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-blue-500"
            />
          </div>

          {error && <p className="text-sm text-rose-300">{error}</p>}
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-white/10 p-5">
          <button
            onClick={onClose}
            type="button"
            className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white hover:bg-white/10"
          >
            Cancel
          </button>

          <button
            onClick={handleConfirm}
            type="button"
            className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
