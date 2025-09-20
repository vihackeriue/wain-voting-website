import { axiosPublic, DEFAULT_LIMIT } from "../api/axios";

export const getCategories = async (page = 1, limit = DEFAULT_LIMIT) => {
  const response = await axiosPublic.get(
    `/categories?page=${page}&limit=${limit}`
  );
  return response.data;
};

export const getCategoriesNotPage = async () => {
  const response = await axiosPublic.get("/categories");
  return response.data;
};
