import React from "react";
import Header from "../components/Header";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { useForm } from "react-hook-form";

type FormData = {
  username: string;
  password: string;
};

const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data: FormData) => {
    
    if (data.username === "admin" && data.password === "admin") {
      dispatch(login({ username: "admin", role: "admin" }));
      navigate("/");
    } else if (data.username === "member" && data.password === "member") {
      dispatch(login({ username: "member", role: "member" }));
      navigate("/");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <>
      <Header user={null} />
      <div className="flex items-center justify-center min-h-screen">
        <form className="w-full max-w-xs" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-center text-2xl font-bold">Login</h2>
          <input
            type="text"
            className="w-full px-3 py-2 mb-2 border border-gray-300 rounded outline-none focus:border-blue-700 "
            placeholder="Username"
            {...register("username", { required: true })}
          />
          {errors.username && <p>{errors.username.message}</p>}
          <input
            type="password"
            className="w-full px-3 py-2 mb-2 border border-gray-300 rounded outline-none focus:border-blue-700"
            placeholder="Password"
            {...register("password", {
              required: true,
              minLength: {
                value: 4,
                message: "Password must be at least 4 characters long",
              },
            })}
          />
          {errors.password && <p>{errors.password.message}</p>}
          <button
            type="submit"
            className="w-full px-3 py-2 font-bold text-white bg-blue-500 rounded"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
