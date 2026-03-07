import { useOutletContext } from "react-router-dom";

const PIPELINE = [
  "Medical Unit",
  "Central Library",
  "LUCS",
  "Hostel",
  "Placement Office",
  "Sports",
  "Labs",
  "HOD",
  "Store",
  "NAD Cell",
  "Administration",
  "Accounts",
];

function StepItem({ name, status, isLast }) {
  let dotClass = "bg-white/30";
  let cardClass = "border-white/20 bg-white/5 text-white/70";
  let label = "Pending";

  if (status === "completed") {
    dotClass = "bg-emerald-400";
    cardClass = "border-emerald-400/40 bg-emerald-500/10 text-emerald-300";
    label = "Completed";
  }

  if (status === "current") {
    dotClass = "bg-amber-400";
    cardClass = "border-amber-400/40 bg-amber-500/10 text-amber-300";
    label = "Current";
  }

  return (
    <div className="relative flex gap-4">
      {/* Timeline */}
      <div className="flex w-8 flex-col items-center">
        <div className={`h-4 w-4 rounded-full ${dotClass}`} />
        {!isLast && <div className="mt-2 w-0.5 flex-1 bg-white/15" />}
      </div>

      {/* Content */}
      <div className={`mb-4 flex-1 rounded-xl border p-4 ${cardClass}`}>
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-semibold">{name}</p>
          <span className="text-xs font-medium opacity-90">{label}</span>
        </div>
      </div>
    </div>
  );
}

export default function StudentTrack() {
  const { currentApplication } = useOutletContext();

  if (!currentApplication) {
    return (
      <div className="space-y-6">
        <div className="rounded-2xl bg-white/10 p-8 text-white shadow-lg backdrop-blur">
          <h1 className="text-3xl font-semibold">Track Application</h1>
          <p className="mt-2 text-white/70">
            Monitor the progress of your No Dues request across departments.
          </p>
        </div>

        <div className="rounded-2xl border border-white/15 bg-white/5 p-8 text-center text-white">
          <p className="text-lg font-semibold">No ongoing application</p>
          <p className="mt-2 text-sm text-white/60">
            Apply for No Dues to start tracking your request.
          </p>
        </div>
      </div>
    );
  }

  const currentIndex = PIPELINE.indexOf(currentApplication.currentDepartment);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white/10 p-8 text-white shadow-lg backdrop-blur">
        <h1 className="text-3xl font-semibold">Track Application</h1>
        <p className="mt-2 text-white/70">
          Monitor the progress of your No Dues request across departments.
        </p>
      </div>

      <div className="rounded-2xl border border-white/15 bg-white/5 p-6">
        <h2 className="text-lg font-semibold text-white">Current Status</h2>

        <div className="mt-3 rounded-xl border border-amber-400/20 bg-amber-500/10 p-4">
          <p className="text-sm text-amber-100">
            Your application is currently being processed at
            <span className="ml-2 font-semibold">
              {currentApplication.currentDepartment}
            </span>
          </p>
        </div>

        <div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-4">
          <p className="text-sm text-white/60">Application ID</p>
          <p className="mt-1 text-sm font-medium text-white">
            {currentApplication.id}
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-white/15 bg-white/5 p-6">
        <h2 className="text-lg font-semibold text-white">Department Progress</h2>

        <div className="mt-6">
          {PIPELINE.map((dept, index) => {
            let status = "pending";

            if (index < currentIndex) status = "completed";
            if (index === currentIndex) status = "current";

            return (
              <StepItem
                key={dept}
                name={dept}
                status={status}
                isLast={index === PIPELINE.length - 1}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}