package com.expense.tracker.expense.tracker.backend.user;

import com.expense.tracker.expense.tracker.backend.models.TransactionDetails;
import com.expense.tracker.expense.tracker.backend.service.JwtService;
import com.expense.tracker.expense.tracker.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserService userService;

    @GetMapping("/income/{token}")
    public Double getIncome(@PathVariable("token")String jwtToken){
        System.out.println(jwtToken);
        String email = jwtService.extractUsername(jwtToken);
        return userService.getIncomeByEmail(email);
    }

    @GetMapping("/expense/{token}")
    public Double getExpense(@PathVariable("token") String jwtToken){
        String email = jwtService.extractUsername(jwtToken);
        return userService.getExpenseByEmail(email);
    }

    @GetMapping("/transactions/{token}")
    public List<TransactionDetails> findTransactionById(@PathVariable("token") String token){
        String email = jwtService.extractUsername(token);
        return userService.findTransactionsByEmail(email);
    }

    @GetMapping("/transactions/searchText/{token}/{text}")
    public List<TransactionDetails> findTransactionById(@PathVariable("token") String token, @PathVariable("text") String text){
        String email = jwtService.extractUsername(token);
        return userService.findTransactionByTitleSearch(email, text);
    }

    @GetMapping("/{token}")
    public String getUsername(@PathVariable("token") String token){
        return jwtService.extractUsername(token);
    }

    @GetMapping("/transactions/lastMonthIncome/{token}")
    public List<LastTransactionResponse> lastMonthIncomeTransactions(@PathVariable("token") String token){
        String email = jwtService.extractUsername(token);
        return userService.getLastMonthIncomeTransactions(email);
    }

    @GetMapping("/transactions/lastMonthExpense/{token}")
    public List<LastTransactionResponse> lastMonthExpenseTransactions(@PathVariable("token") String token){
        String email = jwtService.extractUsername(token);
        return userService.getLastMonthExpenseTransactions(email);
    }

    @GetMapping("/amount/{token}")
    public Double getTotalAmount(@PathVariable("token") String token){
        String email = jwtService.extractUsername(token);
        return userService.getTotalAmount(email);
    }

    @GetMapping("/incomes/sourceWise/{token}")
    public List<LastMonthResponseSourceWise> getIncomesSourceWise(@PathVariable("token") String token){
        String email = jwtService.extractUsername(token);
        return userService.getIncomesSourceWise(email);
    }

    @GetMapping("/expenses/sourceWise/{token}")
    public List<LastMonthResponseSourceWise> getExpensesSourceWise(@PathVariable("token") String token){
        String email = jwtService.extractUsername(token);
        return userService.getExpensesSourceWise(email);
    }


}
