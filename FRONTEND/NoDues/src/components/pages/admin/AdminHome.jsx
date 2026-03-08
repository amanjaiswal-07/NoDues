export default function AdminHome() {
  const stats = [
    { label: "Authorized Department Users", value: 18 },
    { label: "Eligible Students", value: 523 },
    { label: "Active Applications", value: 147 },
    { label: "Completed No Dues", value: 86 },
  ];

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl">
        <h2 className="text-3xl font-semibold text-white">Welcome to Admin Control</h2>
        <p className="mt-2 max-w-3xl text-sm text-white/65">
          This section is used to control department login access, eligible
          students, and overall No Dues operations.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <p className="text-sm text-white/60">{item.label}</p>
            <p className="mt-3 text-3xl font-semibold text-white">{item.value}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-lg font-semibold text-white">Quick Actions</h3>
          <div className="mt-4 space-y-3">
            <div className="rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-white/75">
              Add or remove department login access
            </div>
            <div className="rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-white/75">
              Upload eligible student list
            </div>
            <div className="rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-white/75">
              Track application progress department-wise
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-lg font-semibold text-white">Department Overview</h3>
          <div className="mt-4 space-y-3 text-sm text-white/75">
            <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-4 py-3">
              <span>Medical Unit</span>
              <span>12 pending</span>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-4 py-3">
              <span>Central Library</span>
              <span>21 pending</span>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-4 py-3">
              <span>Accounts</span>
              <span>7 pending</span>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-4 py-3">
              <span>Administration</span>
              <span>9 pending</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}