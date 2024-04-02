import React from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {
  MDBTable,
  MDBTableBody,
} from 'mdb-react-ui-kit';


const DetailProfile = ({ contractDetail, handleCloseDetail, show }) => {
  console.log("show modal: ", show);
  console.log("contract detail: ", contractDetail);

  return (
    <Modal show={show} onHide={handleCloseDetail}>
      <Modal.Header closeButton>
        <Modal.Title>Request Detail</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <MDBTable>
          <MDBTableBody>
            <tr>
              <td>REQUEST ID</td>
              <td>{contractDetail?.requestContractId}</td>
            </tr>
            <tr>
              <td>CUSTOMER NAME</td>
              <td>{contractDetail?.userName}</td>
            </tr>
            <tr>
              <td>REQUEST DATE</td>
              <td>{contractDetail?.requestDate}</td>
            </tr>
            <tr>
              <td>BUILDING AREA</td>
              <td>{contractDetail?.buildingDetail?.area+" m²" || "-"}</td>
            </tr>
            <tr>
              <td>TOTAL PRICE</td>
              <td>{contractDetail?.totalPrice+" VND" || "-"}</td>
            </tr>
            <tr>
              <td>STATUS</td>
              <td>{contractDetail?.buildingDto?.status? "Finished": "Processing"}</td>
            </tr>
          </MDBTableBody>
        </MDBTable>
      </Modal.Body>
      <Button variant="primary" onClick={handleCloseDetail}>
          Close
        </Button>
    </Modal>
  );
};

export default DetailProfile;