import { useState } from "react";
import bg from "../assets/center-plaza.png";
import logo from "../assets/LNMIIT_logo.png";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [role, setRole] = useState("");

  const roles = [
  { label: "Student", value: "student" },
  { label: "Accounts", value: "accounts" },
  { label: "Central Library", value: "library" },
  { label: "Store", value: "store" },
  { label: "LUCS", value: "lucs" },
  { label: "Warden In Charge", value: "warden" },
  { label: "Administration", value: "administration" },
  { label: "Sports", value: "sports" },
  { label: "Head of Department", value: "hod" },
  { label: "Medical Unit", value: "medical" },
  { label: "Placement Office", value: "placement" },
  { label: "NAD Cell", value: "nad" },
  { label: "Admin", value: "admin" },
];

const navigate = useNavigate();
  const handleGoogleLogin = () => {
    // UI only (no auth yet)
    // alert(`Selected role: ${role}\n(Next: connect Google login)`);
    if (!role) return;
    navigate(`/${role}`);
  };

  const isRoleSelected = role !== "";

  return (
    <div className="min-h-screen relative flex items-center justify-center">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bg})` }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/40" />

      {/* Card */}
      <div className="relative w-[92%] max-w-md rounded-2xl border border-black/10 bg-white/90 shadow-xl">
        <div className="px-8 py-10">
          {/* Logo */}
          <div className="flex justify-center">
            <div className="rounded-xl border border-black/10 bg-white px-6 py-4 shadow-sm">
              <img src={logo} alt="LNMIIT" className="h-12 w-auto" />
            </div>
          </div>

          {/* Title */}
          <h1 className="mt-6 text-center text-2xl font-semibold text-black">
            No Dues Portal
          </h1>
          <p className="mt-1 text-center text-sm text-black/60">
            Sign in to continue
          </p>

          {/* Role select */}
          <div className="mt-8">
            {/* <label className="block text-sm font-medium text-black/80">
              Select role:-
            </label> */}
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
            //   className="mt-2 w-full rounded-xl border border-black/20 bg-white px-4 py-3 text-sm outline-none focus:border-black/40"
              className={`w-full rounded-xl border border-black/20 bg-white px-4 py-3 text-sm outline-none focus:border-black/40
                ${!isRoleSelected ? "text-black/50" : "text-black"}`}
            >
              {/* Placeholder */}
              <option value="" disabled hidden>
                Select role:-
              </option>

              {roles.map((r) => (
                <option key={r.value} value={r.value}>
                    {r.label}
                </option>
              ))}
            </select>
          </div>

          {/* Google button */}
          <button
            onClick={handleGoogleLogin}
            disabled={!isRoleSelected}
            // className="mt-4 w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 active:scale-[0.99]"
            className={`mt-4 w-full rounded-xl px-4 py-3 text-sm font-semibold text-white shadow-sm active:scale-[0.99]
              ${isRoleSelected ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-600/50 cursor-not-allowed"}`}
          >
            Continue with Google
          </button>

          {/* Small note */}
          <p className="mt-4 text-center text-xs text-red-600 font-medium">
            ⚠ Login only with LNMIIT email addresses.
          </p>
        </div>
      </div>
    </div>
  );
}
