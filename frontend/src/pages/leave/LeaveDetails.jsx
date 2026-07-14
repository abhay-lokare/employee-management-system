import "../../styles/Leave.css";

function LeaveDetails() {

    return (

        <div className="leave-page">

            <div className="page-header">

                <h1>Leave Details</h1>

                <p>View leave request information.</p>

            </div>

            <div className="employee-details-card">

                <div className="detail-row">
                    <span>Employee</span>
                    <strong>John Smith</strong>
                </div>

                <div className="detail-row">
                    <span>Department</span>
                    <strong>Development</strong>
                </div>

                <div className="detail-row">
                    <span>Leave Type</span>
                    <strong>Casual Leave</strong>
                </div>

                <div className="detail-row">
                    <span>From</span>
                    <strong>15 Jul 2026</strong>
                </div>

                <div className="detail-row">
                    <span>To</span>
                    <strong>18 Jul 2026</strong>
                </div>

                <div className="detail-row">
                    <span>Status</span>

                    <strong className="status leave">

                        Approved

                    </strong>

                </div>

            </div>

        </div>

    );

}

export default LeaveDetails;