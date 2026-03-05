import { useOutletContext } from "react-router-dom";
import DepartmentHome from "../../Home/DepartmentHome";

export default function LUCSHome() {
  const { pending } = useOutletContext();
  return <DepartmentHome deptName="LUCS" pendingCount={pending.length} />;
}