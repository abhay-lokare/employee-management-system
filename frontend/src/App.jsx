import { Routes, Route, Navigate } from "react-router-dom";

import DashboardLayout from "./layouts/DashboardLayout";

import Employees from "./pages/employee/Employees";
import Departments from "./pages/department/Departments";
import Attendance from "./pages/attendance/Attendance";

function App() {

    return (

        <Routes>

            {/* Default Page */}

            <Route
                path="/"
                element={<Navigate to="/employees" replace />}
            />

            <Route
                path="/employees"
                element={
                    <DashboardLayout>
                        <Employees />
                    </DashboardLayout>
                }
            />

            <Route
                path="/departments"
                element={
                    <DashboardLayout>
                        <Departments />
                    </DashboardLayout>
                }
            />

            <Route
                path="/attendance"
                element={
                    <DashboardLayout>
                        <Attendance />
                    </DashboardLayout>
                }
            />

        </Routes>

    );

}

export default App;