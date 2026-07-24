import api from "./api";

export function login(credentials) {
    return api.post("/auth/login", credentials);
}

export function changePassword(passwordData) {
    return api.post("/auth/change-password", passwordData);
}

export function getCurrentUser() {
    const savedUser = localStorage.getItem("emsUser");
    return savedUser ? JSON.parse(savedUser) : null;
}

export function saveCurrentUser(user) {
    localStorage.setItem("emsUser", JSON.stringify(user));
}

export function logout() {
    localStorage.removeItem("emsUser");
}
