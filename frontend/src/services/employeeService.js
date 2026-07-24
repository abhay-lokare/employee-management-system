import api from "./api";

const EMPLOYEE_URL = "/employees";

export const getEmployees = (
    page = 0,
    size = 10,
    sortBy = "id",
    sortDir = "asc"
) => {
    return api.get(
        `${EMPLOYEE_URL}?page=${page}&size=${size}&sortBy=${sortBy}&sortDir=${sortDir}`
    );
};

export const getEmployee = (id) => {
    return api.get(`${EMPLOYEE_URL}/${id}`);
};

export const createEmployee = (employee) => {
    return api.post(EMPLOYEE_URL, employee);
};

export const updateEmployee = (id, employee) => {
    return api.put(`${EMPLOYEE_URL}/${id}`, employee);
};

export const deleteEmployee = (id) => {
    return api.delete(`${EMPLOYEE_URL}/${id}`);
};

export const uploadEmployeePhoto = (id, photoFile) => {
    const formData = new FormData();
    formData.append("photo", photoFile);
    return api.post(`${EMPLOYEE_URL}/${id}/photo`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
    });
};

export const searchEmployees = (keyword) => {
    return api.get(`${EMPLOYEE_URL}/search?keyword=${keyword}`);
};
