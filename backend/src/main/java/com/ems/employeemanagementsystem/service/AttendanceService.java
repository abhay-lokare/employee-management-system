package com.ems.employeemanagementsystem.service;

import java.util.List;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ems.employeemanagementsystem.dto.AttendanceDto;
import com.ems.employeemanagementsystem.entity.Attendance;
import com.ems.employeemanagementsystem.entity.Employee;
import com.ems.employeemanagementsystem.exception.ResourceNotFoundException;
import com.ems.employeemanagementsystem.repository.AttendanceRepository;
import com.ems.employeemanagementsystem.repository.EmployeeRepository;

@Service
public class AttendanceService {

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    public List<AttendanceDto> getAllAttendance() {
        List<Attendance> attendanceList = attendanceRepository.findAllByOrderByDateDescIdDesc();
        List<AttendanceDto> dtoList = new ArrayList<>();

        for (Attendance attendance : attendanceList) {
            dtoList.add(toDto(attendance));
        }

        return dtoList;
    }

    public List<AttendanceDto> getAttendanceByEmployee(Long employeeId) {
        List<AttendanceDto> allAttendance = getAllAttendance();
        List<AttendanceDto> employeeAttendance = new ArrayList<>();

        for (AttendanceDto attendance : allAttendance) {
            if (attendance.getEmployeeId().equals(employeeId)) {
                employeeAttendance.add(attendance);
            }
        }
        return employeeAttendance;
    }

    public AttendanceDto createAttendance(AttendanceDto dto) {
        validateEmployee(dto.getEmployeeId());
        Attendance attendance = new Attendance();
        apply(dto, attendance);
        return toDto(attendanceRepository.save(attendance));
    }

    public AttendanceDto updateAttendance(Long id, AttendanceDto dto) {
        Attendance attendance = attendanceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Attendance not found with id : " + id));
        validateEmployee(dto.getEmployeeId());
        apply(dto, attendance);
        return toDto(attendanceRepository.save(attendance));
    }

    public void deleteAttendance(Long id) {
        Attendance attendance = attendanceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Attendance not found with id : " + id));
        attendanceRepository.delete(attendance);
    }

    private void apply(AttendanceDto dto, Attendance attendance) {
        attendance.setEmployeeId(dto.getEmployeeId());
        attendance.setDate(dto.getDate());
        attendance.setStatus(dto.getStatus());
        attendance.setCheckIn(dto.getCheckIn());
        attendance.setCheckOut(dto.getCheckOut());
    }

    private Employee validateEmployee(Long employeeId) {
        return employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id : " + employeeId));
    }

    private AttendanceDto toDto(Attendance attendance) {
        Employee employee = validateEmployee(attendance.getEmployeeId());
        AttendanceDto dto = new AttendanceDto();
        dto.setId(attendance.getId());
        dto.setEmployeeId(employee.getId());
        dto.setEmployeeName(employee.getFirstName() + " " + employee.getLastName());
        dto.setDepartment(employee.getDepartment());
        dto.setDate(attendance.getDate());
        dto.setStatus(attendance.getStatus());
        dto.setCheckIn(attendance.getCheckIn());
        dto.setCheckOut(attendance.getCheckOut());
        return dto;
    }
}
