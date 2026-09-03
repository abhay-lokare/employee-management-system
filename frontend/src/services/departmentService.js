import { getData, nextId, reject, response, saveData } from "./dataStore";

export const getDepartments = () => response(getData().departments);
export const getDepartment = (id) => { const department = getData().departments.find((item) => Number(item.id) === Number(id)); return department ? response(department) : reject("Department not found"); };
export const createDepartment = (department) => {
    const data = getData();
    if (data.departments.some((item) => item.departmentCode.toLowerCase() === department.departmentCode.toLowerCase())) return reject("Department code already exists");
    const savedDepartment = { ...department, id: nextId(data.departments) };
    data.departments.push(savedDepartment); saveData(data); return response(savedDepartment);
};
export const updateDepartment = (id, department) => {
    const data = getData(); const index = data.departments.findIndex((item) => Number(item.id) === Number(id));
    if (index < 0) return reject("Department not found");
    data.departments[index] = { ...department, id: Number(id) }; saveData(data); return response(data.departments[index]);
};
export const deleteDepartment = (id) => { const data = getData(); data.departments = data.departments.filter((item) => Number(item.id) !== Number(id)); saveData(data); return response("Department deleted successfully"); };
