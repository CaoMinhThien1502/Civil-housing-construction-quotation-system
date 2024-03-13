package com.example.system.dto.invoicedto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class InvoiceDto {
    private Long invoiceId;
    private Double amount;
    private String bankCode;
    private String bankTranNo;
    private String cardType;
    private String orderInfo;
    private Long payDate;
    private String responseCode;
    private String tmnCode;
    private String transactionNo;
    private String transactionStatus;
    private String txnRef;
    private String secureHash;
}
