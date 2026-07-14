package com.ems.employeemanagementsystem.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ems.employeemanagementsystem.entity.Department;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Long> {

    Optional<Department> findByDepartmentName(String departmentName);

    Optional<Department> findByDepartmentCode(String departmentCode);

    boolean existsByDepartmentName(String departmentName);

    boolean existsByDepartmentCode(String departmentCode);

}