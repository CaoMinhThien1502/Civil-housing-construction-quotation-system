import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
import './toast.css';

function ToastAfterShowPriceQuoation({toastShow,setToastShow}) {
  return (
    <Toast onClose={() => setToastShow(false)} show={toastShow} delay={3000} autohide className="toast-position">
      <Toast.Header>
        <small>Hiện tại</small>
      </Toast.Header>
      <Toast.Body>Bạn đã gửi dữ liệu thành công</Toast.Body>
    </Toast>
  );
}



export default ToastAfterShowPriceQuoation;