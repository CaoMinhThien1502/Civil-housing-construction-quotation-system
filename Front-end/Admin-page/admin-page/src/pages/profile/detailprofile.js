import React from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const DetailProfile = ({ contractDetail, handleCloseDetail, show }) => {
  console.log("show modal: ", show);
  console.log("contract detail: ", contractDetail);

  return (
    <Modal show={show} onHide={handleCloseDetail}>
      <Modal.Header closeButton>
        <Modal.Title>Contract Detail</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>ContractId: {contractDetail?.requestContractId}</p>
        <p>UserName: {contractDetail?.userName}</p>
        <p>ComboName: {contractDetail?.comboName}</p>
        <p>Building Area: {contractDetail?.buildingDto?.landArea || "-"}</p>
        <p>Building Status: {contractDetail?.buildingDto?.status === -1 ? "Inactive" : "Active"}</p>
        <p>Item Name List:</p>
        <ul>
          {contractDetail?.buildingDto?.itemNameList.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>     
        <p>Status: {contractDetail?.status ? "Active" : "Inactive"}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleCloseDetail}>
          Close
        </Button>
        
      </Modal.Footer>
    </Modal>
  );
};

export default DetailProfile;
