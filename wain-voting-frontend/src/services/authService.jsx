import { axiosPrivate, axiosPublic } from "../api/axios";

// Login api
export const loginService = async (data) => {
  const response = await axiosPublic.post("/auth/authenticate", data);
  return response.data;
};
// refresh api
export const refreshService = async () => {
  const response = await axiosPrivate.post("/auth/refresh");
  return response.data;
};

// update wallet
export const updateWalletService = async (data) => {
  console.log("TOKEN gửi đi:", localStorage.getItem("site"));
  const response = await axiosPrivate.put("/auth/update-wallet", data);
  return response.data;
};
// Logout api
export const logoutService = async () => {
  try {
    const res = await axiosPrivate.post("/auth/logout");
    return res.data;
  } catch (err) {
    console.error("Logout failed:", err);
    throw err;
  }
};
