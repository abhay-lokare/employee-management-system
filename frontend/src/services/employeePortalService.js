import api from "./api";

export function getEmployeePortal(employeeId) {
    return api.get(`/employee-portal/${employeeId}`);
}
