import * as XLSX from "xlsx";
import { getData, replaceData } from "./dataStore";

const sheets = [["Employees", "employees"], ["Departments", "departments"], ["Attendance", "attendance"], ["Leave Requests", "leaves"], ["Payroll", "payroll"], ["Accounts", "accounts"]];

export function downloadWorkbook() {
    const data = getData();
    const workbook = XLSX.utils.book_new();
    sheets.forEach(([sheetName, key]) => XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(data[key] || []), sheetName));
    XLSX.writeFile(workbook, "ems-pro-backup.xlsx");
}

export async function importWorkbook(file) {
    const workbook = XLSX.read(await file.arrayBuffer(), { type: "array" });
    const importedData = {};
    sheets.forEach(([sheetName, key]) => { importedData[key] = workbook.Sheets[sheetName] ? XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { defval: "" }) : []; });
    replaceData(importedData);
}
