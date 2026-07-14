import "../../styles/Leave.css";

function ApplyLeave() {

    return (

        <div className="leave-page">

            <div className="page-header">

                <h1>Apply Leave</h1>

                <p>Submit a leave request.</p>

            </div>

            <div className="leave-form-card">

                <div className="form-grid">

                    <input
                        type="text"
                        placeholder="Employee Name"
                    />

                    <select>

                        <option>Leave Type</option>

                        <option>Casual Leave</option>

                        <option>Sick Leave</option>

                        <option>Paid Leave</option>

                    </select>

                    <input type="date"/>

                    <input type="date"/>

                </div>

                <textarea

                    placeholder="Reason"

                    rows="5"

                />

                <button className="primary-btn">

                    Apply Leave

                </button>

            </div>

        </div>

    );

}

export default ApplyLeave;