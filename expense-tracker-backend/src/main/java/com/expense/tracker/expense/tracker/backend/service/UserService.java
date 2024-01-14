package com.expense.tracker.expense.tracker.backend.service;

import com.expense.tracker.expense.tracker.backend.dao.TransactionDao;
import com.expense.tracker.expense.tracker.backend.dao.UserDao;
import com.expense.tracker.expense.tracker.backend.models.TransactionDetails;
import com.expense.tracker.expense.tracker.backend.models.User;
import com.expense.tracker.expense.tracker.backend.user.LastMonthResponseSourceWise;
import com.expense.tracker.expense.tracker.backend.user.LastTransactionResponse;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.math.BigDecimal;
import java.util.stream.Collectors;

@Service
@Log4j2
public class UserService {

    @Autowired
    private UserDao userDao;

    @Autowired
    private TransactionDao transactionDao;

    public Double getIncomeByEmail(String email) {
        User user = userDao.findByEmail(email).orElse(null);
        if(user!=null){
            return user.getIncome();
        }
        return 0D;
    }

    public Double getExpenseByEmail(String email) {
        User user = userDao.findByEmail(email).orElse(null);
        if(user!=null){
            return user.getExpense();
        }
        return 0D;
    }


    public List<TransactionDetails> findTransactionsByEmail(String email) {
        User user = userDao.findByEmail(email).orElse(null);
        if(user!=null){
            return transactionDao.findByUserId(user.getId());
        }
        return Arrays.asList();
    }

    public List<TransactionDetails> findTransactionByTitleSearch(String email, String text) {
        return transactionDao.findTransactionByTitleSearch(email, text);
    }

    public List<LastTransactionResponse> getLastMonthIncomeTransactions(String email) {
        LocalDate endDate = LocalDate.now();
        LocalDate beginDate = endDate.minusDays(7);
//        log.info(beginDate +" , "+ endDate);
        List<Object[]> lastMonthTransactions = transactionDao.findLastMonthIncomeTransactions(email, beginDate.toString(), endDate.toString());
        List<LastTransactionResponse> transactions = mapToLastTransactionResponse(lastMonthTransactions);
        return transactions;
    }

    public List<LastTransactionResponse> getLastMonthExpenseTransactions(String email) {
        LocalDate endDate = LocalDate.now();
        LocalDate beginDate = endDate.minusDays(7);
//        log.info(beginDate +" , "+ endDate);
        List<Object[]> lastMonthTransactions = transactionDao.findLastMonthExpenseTransactions(email, beginDate.toString(), endDate.toString());
        List<LastTransactionResponse> transactions = mapToLastTransactionResponse(lastMonthTransactions);
        return transactions;
    }

    private List<LastTransactionResponse> mapToLastTransactionResponse(List<Object[]> results) {
         List<LastTransactionResponse> transactions = results.stream()
             .map(result -> new LastTransactionResponse((String)result[0], (Double) result[1]))
             .collect(Collectors.toList());

        return transactions;
    }

    public Double getTotalAmount(String email) {
        return userDao.findAmountByEmail(email);
    }

    public List<LastMonthResponseSourceWise> getIncomesSourceWise(String email) {
        LocalDate endDate = LocalDate.now();
        LocalDate beginDate = endDate.minusDays(7);
//        log.info(beginDate +" , "+ endDate);
        List<Object[]> lastMonthIncomesSourceWise = transactionDao.findLastMonthIncomesSourceWise(email, beginDate.toString(), endDate.toString());
        List<LastMonthResponseSourceWise> transactions = mapToLastMonthResponseSourceWise(lastMonthIncomesSourceWise);
        return transactions;
    }

    private List<LastMonthResponseSourceWise> mapToLastMonthResponseSourceWise(List<Object[]> lastMonthIncomesSourceWise) {
        List<LastMonthResponseSourceWise> transactions = lastMonthIncomesSourceWise.stream()
                .map(result -> new LastMonthResponseSourceWise((String)result[0], (Double) result[1]))
                .collect(Collectors.toList());

        return transactions;
    }

    public List<LastMonthResponseSourceWise> getExpensesSourceWise(String email) {
        LocalDate endDate = LocalDate.now();
        LocalDate beginDate = endDate.minusDays(7);
//        log.info(beginDate +" , "+ endDate);
        List<Object[]> lastMonthExpensesSourceWise = transactionDao.findLastMonthExpensesSourceWise(email, beginDate.toString(), endDate.toString());
        List<LastMonthResponseSourceWise> transactions = mapToLastMonthResponseSourceWise(lastMonthExpensesSourceWise);
        return transactions;
    }
}
