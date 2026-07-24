package com.ems.employeemanagementsystem.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ems.employeemanagementsystem.dto.EmployeePortalDto;

@Service
public class EmployeePortalService {
    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private AttendanceService attendanceService;

    @Autowired
    private LeaveRequestService leaveRequestService;

    @Autowired
    private PayrollService payrollService;

    public EmployeePortalDto getPortalData(Long employeeId) {
        EmployeePortalDto portalData = new EmployeePortalDto();
        portalData.setEmployee(employeeService.getEmployeeById(employeeId));
        portalData.setAttendance(attendanceService.getAttendanceByEmployee(employeeId));
        portalData.setLeaves(leaveRequestService.getLeaveRequestsByEmployee(employeeId));
        portalData.setPayroll(payrollService.getPayrollByEmployee(employeeId));
        return portalData;
    }
}
