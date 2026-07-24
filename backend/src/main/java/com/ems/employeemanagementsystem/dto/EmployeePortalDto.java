package com.ems.employeemanagementsystem.dto;

import java.util.List;

public class EmployeePortalDto {
    private EmployeeDto employee;
    private List<AttendanceDto> attendance;
    private List<LeaveRequestDto> leaves;
    private List<PayrollDto> payroll;

    public EmployeeDto getEmployee() { return employee; }
    public void setEmployee(EmployeeDto employee) { this.employee = employee; }
    public List<AttendanceDto> getAttendance() { return attendance; }
    public void setAttendance(List<AttendanceDto> attendance) { this.attendance = attendance; }
    public List<LeaveRequestDto> getLeaves() { return leaves; }
    public void setLeaves(List<LeaveRequestDto> leaves) { this.leaves = leaves; }
    public List<PayrollDto> getPayroll() { return payroll; }
    public void setPayroll(List<PayrollDto> payroll) { this.payroll = payroll; }
}
