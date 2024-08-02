import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { checkValidData } from "../utilis/Validate.js";

const UserForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);

  const firstName = useRef(null);
  const lastName = useRef(null);
  const phone = useRef(null);
  const email = useRef(null);
  const role = useRef(null);
  const location = useRef(null);
  const department = useRef(null);

  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/api/users/${id}`);
          const user = response.data;
          firstName.current.value = user.firstName;
          lastName.current.value = user.lastName;
          phone.current.value = user.phone;
          email.current.value = user.email;
          role.current.value = user.role;
          location.current.value = user.location;
          department.current.value = user.department;
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      };
      fetchUser();
    }
  }, [id]);

  const handleButtonClick = async () => {
    const message = checkValidData(email.current.value);
    setErrorMessage(message);
    if (message) return;
    const user = {
      firstName: firstName.current.value,
      lastName: lastName.current.value,
      phone: phone.current.value,
      email: email.current.value,
      role: role.current.value,
      location: location.current.value,
      department: department.current.value,
    };
  
    try {
      if (id) {
        await axios.put(`http://localhost:8000/api/users/${id}`, user);
      } else {
        await axios.post('http://localhost:8000/api/register', user);
      }
      navigate("/"); 
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Error saving user data");
    }
  };

  return (
    <div className="container mx-auto p-4 border-2 border-solid border-gray-700 mt-40">
      {errorMessage && (
        <div className="text-red-600 mb-2">
          {errorMessage}
        </div>
      )}
      <div className="text-right text-sm text-gray-600 mb-2">
        All fields are mandatory
      </div>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              FIRST NAME *
            </label>
            <input
              ref={firstName}
              type="text"
              placeholder="First Name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              LAST NAME *
            </label>
            <input
              ref={lastName}
              type="text"
              placeholder="Last Name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              PHONE *
            </label>
            <input
              ref={phone}
              type="text"
              placeholder="Phone Number"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              EMAIL ID *
            </label>
            <input
              ref={email}
              type="email"
              placeholder="Email Id"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              ROLE *
            </label>
            <input
              ref={role}
              type="text"
              placeholder="Role"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              LOCATION *
            </label>
            <input
              ref={location}
              type="text"
              placeholder="Location"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              DEPARTMENT *
            </label>
            <input
              ref={department}
              type="text"
              placeholder="Department"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>
        <div className="pt-4 flex justify-between">
          <button
            className="text-white font-bold py-2 px-4 rounded bg-green-500 hover:bg-green-700"
            onClick={handleButtonClick}
          >
            {id ? "Update" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
