import { useRef, useState } from "react";
import Papa from "papaparse";
import { ArrowDownTrayIcon, ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { initialEligibleStudents } from "../../../Data/eligibleStudents";
import AddEligibleStudentModal from "../../Modal/AddEligibleStudentModal";
import RemoveEligibleStudentModal from "../../Modal/RemoveEligibleStudentModal";

export default function AdminEligibleStudents() {
  const [students, setStudents] = useState(initialEligibleStudents);
  const [search, setSearch] = useState("");

  const [showAddModal, setShowAddModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const [message, setMessage] = useState("");
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rollNo: "",
    branch: "",
  });

  const filteredStudents = students.filter((student) => {
    const query = search.toLowerCase();
    return (
      student.name.toLowerCase().includes(query) ||
      student.email.toLowerCase().includes(query) ||
      student.rollNo.toLowerCase().includes(query) ||
      student.branch.toLowerCase().includes(query)
    );
  });

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      rollNo: "",
      branch: "",
    });
  };

  const openAddModal = () => {
    resetForm();
    setShowAddModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
    resetForm();
  };

  const openRemoveModal = (student) => {
    setSelectedStudent(student);
    setShowRemoveModal(true);
  };

  const closeRemoveModal = () => {
    setSelectedStudent(null);
    setShowRemoveModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddStudent = (e) => {
    e.preventDefault();

    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim().toLowerCase();
    const trimmedRollNo = formData.rollNo.trim();
    const trimmedBranch = formData.branch.trim().toUpperCase();

    if (!trimmedName || !trimmedEmail || !trimmedRollNo || !trimmedBranch) return;

    const alreadyExists = students.some(
      (student) => student.email.toLowerCase() === trimmedEmail
    );

    if (alreadyExists) {
      setMessage("Student with this email already exists.");
      return;
    }

    const newStudent = {
      id: Date.now(),
      name: trimmedName,
      email: trimmedEmail,
      rollNo: trimmedRollNo,
      branch: trimmedBranch,
    };

    setStudents((prev) => [newStudent, ...prev]);
    setMessage("Student added successfully.");
    closeAddModal();
  };

  const handleRemoveStudent = () => {
    if (!selectedStudent) return;

    setStudents((prev) =>
      prev.filter((student) => student.id !== selectedStudent.id)
    );
    setMessage("Student removed successfully.");
    closeRemoveModal();
  };

  const handleCSVUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleCSVUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const parsedRows = results.data || [];

        const existingEmails = new Set(
          students.map((student) => student.email.toLowerCase())
        );

        const newStudents = [];

        parsedRows.forEach((row, index) => {
          const name = (row.Name || row.name || "").trim();
          const email = (row.Email || row.email || "").trim().toLowerCase();
          const rollNo = (row.RollNo || row.rollNo || row["Roll No"] || "").trim();
          const branch = (row.Branch || row.branch || "").trim().toUpperCase();

          if (!name || !email || !rollNo || !branch) return;
          if (existingEmails.has(email)) return;

          existingEmails.add(email);

          newStudents.push({
            id: Date.now() + index,
            name,
            email,
            rollNo,
            branch,
          });
        });

        if (newStudents.length === 0) {
          setMessage("No new valid students found in CSV.");
        } else {
          setStudents((prev) => [...newStudents, ...prev]);
          setMessage(`${newStudents.length} students imported successfully.`);
        }

        event.target.value = "";
      },
      error: () => {
        setMessage("Failed to read CSV file.");
        event.target.value = "";
      },
    });
  };

  const handleDownloadTemplate = () => {
    const csvContent =
      "Name,Email,RollNo,Branch\nAman Sharma,23uec513@lnmiit.ac.in,23UEC513,ECE";

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "eligible_students_template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-white">Eligible Students</h2>
            <p className="mt-1 text-sm text-white/60">
              Manage students who are allowed to apply for No Dues.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={openAddModal}
              className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
            >
              + Add Student
            </button>

            <button
              onClick={handleCSVUploadClick}
              className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm text-white/80 hover:bg-white/10"
            >
              <ArrowUpTrayIcon className="h-5 w-5" />
              Upload CSV
            </button>

            <button
              onClick={handleDownloadTemplate}
              className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm text-white/80 hover:bg-white/10"
            >
              <ArrowDownTrayIcon className="h-5 w-5" />
              Download Template
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleCSVUpload}
              className="hidden"
            />
          </div>
        </div>

        {message && (
          <div className="rounded-xl border border-blue-500/20 bg-blue-500/10 px-4 py-3 text-sm text-blue-300">
            {message}
          </div>
        )}
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm text-white/60">Total Eligible Students</p>
          <p className="mt-3 text-3xl font-semibold text-white">{students.length}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 md:col-span-3">
          <input
            type="text"
            placeholder="Search by name, email, roll no or branch"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none focus:border-blue-500"
          />
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm text-white/80">
            <thead className="bg-white/5 text-xs uppercase tracking-wide text-white/50">
              <tr>
                <th className="px-5 py-4">Name</th>
                <th className="px-5 py-4">Email</th>
                <th className="px-5 py-4">Roll No</th>
                <th className="px-5 py-4">Branch</th>
                <th className="px-5 py-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id} className="border-t border-white/10">
                  <td className="px-5 py-4">{student.name}</td>
                  <td className="px-5 py-4">{student.email}</td>
                  <td className="px-5 py-4">{student.rollNo}</td>
                  <td className="px-5 py-4">
                    <span className="rounded-lg bg-blue-500/10 px-3 py-1 text-xs text-blue-400">
                      {student.branch}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <button
                      onClick={() => openRemoveModal(student)}
                      className="rounded-lg border border-red-400/20 px-3 py-1.5 text-xs text-red-400 hover:bg-red-500/10"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}

              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-5 py-8 text-center text-sm text-white/50">
                    No eligible students found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <AddEligibleStudentModal
        isOpen={showAddModal}
        formData={formData}
        onChange={handleChange}
        onClose={closeAddModal}
        onSubmit={handleAddStudent}
      />

      <RemoveEligibleStudentModal
        isOpen={showRemoveModal}
        student={selectedStudent}
        onClose={closeRemoveModal}
        onConfirm={handleRemoveStudent}
      />
    </div>
  );
}