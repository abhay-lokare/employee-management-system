import { getData, findEmployee, employeeDepartment, employeeName, response } from "./dataStore";
export function getEmployeePortal(employeeId) {
    const data = getData(); const employee = findEmployee(data, employeeId);
    if (!employee) return Promise.reject(new Error("Employee not found"));
    const attendance = data.attendance.filter((record) => Number(record.employeeId) === Number(employeeId)).map((record) => ({ ...record, employeeName: employeeName(data, employeeId), department: employeeDepartment(data, employeeId) }));
    const leaves = data.leaves.filter((record) => Number(record.employeeId) === Number(employeeId)).map((record) => ({ ...record, employeeName: employeeName(data, employeeId), employeeEmail: employee.email, department: employee.department, days: Math.floor((new Date(`${record.toDate}T00:00:00`) - new Date(`${record.fromDate}T00:00:00`)) / 86400000) + 1 }));
    const payroll = data.payroll.filter((record) => Number(record.employeeId) === Number(employeeId)).map((record) => ({ ...record, employeeName: employeeName(data, employeeId), department: employee.department }));
    return response({ employee, attendance, leaves, payroll });
}
