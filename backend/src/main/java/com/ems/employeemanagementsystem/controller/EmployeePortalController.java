package com.ems.employeemanagementsystem.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ems.employeemanagementsystem.dto.EmployeePortalDto;
import com.ems.employeemanagementsystem.service.EmployeePortalService;

@RestController
@RequestMapping("/employee-portal")
public class EmployeePortalController {
    @Autowired
    private EmployeePortalService employeePortalService;

    @GetMapping("/{employeeId}")
    public ResponseEntity<EmployeePortalDto> getPortalData(@PathVariable Long employeeId) {
        return ResponseEntity.ok(employeePortalService.getPortalData(employeeId));
    }
}
