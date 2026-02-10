import amanId from "../assets/aman_id.jpeg";
import parthId from "../assets/parth_id.jpeg";
import sujalId from "../assets/sujal_id.png";
import btpReport from "../assets/Presentation_D2D.pdf"; // NEW

export const initialPendingStudents = [
  {
    id: 1,
    name: "Aman Jaiswal",
    roll: "23UEC513",
    email: "23UEC513@lnmiit.ac.in",
    phone: "7366973726",
    idCard: amanId,
    hostel: "BH3",

    // NEW (library fields)
    rfidStatus: "verified",     // dummy: "verified" | "pending"
    btpReportUrl: btpReport,    // same file for all
  },
  {
    id: 2,
    name: "Parth Nalwaya",
    roll: "23UEC587",
    email: "23UEC587@lnmiit.ac.in",
    phone: "9462474094",
    idCard: parthId,
    hostel: "BH1",

    rfidStatus: "verified",
    btpReportUrl: btpReport,
  },
  {
    id: 3,
    name: "Sujal Jain",
    roll: "23UCS719",
    email: "23UCS719@lnmiit.ac.in",
    phone: "8233844269",
    idCard: sujalId,
    hostel: "GH",

    rfidStatus: "pending",
    btpReportUrl: btpReport,
  },
];
