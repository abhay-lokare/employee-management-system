package com.ems.employeemanagementsystem.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.ems.employeemanagementsystem.entity.Employee;
import com.ems.employeemanagementsystem.entity.UserAccount;
import com.ems.employeemanagementsystem.repository.EmployeeRepository;
import com.ems.employeemanagementsystem.repository.UserAccountRepository;
import com.ems.employeemanagementsystem.service.AuthService;

@Configuration
public class InitialAccountConfig {
    @Autowired
    private UserAccountRepository userAccountRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private AuthService authService;

    @Bean
    CommandLineRunner createInitialAccounts() {
        return args -> {
            if (userAccountRepository.findByUsername("ADMIN001").isEmpty()) {
                UserAccount admin = new UserAccount();
                admin.setUsername("ADMIN001");
                admin.setPassword("Admin@123");
                admin.setRole("ADMIN");
                userAccountRepository.save(admin);
            }

            for (Employee employee : employeeRepository.findAll()) {
                authService.createEmployeeAccount(employee);
            }
        };
    }
}
