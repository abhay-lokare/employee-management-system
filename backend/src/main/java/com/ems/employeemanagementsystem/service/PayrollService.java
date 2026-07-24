package com.ems.employeemanagementsystem.service;

import java.util.List;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ems.employeemanagementsystem.dto.PayrollDto;
import com.ems.employeemanagementsystem.entity.Employee;
import com.ems.employeemanagementsystem.entity.PayrollRecord;
import com.ems.employeemanagementsystem.exception.ResourceNotFoundException;
import com.ems.employeemanagementsystem.repository.EmployeeRepository;
import com.ems.employeemanagementsystem.repository.PayrollRepository;

@Service
public class PayrollService {

    @Autowired
    private PayrollRepository payrollRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    public List<PayrollDto> getAllPayroll() {
        List<PayrollRecord> payrollRecords = payrollRepository.findAllByOrderByPayrollMonthDescIdDesc();
        List<PayrollDto> dtoList = new ArrayList<>();

        for (PayrollRecord payrollRecord : payrollRecords) {
            dtoList.add(toDto(payrollRecord));
        }

        return dtoList;
    }

    public List<PayrollDto> getPayrollByEmployee(Long employeeId) {
        List<PayrollDto> allPayroll = getAllPayroll();
        List<PayrollDto> employeePayroll = new ArrayList<>();

        for (PayrollDto payroll : allPayroll) {
            if (payroll.getEmployeeId().equals(employeeId)) {
                employeePayroll.add(payroll);
            }
        }
        return employeePayroll;
    }

    public PayrollDto createPayroll(PayrollDto dto) {
        Employee employee = findEmployee(dto.getEmployeeId());
        PayrollRecord record = new PayrollRecord();
        apply(dto, record, employee);
        return toDto(payrollRepository.save(record));
    }

    public PayrollDto updatePayroll(Long id, PayrollDto dto) {
        PayrollRecord record = payrollRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Payroll record not found with id : " + id));
        Employee employee = findEmployee(dto.getEmployeeId());
        apply(dto, record, employee);
        return toDto(payrollRepository.save(record));
    }

    public void deletePayroll(Long id) {
        PayrollRecord record = payrollRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Payroll record not found with id : " + id));
        payrollRepository.delete(record);
    }

    private Employee findEmployee(Long employeeId) {
        return employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id : " + employeeId));
    }

    private void apply(PayrollDto dto, PayrollRecord record, Employee employee) {
        double bonus = dto.getBonus() == null ? 0 : dto.getBonus();
        double deduction = dto.getDeduction() == null ? 0 : dto.getDeduction();
        record.setEmployeeId(employee.getId());
        record.setPayrollMonth(dto.getPayrollMonth());
        record.setBaseSalary(employee.getSalary());
        record.setBonus(bonus);
        record.setDeduction(deduction);
        record.setNetSalary(employee.getSalary() + bonus - deduction);
    }

    private PayrollDto toDto(PayrollRecord record) {
        Employee employee = findEmployee(record.getEmployeeId());
        PayrollDto dto = new PayrollDto();
        dto.setId(record.getId());
        dto.setEmployeeId(employee.getId());
        dto.setEmployeeName(employee.getFirstName() + " " + employee.getLastName());
        dto.setDepartment(employee.getDepartment());
        dto.setPayrollMonth(record.getPayrollMonth());
        dto.setBaseSalary(record.getBaseSalary());
        dto.setBonus(record.getBonus());
        dto.setDeduction(record.getDeduction());
        dto.setNetSalary(record.getNetSalary());
        return dto;
    }
}
