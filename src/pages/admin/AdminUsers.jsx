import React, { useEffect, useRef, useState } from "react";
import api from "../../services/api";
import {
  deleteUser,
  updateUser
} from "../../services/userService";


function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [editingUser, setEditingUser] = useState(null);

  const editFormRef = useRef(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/users");
        setUsers(response.data);
      } catch (error) {
        console.log("Failed to fetch users");
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);

      const response = await api.get("/users");
      setUsers(response.data);

      console.log("User deleted successfully");
    } catch (error) {
      console.log("Failed to delete user");
    }
  };

  const handleUpdateUser = async () => {
  try {
    await updateUser(editingUser.id, {
      name: editingUser.name,
      email: editingUser.email
    });

    const response = await api.get("/users");
    setUsers(response.data);

    setEditingUser(null);

    console.log("User updated successfully");
  } catch (error) {
    console.log("Failed to update user");
  }
};

  return (
    <div>
      {/* Heading */}
      <h1 className="text-3xl font-bold text-gray-800">
        Users
      </h1>

      <p className="text-gray-500 mt-2">
        Manage registered users
      </p>

      {/* Search */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search users..."
        className="mt-4 border px-4 py-2 rounded-lg w-80"
      />

      {/* Total Users */}
      <p className="mt-4 text-gray-600">
        Total Users:{" "}
        <span className="font-bold">
          {users.length}
        </span>
      </p>

      {/* Users Table */}
      <div className="mt-6 overflow-x-auto bg-white rounded-xl shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="px-6 py-4">
                  {user.id}
                </td>

                <td className="px-6 py-4 font-medium">
                  {user.name}
                </td>

                <td className="px-6 py-4">
                  {user.email}
                </td>

                <td className="px-6 py-4">
                  {/* Edit Button */}
                  <button
                    onClick={() => {
                        setEditingUser(user);

                        setTimeout(() => {
                          editFormRef.current?.scrollIntoView({
                            behavior: "smooth"
                          });
                        }, 100);
                      }}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mr-2"
                  >
                    Edit
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => {
                          const confirmed = window.confirm(
                            "Are you sure you want to delete this user?"
                          );

                          if (confirmed) {
                            handleDeleteUser(user.id);
                          }
                        }}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit User Form */}
      {editingUser && (
        <div 
           ref={editFormRef} 
           className="mt-6 bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-bold mb-4">
            Edit User
          </h2>

          {/* Name */}
          <input
            type="text"
            value={editingUser.name}
            onChange={(e) =>
              setEditingUser({
                ...editingUser,
                name: e.target.value
              })
            }
            placeholder="Name"
            className="border px-4 py-2 rounded-lg mr-2"
          />

          {/* Email */}
          <input
            type="email"
            value={editingUser.email}
            onChange={(e) =>
              setEditingUser({
                ...editingUser,
                email: e.target.value
              })
            }
            placeholder="Email"
            className="border px-4 py-2 rounded-lg mr-2"
          />

          {/* Save */}
          <button
            onClick={handleUpdateUser}
            className="bg-green-500 text-white px-4 py-2 rounded-lg mr-2"
          >
            Save
          </button>

          {/* Cancel */}
          <button
            onClick={() => setEditingUser(null)}
            className="bg-gray-300 px-4 py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

export default AdminUsers;