import { useState } from "react";
import { initialAccessList } from "../../../Data/accessRoutes";
import AddAccessModal from "../../Modal/AddAccessModal";
import EditAccessModal from "../../Modal/EditAccessModal";
import RemoveAccessModal from "../../Modal/RemoveAccessModal";

const routeOptions = [
  "/medical",
  "/sports",
  "/store",
  "/administration",
  "/nad",
  "/accounts",
  "/warden",
  "/placement",
  "/lucs",
  "/admin",
  "/library/staff",
  "/library/librarian",
  "/labs/cse-cce",
  "/labs/ece-cce",
  "/labs/mech",
  "/labs/physics",
  "/hod/ece",
  "/hod/cce",
  "/hod/cse",
  "/hod/mech",
];

export default function AdminDepartmentAccess() {
  const [accessList, setAccessList] = useState(initialAccessList);
  const [search, setSearch] = useState("");

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    route: routeOptions[0],
  });

  const filteredList = accessList.filter((item) => {
    const query = search.toLowerCase();
    return (
      item.name.toLowerCase().includes(query) ||
      item.email.toLowerCase().includes(query)
    );
  });

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      route: routeOptions[0],
    });
    setEditingId(null);
  };

  const openAddModal = () => {
    resetForm();
    setShowAddModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
    resetForm();
  };

  const openEditModal = (user) => {
    setFormData({
      name: user.name,
      email: user.email,
      route: user.route,
    });
    setEditingId(user.id);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
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

    if (!trimmedName || !trimmedEmail || !formData.route) return;

    const newAccess = {
      id: Date.now(),
      name: trimmedName,
      email: trimmedEmail,
      route: formData.route,
    };

    setAccessList((prev) => [newAccess, ...prev]);
    closeAddModal();
  };

  const handleEditAccess = (e) => {
    e.preventDefault();

    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim().toLowerCase();

    if (!trimmedName || !trimmedEmail || !formData.route) return;

    setAccessList((prev) =>
      prev.map((item) =>
        item.id === editingId
          ? {
              ...item,
              name: trimmedName,
              email: trimmedEmail,
              route: formData.route,
            }
          : item
      )
    );

    closeEditModal();
  };

  const handleRemoveAccess = () => {
    if (!selectedUser) return;
    setAccessList((prev) => prev.filter((item) => item.id !== selectedUser.id));
    closeRemoveModal();
  };

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white">
            Department Wise Access Control
          </h2>
          <p className="mt-1 text-sm text-white/60">
            Manage which email IDs are allowed to log in and where they should be routed.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
        >
          + Add Access
        </button>
      </section>

      <section>
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none focus:border-blue-500"
        />
      </section>

      <section className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm text-white/80">
            <thead className="bg-white/5 text-xs uppercase tracking-wide text-white/50">
              <tr>
                <th className="px-5 py-4">Name</th>
                <th className="px-5 py-4">Email</th>
                <th className="px-5 py-4">Route</th>
                <th className="px-5 py-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredList.map((user) => (
                <tr key={user.id} className="border-t border-white/10">
                  <td className="px-5 py-4">{user.name}</td>
                  <td className="px-5 py-4">{user.email}</td>
                  <td className="px-5 py-4">
                    <span className="rounded-lg bg-blue-500/10 px-3 py-1 text-xs text-blue-400">
                      {user.route}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEditModal(user)}
                        className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-white/75 hover:bg-white/10"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => openRemoveModal(user)}
                        className="rounded-lg border border-red-400/20 px-3 py-1.5 text-xs text-red-400 hover:bg-red-500/10"
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredList.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-5 py-8 text-center text-sm text-white/50">
                    No access records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <AddAccessModal
        isOpen={showAddModal}
        formData={formData}
        routeOptions={routeOptions}
        onChange={handleChange}
        onClose={closeAddModal}
        onSubmit={handleAddAccess}
      />

      <EditAccessModal
        isOpen={showEditModal}
        formData={formData}
        routeOptions={routeOptions}
        onChange={handleChange}
        onClose={closeEditModal}
        onSubmit={handleEditAccess}
      />

      <RemoveAccessModal
        isOpen={showRemoveModal}
        user={selectedUser}
        onClose={closeRemoveModal}
        onConfirm={handleRemoveAccess}
      />
    </div>
  );
}