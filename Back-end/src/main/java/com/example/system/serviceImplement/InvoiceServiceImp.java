package com.example.system.serviceImplement;

import com.example.system.dto.invoicedto.InvoiceDto;
import com.example.system.model.payment.Invoice;
import com.example.system.repository.payment.InvoiceRepository;
import com.example.system.repository.requestcontract.RequestContractRepository;
import com.example.system.service.payment.InvoiceService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InvoiceServiceImp implements InvoiceService {
    @Autowired
    InvoiceRepository invoiceRepository;
    @Autowired
    RequestContractRepository requestContractRepository;
    @Override
    public List<Invoice> findAll() {
        return invoiceRepository.findAll();
    }

    @Override
    public Invoice createInvoice(InvoiceDto rqBody, Long rcId) {
        try{
            Invoice invoice = new Invoice();
            invoice.setAmount(rqBody.getAmount());
            invoice.setBankCode(rqBody.getBankCode());
            invoice.setBankTranNo(rqBody.getBankTranNo());
            invoice.setCardType(rqBody.getCardType());
            invoice.setOrderInfo(rqBody.getOrderInfo());
            invoice.setPayDate(rqBody.getPayDate());
            invoice.setResponseCode(rqBody.getResponseCode());
            invoice.setTmnCode(rqBody.getTmnCode());
            invoice.setTransactionNo(rqBody.getTransactionNo());
            invoice.setTransactionStatus(rqBody.getTransactionStatus());
            invoice.setTxnRef(rqBody.getTxnRef());
            invoice.setSecureHash(rqBody.getSecureHash());
            invoice.setRequestContract(requestContractRepository.findById(rcId).orElseThrow());
            invoice.setUser(requestContractRepository.findById(rcId).orElseThrow().getUser());
            Invoice newInvoice = invoiceRepository.save(invoice);
            return newInvoice;
        }catch (Exception e){
            return null;
        }
    }

    @Override
    public Invoice findById(Long id) {
        return invoiceRepository.findById(id).orElseThrow();
    }
}
