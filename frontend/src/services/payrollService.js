import api from "./api";

const PAYROLL_URL = "/payroll";

export const getPayroll = () => api.get(PAYROLL_URL);
export const createPayroll = (payroll) => api.post(PAYROLL_URL, payroll);
export const updatePayroll = (id, payroll) => api.put(`${PAYROLL_URL}/${id}`, payroll);
export const deletePayroll = (id) => api.delete(`${PAYROLL_URL}/${id}`);
