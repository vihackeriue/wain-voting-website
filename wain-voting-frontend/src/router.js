import { ROUTERS } from "./utils/router";
import UserHomePage from "./pages/users/homePage";
import { Routes, Route } from "react-router-dom";
import UserMasterLayout from "./components/layout/user/layout";
import AdminMasterLayout from "./components/layout/admin/layout";
import ProfilePage from "./pages/users/profilePage";
import PrivateRoute from "./components/PrivateRoute";
import AdminHomePage from "./pages/admin/homePage";
import LoginPage from "./pages/auth/login";
import RegisterPage from "./pages/auth/register";
import PollDetailPage from "./pages/users/pollDetailPage";
import UserPollListPage from "./pages/users/pollListPage";
import PollAddPage from "./pages/admin/pollAddPage";
import AdminPollListPage from "./pages/admin/PollListPage";
import AdminPollDetailPage from "./pages/admin/pollDetailPage";
import UserManagementPage from "./pages/admin/userManagementPage";

const renderUserRouter = () => {
  const userRouters = [
    {
      path: ROUTERS.USER.HOME,
      component: <UserHomePage />,
      role: "ROLE_USER",
    },

    {
      path: ROUTERS.USER.PROFILE,
      component: <ProfilePage />,
      role: "ROLE_USER",
    },
    {
      path: ROUTERS.USER.POLLLIST,
      component: <UserPollListPage />,
      role: "ROLE_USER",
    },
    {
      path: ROUTERS.USER.POLLDETAIL,
      component: <PollDetailPage />,
      role: "ROLE_USER",
    },
    {
      path: ROUTERS.ADMIN.POLLADD,
      component: <PollAddPage />,
      role: "ROLE_ADMIN",
    },
    {
      path: ROUTERS.ADMIN.POLLLIST,
      component: <AdminPollListPage />,
      role: "ROLE_ADMIN",
    },
    {
      path: ROUTERS.ADMIN.POLLDETAIL,
      component: <AdminPollDetailPage />,
      role: "ROLE_ADMIN",
    },
    {
      path: ROUTERS.ADMIN.HOME,
      component: <AdminHomePage />,
      role: "ROLE_ADMIN",
    },
    {
      path: ROUTERS.ADMIN.USERLIST,
      component: <UserManagementPage />,
      role: "ROLE_ADMIN",
    },

    {
      path: ROUTERS.AUTH.LOGIN,
      component: <LoginPage />,
      role: "PUBLIC", // không cần login
    },
    {
      path: ROUTERS.AUTH.REGISTER,
      component: <RegisterPage />,
      role: "PUBLIC", // không cần login
    },
  ];

  const renderLayout = (role, component) => {
    const wrappedComponent = (
      <PrivateRoute requiredRole={role}>{component}</PrivateRoute>
    );
    if (role === "PUBLIC") {
      return component;
    }
    if (role === "ROLE_ADMIN") {
      return <AdminMasterLayout>{wrappedComponent}</AdminMasterLayout>;
    }

    return <UserMasterLayout>{wrappedComponent}</UserMasterLayout>;
  };

  return (
    <Routes>
      {userRouters.map((item, key) => (
        <Route
          key={key}
          path={item.path}
          element={renderLayout(item.role, item.component)}
        />
      ))}
    </Routes>
  );

  // return (
  //     <MasterLayout>
  //         <Routes>
  //             {userRouters.map((item, key) => (
  //                 <Route
  //                     key={key}
  //                     path={item.path}
  //                     element={
  //                         <PrivateRoute requiredRole={item.role}>
  //                             {item.component}
  //                         </PrivateRoute>
  //                     }
  //                 />
  //             ))}
  //         </Routes>
  //     </MasterLayout>
  // );
};

const RouterCustom = () => {
  return renderUserRouter();
};
export default RouterCustom;
