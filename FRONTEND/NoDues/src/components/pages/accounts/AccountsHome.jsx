import { useOutletContext } from "react-router-dom";
import DepartmentHome from "../../Home/DepartmentHome";

export default function AccountsHome() {
  const { pending } = useOutletContext();
  return <DepartmentHome deptName="Accounts" pendingCount={pending.length} />;
}
