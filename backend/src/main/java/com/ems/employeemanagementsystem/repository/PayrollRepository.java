package com.ems.employeemanagementsystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ems.employeemanagementsystem.entity.PayrollRecord;

public interface PayrollRepository extends JpaRepository<PayrollRecord, Long> {
    List<PayrollRecord> findAllByOrderByPayrollMonthDescIdDesc();
}
