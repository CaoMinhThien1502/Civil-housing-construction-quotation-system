import React, { useState, useEffect } from "react";
import { Header } from "../home/home";
import image1 from "../../img1/img/BaoGiaPTtietkiem-01.jpg";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';

const ConstructionForm = () => {
  const [landArea, setLandArea] = useState("");
  const [constructionPackage, setConstructionPackage] = useState("");
  const [swaggerData, setSwaggerData] = useState(null);
  const [selectedItemIds, setSelectedItemIds] = useState ({
    Combo: "",
    "Loại nhà" : "",
    Hầm: "",
    Tầng: "",
    Mái: "",
  });

  const fetchDataComboFromSwagger = async () => {
    try {
      const response = await fetch("http://localhost:8080/building/form-consultant/list?typeCombo=0", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data from Swagger:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await fetchDataComboFromSwagger();
      setSwaggerData(data);
      console.log("API Response:", data);
      // Kiểm tra xem dữ liệu có tồn tại không
      if (data && data.comboList && data.itemTypeList) {
        setSwaggerData(data);
        setSelectedItemIds((prevIds) => ({
          ...prevIds,
          Combo: data.comboList[0]?.comboBuildingId || "", // Assuming there is at least one combo
          "Loại nhà": data.itemTypeList[0]?.itemList[0]?.itemId || "",
          Hầm: "",
          Tầng: "",
          Mái: "",
        }));
        setModalShow(true);
      } else {
        console.log("Dữ liệu từ Swagger không tồn tại hoặc không đúng định dạng.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchDataComboFromSwagger();
      setSwaggerData(data);
        if (data && data.comboList && data.itemTypeList) {
          setSelectedItemIds({
            Combo: data.comboList[0]?.comboBuildingId || "",
            "Loại nhà": data.itemTypeList[0]?.itemList[0]?.itemId || "",
            Hầm: "",
            Tầng: "",
            Mái: "",
          });
        } else {
          console.log("Dữ liệu từ Swagger không tồn tại hoặc không đúng định dạng.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);
  // Modal Form Const
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <>
      <Header />
      <br />
      <br />
      <br />
      <div className="container mt-5">
        {swaggerData && (
          <form onSubmit={handleSubmit} className="row g-2">
            <div className="col-md-6 mb-1">
              <label htmlFor="constructionPackage" className="form-label">
                Diện tích
              </label>
              <InputGroup className="mb-2">
                <InputGroup.Text id="inputGroup-sizing-default">
                  m2
                </InputGroup.Text>
                <Form.Control
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                />
              </InputGroup>
            </div>
            <div className="col-md-6 mb-1">
              <label htmlFor="constructionPackage" className="form-label">
                Combo
              </label>
              <Form.Select
              id = "comboList.comboBuildingId"
              onChange={(e) => {
              // setSelectedItemIds({...selectedItemIds,'Combo' : e.target.value});
              console.log(e.target.value);}
              }
              >
                {swaggerData.comboList.map((combo) => (
                  <option key={combo.comboBuildingId}>{combo.comboBuildingName}</option>
                ))}
              </Form.Select>
            </div>
            {/* Sử dụng itemTypeList cho Loại Nhà, Hầm, Tầng, Mái */}
            {["Loại Nhà", "Hầm", "Tầng", "Mái"].map((typeName) => (
              <div key={typeName} className="col-md-6 mb-1">
                <label htmlFor="constructionPackage" className="form-label">
                  {typeName}
                </label>
                <Form.Select 
                id="itemType.itemTypeName"
                 onChange= {(e) => {
                // setSelectedItemIds({...selectedItemIds,[typeName]:e.target.value}) // toán tử spread
                console.log(e.target.value);}
                 }
                >
                  {swaggerData.itemTypeList
                    .find((itemType) => itemType.itemTypeName === typeName)
                    .itemList.map((item) => (
                      <option key={item.itemId} value={item.itemId}>{item.itemName}</option>
                    ))}
                </Form.Select>
              </div>
            ))}
            {/* Nút Submit */}
            <div className="col-md-4 mb-3">
              <>
                <Button variant="primary" onClick={() => setModalShow(true)}>
                  Gửi Báo Giá
                </Button>

                <MyVerticallyCenteredModal
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                />
              </>
            </div>
          </form>
        )}
        <ConsultImg />
      </div>
    </>
  );
};
// Ảnh
const ConsultImg = () => {
  return (
    <div>
      <img src={image1} alt="Consultation Image" style={{ width: '100%', height: 'auto' }} />
    </div>
  );
};
// Modal Form 
function MyVerticallyCenteredModal(props) {
  const { selectedItemIds, ...rest } = props;
   useEffect(() => {
    console.log("selectedItemIds:", selectedItemIds);
  }, [selectedItemIds]);
   if (!selectedItemIds) {
    return (
      <Modal {...rest} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Bảng Báo Giá</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Không có dữ liệu để hiển thị.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button>Liên hệ</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <Modal {...rest} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Bảng Báo Giá</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Diện tích: {}</p>
        <p>Combo: {selectedItemIds.Combo || 'N/A'} </p>
        <p>Loại nhà: {selectedItemIds["Loại Nhà"] || 'N/A'} </p>
        <p>Hầng : {selectedItemIds.Hầm || 'N/A'} </p>
        <p>Tầng: {selectedItemIds.Tầng || 'N/A'} </p>
        <p>Mái: {selectedItemIds.Mái || 'N/A'} </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
const FetchDataPriceQuotation = async () => {
  try {
    const response = await fetch("http://localhost:8080/building/form-consultant/list?typeCombo=0", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data from Swagger:", error);
    throw error;
  }
};
export { ConstructionForm, ConsultImg, FetchDataPriceQuotation };
