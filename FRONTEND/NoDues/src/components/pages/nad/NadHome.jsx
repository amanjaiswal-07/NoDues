import { useOutletContext } from "react-router-dom";
import DepartmentHome from "../../Home/DepartmentHome";

export default function NadHome() {
  const { pending } = useOutletContext();
  return <DepartmentHome deptName="NAD Cell" pendingCount={pending.length} />;
}
