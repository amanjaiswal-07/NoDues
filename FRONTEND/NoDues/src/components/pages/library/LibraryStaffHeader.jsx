import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  ClockIcon,
  AdjustmentsHorizontalIcon,
  ArrowUpRightIcon,
  XCircleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

import logo from "../../../assets/LNMIIT_logo.png";

export default function LibraryStaffHeader({ pendingCount = 0 }) {
  const navigate = useNavigate();

  const navClass = ({ isActive }) =>
    `flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition
     ${
       isActive
         ? "bg-blue-600 text-white"
         : "text-white/80 hover:bg-white/10 hover:text-white"
     }`;

  return (
    <header className="sticky top-0 z-50 w-full bg-black/80 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Left */}
        <Link to="/library/staff" className="flex items-center gap-3">
          <div className="rounded-lg bg-white p-2">
            <img src={logo} alt="LNMIIT" className="h-8 w-auto" />
          </div>
          <span className="text-lg font-semibold text-white">
            Central Library - Staff
          </span>
        </Link>

        {/* Center */}
        <div className="flex items-center gap-4">
          <NavLink to="/library/staff/pending" className={navClass}>
            <ClockIcon className="h-5 w-5" />

            <span className="relative inline-flex items-center">
              Pending Requests

              {pendingCount > 0 && (
                <span className="absolute -right-4 -top-3 grid h-5 w-5 place-items-center rounded-full bg-blue-600 text-[11px] font-semibold text-white">
                  {pendingCount}
                </span>
              )}
            </span>
          </NavLink>
            
          <NavLink to="/library/staff/partial" className={navClass}>
            <AdjustmentsHorizontalIcon className="h-5 w-5" />
            Partially Accepted
          </NavLink>

          <NavLink to="/library/staff/sent" className={navClass}>
            <ArrowUpRightIcon className="h-5 w-5" />
            Sent to Librarian
          </NavLink>

          <NavLink to="/library/staff/rejected" className={navClass}>
            <XCircleIcon className="h-5 w-5" />
            Rejected Requests
          </NavLink>
        </div>

        {/* Right */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 rounded-lg border border-red-400/40 px-4 py-2 text-sm font-medium text-red-400 hover:bg-red-500/10"
        >
          <ArrowRightOnRectangleIcon className="h-5 w-5" />
          Logout
        </button>
      </nav>
    </header>
  );
}
