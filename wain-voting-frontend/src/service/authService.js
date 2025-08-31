import request from "../utils/request";

export const Login = async ({ username, password }) => {
  const response = await request.post("/auth/authenticate", {
    username,
    password,
  });
  return response.data; // chứa accessToken, fullname, role
};

export const register = async ({ username, password, email, phone }) => {
  const user = {
    username,
    password,
  };

  const response = await request.post("/auth/register", user);
  return response.data;
};
