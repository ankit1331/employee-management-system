import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { useQuery } from "@tanstack/react-query";
import EditEmployeeModal from "./modals/EditEmployeeModal";
import ConfirmationDeleteModal from "./modals/ConfirmationDeleteModal";
import { addAllEmployees } from "../store/employeeSlice";
import ViewEmployeeDetailModal from "./modals/ViewEmployeeDetailModal";

interface EmployeeListProps {
  user: null | { username: string; role: "admin" | "member" };
}

interface Employee {
  id: number;
  name: string;
  email: string;
  position: string;
  department: string;
  joinedDate: string;
  status: string;
}

const fetchEmployees = async (): Promise<Employee[]> => {
  const response = await fetch("http://localhost:5000/employees");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const EmployeeList: React.FC<EmployeeListProps> = ({ user }) => {
  const [isEditEmployeeModalOpen, setIsEditEmployeeModalOpen] = useState(false);
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);
  const [isViewEmployeeDetailModalOpen, setIsViewEmployeeDetailModalOpen] =
    useState(false);
  const [editEmployeeId, setEditEmployeeId] = useState(0);
  const [viewEmployeeDetailId, setViewEmployeeDetailId] = useState(0);
  const [deleteEmployeeId, setDeleteEmployeeId] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterTerm, setFilterTerm] = useState("");
  let employees = useSelector((state: RootState) => state.employee.employees);
  const dispatch = useDispatch();

  if (filterTerm) {
    employees = employees.filter((employee) =>
      employee.name?.toLowerCase().includes(filterTerm)
    );
  }

  const employeesPerPage = 4;

  const { data, error, isLoading, isError } = useQuery<Employee[], Error>({
    queryKey: ["employees"],
    queryFn: fetchEmployees,
  });

  useEffect(() => {
    if (data) {
      // Dispatch an action to store posts in Redux state
      dispatch(addAllEmployees(data));
    }
  }, [data, dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const handleDeleteEmployee = (id: number) => {
    setIsConfirmDeleteModalOpen(true);
    setDeleteEmployeeId(id);
  };

  const handleModifyEmployee = (id: number) => {
    setIsEditEmployeeModalOpen(true);
    setEditEmployeeId(id);
  };

  const handleViewEmployeeDetail = (id: number) => {
    setIsViewEmployeeDetailModalOpen(true);
    setViewEmployeeDetailId(id);
  };

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  const totalPages = Math.ceil(employees.length / employeesPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <h2 className="mb-4">Employee List</h2>
      <input
        type="text"
        className="px-4 py-2 border-2 rounded border-blue-500 outline-none"
        placeholder="Search Employee"
        value={filterTerm}
        onChange={(e) => setFilterTerm(e.target.value)}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentEmployees.length > 0 ? (
          currentEmployees.map((employee: any) => (
            <div
              key={employee.id}
              className="bg-white p-4 rounded shadow-md flex flex-col"
            >
              <h4 className="text-lg font-semibold mb-2">{employee.name}</h4>
              <p className="text-gray-600 mb-4">{employee.email}</p>

              <button
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded mb-4"
                onClick={() => handleViewEmployeeDetail(employee.id)}
              >
                View Details
              </button>
              {user?.role === "admin" && (
                <button
                  className="bg-yellow-500 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleModifyEmployee(employee.id)}
                >
                  Modify
                </button>
              )}
              {user?.role === "admin" && (
                <button
                  className="bg-red-500 text-white font-bold py-2 px-4 rounded mt-5"
                  onClick={() => handleDeleteEmployee(employee.id)}
                >
                  Delete
                </button>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-600 col-span-full text-center">
            No employees added yet.
          </p>
        )}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`mx-1 px-3 py-1 border rounded ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-white text-blue-500"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
      {isEditEmployeeModalOpen && (
        <EditEmployeeModal
          setIsEditEmployeeModalOpen={setIsEditEmployeeModalOpen}
          editEmployeeId={editEmployeeId}
        />
      )}
      {isConfirmDeleteModalOpen && (
        <ConfirmationDeleteModal
          setIsConfirmDeleteModalOpen={setIsConfirmDeleteModalOpen}
          deleteEmployeeId={deleteEmployeeId}
        />
      )}
      {isViewEmployeeDetailModalOpen && (
        <ViewEmployeeDetailModal
          setIsViewEmployeeDetailModalOpen={setIsViewEmployeeDetailModalOpen}
          viewEmployeeDetailId={viewEmployeeDetailId}
        />
      )}
    </>
  );
};

export default EmployeeList;
