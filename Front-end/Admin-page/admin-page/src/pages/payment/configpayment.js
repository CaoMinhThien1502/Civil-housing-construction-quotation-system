import CryptoJS from "crypto-js";

export const URL_VNPay = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?'
export const commandPay = 'pay'
export const currCode = 'VND'
export const IpAddr = '127.0.0.1'
export const locale = 'vn'
export const orderType = 'orther'
export const reciveURL = 'http%3A%2F%2Flocalhost%3A3000%2Fsuccess'
export const tmnCode = 'C3C7J2NI'
export const txnRef = Math.floor(Math.random() * 100000);
export const secretKey = 'AQGPXZVJBTGMNIRLTLIJQWCVIKKLSKEZ'
export const version = '2.1.0'

export  function HmacSHA256Hash(){
    
    var out = CryptoJS.HmacSHA256(txnRef,secretKey).toString();
    return out;
}