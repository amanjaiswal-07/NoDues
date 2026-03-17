import { useState } from "react";
import { initialAccessList } from "../../Data/accessRoutes";
import DepartmentAddAccessModal from "../Modal/DepartmentAddAccessModal";
import DepartmentRemoveAccessModal from "../Modal/DepartmentRemoveAccessModal";

export default function DepartmentAccessManager({ currentRoute }) {
  const [accessList, setAccessList] = useState(initialAccessList);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const routeUsers = accessList.filter((item) => item.route === currentRoute);

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
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

  const openRemoveModal = (user) => {
    setSelectedUser(user);
    setShowRemoveModal(true);
  };

  const closeRemoveModal = () => {
    setSelectedUser(null);
    setShowRemoveModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddAccess = (e) => {
    e.preventDefault();

    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim().toLowerCase();

    if (!trimmedName || !trimmedEmail) return;

    const alreadyExists = accessList.some(
      (item) =>
        item.email.toLowerCase() === trimmedEmail && item.route === currentRoute
    );

    if (alreadyExists) return;

    const newAccess = {
      id: Date.now(),
      name: trimmedName,
      email: trimmedEmail,
      route: currentRoute,
    };

    setAccessList((prev) => [newAccess, ...prev]);
    closeAddModal();
  };

  const handleRemoveAccess = () => {
    if (!selectedUser) return;

    setAccessList((prev) => prev.filter((item) => item.id !== selectedUser.id));
    closeRemoveModal();
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white shadow-lg backdrop-blur">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Department Access</h2>
          <p className="mt-1 text-sm text-white/65">
            Manage which email IDs are allowed to access this department.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
        >
          + Add Access
        </button>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-black/20">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm text-white/80">
            <thead className="bg-white/5 text-xs uppercase tracking-wide text-white/50">
              <tr>
                <th className="px-5 py-4">Name</th>
                <th className="px-5 py-4">Email</th>
                <th className="px-5 py-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {routeUsers.map((user) => (
                <tr key={user.id} className="border-t border-white/10">
                  <td className="px-5 py-4">{user.name}</td>
                  <td className="px-5 py-4">{user.email}</td>
                  <td className="px-5 py-4">
                    <button
                      onClick={() => openRemoveModal(user)}
                      className="rounded-lg border border-red-400/20 px-3 py-1.5 text-xs text-red-400 hover:bg-red-500/10"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}

              {routeUsers.length === 0 && (
                <tr>
                  <td
                    colSpan="3"
                    className="px-5 py-8 text-center text-sm text-white/50"
                  >
                    No authorized users found for this department.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <DepartmentAddAccessModal
        isOpen={showAddModal}
        formData={formData}
        onChange={handleChange}
        onClose={closeAddModal}
        onSubmit={handleAddAccess}
      />

      <DepartmentRemoveAccessModal
        isOpen={showRemoveModal}
        user={selectedUser}
        onClose={closeRemoveModal}
        onConfirm={handleRemoveAccess}
      />
    </div>
  );
}