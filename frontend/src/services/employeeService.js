import { findEmployee, getData, nextId, reject, response, saveData } from "./dataStore";

export const getEmployees = (
    page = 0,
    size = 10,
    sortBy = "id",
    sortDir = "asc"
) => {
    const employees = [...getData().employees].sort((first, second) => {
        const result = String(first[sortBy] ?? "").localeCompare(String(second[sortBy] ?? ""), undefined, { numeric: true });
        return sortDir === "desc" ? -result : result;
    });
    return response({ content: employees.slice(page * size, page * size + size), totalElements: employees.length, totalPages: Math.ceil(employees.length / size) });
};

export const getEmployee = (id) => { const employee = findEmployee(getData(), id); return employee ? response(employee) : reject("Employee not found"); };

export const createEmployee = (employee) => {
    const data = getData();
    if (data.employees.some((item) => item.email.toLowerCase() === employee.email.toLowerCase())) return reject("Email already exists");
    const savedEmployee = { ...employee, id: nextId(data.employees), salary: Number(employee.salary), status: employee.status || "Active", photo: employee.photo || "" };
    data.employees.push(savedEmployee);
    data.accounts.push({ username: `EMP${savedEmployee.id}`, password: "Emp@123", role: "EMPLOYEE", employeeId: savedEmployee.id, name: `${savedEmployee.firstName} ${savedEmployee.lastName}` });
    saveData(data);
    return response(savedEmployee);
};

export const updateEmployee = (id, employee) => {
    const data = getData();
    const index = data.employees.findIndex((item) => Number(item.id) === Number(id));
    if (index < 0) return reject("Employee not found");
    if (data.employees.some((item) => Number(item.id) !== Number(id) && item.email.toLowerCase() === employee.email.toLowerCase())) return reject("Email already exists");
    data.employees[index] = { ...data.employees[index], ...employee, id: Number(id), salary: Number(employee.salary) };
    const account = data.accounts.find((item) => Number(item.employeeId) === Number(id));
    if (account) account.name = `${employee.firstName} ${employee.lastName}`;
    saveData(data);
    return response(data.employees[index]);
};

export const deleteEmployee = (id) => {
    const data = getData();
    data.employees = data.employees.filter((employee) => Number(employee.id) !== Number(id));
    data.accounts = data.accounts.filter((account) => Number(account.employeeId) !== Number(id));
    data.attendance = data.attendance.filter((record) => Number(record.employeeId) !== Number(id));
    data.leaves = data.leaves.filter((record) => Number(record.employeeId) !== Number(id));
    data.payroll = data.payroll.filter((record) => Number(record.employeeId) !== Number(id));
    saveData(data);
    return response("Employee deleted successfully");
};

export const uploadEmployeePhoto = async (id, photoFile) => {
    if (!photoFile?.type.startsWith("image/")) return reject("Please select a valid image file");
    if (photoFile.size > 2 * 1024 * 1024) return reject("Profile photo must be smaller than 2 MB");
    const photo = await new Promise((resolve, rejectFile) => { const reader = new FileReader(); reader.onload = () => resolve(reader.result); reader.onerror = rejectFile; reader.readAsDataURL(photoFile); });
    const employee = (await getEmployee(id)).data;
    return updateEmployee(id, { ...employee, photo });
};

export const searchEmployees = (keyword) => response(getData().employees.filter((employee) => `${employee.firstName} ${employee.lastName} ${employee.email}`.toLowerCase().includes(keyword.toLowerCase())));
