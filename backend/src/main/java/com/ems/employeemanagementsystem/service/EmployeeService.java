package com.ems.employeemanagementsystem.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Base64;

import com.ems.employeemanagementsystem.dto.EmployeeDto;
import com.ems.employeemanagementsystem.entity.Employee;
import com.ems.employeemanagementsystem.exception.ResourceNotFoundException;
import com.ems.employeemanagementsystem.mapper.EmployeeMapper;
import com.ems.employeemanagementsystem.repository.EmployeeRepository;

@Service
public class EmployeeService {

    private static final Logger log =
            LoggerFactory.getLogger(EmployeeService.class);

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private AuthService authService;

    // CREATE EMPLOYEE
    public EmployeeDto saveEmployee(EmployeeDto employeeDto) {

        Employee employee = EmployeeMapper.mapToEmployee(employeeDto);

        Employee savedEmployee = employeeRepository.save(employee);

        authService.createEmployeeAccount(savedEmployee);

        return EmployeeMapper.mapToEmployeeDto(savedEmployee);
    }

    // GET ALL EMPLOYEES
    public Page<EmployeeDto> getAllEmployees(
            int page,
            int size,
            String sortBy,
            String sortDir) {

        log.info(
                "Fetching employees. page={}, size={}, sortBy={}, sortDir={}",
                page,
                size,
                sortBy,
                sortDir
        );

        Sort sort = sortDir.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(page, size, sort);

        Page<Employee> employees = employeeRepository.findAll(pageable);

        return employees.map(EmployeeMapper::mapToEmployeeDto);
    }

    // GET EMPLOYEE BY ID
    public EmployeeDto getEmployeeById(Long id) {

        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Employee not found with id : " + id));

        return EmployeeMapper.mapToEmployeeDto(employee);
    }

    // UPDATE EMPLOYEE
    public EmployeeDto updateEmployee(Long id, EmployeeDto updatedEmployee) {

        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Employee not found with id : " + id));

        employee.setFirstName(updatedEmployee.getFirstName());
        employee.setLastName(updatedEmployee.getLastName());
        employee.setEmail(updatedEmployee.getEmail());
        employee.setPhone(updatedEmployee.getPhone());
        employee.setDepartment(updatedEmployee.getDepartment());
        employee.setDesignation(updatedEmployee.getDesignation());
        employee.setSalary(updatedEmployee.getSalary());
        employee.setStatus(updatedEmployee.getStatus());
        employee.setAddress(updatedEmployee.getAddress());
        employee.setJoiningDate(updatedEmployee.getJoiningDate());

        Employee savedEmployee = employeeRepository.save(employee);

        return EmployeeMapper.mapToEmployeeDto(savedEmployee);
    }

    // DELETE EMPLOYEE
    public String deleteEmployee(Long id) {

        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Employee not found with id : " + id));

        employeeRepository.delete(employee);

        return "Employee deleted successfully";
    }

    public EmployeeDto updateEmployeePhoto(Long id, MultipartFile photoFile) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id : " + id));

        try {
            String photo = "data:" + photoFile.getContentType() + ";base64,"
                    + Base64.getEncoder().encodeToString(photoFile.getBytes());
            employee.setPhoto(photo);
            return EmployeeMapper.mapToEmployeeDto(employeeRepository.save(employee));
        } catch (Exception ex) {
            throw new IllegalArgumentException("Unable to save profile photo");
        }
    }

    // SEARCH EMPLOYEE
    public List<EmployeeDto> searchEmployees(String keyword) {

        List<Employee> employees =
                employeeRepository.findByFirstNameContainingIgnoreCase(keyword);

        return employees.stream()
                .map(EmployeeMapper::mapToEmployeeDto)
                .toList();
    }

    // FIND BY FIRST NAME
    public List<EmployeeDto> getEmployeesByFirstName(String firstName) {

        List<Employee> employees =
                employeeRepository.findByFirstName(firstName);

        return employees.stream()
                .map(EmployeeMapper::mapToEmployeeDto)
                .toList();
    }

    // FIND BY EMAIL
    public EmployeeDto getEmployeeByEmail(String email) {

        Employee employee =
                employeeRepository.findByEmail(email)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Employee not found with email : " + email));

        return EmployeeMapper.mapToEmployeeDto(employee);
    }

    // JPQL
    public List<EmployeeDto> getEmployeesByFirstNameJPQL(String firstName) {

        List<Employee> employees =
                employeeRepository.findEmployeesByFirstNameJPQL(firstName);

        return employees.stream()
                .map(EmployeeMapper::mapToEmployeeDto)
                .toList();
    }
}
