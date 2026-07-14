import {
    FaMoneyCheckAlt,
    FaSearch,
    FaAngleLeft,
    FaAngleRight
} from "react-icons/fa";

import "../../styles/Payroll.css";

function Payroll() {

    const payroll = [

        {
            id:1,
            employee:"John Smith",
            department:"Development",
            salary:"₹65,000",
            bonus:"₹5,000",
            deduction:"₹2,000",
            net:"₹68,000"
        },

        {
            id:2,
            employee:"Emma Watson",
            department:"HR",
            salary:"₹58,000",
            bonus:"₹3,000",
            deduction:"₹1,500",
            net:"₹59,500"
        },

        {
            id:3,
            employee:"Michael Brown",
            department:"Finance",
            salary:"₹52,000",
            bonus:"₹2,500",
            deduction:"₹1,000",
            net:"₹53,500"
        }

    ];

    return(

        <div className="payroll-page">

            <div className="payroll-header">

                <div>

                    <h2>Payroll</h2>

                    <p>Manage employee salary records.</p>

                </div>

                <button className="payroll-btn">

                    <FaMoneyCheckAlt />

                    <span>Generate Payroll</span>

                </button>

            </div>

            <div className="payroll-stats">

                <div className="payroll-card">

                    <h3>248</h3>

                    <span>Total Employees</span>

                </div>

                <div className="payroll-card">

                    <h3>₹1.85 Cr</h3>

                    <span>Total Payroll</span>

                </div>

                <div className="payroll-card">

                    <h3>₹18 L</h3>

                    <span>Total Bonus</span>

                </div>

            </div>

            <div className="payroll-search">

                <div className="payroll-search-box">

                    <FaSearch />

                    <input
                        type="text"
                        placeholder="Search employee..."
                    />

                </div>

            </div>

            <div className="payroll-table-card">

                <table className="payroll-table">

                    <thead>

                    <tr>

                        <th>Employee</th>
                        <th>Department</th>
                        <th>Salary</th>
                        <th>Bonus</th>
                        <th>Deduction</th>
                        <th>Net Salary</th>

                    </tr>

                    </thead>

                    <tbody>

                    {

                        payroll.map(item=>(

                            <tr key={item.id}>

                                <td>{item.employee}</td>
                                <td>{item.department}</td>
                                <td>{item.salary}</td>
                                <td>{item.bonus}</td>
                                <td>{item.deduction}</td>
                                <td>{item.net}</td>

                            </tr>

                        ))

                    }

                    </tbody>

                </table>

            </div>

            <div className="payroll-pagination">

                <button>

                    <FaAngleLeft/>

                </button>

                <button className="active">1</button>

                <button>2</button>

                <button>3</button>

                <button>

                    <FaAngleRight/>

                </button>

            </div>

        </div>

    );

}

export default Payroll;