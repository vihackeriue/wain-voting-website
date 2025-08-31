import axios from "axios";

const request = axios.create({
  baseURL: "http://localhost:8080/voting/",
});

const get = async (path, options = {}) => {
  const response = await request.get(path, options);
  return response.data;
};

export default request;
