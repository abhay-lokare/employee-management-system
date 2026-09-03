import { employeeDepartment, employeeName, findEmployee, getData, nextId, reject, response, saveData } from "./dataStore";
const mapRecord = (data, record) => ({ ...record, employeeName: employeeName(data, record.employeeId), department: employeeDepartment(data, record.employeeId) });
export const getPayroll = () => { const data = getData(); return response([...data.payroll].sort((a, b) => String(b.payrollMonth).localeCompare(String(a.payrollMonth))).map((record) => mapRecord(data, record))); };
export const createPayroll = (payroll) => {
    const data = getData(); const employee = findEmployee(data, payroll.employeeId);
    if (!employee) return reject("Employee not found");
    if (data.payroll.some((record) => Number(record.employeeId) === Number(payroll.employeeId) && record.payrollMonth === payroll.payrollMonth)) return reject("Payroll record already exists for this employee and month");
    const bonus = Number(payroll.bonus || 0); const deduction = Number(payroll.deduction || 0);
    const saved = { id: nextId(data.payroll), employeeId: Number(payroll.employeeId), payrollMonth: payroll.payrollMonth, baseSalary: Number(employee.salary), bonus, deduction, netSalary: Number(employee.salary) + bonus - deduction };
    data.payroll.push(saved); saveData(data); return response(mapRecord(data, saved));
};
export const updatePayroll = (id, payroll) => { const data = getData(); const index = data.payroll.findIndex((record) => Number(record.id) === Number(id)); if (index < 0) return reject("Payroll record not found"); const employee = findEmployee(data, payroll.employeeId); if (!employee) return reject("Employee not found"); const bonus = Number(payroll.bonus || 0); const deduction = Number(payroll.deduction || 0); data.payroll[index] = { id: Number(id), employeeId: Number(payroll.employeeId), payrollMonth: payroll.payrollMonth, baseSalary: Number(employee.salary), bonus, deduction, netSalary: Number(employee.salary) + bonus - deduction }; saveData(data); return response(mapRecord(data, data.payroll[index])); };
export const deletePayroll = (id) => { const data = getData(); data.payroll = data.payroll.filter((record) => Number(record.id) !== Number(id)); saveData(data); return response("Payroll deleted successfully"); };
