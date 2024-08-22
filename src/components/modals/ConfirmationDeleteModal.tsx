import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { deleteEmployee } from "../../store/employeeSlice";

interface ConfirmationDeleteModalProps {
  setIsConfirmDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  deleteEmployeeId: number;
}

const ConfirmationDeleteModal: React.FC<ConfirmationDeleteModalProps> = ({
  setIsConfirmDeleteModalOpen,
  deleteEmployeeId,
}) => {
  const dispatch = useDispatch();

  const handleEmployeeDelete = () => {
    dispatch(deleteEmployee(deleteEmployeeId));
    setIsConfirmDeleteModalOpen(false);
  };

  const employees = useSelector((state: RootState) => state.employee.employees);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h3 className="text-xl font-semibold mb-4">Confirm Deletion</h3>
        <p className="text-gray-700 mb-4">
          Are you sure you want to delete this employee?
          <span className="text-lg font-semibold ml-2">
            {
              employees.find((employee) => employee.id === deleteEmployeeId)
                ?.name
            }
          </span>
        </p>
        <div className="flex justify-end space-x-4">
          <button
            className="bg-gray-500 text-white font-bold py-2 px-4 rounded"
            onClick={() => setIsConfirmDeleteModalOpen(false)}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 text-white font-bold py-2 px-4 rounded"
            onClick={handleEmployeeDelete}
          >
            Confirm Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDeleteModal;
