import "../../styles/Attendance.css";

import AttendanceHeader from "../../components/attendance/AttendanceHeader";

function MarkAttendance(){

    return(

        <div className="attendance-page">

            <AttendanceHeader

                title="Mark Attendance"

                subtitle="Record today's attendance"

                showButton={false}

            />

        </div>

    );

}

export default MarkAttendance;