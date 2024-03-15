import React, { useEffect, useState } from "react";
import axios from "axios";
import { redirect } from "react-router-dom";
import './loader.css'

function Thanks({itemIdList}) {
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

  const [invoiceSent, setInvoiceSent] = useState(false);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    handleInvoice();
  }, []);

  const handleInvoice = async () => {
    try {
      if (!vnp_OrderInfo) {
        console.error("vnp_OrderInfo is missing.");
        return;
      }

      const requestDetail = vnp_OrderInfo.split(' ');

      const [comboId, area, userId, ...items] = requestDetail;
      
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
        itemList: items,
      };

      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:8080/payment/create?comboId=${comboId}&area=${area}&userid=${userId}`,
        postData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      setInvoiceSent(true);
      
    } catch (error) {
      console.error("Error sending invoice:", error);
    }
  };

  if (redirect) {
    return <redirect to="/home" />;
  }

  return (
    <>
    <div className="page-render" style={{ alignItems: 'center', textAlign: 'center' }}>
      <p style={{ fontSize: '50px' }}>Thank you for your purchase!</p>
      <br />
      <span className="loader"></span>
      <div class="back-button">
    <a href="/home" class="label">Back Home</a>
    </div>
    </div>
    </>
  );
}

export default Thanks;
