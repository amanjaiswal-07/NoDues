import { useMemo, useState } from "react";
import { useNavigate,useOutletContext } from "react-router-dom";
import ConfirmModal from "../../Modal/ConfirmModal";

const HOSTELS = ["BH1", "BH2", "BH3", "BH4", "BH5", "GH"];

const PLACEMENT_STATUSES = [
  "Placed",
  "Unplaced",
  "Preparation Break",
  "Higher Studies India",
  "Higher Studies Abroad",
  "Family Business",
];

const CLUB_ROLE_OPTIONS = [
  "None",
  "Club Coordinator",
  "Fest Organizing Committee",
  "Both",
];

function detectDepartment(roll) {
  const value = (roll || "").toUpperCase();

  if (value.includes("UCS") || value.includes("DCS")) return "CSE";
  if (value.includes("UEC") || value.includes("DEC")) return "ECE";
  if (value.includes("UCC")) return "CCE";
  if (value.includes("UME")) return "MECH";

  return "";
}

function detectGraduation(roll) {
  const value = (roll || "").toUpperCase();

  if (value.includes("U")) return "UG";
  return "";
}

function todayISO() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function WarningText({ children }) {
  return <p className="mt-2 text-xs font-medium text-red-300">{children}</p>;
}

function SectionCard({ title, subtitle, children }) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/5 p-6">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        {subtitle ? <p className="mt-1 text-sm text-white/60">{subtitle}</p> : null}
      </div>
      {children}
    </div>
  );
}

function InputField({
  label,
  value,
  onChange,
  placeholder = "",
  type = "text",
  disabled = false,
}) {
  return (
    <div>
      <label className="block text-sm text-white/80">{label}</label>
      <input
        type={type}
        value={value}
        disabled={disabled}
        onChange={onChange}
        placeholder={placeholder}
        className={`mt-2 w-full rounded-xl border border-white/15 bg-neutral-950 px-4 py-3 text-sm text-white outline-none focus:border-blue-500 ${
          disabled ? "opacity-70 cursor-not-allowed" : ""
        }`}
      />
    </div>
  );
}

function TextAreaField({
  label,
  value,
  onChange,
  placeholder = "",
  disabled = false,
  rows = 4,
}) {
  return (
    <div>
      <label className="block text-sm text-white/80">{label}</label>
      <textarea
        value={value}
        disabled={disabled}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className={`mt-2 w-full rounded-xl border border-white/15 bg-neutral-950 px-4 py-3 text-sm text-white outline-none focus:border-blue-500 ${
          disabled ? "opacity-70 cursor-not-allowed" : ""
        }`}
      />
    </div>
  );
}

function SelectField({ label, value, onChange, options, disabled = false }) {
  return (
    <div>
      <label className="block text-sm text-white/80">{label}</label>
      <select
        value={value}
        disabled={disabled}
        onChange={onChange}
        className={`mt-2 w-full rounded-xl border border-white/15 bg-neutral-950 px-4 py-3 text-sm text-white outline-none focus:border-blue-500 ${
          disabled ? "opacity-70 cursor-not-allowed" : ""
        }`}
      >
        <option value="">-- Select --</option>
        {options.map((op) => (
          <option key={op} value={op}>
            {op}
          </option>
        ))}
      </select>
    </div>
  );
}

function FileField({
  label,
  accept,
  file,
  onChange,
  disabled = false,
  helper = "",
}) {
  return (
    <div>
      <label className="block text-sm text-white/80">{label}</label>
      <input
        type="file"
        accept={accept}
        disabled={disabled}
        onChange={(e) => onChange(e.target.files?.[0] || null)}
        className={`mt-2 block w-full rounded-xl border border-white/15 bg-neutral-950 px-4 py-3 text-sm text-white file:mr-4 file:rounded-lg file:border-0 file:bg-blue-600 file:px-3 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-blue-700 ${
          disabled ? "opacity-70 cursor-not-allowed" : ""
        }`}
      />
      {helper ? <p className="mt-2 text-xs text-white/50">{helper}</p> : null}
      {file ? (
        <div className="mt-3 rounded-xl border border-white/10 bg-black/20 p-3">
          <p className="text-sm font-medium text-white/90">{file.name}</p>
          <p className="mt-1 text-xs text-white/50">
            {(file.size / 1024).toFixed(1)} KB
          </p>

          {file.type.startsWith("image/") ? (
            <img
              src={URL.createObjectURL(file)}
              alt={file.name}
              className="mt-3 max-h-48 rounded-lg border border-white/10 object-contain"
            />
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export default function StudentProfile() {
  const {
    email,
    studentProfile,
    setStudentProfile,
    setProfileComplete,
  } = useOutletContext();
  const navigate = useNavigate();  
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [profileSaved, setProfileSaved] = useState(Boolean(studentProfile));
  const [isLocked, setIsLocked] = useState(Boolean(studentProfile));

  const [form, setForm] = useState(studentProfile ||{
    name: "",
    roll: "",
    email: email || "",
    department: "",
    graduation: "",
    phone: "",
    hostel: "",

    idCardFile: null,
    btpReportFile: null,
    libraryEmailDate: "",

    clubRoleType: "",
    clubRoleDetail: "",
    festRoleDetail: "",

    placementStatus: "",
    placementDetailsText: "",
    offerLetterFile: null,
    placementDeclarationFile: null,
    admissionLetterFile: null,
    examScorecardFile: null,
    tpcEmailDate: "",

    accountHolderName: "",
    bankAccountNumber: "",
    bankName: "",
    bankBranch: "",
    bankCity: "",
    ifscCode: "",
    donationAmount: "0",
    studentContactNumber: "",
    fatherName: "",
    fatherMobileNumber: "",
    correspondenceAddress: "",
    cancelledChequeFile: null,
    submittedDate: "",
    declarationAccepted: false,
  });

  const setField = (key, value) => {
    if (isLocked) return;

    setForm((prev) => {
      const next = { ...prev, [key]: value };

      if (key === "roll") {
        next.department = detectDepartment(value);
        next.graduation = detectGraduation(value);
      }

      return next;
    });
  };

  const isHigherStudies =
    form.placementStatus === "Higher Studies India" ||
    form.placementStatus === "Higher Studies Abroad";

  const profileComplete = useMemo(() => {
    const basicOk =
      form.name &&
      form.roll &&
      form.email &&
      form.department &&
      form.graduation &&
      form.phone &&
      form.hostel;

    const docsOk =
      form.idCardFile &&
      form.btpReportFile &&
      form.libraryEmailDate;

    const roleOk =
      form.clubRoleType &&
      (form.clubRoleType === "None" ||
        (form.clubRoleType === "Club Coordinator" && form.clubRoleDetail) ||
        (form.clubRoleType === "Fest Organizing Committee" && form.festRoleDetail) ||
        (form.clubRoleType === "Both" &&
          form.clubRoleDetail &&
          form.festRoleDetail));

    let placementOk = Boolean(form.placementStatus && form.tpcEmailDate);

    if (form.placementStatus === "Placed") {
      placementOk = placementOk && Boolean(form.offerLetterFile);
    }

    if (form.placementStatus === "Unplaced") {
      placementOk =
        placementOk &&
        Boolean(form.placementDetailsText) &&
        Boolean(form.placementDeclarationFile);
    }

    if (
      form.placementStatus === "Preparation Break" ||
      form.placementStatus === "Family Business"
    ) {
      placementOk = placementOk && Boolean(form.placementDeclarationFile);
    }

    if (isHigherStudies) {
      placementOk =
        placementOk &&
        Boolean(form.admissionLetterFile || form.examScorecardFile);
    }

    const declarationOk =
      form.accountHolderName &&
      form.bankAccountNumber &&
      form.bankName &&
      form.bankBranch &&
      form.bankCity &&
      form.ifscCode &&
      form.donationAmount !== "" &&
      form.studentContactNumber &&
      form.fatherName &&
      form.fatherMobileNumber &&
      form.correspondenceAddress &&
      form.cancelledChequeFile &&
      form.declarationAccepted;

    return Boolean(basicOk && docsOk && roleOk && placementOk && declarationOk);
  }, [form, isHigherStudies]);

  const handleSaveClick = () => {
    if (!profileComplete) return;
    setConfirmOpen(true);
  };

  const handleConfirmSave = () => {
    const finalProfile = {
        ...form,
        submittedDate: form.submittedDate || todayISO(),
    };

    setForm(finalProfile);
    setStudentProfile(finalProfile);   // store in layout

    setProfileSaved(true);
    setProfileComplete(true);
    setIsLocked(true);
    setConfirmOpen(false);
    };

  const statusLabel = profileSaved ? "COMPLETE PROFILE" : "INCOMPLETE PROFILE";
  const statusClass = profileSaved
    ? "border-emerald-400/40 bg-emerald-500/10 text-emerald-300"
    : "border-amber-400/40 bg-amber-500/10 text-amber-300";

  return (
    <>
      <div className="space-y-6">
        <div className="rounded-2xl bg-white/10 p-8 text-white shadow-lg backdrop-blur">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <h1 className="text-3xl font-semibold">Student Profile</h1>
              <p className="mt-2 text-white/70">
                Complete your profile before applying for No Dues.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span
                className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${statusClass}`}
              >
                {statusLabel}
              </span>

              {profileSaved && (
                <button
                  type="button"
                  onClick={() => setIsLocked(false)}
                  className="rounded-xl border border-white/15 px-4 py-2 text-sm text-white/90 hover:bg-white/10"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>

          {!profileSaved && (
            <div className="mt-6 rounded-xl border border-amber-400/30 bg-amber-500/10 p-4">
              <p className="text-sm font-medium text-amber-200">
                Please complete your profile before applying for No Dues.
              </p>
            </div>
          )}
        </div>

        <SectionCard
          title="1. Personal Information"
          subtitle="Basic student details. Department and graduation are auto-detected from roll number."
        >
          <div className="grid gap-5 md:grid-cols-2">
            <InputField
              label="Name"
              value={form.name}
              disabled={isLocked}
              onChange={(e) => setField("name", e.target.value)}
              placeholder="Enter your full name"
            />

            <InputField
              label="Roll Number"
              value={form.roll}
              disabled={isLocked}
              onChange={(e) => setField("roll", e.target.value.toUpperCase())}
              placeholder="e.g. 23UEC513"
            />

            <InputField
              label="Email"
              value={form.email}
              disabled={true}
              onChange={() => {}}
            />

            <InputField
              label="Phone Number"
              value={form.phone}
              disabled={isLocked}
              onChange={(e) => setField("phone", e.target.value)}
              placeholder="Enter phone number"
            />

            <InputField
              label="Department"
              value={form.department}
              disabled={true}
              onChange={() => {}}
              placeholder="Auto-detected"
            />

            <InputField
              label="Graduation"
              value={form.graduation}
              disabled={true}
              onChange={() => {}}
              placeholder="Auto-detected"
            />
          </div>

          <div className="mt-5 max-w-md">
            <SelectField
              label="Last Stayed Hostel"
              value={form.hostel}
              disabled={isLocked}
              onChange={(e) => setField("hostel", e.target.value)}
              options={HOSTELS}
            />
            <WarningText>
              Please select the last hostel you lived in before leaving campus,
              either for SLI or your last semester. If wrong hostel data is
              found, the request may be cancelled immediately.
            </WarningText>
          </div>
        </SectionCard>

        <SectionCard
          title="2. Academic Documents"
          subtitle="Upload academic documents and provide the library email date."
        >
          <div className="grid gap-5 md:grid-cols-2">
            <FileField
              label="Upload Student ID Card"
              accept=".png,.jpg,.jpeg,image/png,image/jpeg"
              file={form.idCardFile}
              disabled={isLocked}
              onChange={(file) => setField("idCardFile", file)}
              helper="Accepted: PNG / JPG / JPEG"
            />

            <FileField
              label="Upload BTP Report"
              accept=".pdf,.doc,.docx,application/pdf,.doc,.docx"
              file={form.btpReportFile}
              disabled={isLocked}
              onChange={(file) => setField("btpReportFile", file)}
              helper="Accepted: PDF / DOC / DOCX"
            />
          </div>

          <div className="mt-5 max-w-md">
            <InputField
              label="Library Email Sent Date"
              type="date"
              value={form.libraryEmailDate}
              disabled={isLocked}
              onChange={(e) => setField("libraryEmailDate", e.target.value)}
            />
            <WarningText>
              BTP report signed by supervisor must be emailed to
              circulation.library@lnmiit.ac.in. Enter the exact date when the
              email was sent. If incorrect date is found, request may be
              rejected.
            </WarningText>
          </div>
        </SectionCard>

        <SectionCard
          title="3. Club / Fest Role"
          subtitle="Mention whether you were part of any club or fest organizing committee."
        >
          <div className="grid gap-5 md:grid-cols-2">
            <SelectField
              label="Role Type"
              value={form.clubRoleType}
              disabled={isLocked}
              onChange={(e) => setField("clubRoleType", e.target.value)}
              options={CLUB_ROLE_OPTIONS}
            />

            {form.clubRoleType === "Club Coordinator" && (
              <InputField
                label="Mention Club / Role"
                value={form.clubRoleDetail}
                disabled={isLocked}
                onChange={(e) => setField("clubRoleDetail", e.target.value)}
                placeholder="Enter club and role"
              />
            )}

            {form.clubRoleType === "Fest Organizing Committee" && (
              <InputField
                label="Mention Fest / Role"
                value={form.festRoleDetail}
                disabled={isLocked}
                onChange={(e) => setField("festRoleDetail", e.target.value)}
                placeholder="Enter fest and role"
              />
            )}

            {form.clubRoleType === "Both" && (
              <>
                <InputField
                  label="Club Name / Role"
                  value={form.clubRoleDetail}
                  disabled={isLocked}
                  onChange={(e) => setField("clubRoleDetail", e.target.value)}
                  placeholder="Enter club and role"
                />
                <InputField
                  label="Fest Name / Role"
                  value={form.festRoleDetail}
                  disabled={isLocked}
                  onChange={(e) => setField("festRoleDetail", e.target.value)}
                  placeholder="Enter fest and role"
                />
              </>
            )}
          </div>
        </SectionCard>

        <SectionCard
          title="4. Placement Information"
          subtitle="Students must email their placement details to info.tpc@lnmiit.ac.in."
        >
          <div className="grid gap-5 md:grid-cols-2">
            <SelectField
              label="Placement Status"
              value={form.placementStatus}
              disabled={isLocked}
              onChange={(e) => setField("placementStatus", e.target.value)}
              options={PLACEMENT_STATUSES}
            />

            <InputField
              label="TPC Email Sent Date"
              type="date"
              value={form.tpcEmailDate}
              disabled={isLocked}
              onChange={(e) => setField("tpcEmailDate", e.target.value)}
            />
          </div>

          <WarningText>
            Students must email all placement details to info.tpc@lnmiit.ac.in.
            If incorrect email date or details are found, the request may be
            cancelled immediately.
          </WarningText>

          {form.placementStatus === "Placed" && (
            <div className="mt-5 max-w-xl">
              <FileField
                label="Offer Letter"
                accept=".pdf,.jpg,.jpeg,.png"
                file={form.offerLetterFile}
                disabled={isLocked}
                onChange={(file) => setField("offerLetterFile", file)}
              />
            </div>
          )}

          {form.placementStatus === "Unplaced" && (
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <TextAreaField
                label="What are you currently doing?"
                value={form.placementDetailsText}
                disabled={isLocked}
                onChange={(e) =>
                  setField("placementDetailsText", e.target.value)
                }
                placeholder="Explain your current preparation / plan"
              />
              <FileField
                label="Placement Declaration"
                accept=".pdf,application/pdf"
                file={form.placementDeclarationFile}
                disabled={isLocked}
                onChange={(file) => setField("placementDeclarationFile", file)}
                helper="Accepted: PDF only"
              />
            </div>
          )}

          {(form.placementStatus === "Preparation Break" ||
            form.placementStatus === "Family Business") && (
            <div className="mt-5 max-w-xl">
              <FileField
                label="Placement Declaration"
                accept=".pdf,application/pdf"
                file={form.placementDeclarationFile}
                disabled={isLocked}
                onChange={(file) => setField("placementDeclarationFile", file)}
                helper="Accepted: PDF only"
              />
            </div>
          )}

          {isHigherStudies && (
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <FileField
                label="Admission Letter"
                accept=".pdf,.jpg,.jpeg,.png"
                file={form.admissionLetterFile}
                disabled={isLocked}
                onChange={(file) => setField("admissionLetterFile", file)}
              />

              <FileField
                label="Exam Scorecard / Call Letter"
                accept=".pdf,.jpg,.jpeg,.png"
                file={form.examScorecardFile}
                disabled={isLocked}
                onChange={(file) => setField("examScorecardFile", file)}
              />
            </div>
          )}

          {isHigherStudies && (
            <WarningText>
              For higher studies, at least one of admission letter or exam
              scorecard / call letter is mandatory.
            </WarningText>
          )}
        </SectionCard>

        <SectionCard
          title="5. Refund / Declaration Details"
          subtitle="Fill bank and declaration information for caution money refund."
        >
          <div className="grid gap-5 md:grid-cols-2">
            <InputField
              label="Account Holder Name"
              value={form.accountHolderName}
              disabled={isLocked}
              onChange={(e) => setField("accountHolderName", e.target.value)}
            />

            <InputField
              label="Bank Account Number"
              value={form.bankAccountNumber}
              disabled={isLocked}
              onChange={(e) => setField("bankAccountNumber", e.target.value)}
            />

            <InputField
              label="Bank Name"
              value={form.bankName}
              disabled={isLocked}
              onChange={(e) => setField("bankName", e.target.value)}
            />

            <InputField
              label="Branch"
              value={form.bankBranch}
              disabled={isLocked}
              onChange={(e) => setField("bankBranch", e.target.value)}
            />

            <InputField
              label="City"
              value={form.bankCity}
              disabled={isLocked}
              onChange={(e) => setField("bankCity", e.target.value)}
            />

            <InputField
              label="IFSC Code"
              value={form.ifscCode}
              disabled={isLocked}
              onChange={(e) => setField("ifscCode", e.target.value.toUpperCase())}
            />

            <InputField
              label="Donation Amount"
              type="number"
              value={form.donationAmount}
              disabled={isLocked}
              onChange={(e) => setField("donationAmount", e.target.value)}
            />

            <InputField
              label="Student Contact Number"
              value={form.studentContactNumber}
              disabled={isLocked}
              onChange={(e) =>
                setField("studentContactNumber", e.target.value)
              }
            />

            <InputField
              label="Father’s Name"
              value={form.fatherName}
              disabled={isLocked}
              onChange={(e) => setField("fatherName", e.target.value)}
            />

            <InputField
              label="Father’s Mobile Number"
              value={form.fatherMobileNumber}
              disabled={isLocked}
              onChange={(e) =>
                setField("fatherMobileNumber", e.target.value)
              }
            />
          </div>

          <div className="mt-5">
            <TextAreaField
              label="Correspondence Address"
              value={form.correspondenceAddress}
              disabled={isLocked}
              onChange={(e) =>
                setField("correspondenceAddress", e.target.value)
              }
              placeholder="Enter full correspondence address"
            />
          </div>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <FileField
              label="Cancelled Cheque Upload"
              accept=".png,.jpg,.jpeg,image/png,image/jpeg"
              file={form.cancelledChequeFile}
              disabled={isLocked}
              onChange={(file) => setField("cancelledChequeFile", file)}
              helper="Accepted: PNG / JPG / JPEG"
            />

            <div className="rounded-xl border border-white/10 bg-black/20 p-4">
              <p className="text-sm font-semibold text-white/80">
                Refund Declaration
              </p>
              <p className="mt-3 text-sm text-white/70">
                I wish to donate Rs {form.donationAmount || "0"} from my caution
                money refund due, from the Institute, towards Students Welfare
                Fund of LNMIIT.
              </p>

              <div className="mt-4">
                <label className="flex items-start gap-3 text-sm text-white/80">
                  <input
                    type="checkbox"
                    checked={form.declarationAccepted}
                    disabled={isLocked}
                    onChange={(e) =>
                      setField("declarationAccepted", e.target.checked)
                    }
                    className="mt-1 h-4 w-4 rounded border-white/20 bg-neutral-950"
                  />
                  <span>I declare that the above information is correct.</span>
                </label>
              </div>

              <div className="mt-4">
                <label className="block text-sm text-white/80">
                  Submitted Date (auto-detected on save profile)
                </label>
                <input
                  type="date"
                  value={form.submittedDate}
                  disabled={true}
                  className="mt-2 w-full rounded-xl border border-white/15 bg-neutral-950 px-4 py-3 text-sm text-white opacity-70"
                />
              </div>
            </div>
          </div>
        </SectionCard>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">
                6. Final Confirmation
              </h2>
              <p className="mt-1 text-sm text-white/60">
                Review all fields carefully before saving. After saving, profile
                gets locked until you click Edit Profile.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {profileSaved && (
                <button
                  type="button"
                  onClick={() => navigate("/student/apply")}
                  className="rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
                >
                  Go to Apply for No Dues
                </button>
              )}

              <button
                type="button"
                disabled={!profileComplete || isLocked}
                onClick={handleSaveClick}
                className={`rounded-xl px-5 py-3 text-sm font-semibold text-white ${
                  !profileComplete || isLocked
                    ? "cursor-not-allowed bg-blue-600/40"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                Save Profile
              </button>
            </div>
        </div>

      </div>

      <ConfirmModal
        open={confirmOpen}
        title="Confirm Profile Save"
        message="Please confirm that all the information provided is correct."
        confirmText="Yes, correct"
        cancelText="I have to recheck"
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirmSave}
      />
    </>
  );
}