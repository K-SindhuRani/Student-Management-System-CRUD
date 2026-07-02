package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.Student;
import com.example.demo.repository.StudentRepository;

@RestController
@RequestMapping("/students")
@CrossOrigin("*")
public class StudentController {

    @Autowired
    private StudentRepository repository;

    // GET ALL STUDENTS
    @GetMapping
    public List<Student> getAllStudents() {
        return repository.findAll();
    }

    // GET STUDENT BY ID
    @GetMapping("/{id}")
    public Student getStudentById(@PathVariable int id) {
        return repository.findById(id).orElse(null);
    }

    // ADD STUDENT
    @PostMapping
    public Student addStudent(@RequestBody Student student) {
        return repository.save(student);
    }
    // UPDATE STUDENT
    @PutMapping("/{id}")
    public Student updateStudent(@PathVariable int id,
                                 @RequestBody Student updatedStudent) {

        Student existingStudent =
                repository.findById(id).orElse(null);

        if (existingStudent != null) {

            existingStudent.setName(updatedStudent.getName());
            existingStudent.setCourse(updatedStudent.getCourse());

            return repository.save(existingStudent);
        }

        return null;
    }

    // DELETE STUDENT
    @DeleteMapping("/{id}")
    public String deleteStudent(@PathVariable int id) {

        repository.deleteById(id);

        return "Student Deleted Successfully";
    }
}