package com.ems.employeemanagementsystem.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ems.employeemanagementsystem.dto.PayrollDto;
import com.ems.employeemanagementsystem.service.PayrollService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/payroll")
public class PayrollController {

    @Autowired
    private PayrollService payrollService;

    @GetMapping
    public ResponseEntity<List<PayrollDto>> getAllPayroll() {
        return ResponseEntity.ok(payrollService.getAllPayroll());
    }

    @PostMapping
    public ResponseEntity<PayrollDto> createPayroll(@Valid @RequestBody PayrollDto dto) {
        return new ResponseEntity<>(payrollService.createPayroll(dto), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PayrollDto> updatePayroll(@PathVariable Long id, @Valid @RequestBody PayrollDto dto) {
        return ResponseEntity.ok(payrollService.updatePayroll(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePayroll(@PathVariable Long id) {
        payrollService.deletePayroll(id);
        return ResponseEntity.noContent().build();
    }
}
