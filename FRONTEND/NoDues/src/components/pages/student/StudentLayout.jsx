import { NavLink, Outlet, useNavigate, Link } from "react-router-dom";
import {
  HomeIcon,
  UserCircleIcon,
  DocumentPlusIcon,
  ClockIcon,
  XCircleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import logo from "../../../assets/LNMIIT_logo.png";

export default function StudentLayout() {
  const navigate = useNavigate();
  const email = localStorage.getItem("studentEmail") || "";

  const [studentProfile, setStudentProfile] = useState(null);
  const [profileComplete, setProfileComplete] = useState(false);

  const [applications, setApplications] = useState([
    {
      id: "APP-003",
      createdAt: "2026-03-07",
      status: "ONGOING",
      currentDepartment: "Placement Office",
      rejectedBy: "",
      rejectionReason: "",
    },
    {
      id: "APP-002",
      createdAt: "2026-02-18",
      status: "REJECTED",
      currentDepartment: "",
      rejectedBy: "Library",
      rejectionReason:
        "Signed BTP report email date did not match submitted records.",
    },
    {
      id: "APP-001",
      createdAt: "2026-01-29",
      status: "REJECTED",
      currentDepartment: "",
      rejectedBy: "Hostel",
      rejectionReason: "Incorrect last stayed hostel information was provided.",
    },
  ]);

  const createApplication = () => {
    const ongoingExists = applications.some((app) => app.status === "ONGOING");
    if (ongoingExists) return false;

    const maxNumber = applications.reduce((mx, app) => {
      const n = Number(String(app.id).replace("APP-", ""));
      return Number.isNaN(n) ? mx : Math.max(mx, n);
    }, 0);

    const newId = `APP-${String(maxNumber + 1).padStart(3, "0")}`;

    const today = new Date();
    const createdAt = `${today.getFullYear()}-${String(
      today.getMonth() + 1
    ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

    const newApplication = {
      id: newId,
      createdAt,
      status: "ONGOING",
      currentDepartment: "Accounts",
      rejectedBy: "",
      rejectionReason: "",
    };

    setApplications((prev) => [newApplication, ...prev]);
    return true;
  };

  const currentApplication =
    applications.find((app) => app.status === "ONGOING") || null;

  const handleLogout = () => {
    localStorage.removeItem("studentEmail");
    navigate("/");
  };

  const navClass = ({ isActive }) =>
    `flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-white/80 hover:bg-white/10 hover:text-white"
    }`;

  return (
    <div className="min-h-screen bg-neutral-900">
      <header className="sticky top-0 z-50 w-full bg-black/80 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/student" className="flex items-center gap-3">
            <div className="rounded-lg bg-white p-2">
              <img src={logo} alt="LNMIIT" className="h-8 w-auto" />
            </div>
            <span className="text-lg font-semibold text-white">
              Student
              {email ? <span className="text-white/70"> - {email}</span> : null}
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <NavLink to="/student" end className={navClass}>
              <HomeIcon className="h-5 w-5" />
              Dashboard
            </NavLink>

            <NavLink to="/student/profile" className={navClass}>
              <UserCircleIcon className="h-5 w-5" />
              Profile
            </NavLink>

            {profileComplete ? (
              <NavLink to="/student/apply" className={navClass}>
                <DocumentPlusIcon className="h-5 w-5" />
                Apply
              </NavLink>
            ) : (
              <button
                type="button"
                disabled
                className="flex cursor-not-allowed items-center gap-2 rounded-lg bg-white/5 px-4 py-2 text-sm font-medium text-white/40"
                title="Complete profile first"
              >
                <DocumentPlusIcon className="h-5 w-5" />
                Apply
              </button>
            )}

            <NavLink to="/student/track" className={navClass}>
              <ClockIcon className="h-5 w-5" />
              Track
              {currentApplication ? (
                <span className="ml-1 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-blue-600 px-1 text-[11px] font-semibold text-white">
                  1
                </span>
              ) : null}
            </NavLink>

            <NavLink to="/student/history" className={navClass}>
              <XCircleIcon className="h-5 w-5" />
              History
            </NavLink>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-lg border border-red-400/40 px-4 py-2 text-sm font-medium text-red-400 hover:bg-red-500/10"
          >
            <ArrowRightOnRectangleIcon className="h-5 w-5" />
            Logout
          </button>
        </nav>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <Outlet
          context={{
            email,
            studentProfile,
            setStudentProfile,
            profileComplete,
            setProfileComplete,
            applications,
            currentApplication,
            createApplication,
          }}
        />
      </main>
    </div>
  );
}