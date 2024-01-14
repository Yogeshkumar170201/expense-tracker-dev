package com.expense.tracker.expense.tracker.backend.transactions;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ExpenseRequest {
    private String title;
    private Double amount;
    private String dateOfExpense;
    private String source;
    private String reference;
}
