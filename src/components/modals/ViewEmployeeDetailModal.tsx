import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface ViewEmployeeDetailModalProps {
  setIsViewEmployeeDetailModalOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  viewEmployeeDetailId: number;
}

const ViewEmployeeDetailModal: React.FC<ViewEmployeeDetailModalProps> = ({
  setIsViewEmployeeDetailModalOpen,
  viewEmployeeDetailId,
}) => {
  const employees = useSelector((state: RootState) => state.employee.employees);
  const employee = employees.find(
    (employee) => employee.id === viewEmployeeDetailId
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h3 className="text-xl font-semibold mb-4 text-center">
          Employee Details
        </h3>
        <div className="mb-4">
          <h4 className="text-gray-600 mb-4">
            <span className="font-bold">Name : </span>
            {employee?.name}
          </h4>
          <p className="text-gray-600 mb-4">
            {" "}
            <span className="font-bold">Email : </span>
            {employee?.email}
          </p>
          <p className="text-gray-600 mb-4">
            {" "}
            <span className="font-bold">Position : </span>
            {employee?.position}
          </p>
          <p className="text-gray-600 mb-4">
            {" "}
            <span className="font-bold">Department : </span>
            {employee?.department}
          </p>
          <p className="text-gray-600 mb-4">
            {" "}
            <span className="font-bold">Joining Date : </span>
            {employee?.joinedDate}
          </p>
        </div>
        <div className="mb-4"></div>
        <div className="flex justify-center space-x-4">
          <button
            className="bg-gray-500 text-white font-bold py-2 px-4 rounded"
            onClick={() => setIsViewEmployeeDetailModalOpen(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewEmployeeDetailModal;
