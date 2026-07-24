import api from "./api";

const LEAVE_URL = "/leaves";

export const getLeaveRequests = () => api.get(LEAVE_URL);
export const createLeaveRequest = (leaveRequest) => api.post(LEAVE_URL, leaveRequest);
export const updateLeaveRequest = (id, leaveRequest) => api.put(`${LEAVE_URL}/${id}`, leaveRequest);
export const deleteLeaveRequest = (id) => api.delete(`${LEAVE_URL}/${id}`);
