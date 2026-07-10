import "../../styles/Employees.css";

import EmployeeHeader from "../../components/employee/EmployeeHeader";
import EmployeeStats from "../../components/employee/EmployeeStats";
import EmployeeSearch from "../../components/employee/EmployeeSearch";
import EmployeeTable from "../../components/employee/EmployeeTable";
import EmployeePagination from "../../components/employee/EmployeePagination";

function Employees() {

  return (

      <div className="employees-page">

        <EmployeeHeader />

        <EmployeeStats />

        <EmployeeSearch />

        <EmployeeTable />

        <EmployeePagination />

      </div>

  );

}

export default Employees;