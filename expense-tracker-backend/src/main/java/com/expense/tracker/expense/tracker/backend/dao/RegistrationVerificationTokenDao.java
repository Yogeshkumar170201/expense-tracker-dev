package com.expense.tracker.expense.tracker.backend.dao;

import com.expense.tracker.expense.tracker.backend.models.RegistrationVerificationToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RegistrationVerificationTokenDao extends JpaRepository<RegistrationVerificationToken, Long> {
    Optional<RegistrationVerificationToken> findByToken(String token);
}
