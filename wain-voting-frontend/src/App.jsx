import React from "react";

import Login from "./pages/auth/Login";

import Register from "./pages/auth/Register";
import { Route, Routes } from "react-router-dom";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import UserHomePage from "./pages/user/UserHomePage";
import UserPollListPage from "./pages/user/UserPollListPage";
import UserLayout from "./components/layouts/user/UserLayout";
import ManagerLayout from "./components/layouts/manager/ManagerLayout";
import ManagerHomePage from "./pages/manager/ManagerHomePage";
import ManagerPollListPage from "./pages/manager/ManagerPollListPage";
import ManagerPollDetailPage from "./pages/manager/ManagerPollDetailPage";
import UnauthorizedPage from "./pages/auth/UnauthorizedPage";
import PrivateRoute from "./components/common/PrivateRoute";
import UserPollDetailPage from "./pages/user/UserPollDetailPage";
import ManagerPollCreatePage from "./pages/manager/ManagerPollCreatePage";
import useAuth from "./hooks/useAuth";
import ManagerCategoryPage from "./pages/manager/ManagerCategoryPage";

import ManagerUserListPage from "./pages/manager/ManagerUserListPage";

const ROLES = {
  admin: "ROLE_ADMIN",
  User: "ROLE_USER",
};

function App() {
  const { loading } = useAuth();

  if (loading) {
    // 👈 Chỗ này: chờ AuthContext đọc token từ localStorage
    return <p>Đang tải...</p>;
  }

  return (
    <Routes>
      {/* Public route */}
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="unauthorized" element={<UnauthorizedPage />} />

      {/* User route */}
      <Route path="/" element={<UserLayout />}>
        <Route index element={<UserHomePage />} />
        <Route path="/poll-list" element={<UserPollListPage />} />
        <Route path="/poll-detail/:id" element={<UserPollDetailPage />} />
      </Route>

      {/* manager route */}

      <Route element={<PrivateRoute allowedRoles={ROLES.admin} />}>
        <Route path="manager" element={<ManagerLayout />}>
          <Route index element={<ManagerHomePage />} />
          <Route path="poll-list" element={<ManagerPollListPage />} />
          <Route path="poll-detail/:id" element={<ManagerPollDetailPage />} />
          <Route path="poll-create" element={<ManagerPollCreatePage />} />
          <Route path="category-list" element={<ManagerCategoryPage />} />
          <Route path="user-list" element={<ManagerUserListPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
