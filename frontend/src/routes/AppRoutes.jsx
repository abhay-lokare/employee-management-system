import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/dashboard/Home";
import Employees from "../pages/employee/Employees";
import AddEmployee from "../pages/employee/AddEmployee";
import EditEmployee from "../pages/employee/EditEmployee";
import Login from "../pages/auth/Login";
import NotFound from "../pages/error/NotFound";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/add-employee" element={<AddEmployee />} />
        <Route path="/edit-employee/:id" element={<EditEmployee />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;