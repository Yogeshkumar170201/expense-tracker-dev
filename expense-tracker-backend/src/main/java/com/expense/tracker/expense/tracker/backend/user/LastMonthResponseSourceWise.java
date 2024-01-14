package com.expense.tracker.expense.tracker.backend.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LastMonthResponseSourceWise {
    private String source;
    private Double amount;
}
