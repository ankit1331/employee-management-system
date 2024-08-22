import React, { useState } from "react";
import AddEmployeeModal from "./modals/AddEmployeeModal";

interface EmployeeManagementProps {
  user: null | { username: string; role: "admin" | "member" };
}

const EmployeeManagement: React.FC<EmployeeManagementProps> = ({ user }) => {
  const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false);

  return (
    <>
      <div className="flex">
        {user?.role === "admin" && (
          <div className="bg-white p-4 rounded shadow-md mb-6">
            <button
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
              onClick={() => setIsAddEmployeeModalOpen(true)}
            >
              Add Employee
            </button>
          </div>
        )}
      </div>
      {isAddEmployeeModalOpen && (
        <AddEmployeeModal
          setIsAddEmployeeModalOpen={setIsAddEmployeeModalOpen}
        />
      )}
    </>
  );
};

export default EmployeeManagement;
