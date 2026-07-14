package com.ems.employeemanagementsystem.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ems.employeemanagementsystem.entity.Department;
import com.ems.employeemanagementsystem.exception.ResourceNotFoundException;
import com.ems.employeemanagementsystem.repository.DepartmentRepository;

@Service
public class DepartmentService {

    @Autowired
    private DepartmentRepository departmentRepository;

    // CREATE
    public Department createDepartment(Department department) {

        if (departmentRepository.existsByDepartmentName(department.getDepartmentName())) {
            throw new RuntimeException("Department name already exists.");
        }

        if (departmentRepository.existsByDepartmentCode(department.getDepartmentCode())) {
            throw new RuntimeException("Department code already exists.");
        }

        return departmentRepository.save(department);
    }

    // GET ALL
    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }

    // GET BY ID
    public Department getDepartmentById(Long id) {

        return departmentRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Department not found with id : " + id));
    }

    // UPDATE
    public Department updateDepartment(Long id, Department updatedDepartment) {

        Department department = departmentRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Department not found with id : " + id));

        department.setDepartmentName(updatedDepartment.getDepartmentName());
        department.setDepartmentCode(updatedDepartment.getDepartmentCode());
        department.setDescription(updatedDepartment.getDescription());

        return departmentRepository.save(department);
    }

    // DELETE
    public void deleteDepartment(Long id) {

        Department department = departmentRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Department not found with id : " + id));

        departmentRepository.delete(department);
    }

}