import React, { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";

function Login() {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const { login } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.username !== "" && input.password !== "") {
      await login(input);
      return;
    }
    alert("please provide a valid input");
  };
  return (
    <>
      <section className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="bg-gray-200 rounded-2xl flex shadow-lg max-w-3xl p-5 items-center">
          <div className="sm:w-1/2 px-16">
            <h2 className="text-4xl font-bold text-gray-700">Login</h2>
            <p className="text-sm mt-4 text-gray-600">
              Sign in to use all the best features of the app
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                className="p-2 mt-8 rounded-xl border"
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                onChange={handleInput}
              />
              <div className="relative">
                <input
                  className="px-3 py-2 rounded-xl border w-full"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  onChange={handleInput}
                />
                {/* <FaRegEye
                  className="absolute top-1/2 right-1 -translate-1/2"
                  color="gray"
                /> */}
              </div>

              <button
                type="submit"
                className="bg-gray-700 text-white rounded-xl py-2 hover:scale-105 duration-300"
              >
                Login
              </button>
            </form>
            <div className="mt-6 grid grid-cols-3 items-center text-gray-500 mb-4">
              <hr className="border-gray-400" />
              <p className="text-center text-sm">OR</p>
              <hr className="border-gray-400" />
            </div>
            <a href="#" className="text-sm text-red-500  hover:no-underline ">
              forget your password?
            </a>
            <div className="flex flex-rơ justify-between items-center mt-2 ">
              <p className="text-sm text-gray-700">Don't have an account?</p>
              <a
                href="/register"
                className="px-3 py-1 border border-gray-300 rounded-md  bg-gray-700 text-white hover:scale-105 duration-300 hover:no-underline
              "
              >
                Register
              </a>
            </div>
          </div>
          <div className="sm:block hidden w-1/2">
            <img
              src="/login.jpg"
              alt="attt"
              className=" rounded-2xl border border-gray-300 shadow-lg "
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
