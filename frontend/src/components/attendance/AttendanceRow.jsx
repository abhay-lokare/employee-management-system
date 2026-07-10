import "./AttendanceRow.css";

function AttendanceRow({attendance}){

    return(

        <tr>

            <td>{attendance.employee}</td>

            <td>{attendance.department}</td>

            <td>{attendance.date}</td>

            <td>{attendance.checkIn}</td>

            <td>{attendance.checkOut}</td>

            <td>

                <span className={`attendance-status ${attendance.status.toLowerCase()}`}>

                    {attendance.status}

                </span>

            </td>

        </tr>

    );

}

export default AttendanceRow;