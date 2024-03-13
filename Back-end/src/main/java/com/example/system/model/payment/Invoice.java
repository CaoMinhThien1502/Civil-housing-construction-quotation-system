package com.example.system.model.payment;


import com.example.system.model.requestcontract.RequestContract;
import com.example.system.model.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "invoice")
public class Invoice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long invoiceId;
    @Column(nullable = false)
    private Double amount;
    @Column(nullable = false)
    private String bankCode;
    @Column(nullable = false)
    private String bankTranNo;
    @Column(nullable = false)
    private String cardType;
    @Column(nullable = false)
    private String orderInfo;
    @Column(nullable = false)
    private Long payDate;
    @Column(nullable = false)
    private String responseCode;
    @Column(nullable = false)
    private String tmnCode;
    @Column(nullable = false)
    private String transactionNo;
    @Column(nullable = false)
    private String transactionStatus;
    @Column(nullable = false)
    private String txnRef;
    @Column(nullable = false, columnDefinition = "varchar(200)")
    private String secureHash;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    @ManyToOne
    @JoinColumn(name = "request_contract_id")
    private RequestContract requestContract;
}