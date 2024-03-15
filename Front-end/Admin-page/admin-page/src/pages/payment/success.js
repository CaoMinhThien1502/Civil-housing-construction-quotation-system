import React, { useEffect } from "react";
import axios from "axios";
import { element } from "prop-types";
import { useNavigate } from "react-router-dom";

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
  // split Order Info
  const requestDetail = vnp_OrderInfo.split(' ');
  const navigate = useNavigate();
  const item = requestDetail[3];
  useEffect(() => {
    handleInvoice();
  }, [itemIdList]);

  const handleInvoice = async () => {
    try {
      const list=[]; 
      requestDetail.slice(3).map((number) => {
        list.push(number); });
        const postData = {
          invoiceId: 0, // Còn thiếu
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
          itemList : list
        };
        const token = localStorage.getItem('token');
        const response = await axios.post(
          `http://localhost:8080/payment/create?comboId=${requestDetail[0]}&area=${requestDetail[1]}&userid=${requestDetail[2]}`,
          postData,
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
            withCredentials: true
          }
        );
        if (vnp_TransactionStatus === "00") {
        setTimeout(() => {
          navigate('/home');
        },5000);
      } 
    } catch (error) {
    console.error("Error sending invoice:", error);
  }
};

return (
  <>
    <p>Thank you for your purchase!</p>
    <p>ComboId : {itemIdList}</p>
  </>
);
}

export default Thanks;
