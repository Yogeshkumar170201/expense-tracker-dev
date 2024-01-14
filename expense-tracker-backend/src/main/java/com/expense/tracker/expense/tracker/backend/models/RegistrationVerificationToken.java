package com.expense.tracker.expense.tracker.backend.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Calendar;
import java.util.Date;



@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegistrationVerificationToken {

    private static final int EXPIRATION_TIME = 10;

    @Id
    @GeneratedValue(
            strategy = GenerationType.AUTO
    )
    private Long id;
    private String token;
    private Date expirationTime;
    @ManyToOne
    @JoinColumn(
            name = "user_id"
    )
    private User user;

    public RegistrationVerificationToken(String token, User user) {
        this.token = token;
        this.user = user;
        this.expirationTime = calculateExpirationTime(EXPIRATION_TIME);
    }

    public RegistrationVerificationToken(String token) {
        this.token = token;
        this.expirationTime = calculateExpirationTime(EXPIRATION_TIME);
    }

    private Date calculateExpirationTime(int expirationTime) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTimeInMillis(new Date().getTime());
        calendar.add(Calendar.MINUTE, expirationTime);
        return new Date(calendar.getTime().getTime());
    }

}
