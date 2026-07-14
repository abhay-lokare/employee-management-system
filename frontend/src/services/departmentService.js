import api from "./api";

const DEPARTMENT_URL = "/departments";

export const getDepartments = () => {
    return api.get(DEPARTMENT_URL);
};

export const getDepartment = (id) => {
    return api.get(`${DEPARTMENT_URL}/${id}`);
};

export const createDepartment = (department) => {
    return api.post(DEPARTMENT_URL, department);
};

export const updateDepartment = (id, department) => {
    return api.put(`${DEPARTMENT_URL}/${id}`, department);
};

export const deleteDepartment = (id) => {
    return api.delete(`${DEPARTMENT_URL}/${id}`);
};