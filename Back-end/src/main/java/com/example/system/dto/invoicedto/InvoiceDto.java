package com.example.system.dto.invoicedto;


import com.example.system.dto.buildingdto.BuildingDto;
import com.example.system.model.payment.Invoice;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class InvoiceDto {
    //    private Long invoiceId;
//    private Double amount;
//    private String bankCode;
//    private String bankTranNo;
//    private String cardType;
//    private String orderInfo;
//    private Long payDate;
//    private String responseCode;
//    private String tmnCode;
//    private String transactionNo;
//    private String transactionStatus;
//    private String txnRef;
//    private String secureHash;
    private Invoice invoice;
    private String email;
    private BuildingDto buildingDto;
    private Long comboId;
}
