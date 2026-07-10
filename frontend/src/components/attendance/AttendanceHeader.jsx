import { FaClipboardCheck } from "react-icons/fa";
import "./AttendanceHeader.css";
function AttendanceHeader({

                              title="Attendance",

                              subtitle="Manage employee attendance.",

                              showButton=true,

                              onMarkAttendance

                          }){

    return(

        <div className="attendance-header">

            <div>

                <h2>{title}</h2>

                <p>{subtitle}</p>

            </div>

            {

                showButton && (

                    <button

                        className="attendance-btn"

                        onClick={onMarkAttendance}

                    >

                        <FaClipboardCheck />

                        <span>

                            Mark Attendance

                        </span>

                    </button>

                )

            }

        </div>

    );

}

export default AttendanceHeader;