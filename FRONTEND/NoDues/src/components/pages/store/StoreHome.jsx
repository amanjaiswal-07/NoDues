import { useOutletContext } from "react-router-dom";
import DepartmentHome from "../../Home/DepartmentHome";

export default function StoreHome() {
  const { pending } = useOutletContext();
  return <DepartmentHome deptName="Store" pendingCount={pending.length} />;
}
