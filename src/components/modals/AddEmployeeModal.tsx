import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addEmployee } from "../../store/employeeSlice";

interface Employee {
  id: number;
  name?: string;
  email?: string;
  joinedDate?: string;
  position?: string;
  status?: string;
  department?: string;
}

interface AddEmployeeModalProps {
  setIsAddEmployeeModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({
  setIsAddEmployeeModalOpen,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const handleAddEmployee = () => {
    if (name && email) {
      const newEmployee: Employee = {
        id: Date.now(),
        name,
        email,
      };
      dispatch(addEmployee(newEmployee));
      setName("");
      setEmail("");
      setIsAddEmployeeModalOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h3 className="text-xl font-semibold mb-4">Add Employee</h3>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded"
            placeholder="Enter employee name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded"
            placeholder="Enter employee email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 mr-10 rounded"
          onClick={handleAddEmployee}
        >
          Add Employee
        </button>
        <button
          className="bg-gray-500 text-white font-bold py-2 px-4 rounded"
          onClick={() => setIsAddEmployeeModalOpen(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddEmployeeModal;
