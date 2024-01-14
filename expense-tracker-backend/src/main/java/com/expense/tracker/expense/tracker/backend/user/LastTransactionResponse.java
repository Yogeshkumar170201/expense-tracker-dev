package com.expense.tracker.expense.tracker.backend.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class LastTransactionResponse {
    private String date;
    private Double amount;
}
