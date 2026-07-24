import { Navigate, Route, Routes } from "react-router-dom";

import DashboardLayout from "./layouts/DashboardLayout";
import Home from "./pages/dashboard/Home";
import Employees from "./pages/employee/Employees";
import AddEmployee from "./pages/employee/AddEmployee";
import EditEmployee from "./pages/employee/EditEmployee";
import EmployeeDetails from "./pages/employee/EmployeeDetails";
import Departments from "./pages/department/Departments";
import AddDepartment from "./pages/department/AddDepartment";
import EditDepartment from "./pages/department/EditDepartment";
import Attendance from "./pages/attendance/Attendance";
import Leave from "./pages/leave/Leave";
import Payroll from "./pages/payroll/Payroll";
import Reports from "./pages/report/Reports";
import Settings from "./pages/settings/Settings";
import NotFound from "./pages/error/NotFound";
import Login from "./pages/auth/Login";
import EmployeePortal from "./pages/employee/EmployeePortal";
import { getCurrentUser } from "./services/authService";

function AdminRoute({ children }) {
        const user = getCurrentUser();
        return user && user.role === "ADMIN" ? children : <Navigate to="/login" replace />;
}

function EmployeeRoute({ children }) {
        const user = getCurrentUser();
        return user && user.role === "EMPLOYEE" ? children : <Navigate to="/login" replace />;
}

function AdminPage({ children }) {
        return <AdminRoute><DashboardLayout>{children}</DashboardLayout></AdminRoute>;
}

function App() {
        return (
            <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<AdminPage><Home /></AdminPage>} />
                    <Route path="/employees" element={<AdminPage><Employees /></AdminPage>} />
                    <Route path="/add-employee" element={<AdminPage><AddEmployee /></AdminPage>} />
                    <Route path="/edit-employee" element={<AdminPage><EditEmployee /></AdminPage>} />
                    <Route path="/employee-details" element={<AdminPage><EmployeeDetails /></AdminPage>} />
                    <Route path="/departments" element={<AdminPage><Departments /></AdminPage>} />
                    <Route path="/add-department" element={<AdminPage><AddDepartment /></AdminPage>} />
                    <Route path="/edit-department" element={<AdminPage><EditDepartment /></AdminPage>} />
                    <Route path="/attendance" element={<AdminPage><Attendance /></AdminPage>} />
                    <Route path="/leave" element={<AdminPage><Leave /></AdminPage>} />
                    <Route path="/payroll" element={<AdminPage><Payroll /></AdminPage>} />
                    <Route path="/reports" element={<AdminPage><Reports /></AdminPage>} />
                    <Route path="/settings" element={<AdminPage><Settings /></AdminPage>} />
                    <Route path="/employee-portal" element={<EmployeeRoute><EmployeePortal /></EmployeeRoute>} />
                    <Route path="*" element={<NotFound />} />
            </Routes>
        );
}

export default App;
