import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa6";
import { FiEdit2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LandingPage = () => {
  const [users, setUsers] = useState([]);
  const [searchEmail, setSearchEmail] = useState("");
  const navigate = useNavigate();

  const fetchUsersData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsersData();
  }, []);

  const handleAddUserClick = () => {
    navigate("/add-user");
  };

  const handleEditUserClick = (userId) => {
    navigate(`/edit-user/${userId}`);
  };

  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(searchEmail.toLowerCase())
  );

  return (
    <div>
      <div className="mt-32 flex justify-center">
        <h1 className="p-4 text-2xl">Welcome to User Management System</h1>
      </div>
      <div>
        <div className="flex justify-center pt-4">
          <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold my-4">Manage Users</h1>
            <div className="flex justify-between items-center mb-4">
              <input
                className="border border-gray-300 rounded py-2 px-4"
                placeholder="Search for email"
                value={searchEmail}
                onChange={(e) => setSearchEmail(e.target.value)}
              />
              <button
                className="text-white font-bold py-2 px-4 rounded flex bg-green-500 hover:bg-green-700"
                onClick={handleAddUserClick}
              >
                <FaPlus className="mr-1 mt-1" /> Add
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="table-auto w-full">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-4 py-2">NAME</th>
                    <th className="px-4 py-2">PHONE NO.</th>
                    <th className="px-4 py-2">EMAIL</th>
                    <th className="px-4 py-2">ROLE</th>
                    <th className="px-4 py-2">LOCATION</th>
                    <th className="px-4 py-2">FUNCTION</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user._id} className="text-center border-b">
                      <td className="px-4 py-2">{`${user.firstName} ${user.lastName}`}</td>
                      <td className="px-4 py-2">{user.phone}</td>
                      <td className="px-4 py-2">{user.email}</td>
                      <td className="px-4 py-2">{user.role}</td>
                      <td className="px-4 py-2">{user.location}</td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() => handleEditUserClick(user._id)}
                          className="font-bold py-1 px-2 rounded opacity-0 hover:opacity-100"
                        >
                          <FiEdit2 />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
