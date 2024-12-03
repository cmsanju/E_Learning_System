package com.team3.E_Learning_Platform.controller;


//Importing required classes
//
//import com.test.model.MailData;
//import com.test.service.EmailService;

import com.team3.E_Learning_Platform.model.MailData;
import com.team3.E_Learning_Platform.services.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@RequestMapping("/api")
@RestController
public class EmailController {

    @Autowired private EmailService emailService;

    @PostMapping("/sendmail")
    public String
    sendMail(@RequestBody MailData details)
    {
        String status
                = emailService.sendSimpleMail(details);

        return status;
    }

    // Sending email with attachment
    @PostMapping("/attachmentmail")
    public String sendMailWithAttachment(
            @RequestBody MailData details)
    {
        String status
                = emailService.sendMailWithAttachment(details);

        return status;
    }
}

