import { Outlet, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

import Header from "../../Header/Header";
import { initialPendingStudents } from "../../../Data/students";

const LABS_BY_DEPARTMENT = {
  "cse-cce": [
    "Computer Lab -1 (Mr. Shivam Maheshwari)",
    "Computer Lab -2 (Mrs. Shivangee Singh)",
    "Computer Lab -3 (Mr. Dinesh Kumar Sharma)",
    "CMLBDA Lab (Mr. Manish Kumar Mittal)",
  ],

  "ece-cce": [
    "Microwave Lab (Mr. Kamta Sharma)",
    "ADC Lab (Mr. Dharam Pal Yadav)",
    "TI Lab (Mr. Vinod Kumar)",
    "DSP Lab (Mr. Kushmakar Sharma)",
    "E-CAD Lab (Mr. Ajay Naresh)",
    "BE Lab (Mr. Pavan Sharma)",
  ],

  mech: [
    "Mechanical Workshop (Mr. Bhagwan Singh)",
    "Mechatronics Lab (Mr. Udayveer Singh)",
    "Robotics Lab (Mr. Udayveer Singh)",
    "CIM Lab (Mr. Satish Yadav)",
    "CAD Lab (Mr. Satyanarayan Prajapat)",
    "K&D Lab (Mr. Satyanarayan Prajapat)",
    "Material Characterization Lab (Mr. Satyanarayan Prajapat)",
    "Measurement Lab (Mr. Bhagwan Singh & Mr. Udayveer Singh)",
    "FMM Lab (Mr. Sandeep Kumar Saxena)",
    "IC Engine Lab (Mr. Sandeep Kumar Saxena)",
    "Thermodynamics Lab (Mr. Sandeep Kumar Saxena)",
    "Heat Transfer Lab (Mr. Sandeep Kumar Saxena)",
    "Engineering Graphics Lab (Mr. Satyanarayan Prajapat)",
    "Automotive Lab (Mr. Tej Bahadur Yadav)",
    "CRIA Lab (Mr. Tej Bahadur Yadav)",
  ],

  physics: [
    "UG Physics Lab (Mr. Laxmi Narayan Sharma)",
    "UG Physics Optics Lab (Mr. Laxmi Narayan Sharma)",
  ],
};

function createLabState(labs) {
  const state = {};

  labs.forEach((lab) => {
    state[lab] = {
      pending: initialPendingStudents.map((student) => ({ ...student })),
      approved: [],
      rejected: [],
    };
  });

  return state;
}

export default function LabsLayout() {
  const { department } = useParams();

  const LABS = LABS_BY_DEPARTMENT[department] || [];

  const [selectedLab, setSelectedLab] = useState("");
  const [labData, setLabData] = useState(() => createLabState(LABS));

  // reset when department changes
  useEffect(() => {
    setSelectedLab("");
    setLabData(createLabState(LABS));
  }, [department]);

  const currentLabState = selectedLab
    ? labData[selectedLab] || { pending: [], approved: [], rejected: [] }
    : { pending: [], approved: [], rejected: [] };

  const pending = useMemo(() => {
    if (!selectedLab) return [];
    return currentLabState.pending;
  }, [selectedLab, currentLabState]);

  const approved = useMemo(() => {
    if (!selectedLab) return [];
    return currentLabState.approved;
  }, [selectedLab, currentLabState]);

  const rejected = useMemo(() => {
    if (!selectedLab) return [];
    return currentLabState.rejected;
  }, [selectedLab, currentLabState]);

  const approveStudent = (student) => {
    if (!selectedLab) return;

    setLabData((prev) => {
      const current = prev[selectedLab] || {
        pending: [],
        approved: [],
        rejected: [],
      };

      return {
        ...prev,
        [selectedLab]: {
          ...current,
          pending: current.pending.filter((x) => x.id !== student.id),
          approved: [
            student,
            ...current.approved.filter((x) => x.id !== student.id),
          ],
        },
      };
    });
  };

  const rejectStudent = (student, rejectionReason) => {
    if (!selectedLab) return;

    const rejectedStudent = {
      ...student,
      rejectionReason,
      rejectedAt: new Date().toISOString(),
    };

    setLabData((prev) => {
      const current = prev[selectedLab] || {
        pending: [],
        approved: [],
        rejected: [],
      };

      return {
        ...prev,
        [selectedLab]: {
          ...current,
          pending: current.pending.filter((x) => x.id !== student.id),
          rejected: [
            rejectedStudent,
            ...current.rejected.filter((x) => x.id !== student.id),
          ],
        },
      };
    });
  };

  const moveApprovedToRejected = (student, rejectionReason) => {
    if (!selectedLab) return;

    const rejectedStudent = {
      ...student,
      rejectionReason,
      rejectedAt: new Date().toISOString(),
    };

    setLabData((prev) => {
      const current = prev[selectedLab] || {
        pending: [],
        approved: [],
        rejected: [],
      };

      return {
        ...prev,
        [selectedLab]: {
          ...current,
          approved: current.approved.filter((x) => x.id !== student.id),
          rejected: [
            rejectedStudent,
            ...current.rejected.filter((x) => x.id !== student.id),
          ],
        },
      };
    });
  };

  const moveRejectedToApproved = (student) => {
    if (!selectedLab) return;

    setLabData((prev) => {
      const current = prev[selectedLab] || {
        pending: [],
        approved: [],
        rejected: [],
      };

      return {
        ...prev,
        [selectedLab]: {
          ...current,
          rejected: current.rejected.filter((x) => x.id !== student.id),
          approved: [
            student,
            ...current.approved.filter((x) => x.id !== student.id),
          ],
        },
      };
    });
  };

  const pendingCount = selectedLab ? pending.length : 0;

  return (
    <div className="min-h-screen bg-neutral-900">
      <Header
        role="labs"
        basePath={`/labs/${department}`}
        pendingCount={pendingCount}
        subTitle={selectedLab ? selectedLab : ""}
      />

      <main className="mx-auto max-w-7xl px-6 py-8">
        <Outlet
          context={{
            department,
            LABS,
            selectedLab,
            setSelectedLab,
            pending,
            approved,
            rejected,
            labSelected: Boolean(selectedLab),
            approveStudent,
            rejectStudent,
            moveApprovedToRejected,
            moveRejectedToApproved,
          }}
        />
      </main>
    </div>
  );
}