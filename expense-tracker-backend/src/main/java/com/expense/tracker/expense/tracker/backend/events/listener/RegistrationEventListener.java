package com.expense.tracker.expense.tracker.backend.events.listener;

import com.expense.tracker.expense.tracker.backend.events.RegistrationEvent;
import com.expense.tracker.expense.tracker.backend.models.RegistrationVerificationToken;
import com.expense.tracker.expense.tracker.backend.models.User;
import com.expense.tracker.expense.tracker.backend.service.EmailSenderService;
import com.expense.tracker.expense.tracker.backend.service.RegistrationVerificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class RegistrationEventListener implements ApplicationListener<RegistrationEvent> {

    private static final String SUBJECT_OF_EMAIL = "Email Verification";

    private static final String BODY_OF_EMAIL = "Hi, Welcome to expense Tracker. Please verify your email. Verification link is attached to email. " +
            "Click on the Link below: ";


    @Autowired
    private RegistrationVerificationService service;

    @Autowired
    private EmailSenderService emailSenderService;

    @Override
    public void onApplicationEvent(RegistrationEvent event) {
        User user = event.getUser();
        String token = UUID.randomUUID().toString();
        RegistrationVerificationToken regVerToken = new RegistrationVerificationToken(token, user);
        service.saveToken(regVerToken);
        String url = event.getApplicationUrl()+
                "verifyRegistration?token="+
                token;
        emailSenderService.sendSimpleMail(user.getEmail(),BODY_OF_EMAIL+url, SUBJECT_OF_EMAIL);

    }
}
