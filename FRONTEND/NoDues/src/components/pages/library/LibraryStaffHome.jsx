import { useOutletContext } from "react-router-dom";
import DepartmentHome from "../../Home/DepartmentHome";

export default function LibraryStaffHome() {
  const { staffPending } = useOutletContext();

  return (
    <DepartmentHome
      deptName="Central Library - Staff"
      pendingCount={staffPending.length}
    />
  );
}
