package com.team3.E_Learning_Platform.services;


import com.team3.E_Learning_Platform.model.MailData;

public interface EmailService {


    String sendSimpleMail(MailData details);
    String sendMailWithAttachment(MailData details);


}

