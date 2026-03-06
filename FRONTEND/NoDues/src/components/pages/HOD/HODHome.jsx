import { useOutletContext } from "react-router-dom";
import DepartmentHome from "../../Home/DepartmentHome";

export default function HODHome() {
  const { departmentLabel, pending } = useOutletContext();

  return (
    <DepartmentHome
      deptName={`${departmentLabel} HOD`}
      pendingCount={pending.length}
    />
  );
}