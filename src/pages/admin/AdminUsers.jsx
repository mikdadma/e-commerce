import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import api from "../../services/api";
import {
  deleteUser,
  updateUser
} from "../../services/userService";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [editingUser, setEditingUser] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const editFormRef = useRef(null);

  // =========================
  // FETCH USERS
  // =========================

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/users");

      setUsers(response.data);
    } catch (error) {
      console.log("Failed to fetch users");

      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // =========================
  // SEARCH
  // =========================

  const filteredUsers = users.filter((user) => {
    const name = user.name || "";
    const email = user.email || "";

    return (
      name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      email
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  });

  // =========================
  // DELETE USER
  // =========================

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);

      await fetchUsers();

      toast.success("User deleted successfully");
    } catch (error) {
      console.log("Failed to delete user");

      toast.error("Failed to delete user");
    }
  };

  // =========================
  // EDIT USER
  // =========================

  const handleEdit = (user) => {
    setEditingUser({
      id: user.id,
      name: user.name,
      email: user.email
    });

    setTimeout(() => {
      editFormRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }, 100);
  };

  // =========================
  // UPDATE USER
  // =========================

  const handleUpdateUser = async () => {
    if (!editingUser.name.trim()) {
      toast.warning("Name is required");
      return;
    }

    if (!editingUser.email.trim()) {
      toast.warning("Email is required");
      return;
    }

    if (
      !editingUser.email.includes("@") ||
      !editingUser.email.includes(".")
    ) {
      toast.warning("Please enter a valid email");
      return;
    }

    try {
      await updateUser(editingUser.id, {
        name: editingUser.name,
        email: editingUser.email
      });

      await fetchUsers();

      setEditingUser(null);

      toast.success("User updated successfully");
    } catch (error) {
      console.log("Failed to update user");

      toast.error("Failed to update user");
    }
  };

  return (
    <div className="w-full min-w-0">

      {/* =========================
          PAGE HEADER
      ========================== */}

      <div>
        <h1 className="
          text-2xl
          sm:text-3xl
          font-bold
          text-gray-800
        ">
          Users
        </h1>

        <p className="
          text-gray-500
          mt-2
        ">
          Manage registered users
        </p>
      </div>


      {/* =========================
          SEARCH
      ========================== */}

      <div className="mt-5">

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search users..."
          className="
            w-full
            sm:max-w-md
            border
            border-gray-300
            px-4
            py-3
            rounded-lg
            outline-none
            focus:ring-2
            focus:ring-blue-400
          "
        />

      </div>


      {/* =========================
          TOTAL USERS
      ========================== */}

      <p className="
        mt-4
        text-gray-600
      ">
        Total Users:{" "}
        <span className="font-bold">
          {users.length}
        </span>
      </p>


      {/* =========================
          ERROR
      ========================== */}

      {error && (
        <div className="
          mt-6
          bg-red-100
          text-red-600
          px-4
          py-3
          rounded-lg
        ">
          {error}
        </div>
      )}


      {/* =========================
          MOBILE USERS
      ========================== */}

      <div className="
        block
        lg:hidden
        mt-6
        space-y-4
      ">

        {loading ? (

          <div className="
            bg-white
            rounded-xl
            shadow-sm
            p-6
            text-center
            text-gray-500
          ">
            Loading users...
          </div>

        ) : filteredUsers.length === 0 ? (

          <div className="
            bg-white
            rounded-xl
            shadow-sm
            p-6
            text-center
            text-gray-500
          ">
            No users found
          </div>

        ) : (

          filteredUsers.map((user) => (

            <div
              key={user.id}
              className="
                bg-white
                rounded-xl
                shadow-sm
                p-4
              "
            >

              {/* USER INFO */}

              <div>

                <h3 className="
                  text-lg
                  font-bold
                  text-gray-800
                  break-words
                ">
                  {user.name}
                </h3>

                <p className="
                  text-sm
                  text-gray-500
                  mt-1
                  break-all
                ">
                  {user.email}
                </p>

              </div>


              {/* ID */}

              <div className="
                mt-4
                bg-gray-50
                rounded-lg
                p-3
              ">

                <p className="
                  text-xs
                  text-gray-500
                ">
                  User ID
                </p>

                <p className="
                  text-sm
                  font-medium
                  mt-1
                  break-all
                ">
                  {user.id}
                </p>

              </div>


              {/* BUTTONS */}

              <div className="
                flex
                gap-2
                mt-4
              ">

                <button
                  type="button"
                  onClick={() => handleEdit(user)}
                  className="
                    flex-1
                    bg-blue-500
                    text-white
                    px-4
                    py-2
                    rounded-lg
                    hover:bg-blue-600
                  "
                >
                  Edit
                </button>


                <button
                  type="button"
                  onClick={() => {

                    const confirmed =
                      window.confirm(
                        "Are you sure you want to delete this user?"
                      );

                    if (confirmed) {
                      handleDeleteUser(user.id);
                    }

                  }}
                  className="
                    flex-1
                    bg-red-500
                    text-white
                    px-4
                    py-2
                    rounded-lg
                    hover:bg-red-600
                  "
                >
                  Delete
                </button>

              </div>

            </div>

          ))

        )}

      </div>


      {/* =========================
          DESKTOP TABLE
      ========================== */}

      <div className="
        hidden
        lg:block
        mt-6
        bg-white
        rounded-xl
        shadow-sm
        overflow-hidden
      ">

        <div className="overflow-x-auto">

          <table className="w-full text-left">

            <thead className="bg-gray-100">

              <tr>

                <th className="px-6 py-4">
                  ID
                </th>

                <th className="px-6 py-4">
                  Name
                </th>

                <th className="px-6 py-4">
                  Email
                </th>

                <th className="px-6 py-4">
                  Action
                </th>

              </tr>

            </thead>


            <tbody>

              {loading ? (

                <tr>

                  <td
                    colSpan="4"
                    className="
                      text-center
                      py-8
                      text-gray-500
                    "
                  >
                    Loading users...
                  </td>

                </tr>

              ) : filteredUsers.length === 0 ? (

                <tr>

                  <td
                    colSpan="4"
                    className="
                      text-center
                      py-8
                      text-gray-500
                    "
                  >
                    No users found
                  </td>

                </tr>

              ) : (

                filteredUsers.map((user) => (

                  <tr
                    key={user.id}
                    className="
                      border-t
                      hover:bg-gray-50
                    "
                  >

                    <td className="
                      px-6
                      py-4
                      break-all
                    ">
                      {user.id}
                    </td>


                    <td className="
                      px-6
                      py-4
                      font-medium
                    ">
                      {user.name}
                    </td>


                    <td className="px-6 py-4">
                      {user.email}
                    </td>


                    <td className="px-6 py-4">

                      <div className="flex gap-2">

                        <button
                          type="button"
                          onClick={() =>
                            handleEdit(user)
                          }
                          className="
                            bg-blue-500
                            text-white
                            px-4
                            py-2
                            rounded-lg
                            hover:bg-blue-600
                          "
                        >
                          Edit
                        </button>


                        <button
                          type="button"
                          onClick={() => {

                            const confirmed =
                              window.confirm(
                                "Are you sure you want to delete this user?"
                              );

                            if (confirmed) {
                              handleDeleteUser(
                                user.id
                              );
                            }

                          }}
                          className="
                            bg-red-500
                            text-white
                            px-4
                            py-2
                            rounded-lg
                            hover:bg-red-600
                          "
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>


      {/* =========================
          EDIT USER FORM
      ========================== */}

      {editingUser && (

        <div
          ref={editFormRef}
          className="
            mt-6
            bg-white
            p-4
            sm:p-6
            rounded-xl
            shadow-sm
          "
        >

          <h2 className="
            text-xl
            font-bold
            mb-5
          ">
            Edit User
          </h2>


          {/* NAME */}

          <div className="mb-4">

            <label className="
              block
              mb-1
              font-medium
            ">
              Name
            </label>

            <input
              type="text"
              value={editingUser.name}
              onChange={(e) =>
                setEditingUser({
                  ...editingUser,
                  name: e.target.value
                })
              }
              placeholder="Enter name"
              className="
                border
                border-gray-300
                px-4
                py-3
                rounded-lg
                w-full
                outline-none
                focus:ring-2
                focus:ring-blue-400
              "
            />

          </div>


          {/* EMAIL */}

          <div className="mb-4">

            <label className="
              block
              mb-1
              font-medium
            ">
              Email
            </label>

            <input
              type="email"
              value={editingUser.email}
              onChange={(e) =>
                setEditingUser({
                  ...editingUser,
                  email: e.target.value
                })
              }
              placeholder="Enter email"
              className="
                border
                border-gray-300
                px-4
                py-3
                rounded-lg
                w-full
                outline-none
                focus:ring-2
                focus:ring-blue-400
              "
            />

          </div>


          {/* FORM BUTTONS */}

          <div className="
            flex
            flex-col
            sm:flex-row
            gap-3
          ">

            <button
              type="button"
              onClick={handleUpdateUser}
              className="
                w-full
                sm:w-auto
                bg-green-500
                text-white
                px-5
                py-3
                rounded-lg
                hover:bg-green-600
              "
            >
              Save
            </button>


            <button
              type="button"
              onClick={() => setEditingUser(null)}
              className="
                w-full
                sm:w-auto
                bg-gray-300
                px-5
                py-3
                rounded-lg
                hover:bg-gray-400
              "
            >
              Cancel
            </button>

          </div>

        </div>

      )}

    </div>
  );
}

export default AdminUsers;