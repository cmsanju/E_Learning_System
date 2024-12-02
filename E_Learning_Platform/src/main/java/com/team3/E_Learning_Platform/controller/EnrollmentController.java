package com.team3.E_Learning_Platform.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.team3.E_Learning_Platform.services.EnrollmentService;

@RestController
@RequestMapping("/enrollments")
public class EnrollmentController {

    @Autowired
    private EnrollmentService enrollmentService;

//    @PostMapping("/{Enrolleduserid}/send-email/{userEmail}")
//    public String sendEnrollmentEmail(@PathVariable String Enrolleduserid, @PathVariable String userEmail) {
//        try {
//            enrollmentService.sendEnrollmentEmail(Enrolleduserid, userEmail);
//            return "Email sent successfully!";
//        } catch (Exception e) {
//            return "Error while sending email: " + e.getMessage();
//        }
//    }

    @PostMapping("/{userid}/send-email")
    public String sendEnrollmentEmail(@PathVariable String userid) {
        try {
            enrollmentService.sendEnrollmentEmail(userid);
            return "Email sent successfully!";
        } catch (Exception e) {
            return "Error while sending email: " + e.getMessage();
        }
    }

}