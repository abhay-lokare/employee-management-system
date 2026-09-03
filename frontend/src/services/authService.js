import { getData, reject, response, saveData } from "./dataStore";

export function login(credentials) {
    const account = getData().accounts.find((item) => item.username.toUpperCase() === credentials.username.trim().toUpperCase() && item.password === credentials.password);
    if (!account) return reject("Invalid employee ID or password.");
    return response({ username: account.username, role: account.role, employeeId: account.employeeId, name: account.name });
}

export function changePassword(passwordData) {
    const data = getData();
    const admin = data.accounts.find((account) => account.username === "ADMIN001");
    if (!admin || admin.password !== passwordData.adminPassword) return reject("Administrator current password is incorrect");
    const account = data.accounts.find((item) => item.username.toUpperCase() === passwordData.username.trim().toUpperCase());
    if (!account) return reject("Employee ID was not found");
    account.password = passwordData.newPassword; saveData(data); return response("Password changed successfully");
}

export function getCurrentUser() { const savedUser = localStorage.getItem("emsUser"); return savedUser ? JSON.parse(savedUser) : null; }
export function saveCurrentUser(user) { localStorage.setItem("emsUser", JSON.stringify(user)); }
export function logout() { localStorage.removeItem("emsUser"); }
