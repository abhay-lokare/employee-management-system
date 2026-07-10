import "./EmployeeForm.css";

import FormSection from "./FormSection";
import FormInput from "./FormInput";

function EmployeeForm({

                          employee = {},

                          isEdit = false

                      }) {

    return (

        <form className="employee-form">

            <FormSection title="Personal Information">

                <FormInput

                    label="First Name"

                    placeholder="John"

                    value={employee.firstName}

                />

                <FormInput
                    label="Last Name"
                    placeholder="Smith"
                    value={employee.lastName}
                />

                <FormInput
                    label="Email"
                    type="email"
                    placeholder="john@company.com"
                    value={employee.email}
                />

                <FormInput
                    label="Phone"
                    placeholder="+91 9876543210"
                    value={employee.phone}
                />

                <FormInput
                    label="Date of Birth"
                    type="date"
                    value={employee.date}
                />

                <FormInput
                    label="Gender"
                    type="select"
                    options={[
                        "Male",
                        "Female",
                        "Other"
                    ]}
                    value={employee.gender}
                />

            </FormSection>

            <FormSection title="Employment Information">

                <FormInput
                    label="Employee ID"
                    placeholder="EMP001"
                    value={employee.employeeId}
                />

                <FormInput
                    label="Department"
                    type="select"
                    options={[
                        "Development",
                        "HR",
                        "Finance",
                        "Marketing"
                    ]}
                    value={employee.department}
                />

                <FormInput
                    label="Designation"
                    placeholder="Frontend Developer"
                    value={employee.designation}
                />

                <FormInput
                    label="Joining Date"
                    type="date"
                    value={employee.joiningDate}
                />

                <FormInput
                    label="Salary"
                    placeholder="65000"
                    value={employee.salary}
                />

                <FormInput
                    label="Status"
                    type="select"
                    options={[
                        "Active",
                        "Inactive",
                        "Leave"
                    ]}
                    value={employee.status}
                />

            </FormSection>

            <div className="form-buttons">

                <button
                    type="button"
                    className="cancel-btn"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    className="save-btn"
                >
                    {isEdit ? "Update Employee" : "Save Employee"}
                </button>

            </div>

        </form>

    );

}

export default EmployeeForm;