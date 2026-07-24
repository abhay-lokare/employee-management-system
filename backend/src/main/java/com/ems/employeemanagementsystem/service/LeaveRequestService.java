package com.ems.employeemanagementsystem.service;

import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ems.employeemanagementsystem.dto.LeaveRequestDto;
import com.ems.employeemanagementsystem.entity.Employee;
import com.ems.employeemanagementsystem.entity.LeaveRequest;
import com.ems.employeemanagementsystem.exception.ResourceNotFoundException;
import com.ems.employeemanagementsystem.repository.EmployeeRepository;
import com.ems.employeemanagementsystem.repository.LeaveRequestRepository;

@Service
public class LeaveRequestService {

    @Autowired
    private LeaveRequestRepository leaveRequestRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    public List<LeaveRequestDto> getAllLeaveRequests() {
        List<LeaveRequest> leaveRequests = leaveRequestRepository.findAllByOrderByCreatedAtDesc();
        List<LeaveRequestDto> dtoList = new ArrayList<>();

        for (LeaveRequest leaveRequest : leaveRequests) {
            dtoList.add(toDto(leaveRequest));
        }

        return dtoList;
    }

    public List<LeaveRequestDto> getLeaveRequestsByEmployee(Long employeeId) {
        List<LeaveRequestDto> allLeaveRequests = getAllLeaveRequests();
        List<LeaveRequestDto> employeeLeaves = new ArrayList<>();

        for (LeaveRequestDto leaveRequest : allLeaveRequests) {
            if (leaveRequest.getEmployeeId().equals(employeeId)) {
                employeeLeaves.add(leaveRequest);
            }
        }
        return employeeLeaves;
    }

    public LeaveRequestDto createLeaveRequest(LeaveRequestDto dto) {
        validateEmployee(dto.getEmployeeId());
        validateDates(dto);
        LeaveRequest request = new LeaveRequest();
        apply(dto, request);
        request.setStatus("Pending");
        return toDto(leaveRequestRepository.save(request));
    }

    public LeaveRequestDto updateLeaveRequest(Long id, LeaveRequestDto dto) {
        LeaveRequest request = findLeaveRequest(id);
        validateEmployee(dto.getEmployeeId());
        validateDates(dto);
        apply(dto, request);
        if (dto.getStatus() != null && !dto.getStatus().isBlank()) {
            request.setStatus(dto.getStatus());
        }
        return toDto(leaveRequestRepository.save(request));
    }

    public void deleteLeaveRequest(Long id) {
        leaveRequestRepository.delete(findLeaveRequest(id));
    }

    private LeaveRequest findLeaveRequest(Long id) {
        return leaveRequestRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Leave request not found with id : " + id));
    }

    private Employee validateEmployee(Long employeeId) {
        return employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id : " + employeeId));
    }

    private void validateDates(LeaveRequestDto dto) {
        if (dto.getToDate().isBefore(dto.getFromDate())) {
            throw new IllegalArgumentException("End date cannot be before start date");
        }
    }

    private void apply(LeaveRequestDto dto, LeaveRequest request) {
        request.setEmployeeId(dto.getEmployeeId());
        request.setLeaveType(dto.getLeaveType());
        request.setFromDate(dto.getFromDate());
        request.setToDate(dto.getToDate());
        request.setReason(dto.getReason());
    }

    private LeaveRequestDto toDto(LeaveRequest request) {
        Employee employee = validateEmployee(request.getEmployeeId());
        LeaveRequestDto dto = new LeaveRequestDto();
        dto.setId(request.getId());
        dto.setEmployeeId(employee.getId());
        dto.setEmployeeName(employee.getFirstName() + " " + employee.getLastName());
        dto.setEmployeeEmail(employee.getEmail());
        dto.setDepartment(employee.getDepartment());
        dto.setLeaveType(request.getLeaveType());
        dto.setFromDate(request.getFromDate());
        dto.setToDate(request.getToDate());
        dto.setReason(request.getReason());
        dto.setStatus(request.getStatus());
        dto.setDays(ChronoUnit.DAYS.between(request.getFromDate(), request.getToDate()) + 1);
        return dto;
    }
}
