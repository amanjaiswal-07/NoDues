export default function DepartmentHome({ deptName }) {
  return (
    <div className="rounded-2xl bg-white/10 p-10 text-white shadow-lg backdrop-blur">
      <h1 className="text-3xl font-semibold">{deptName} Dashboard</h1>
      <p className="mt-2 text-white/70">
        View and manage {deptName.toLowerCase()} clearance requests.
      </p>
    </div>
  );
}
