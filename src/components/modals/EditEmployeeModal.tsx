import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { updateEmployee } from "../../store/employeeSlice";

interface EditEmployeeModalProps {
  setIsEditEmployeeModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editEmployeeId: number;
}

const EditEmployeeModal: React.FC<EditEmployeeModalProps> = ({
  setIsEditEmployeeModalOpen,
  editEmployeeId,
}) => {
  const employees = useSelector((state: RootState) => state.employee.employees);
  const employee = employees.find((employee) => employee.id === editEmployeeId);
  const [name, setName] = useState<string | undefined>(employee?.name);
  const [email, setEmail] = useState<string | undefined>(employee?.email);

  const dispatch = useDispatch();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h3 className="text-xl font-semibold mb-4">Edit Employee</h3>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="editTitle"
          >
            Name
          </label>
          <input
            id="editTitle"
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded"
            placeholder="Enter employee title"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="editAuthor"
          >
            Email
          </label>
          <input
            id="editAuthor"
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded"
            placeholder="Enter employee author"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            className="bg-gray-500 text-white font-bold py-2 px-4 rounded"
            onClick={() => setIsEditEmployeeModalOpen(false)}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              dispatch(
                updateEmployee({
                  id: editEmployeeId,
                  name: name,
                  email: email,
                })
              );
              setIsEditEmployeeModalOpen(false);
            }}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditEmployeeModal;
