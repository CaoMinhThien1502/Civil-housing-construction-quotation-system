import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, redirect } from "react-router-dom";
import './loader.css'

function Thanks({ itemIdList }) {
  const urlParams = new URLSearchParams(window.location.search);
  const vnp_Amount = urlParams.get("vnp_Amount");
  const vnp_BankCode = urlParams.get("vnp_BankCode");
  const vnp_BankTranNo = urlParams.get("vnp_BankTranNo");
  const vnp_CardType = urlParams.get("vnp_CardType");
  const vnp_OrderInfo = urlParams.get("vnp_OrderInfo");
  const vnp_PayDate = urlParams.get("vnp_PayDate");
  const vnp_ResponseCode = urlParams.get("vnp_ResponseCode");
  const vnp_TmnCode = urlParams.get("vnp_TmnCode");
  const vnp_TransactionNo = urlParams.get("vnp_TransactionNo");
  const vnp_TransactionStatus = urlParams.get("vnp_TransactionStatus");
  const vnp_TxnRef = urlParams.get("vnp_TxnRef");
  const vnp_SecureHash = urlParams.get("vnp_SecureHash");

  useEffect(() => {
    handleInvoice();
  }, []);
  const handleInvoice = async () => {
    try {

      const requestDetail = vnp_OrderInfo.split(' ');

      const [contractId, comboId, buildingDetailId] = requestDetail;
      console.log(contractId+"  "+comboId+"  "+buildingDetailId);
      const postData = {
        invoiceId: 0, // Invoice ID is missing, you may need to provide this
        amount: vnp_Amount,
        bankCode: vnp_BankCode,
        bankTranNo: vnp_BankTranNo,
        cardType: vnp_CardType,
        orderInfo: vnp_OrderInfo,
        payDate: vnp_PayDate,
        responseCode: vnp_ResponseCode,
        tmnCode: vnp_TmnCode,
        transactionNo: vnp_TransactionNo,
        transactionStatus: vnp_TransactionStatus,
        txnRef: vnp_TxnRef,
        secureHash: vnp_SecureHash,
      };
      var string = localStorage.getItem("selectedIds");
      var array = string.split(',').filter(item => item).map(Number);
      const requestBody = {
        "requestContractId": contractId,
        "comboId": comboId,
        "email": localStorage.getItem("mail"),
        "buildingDetailId": buildingDetailId,
        "mateIds": {
          "newMateList": array
        }
      }
      const response1 = await axios.post(`http://localhost:8080/request-contract/request-contract/create`, requestBody)
        .then(async (res) => {
          await axios.post(`http://localhost:8080/payment/create?rcId=${contractId}`, postData).then(res => console.log(res))
        }
        );


    } catch (error) {
      console.error("Error sending invoice:", error);
    }
  };

  setTimeout(function(){
    window.location.href = '/home';
  }, 5000);


  return (
    <>
      <div className="page-render" style={{ alignItems: 'center', textAlign: 'center' }}>
        <p style={{ fontSize: '50px' }}>Thank you for your purchase!</p>
        <br />
        <span className="loader"></span>
        <div class="back-button">
          <a href="/home" class="label">Back Home </a>
        </div>
      </div>
    </>
  );
}

export default Thanks;
