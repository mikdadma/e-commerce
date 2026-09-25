import React, { useEffect, useState } from "react";
import api from "../../services/api";

function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");

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

const filteredUsers = users.filter((user) =>
  user.name.toLowerCase().includes(search.toLowerCase()) ||
  user.email.toLowerCase().includes(search.toLowerCase())
);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800">
        Users
      </h1>

      <p className="text-gray-500 mt-2">
        Manage registered users
      </p>

      <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users..."
            className="mt-4 border px-4 py-2 rounded-lg w-80"
      />

      <p className="mt-4 text-gray-600">
            Total Users: <span className="font-bold">{users.length}</span>
      </p>

      <div className="mt-6 overflow-x-auto bg-white rounded-xl shadow-sm">
            <table className="w-full text-left">
                <thead className="bg-gray-100">
                <tr>
                    <th className="px-6 py-4">ID</th>
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Email</th>
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
                    </tr>
                ))}
                </tbody>
            </table>
            </div>

    </div>
  );
}

export default AdminUsers;