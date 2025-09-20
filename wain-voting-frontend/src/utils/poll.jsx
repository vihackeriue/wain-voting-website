import { STATUS_POLL } from "../constants/status";

export const statusPoll = (startTime, endTime) => {
  const now = new Date();
  const start = new Date(startTime);
  const end = new Date(endTime);
  if (now < start) return STATUS_POLL.NOT_STARTED;
  if (now >= start && now <= end) return STATUS_POLL.ONGOING;
  return STATUS_POLL.ENDED;
};
