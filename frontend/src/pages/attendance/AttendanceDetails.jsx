import "../../styles/Attendance.css";

import AttendanceHeader from "../../components/attendance/AttendanceHeader";

function AttendanceDetails(){

    return(

        <div className="attendance-page">

            <AttendanceHeader

                title="Attendance Details"

                subtitle="Employee attendance history"

                showButton={false}

            />

        </div>

    );

}

export default AttendanceDetails;