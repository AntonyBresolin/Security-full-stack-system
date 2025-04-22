import React, { useState } from "react";
import { UserControllerService } from "../../services/UserControllerService";
import { useNavigate } from "react-router-dom";

const Login = ({ onClose }) => {
  const [register, setRegister] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = {
      username: e.target.username.value,
      password: e.target.password.value,
    };

    await UserControllerService.loginUser(data)
      .then(() => {
        setTimeout(() => {
          navigate("/dashboard");
        }, 500);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    const data = {
      username: e.target.username.value,
      password: e.target.password.value,
    };

    UserControllerService.registerUser(data).then(() => {
      alert("User registered successfully");
    });
  };

  const toggleRegister = () => {
    setRegister(!register);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      <div
        className="absolute top-0 left-0 w-full h-full bg-black opacity-20"
        onClick={onClose}
      ></div>
      {register ? (
        <div className="bg-white w-96 p-8 rounded-xl absolute ">
          <h2 className="text-3xl font-bold">Register</h2>
          <form
            className="flex flex-col space-y-4 mt-4"
            onSubmit={handleRegister}
          >
            <input
              type="text"
              name="username"
              autoComplete="username"
              className="border p-2 rounded-md"
              placeholder="Username"
            />
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              className="border p-2 rounded-md"
              placeholder="Password"
            />
            <button
              className="bg-blue-500 text-white py-2 rounded-md"
              type="submit"
            >
              Register
            </button>
          </form>
          <p
            className="mt-4 text-center text-blue-500 cursor-pointer"
            onClick={toggleRegister}
          >
            Login
          </p>
        </div>
      ) : (
        <div className="bg-white w-96 p-8 rounded-xl absolute ">
          <h2 className="text-3xl font-bold">Login</h2>
          <form className="flex flex-col space-y-4 mt-4" onSubmit={handleLogin}>
            <input
              type="text"
              name="username"
              autoComplete="new username"
              className="border p-2 rounded-md"
              placeholder="Username"
            />
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              className="border p-2 rounded-md"
              placeholder="Password"
            />
            <button
              className="bg-blue-500 text-white py-2 rounded-md"
              type="submit"
            >
              Login
            </button>
          </form>
          <p
            className="mt-4 text-center text-blue-500 cursor-pointer"
            onClick={toggleRegister}
          >
            Register
          </p>
        </div>
      )}
    </div>
  );
};

export default Login;
