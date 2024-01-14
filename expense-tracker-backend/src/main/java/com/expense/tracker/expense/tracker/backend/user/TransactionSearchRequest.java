package com.expense.tracker.expense.tracker.backend.user;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TransactionSearchRequest {
    private String text;
    private String token;
}
