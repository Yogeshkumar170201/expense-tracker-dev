package com.expense.tracker.expense.tracker.backend.service;

import com.expense.tracker.expense.tracker.backend.dao.RegistrationVerificationTokenDao;
import com.expense.tracker.expense.tracker.backend.dao.UserDao;
import com.expense.tracker.expense.tracker.backend.models.RegistrationVerificationToken;
import com.expense.tracker.expense.tracker.backend.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class RegistrationVerificationService {

    @Autowired
    private RegistrationVerificationTokenDao regVerDao;

    @Autowired
    private UserDao userDao;

    public void saveToken(RegistrationVerificationToken regVerToken) {
        regVerDao.save(regVerToken);
    }

    public String validateToken(String token) {
        RegistrationVerificationToken verificationToken = regVerDao.findByToken(token).orElse(null);
        if (verificationToken==null){
            return "Invalid";
        }
        User user = verificationToken.getUser();
        Calendar cal = Calendar.getInstance();
        if(verificationToken.getExpirationTime().getTime() - cal.getTime().getTime() <= 0){
            return "Expired";
        }
        user.setEnabled(true);
        userDao.save(user);
        return "Valid";
    }

}
