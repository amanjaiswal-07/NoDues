import { useOutletContext } from "react-router-dom";
import DepartmentHome from "../../Home/DepartmentHome";

export default function LibraryLibrarianHome() {
  const { librarianPending } = useOutletContext();

  return (
    <DepartmentHome
      deptName="Central Library - Librarian"
      pendingCount={librarianPending.length}
    />
  );
}