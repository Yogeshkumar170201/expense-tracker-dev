package com.expense.tracker.expense.tracker.backend.dao;

import com.expense.tracker.expense.tracker.backend.models.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TokenDao extends JpaRepository<Token, Long> {

    @Query(
            value = "SELECT t.* FROM Token AS t INNER JOIN user_details AS u ON u.id = t.user_id WHERE (u.id = :userId AND (t.expired = false OR t.revoked = false))",
            nativeQuery = true
    )
    public List<Token> getAllValidTokensByUserId(Long userId);

    public Optional<Token> findByToken(String token);
}
