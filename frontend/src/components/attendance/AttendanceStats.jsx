import "./AttendanceStats.css";

function AttendanceStats(){

    return(

        <div className="attendance-stats">

            <div className="attendance-card">

                <h3>248</h3>

                <span>Total Employees</span>

            </div>

            <div className="attendance-card">

                <h3>226</h3>

                <span>Present Today</span>

            </div>

            <div className="attendance-card">

                <h3>12</h3>

                <span>On Leave</span>

            </div>

            <div className="attendance-card">

                <h3>10</h3>

                <span>Absent</span>

            </div>

        </div>

    );

}

export default AttendanceStats;