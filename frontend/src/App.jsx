import { Routes, Route } from "react-router-dom";

import DashboardLayout from "./layouts/DashboardLayout";
import Home from "./pages/dashboard/Home";
import Employees from "./pages/employee/Employees";
import Departments from "./pages/department/Departments.jsx";
import Attendance from "./pages/attendance/Attendance";
import Leave from "./pages/leave/Leave";
import AddEmployee from "./pages/employee/AddEmployee";
import Reports from "./pages/report/Reports";
import Settings from "./pages/settings/Settings";
import Payroll from "./pages/payroll/Payroll";
import EditEmployee from "./pages/employee/EditEmployee";
import EmployeeDetails from "./pages/employee/EmployeeDetails";
import AddDepartment from "./pages/department/AddDepartment";
import EditDepartment from "./pages/department/EditDepartment";
import ApplyLeave from "./pages/leave/ApplyLeave";
import LeaveDetails from "./pages/leave/LeaveDetails";
import NotFound from "./pages/error/NotFound";
function App() {

    return (

        <Routes>

            {/* Default Route */}

            <Route
                path="/"
                element={
                    <DashboardLayout>
                        <Home />
                    </DashboardLayout>
                }
            />

            {/* Employee */}

            <Route
                path="/employees"
                element={
                    <DashboardLayout>
                        <Employees />
                    </DashboardLayout>
                }
            />

            {/* Department */}

            <Route
                path="/departments"
                element={
                    <DashboardLayout>
                        <Departments />
                    </DashboardLayout>
                }
            />

            {/* Attendance */}

            <Route
                path="/attendance"
                element={
                    <DashboardLayout>
                        <Attendance />
                    </DashboardLayout>
                }
            />

            {/* Leave */}

            <Route
                path="/leave"
                element={
                    <DashboardLayout>
                        <Leave />
                    </DashboardLayout>
                }
            />

            <Route
                path="/add-employee"
                element={
                    <DashboardLayout>
                        <AddEmployee />
                    </DashboardLayout>
                }
            />

            <Route
                path="/reports"
                element={
                    <DashboardLayout>
                        <Reports />
                    </DashboardLayout>
                }
            />

            <Route
                path="/settings"
                element={
                    <DashboardLayout>
                        <Settings />
                    </DashboardLayout>
                }
            />
            <Route
                path="/payroll"
                element={
                    <DashboardLayout>
                        <Payroll/>
                    </DashboardLayout>
                }
            />
            <Route path="/add-employee" element={<AddEmployee />} />

            <Route path="/edit-employee" element={<EditEmployee />} />

            <Route path="/employee-details" element={<EmployeeDetails />} />
            <Route path="/add-department" element={<AddDepartment />} />

            <Route path="/edit-department" element={<EditDepartment />} />

            <Route path="/apply-leave" element={<ApplyLeave />} />
            <Route path="/leave-details" element={<LeaveDetails />} />

            <Route path="*" element={<NotFound />} />
        </Routes>


    );

}

export default App;