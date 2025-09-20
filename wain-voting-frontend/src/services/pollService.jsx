import { axiosPrivate, axiosPublic, DEFAULT_LIMIT } from "../api/axios";

export const getPolls = async (page = 1, limit = DEFAULT_LIMIT, categoryId) => {
  let url = `/polls?page=${page}&limit=${limit}`;
  if (categoryId) url += `&categoryId=${categoryId}`;
  const response = await axiosPublic.get(url);
  return response.data;
};

export const getPollById = async (id) => {
  const response = await axiosPublic.get(`/polls/${id}`);
  return response.data;
};
export const createPoll = async (data) => {
  const response = await axiosPrivate.post("/polls", data);
  return response.data;
};

export const getStatisticsPoll = async () => {
  const response = await axiosPrivate.get("/polls/statistics");
  return response.data;
};

// API lấy poll sắp tới
export const getUpcomingPolls = async () => {
  const response = await axiosPublic.get("/polls/upcoming");
  return response.data;
};
