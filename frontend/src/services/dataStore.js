const STORAGE_KEY = "emsProWorkbookData";
const emptyData = { employees: [], departments: [], attendance: [], leaves: [], payroll: [], accounts: [{ username: "ADMIN001", password: "Admin@123", role: "ADMIN", name: "Administrator", employeeId: null }] };
const clone = (value) => JSON.parse(JSON.stringify(value));

export function getData() {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (!savedData) return clone(emptyData);
    try { return { ...clone(emptyData), ...JSON.parse(savedData) }; } catch { return clone(emptyData); }
}

export function saveData(data) { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); }
export function nextId(records) { return records.reduce((largest, record) => Math.max(largest, Number(record.id) || 0), 0) + 1; }
export function findEmployee(data, employeeId) { return data.employees.find((employee) => Number(employee.id) === Number(employeeId)); }
export function employeeName(data, employeeId) { const employee = findEmployee(data, employeeId); return employee ? `${employee.firstName} ${employee.lastName}` : "Unknown Employee"; }
export function employeeDepartment(data, employeeId) { return findEmployee(data, employeeId)?.department || "-"; }
export function response(data) { return Promise.resolve({ data: clone(data) }); }
export function reject(message) { const error = new Error(message); error.response = { data: { message } }; return Promise.reject(error); }

export function replaceData(importedData) {
    const data = { ...clone(emptyData), ...importedData };
    data.accounts = Array.isArray(data.accounts) && data.accounts.length ? data.accounts : clone(emptyData.accounts);
    ["employees", "departments", "attendance", "leaves", "payroll"].forEach((key) => { if (!Array.isArray(data[key])) data[key] = []; });
    saveData(data);
}

export function resetData() { saveData(clone(emptyData)); }
