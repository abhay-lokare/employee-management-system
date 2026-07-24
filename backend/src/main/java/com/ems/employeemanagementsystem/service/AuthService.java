package com.ems.employeemanagementsystem.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ems.employeemanagementsystem.dto.LoginRequest;
import com.ems.employeemanagementsystem.dto.LoginResponse;
import com.ems.employeemanagementsystem.dto.ChangePasswordRequest;
import com.ems.employeemanagementsystem.entity.Employee;
import com.ems.employeemanagementsystem.entity.UserAccount;
import com.ems.employeemanagementsystem.repository.EmployeeRepository;
import com.ems.employeemanagementsystem.repository.UserAccountRepository;

@Service
public class AuthService {
    @Autowired
    private UserAccountRepository userAccountRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    public LoginResponse login(LoginRequest request) {
        UserAccount account = userAccountRepository.findByUsername(request.getUsername().trim())
                .orElseThrow(() -> new IllegalArgumentException("Invalid employee ID or password"));

        if (!account.getPassword().equals(request.getPassword())) {
            throw new IllegalArgumentException("Invalid employee ID or password");
        }

        LoginResponse response = new LoginResponse();
        response.setUsername(account.getUsername());
        response.setRole(account.getRole());
        response.setEmployeeId(account.getEmployeeId());
        response.setName("Administrator");

        if (account.getEmployeeId() != null) {
            Employee employee = employeeRepository.findById(account.getEmployeeId()).orElse(null);
            if (employee != null) {
                response.setName(employee.getFirstName() + " " + employee.getLastName());
            }
        }
        return response;
    }

    public void createEmployeeAccount(Employee employee) {
        if (userAccountRepository.existsByEmployeeId(employee.getId())) {
            return;
        }

        UserAccount account = new UserAccount();
        account.setUsername("EMP" + employee.getId());
        account.setPassword("Emp@123");
        account.setRole("EMPLOYEE");
        account.setEmployeeId(employee.getId());
        userAccountRepository.save(account);
    }

    public void changePassword(ChangePasswordRequest request) {
        UserAccount admin = userAccountRepository.findByUsername("ADMIN001")
                .orElseThrow(() -> new IllegalArgumentException("Administrator account was not found"));

        if (!admin.getPassword().equals(request.getAdminPassword())) {
            throw new IllegalArgumentException("Administrator current password is incorrect");
        }

        String username = request.getUsername().trim().toUpperCase();
        UserAccount account = userAccountRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("Employee ID was not found"));

        account.setPassword(request.getNewPassword());
        userAccountRepository.save(account);
    }
}
