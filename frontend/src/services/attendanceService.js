import api from "./api";

const ATTENDANCE_URL = "/attendance";

export const getAttendance = () => api.get(ATTENDANCE_URL);
export const createAttendance = (attendance) => api.post(ATTENDANCE_URL, attendance);
export const updateAttendance = (id, attendance) => api.put(`${ATTENDANCE_URL}/${id}`, attendance);
export const deleteAttendance = (id) => api.delete(`${ATTENDANCE_URL}/${id}`);