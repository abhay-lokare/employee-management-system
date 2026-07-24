package com.ems.employeemanagementsystem.controller;

import java.util.ArrayList;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import com.ems.employeemanagementsystem.service.AttendanceService;
import com.ems.employeemanagementsystem.service.LeaveRequestService;
import com.ems.employeemanagementsystem.service.PayrollService;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest({ AttendanceController.class, LeaveRequestController.class, PayrollController.class })
class ManagementControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AttendanceService attendanceService;

    @MockBean
    private LeaveRequestService leaveRequestService;

    @MockBean
    private PayrollService payrollService;

    @Test
    void testGetAttendance() throws Exception {
        when(attendanceService.getAllAttendance()).thenReturn(new ArrayList<>());
        mockMvc.perform(get("/attendance")).andExpect(status().isOk());
    }

    @Test
    void testGetLeaveRequests() throws Exception {
        when(leaveRequestService.getAllLeaveRequests()).thenReturn(new ArrayList<>());
        mockMvc.perform(get("/leaves")).andExpect(status().isOk());
    }

    @Test
    void testGetPayroll() throws Exception {
        when(payrollService.getAllPayroll()).thenReturn(new ArrayList<>());
        mockMvc.perform(get("/payroll")).andExpect(status().isOk());
    }
}
