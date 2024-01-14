package com.expense.tracker.expense.tracker.backend.models;

import com.expense.tracker.expense.tracker.backend.utils.TransactionType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "transaction_details")
public class TransactionDetails {
    @Id
    @GeneratedValue(
            strategy = GenerationType.AUTO
    )
    private Long id;
    @Enumerated(EnumType.STRING)
    private TransactionType type;
    private String title;
    private Double amount;
    private String dateOfTransaction;
    private String source;
    private String reference;

    @ManyToOne
    @JoinColumn(
            name = "user_id"
    )
    private User user;

}
