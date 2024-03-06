import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

function ToastComponet() {
  const [show, setShow] = useState(false);

  return (
    <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1 }}>
    <Row>
      <Col xs={6}>
        <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body>Bạn đã đăng ký thành công</Toast.Body>
        </Toast>
      </Col>
    </Row>
    </ToastContainer>
  );
}

export default ToastComponet;