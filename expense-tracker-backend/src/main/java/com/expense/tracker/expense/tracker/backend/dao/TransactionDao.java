package com.expense.tracker.expense.tracker.backend.dao;

import com.expense.tracker.expense.tracker.backend.models.TransactionDetails;
import com.expense.tracker.expense.tracker.backend.user.LastTransactionResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionDao extends JpaRepository<TransactionDetails, Long> {
    List<TransactionDetails> findByUserId(Long id);

    @Query(nativeQuery = true, value = "SELECT t.* FROM transaction_details AS t INNER JOIN user_details AS u ON u.id = t.user_id WHERE u.email = :email AND t.title LIKE %:text%")
    List<TransactionDetails> findTransactionByTitleSearch(String email, String text);

    @Query(nativeQuery = true, value = "SELECT t.date_of_transaction, SUM(t.amount) AS total_amount FROM transaction_details AS t INNER JOIN user_details AS u ON u.id = t.user_id WHERE u.email = :email AND (t.date_of_transaction >= :beginDate AND t.date_of_transaction <= :endDate) AND t.type='Income' GROUP BY t.date_of_transaction ORDER BY t.date_of_transaction ASC")
    List<Object[]> findLastMonthIncomeTransactions(String email, String beginDate, String endDate);

    @Query(nativeQuery = true, value = "SELECT t.date_of_transaction, SUM(t.amount) AS total_amount FROM transaction_details AS t INNER JOIN user_details AS u ON u.id = t.user_id WHERE u.email = :email AND (t.date_of_transaction >= :beginDate AND t.date_of_transaction <= :endDate) AND t.type='Expense' GROUP BY t.date_of_transaction ORDER BY t.date_of_transaction ASC")
    List<Object[]> findLastMonthExpenseTransactions(String email, String beginDate, String endDate);

    @Query(nativeQuery = true, value = "SELECT t.source, SUM(t.amount) AS total_amount FROM transaction_details AS t INNER JOIN user_details AS u ON u.id = t.user_id WHERE u.email = :email AND (t.date_of_transaction >= :beginDate AND t.date_of_transaction <= :endDate) AND t.type='Income' GROUP BY t.source")
    List<Object[]> findLastMonthIncomesSourceWise(String email, String beginDate, String endDate);

    @Query(nativeQuery = true, value = "SELECT t.source, SUM(t.amount) AS total_amount FROM transaction_details AS t INNER JOIN user_details AS u ON u.id = t.user_id WHERE u.email = :email AND (t.date_of_transaction >= :beginDate AND t.date_of_transaction <= :endDate) AND t.type='Expense' GROUP BY t.source")
    List<Object[]> findLastMonthExpensesSourceWise(String email, String beginDate, String endDate);
}
