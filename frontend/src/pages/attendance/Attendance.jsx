import "./Attendance.css";

import AttendanceHeader from "../../components/attendance/AttendanceHeader";
import AttendanceStats from "../../components/attendance/AttendanceStats";
import AttendanceSearch from "../../components/attendance/AttendanceSearch";
import AttendanceTable from "../../components/attendance/AttendanceTable";
import AttendancePagination from "../../components/attendance/AttendancePagination";


function Attendance() {

    return (

        <div className="attendance-page">

            <AttendanceHeader />

            <AttendanceStats />

            <AttendanceSearch />

            <AttendanceTable />

            <AttendancePagination />

        </div>

    );

}

export default Attendance;