import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pencil, Trash2, Eye } from "lucide-react"; // ✅ icons
import { useNavigate } from "react-router-dom";


export default function UsersTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
 const API_BACKEND = import.meta.env.VITE_API_BACKEND1;
  const getUsers = async () => {
    try {
      const res = await axios.get(
       API_BACKEND
      );

      if (res.data.status === "success") {
        setUsers(res.data.data);
      } else {
        setError("Failed to fetch users");
      }
    } catch (err) {
      console.error(err);
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  if (loading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-zinc-900 text-white rounded-xl">
      <h2 className="text-2xl font-bold mb-4">Users List</h2>

      <div className="overflow-x-auto">
        <table className="w-full border border-white/10 rounded-lg overflow-hidden">
          <thead className="bg-zinc-800">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Full Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Time</th>
              <th className="p-3 text-left">Reason</th>
              <th className="p-3 text-left">Actions</th> {/* ✅ NEW */}
            </tr>
          </thead>

          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr
                  key={user.id}
                  className="border-t border-white/10 hover:bg-zinc-800/50 transition"
                >
                  <td className="p-3">{user.id}</td>
                  <td className="p-3">{user.full_Name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.phone_Num}</td>
                  <td className="p-3">{user.Date}</td>
                  <td className="p-3">{user.Time}</td>
                  <td className="p-3">{user.Reason_forVisit}</td>

                  {/* ✅ ACTION BUTTONS */}
                  <td className="p-3 flex gap-3">
                    <button
                      className="cursor-pointer text-blue-400 hover:text-blue-300"
                      title="View"
                      onClick={() => console.log("Show user:", user)}
                    >
                      <Eye size={18} />
                    </button>

                    <button
                      className="cursor-pointer text-yellow-400 hover:text-yellow-300"
                      title="Edit"
                      onClick={() => navigate("/edit", { state: user })}
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      className="cursor-pointer text-red-500 hover:text-red-400"
                      title="Delete"
                      onClick={() => console.log("Delete user:", user.id)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center p-4 text-zinc-400">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}