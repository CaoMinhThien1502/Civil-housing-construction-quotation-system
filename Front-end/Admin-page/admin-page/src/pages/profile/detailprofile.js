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
  const formatPrict = (number) => {
    const formattedTotalPrice = (Math.round(number * 100) / 100).toLocaleString('en-US', {
        style: 'currency',
        currency: 'VND',
      });
      return formattedTotalPrice;
}
  return (
    <Modal show={show} onHide={handleCloseDetail}>
      <Modal.Header closeButton>
        <Modal.Title>Building Detail</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <MDBTable>
          <MDBTableBody>
            <tr>
              <td>BUILDING ID</td>
              <td>{contractDetail?.buildingDetail?.buildingDetailId || "-"}</td>
            </tr>
            <tr>
              <td>BUILDING NAME</td>
              <td>{contractDetail?.buildingDetail?.building?.buildingName || "-"}</td>
            </tr>
            <tr>
              <td>BUILDING AREA</td>
              <td>{contractDetail?.buildingDetail?.area+" m²" || "-"}</td>
            </tr>
            <tr>
              <td>TOTAL PRICE</td>
              <td>{contractDetail?.totalPrice? formatPrict(contractDetail.totalPrice) : "-"}</td>
            </tr>
            <tr>
              <td>START DATE</td>
              <td>{contractDetail?.buildingDetail.startDate || "None"}</td>
            </tr>
            <tr>
              <td>LAST CHECK DATE</td>
              <td>{contractDetail?.buildingDetail.checkDate || "None"}</td>
            </tr>
            <tr>
              <td>FINISH DATE</td>
              <td>{contractDetail?.buildingDetail.finishDate || "None"}</td>
            </tr>
            <tr>
              <td>STATUS</td>
              {contractDetail?.buildingDetail?.status===-1 && (
                <td>Not start yet</td>
              )}
              {contractDetail?.buildingDetail?.status===0 && (
                <td>Canceled</td>
              )}
              {contractDetail?.buildingDetail?.status===1 && (
                <td>In progress</td>
              )}
              {contractDetail?.buildingDetail?.status===2 && (
                <td>Finished</td>
              )}
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