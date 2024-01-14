package com.expense.tracker.expense.tracker.backend.dao;

import com.expense.tracker.expense.tracker.backend.models.TransactionDetails;
import com.expense.tracker.expense.tracker.backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface UserDao extends JpaRepository<User, Long> {

    public Optional<User> findByEmail(String user);

    @Query(nativeQuery = true, value = "SELECT amount from user_details WHERE email = :email")
    Double findAmountByEmail(String email);
}
