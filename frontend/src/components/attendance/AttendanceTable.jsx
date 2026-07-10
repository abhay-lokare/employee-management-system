import "./AttendanceTable.css";

import AttendanceRow from "./AttendanceRow";

function AttendanceTable(){

    const attendance=[

        {

            id:1,

            employee:"John Smith",

            department:"Development",

            date:"10 Jul 2026",

            checkIn:"09:02 AM",

            checkOut:"06:12 PM",

            status:"Present"

        },

        {

            id:2,

            employee:"Emma Watson",

            department:"HR",

            date:"10 Jul 2026",

            checkIn:"09:10 AM",

            checkOut:"06:00 PM",

            status:"Present"

        },

        {

            id:3,

            employee:"Michael Brown",

            department:"Finance",

            date:"10 Jul 2026",

            checkIn:"--",

            checkOut:"--",

            status:"Leave"

        }

    ];

    return(

        <div className="attendance-table-card">

            <table className="attendance-table">

                <thead>

                <tr>

                    <th>Employee</th>

                    <th>Department</th>

                    <th>Date</th>

                    <th>Check In</th>

                    <th>Check Out</th>

                    <th>Status</th>

                </tr>

                </thead>

                <tbody>

                {

                    attendance.map(item=>(

                        <AttendanceRow

                            key={item.id}

                            attendance={item}

                        />

                    ))

                }

                </tbody>

            </table>

        </div>

    );

}

export default AttendanceTable;