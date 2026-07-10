import "../../components/department/Departments.css";

import DepartmentHeader from "../../components/department/DepartmentHeader";
import DepartmentStats from "../../components/department/DepartmentStats";
import DepartmentSearch from "../../components/department/DepartmentSearch";
import DepartmentTable from "../../components/department/DepartmentTable";
import DepartmentPagination from "../../components/department/DepartmentPagination";

function Departments() {

    return (

        <div className="departments-page">

            <DepartmentHeader />

            <DepartmentStats />

            <DepartmentSearch />

            <DepartmentTable />

            <DepartmentPagination />

        </div>

    );

}

export default Departments;