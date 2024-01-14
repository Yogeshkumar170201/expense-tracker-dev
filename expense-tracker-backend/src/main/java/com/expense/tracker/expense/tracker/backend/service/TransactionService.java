package com.expense.tracker.expense.tracker.backend.service;

import com.expense.tracker.expense.tracker.backend.dao.TransactionDao;
import com.expense.tracker.expense.tracker.backend.dao.UserDao;
import com.expense.tracker.expense.tracker.backend.models.TransactionDetails;
import com.expense.tracker.expense.tracker.backend.models.User;
import com.expense.tracker.expense.tracker.backend.transactions.ExpenseRequest;
import com.expense.tracker.expense.tracker.backend.transactions.IncomeRequest;
import com.expense.tracker.expense.tracker.backend.utils.Response;
import com.expense.tracker.expense.tracker.backend.utils.TransactionType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.text.DecimalFormat;
import java.util.List;
import java.util.Optional;

@Service
public class TransactionService {

    @Autowired
    private TransactionDao transactionDao;

    @Autowired
    private UserDao userDao;

    public Response addIncome(IncomeRequest incomeRequest, String email)  {

        User user = userDao.findByEmail(email).orElse(null);
        DecimalFormat df = new DecimalFormat("#.##");
        user.setAmount(Double.parseDouble(df.format(incomeRequest.getAmount()+user.getAmount())));
        user.setIncome(Double.parseDouble(df.format(incomeRequest.getAmount()+user.getIncome())));
        TransactionDetails incomeTransaction = TransactionDetails.builder()
                .type(TransactionType.Income)
                .title(incomeRequest.getTitle())
                .amount(Double.parseDouble(df.format(incomeRequest.getAmount())))
                .dateOfTransaction(incomeRequest.getDateOfIncome())
                .source(incomeRequest.getSource())
                .reference(incomeRequest.getReference())
                .user(user)
                .build();

        userDao.save(user);
        transactionDao.save(incomeTransaction);
        return Response.builder()
                .message("Income is added")
                .build();
    }

    public Response addExpense(ExpenseRequest expenseRequest, String email) {
        User user = userDao.findByEmail(email).orElse(null);
        DecimalFormat df = new DecimalFormat("#.##");
        user.setAmount(Double.parseDouble(df.format(user.getAmount()-expenseRequest.getAmount())));
        user.setExpense(Double.parseDouble(df.format(user.getExpense()+expenseRequest.getAmount())));
        TransactionDetails incomeTransaction = TransactionDetails.builder()
                .type(TransactionType.Expense)
                .title(expenseRequest.getTitle())
                .amount(Double.parseDouble(df.format(expenseRequest.getAmount())))
                .dateOfTransaction(expenseRequest.getDateOfExpense())
                .source(expenseRequest.getSource())
                .reference(expenseRequest.getReference())
                .user(user)
                .build();

        userDao.save(user);
        transactionDao.save(incomeTransaction);
        return Response.builder()
                .message("Expense is added")
                .build();
    }

    public Response deleteTransaction(Long id) {
        TransactionDetails transactionDetails = transactionDao.findById(id).orElse(null);
        DecimalFormat df = new DecimalFormat("#.##");
        if(transactionDetails==null){
            return Response.builder()
                    .message("Transaction doesn't exist")
                    .build();
        }
        User user = userDao.findById(transactionDetails.getUser().getId()).orElse(null);
        if(user==null) {
            return Response.builder()
                    .message("Transaction doesn't exist")
                    .build();
        }
        if(transactionDetails.getType().equals(TransactionType.Income)) {
            user.setAmount(Double.parseDouble(df.format(user.getAmount()-transactionDetails.getAmount())));
            user.setIncome(Double.parseDouble(df.format(user.getIncome()-transactionDetails.getAmount())));
        }else{
            user.setAmount(Double.parseDouble(df.format(user.getAmount()+transactionDetails.getAmount())));
            user.setExpense(Double.parseDouble(df.format(user.getExpense()-transactionDetails.getAmount())));
        }
        userDao.save(user);
        transactionDao.deleteById(id);
        return Response.builder()
                .message("Transaction is deleted")
                .build();
    }

}
