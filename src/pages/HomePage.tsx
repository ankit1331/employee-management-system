import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useNavigate } from "react-router-dom";
import EmployeeManagement from "../components/EmployeeManagement";
import EmployeeList from "../components/EmployeeList";
import Header from "../components/Header";

const HomePage: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2>Please log in</h2>
        <button
          className="w-24 text-white px-4 py-2 bg-blue-500 rounded"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <>
      <Header user={user} />
      <div className="p-4">
        <h2 className="text-2xl font-bold">Welcome, {user.username}!</h2>
        <p>Your role is: {user.role}</p>
        {user.role === "admin" && <EmployeeManagement user={user} />}
        <EmployeeList user={user} />
      </div>
    </>
  );
};

export default HomePage;
