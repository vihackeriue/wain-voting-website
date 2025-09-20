import React, { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { createUser } from "../../services/userService";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    rePassword: "",
  });
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!form.username.trim()) newErrors.username = "Username is required!";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      newErrors.email = "Invalid email!";
    if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters!";
    if (form.password !== form.rePassword)
      newErrors.rePassword = "Passwords do not match!";
    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setLoading(true);

    try {
      const user = {
        username: form.username,
        password: form.password,
        fullName: form.username, // fullName = username
        email: form.email,
      };
      // gọi API backend đăng ký
      await createUser(user);
      alert("Đăng ký thành công");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Register failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-gray-200 rounded-2xl flex shadow-lg max-w-3xl p-5 items-center">
        <div className="sm:w-1/2 px-16">
          <h2 className="text-4xl font-bold text-gray-700">Register</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              className="px-3 py-2 mt-4 rounded-xl border"
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username}</p>
            )}

            <input
              className="px-3 py-2 rounded-xl border"
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}

            <input
              className="px-3 py-2 rounded-xl border"
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}

            <input
              className="px-3 py-2 rounded-xl border"
              type="password"
              name="rePassword"
              placeholder="Re-Password"
              value={form.rePassword}
              onChange={handleChange}
            />
            {errors.rePassword && (
              <p className="text-red-500 text-sm">{errors.rePassword}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="bg-gray-700 text-white rounded-xl py-2 hover:scale-105 duration-300 disabled:opacity-50"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
          <div className="mt-6 grid grid-cols-3 items-center text-gray-500 mb-4">
            <hr className="border-gray-400" />
            <p className="text-center text-sm">OR</p>
            <hr className="border-gray-400" />
          </div>

          <div className="flex flex-rơ justify-between items-center mt-2 ">
            <p className="text-sm text-gray-700">Do you have account?</p>
            <a
              href="/login"
              className="px-3 py-1 border border-gray-300 rounded-md bg-gray-700 text-white hover:scale-105 duration-300 hover:no-underline "
            >
              Login
            </a>
          </div>
        </div>
        <div className="sm:block hidden w-1/2">
          <img
            src="/login.jpg"
            alt=""
            className="rounded-2xl border border-gray-300 shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
