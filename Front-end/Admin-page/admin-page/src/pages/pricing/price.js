import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../home/home";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./price.css";
import image1 from "../../img/BaoGiaPTtietkiem-01.jpg";

const ConstructionForm = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  const [inputValue, setInputValue] = useState("");
  const [swaggerData, setSwaggerData] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const navigate = useNavigate();
  const [selectedItemNames, setSelectedItemNames] = useState({
    Combo: "",
    "Loại Nhà": "",
    Hầm: "",
    Tầng: "",
    Mái: "",
  });
  const [selectedItemPrices, setSelectedItemPrices] = useState({
    Combo: 0,
    "Loại Nhà": 0,
    Hầm: 0,
    Tầng: 0,
    Mái: 0,
  });
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchDataComboFromSwagger = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/building/form-consultant/list?typeCombo=${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setSwaggerData(data);
      } catch (error) {
        console.error("Error fetching data from Swagger:", error);
      }
    };
    fetchDataComboFromSwagger();
  }, [id]);

  const handleChange = (typeName, selectedId, selectedName) => {
    setSelectedItemNames((prevNames) => ({
      ...prevNames,
      [typeName]: selectedName,
    }));

    const selectedItem = swaggerData?.itemTypeList
      .find((itemType) => itemType.itemTypeName === typeName)
      .itemList.find((item) => item.itemId === selectedId);

    if (selectedItem) {
      const itemPrice = selectedItem.itemPrice || 0;
      setSelectedItemPrices((prevPrices) => ({
        ...prevPrices,
        [typeName]: itemPrice,
      }));
    }
  };

  useEffect(() => {
    let totalPrice = 0;
    Object.values(selectedItemPrices).forEach((itemPrice) => {
      totalPrice += itemPrice;
    });

    totalPrice =
      swaggerData?.comboList.find(
        (combo) => combo.comboBuildingName === selectedItemNames.Combo
      )?.comboPrice *
        inputValue +
      totalPrice;
    setTotalPrice(totalPrice);
  }, [selectedItemPrices, selectedItemNames.Combo, inputValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setModalShow(true);
  };

  const redirectToDetail = (id) => {
    navigate(`/detail?id=${id}`);
  };

  return (
    <>
      <Header />
      <br />
      <br />
      <br />
      <div className="container mt-5">
        <div className="title">
          <HeadTitle />
        </div>
        {swaggerData && (
          <form onSubmit={handleSubmit} className="row g-2">
            <div className="col-md-6 mb-1">
              <label htmlFor="landArea" className="form-label">
                Diện tích
              </label>
              <InputGroup className="mb-2">
                <InputGroup.Text id="inputGroup-sizing-default">
                  m2
                </InputGroup.Text>
                <Form.Control
                  id="landArea"
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              </InputGroup>
            </div>
            <div className="col-md-6 mb-1">
              <label htmlFor="constructionPackage" className="form-label">
                Combo
              </label>
              <Form.Select
                id="comboList.comboBuildingName"
                onChange={(e) => {
                  const selectedName =
                    e.target.options[e.target.selectedIndex].text;
                  setSelectedItemNames((prevNames) => ({
                    ...prevNames,
                    Combo: selectedName || "",
                  }));
                }}
              >
                {swaggerData.comboList.map((combo) => (
                  <option key={combo.comboBuildingId}>
                    {combo.comboBuildingName}
                  </option>
                ))}
              </Form.Select>
            </div>
            {["Loại Nhà", "Hầm", "Tầng", "Mái"].map((typeName, index) => (
              <div key={typeName} className="col-md-6 mb-1">
                <label
                  htmlFor={`itemType.${typeName}`}
                  className="form-label"
                >
                  {typeName}
                </label>
                <Form.Select
                  id={`itemType.${typeName}`}
                  onChange={(e) => {
                    const selectedId = e.target.value;
                    const selectedName =
                      e.target.options[e.target.selectedIndex].text;
                    handleChange(typeName, selectedId, selectedName);
                  }}
                >
                  {swaggerData.itemTypeList
                    .find((itemType) => itemType.itemTypeName === typeName)
                    .itemList.map((item) => (
                      <option key={item.itemId} value={item.itemId}>
                        {item.itemName}
                      </option>
                    ))}
                </Form.Select>
              </div>
            ))}
            <div className="col-md-12 mb-3 d-flex justify-content-between align-items-center">
              <>
                <Button variant="primary" onClick={() => setModalShow(true)}>
                  Gửi Báo Giá
                </Button>
                <a
                  href=""
                  style={{ fontSize: "18px" }}
                  onClick={() => redirectToDetail(id)}
                >
                  {" "}
                  Chi tiết{" "}
                  <i className="bi bi-arrow-bar-right"></i>
                </a>
                <MyVerticallyCenteredModal
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                  selectedItemNames={selectedItemNames}
                  inputValue={inputValue}
                  totalPrice={totalPrice}
                  selectedItemPrices={selectedItemPrices}
                />
              </>
            </div>
          </form>
        )}
        <NoteFooter />
      </div>
    </>
  );
};

const HeadTitle = () => {
  return (
    <>
      <h2
        style={{
          textAlign: "center",
          color: "#3498db",
          fontFamily: "Georgia",
          letterSpacing: "3px",
          fontSize: "46px",
        }}
      >
        {" "}
        BẢNG BÁO GIÁ{" "}
      </h2>
    </>
  );
};

const NoteFooter = () => {
  return (
    <div className="note-container">
      <div className="note-title"> </div>
      <div className="note">
        <p>
          1. Giá trên <strong>chưa bao gồm </strong> GTGT (VAT 10%){" "}
        </p>
        <p>
          2. Giá trên là giá tham khảo, sẽ có chênh lệch chênh dưới 5%{" "}
        </p>
        <p>3. Để có được giá chính xác, xin hãy liên hệ với nhân viên </p>
      </div>
    </div>
  );
};

const ConsultImg = () => {
  return (
    <div>
      <img
        src={image1}
        alt="Consultation Image"
        style={{ width: "100%", height: "auto" }}
      />
    </div>
  );
};

function MyVerticallyCenteredModal(props) {
  const {
    onHide,
    selectedItemNames,
    inputValue,
    totalPrice,
    selectedItemPrices,
  } = props;

  useEffect(() => {
    console.log("selectedItemNames:", selectedItemNames);
  }, [selectedItemNames]);

  if (!selectedItemNames) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Bảng Báo Giá
          </Modal.Title>
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
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton onClick={onHide}>
        <Modal.Title id="contained-modal-title-vcenter">
          Bảng Báo Giá
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Diện tích: {inputValue || "N/A"} m2</p>
        <p>Combo: {selectedItemNames.Combo || "N/A"}</p>
        <p>Loại nhà: {selectedItemNames["Loại Nhà"] || "N/A"}</p>
        <p>Hầm : {selectedItemNames.Hầm || "N/A"}</p>
        <p>Tầng: {selectedItemNames.Tầng || "N/A"}</p>
        <p>Mái: {selectedItemNames.Mái || "N/A"}</p>
        <p>TOTAL: {totalPrice || "N/A"}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Đăng ký</Button>
      </Modal.Footer>
    </Modal>
  );
}

export { ConstructionForm, ConsultImg, HeadTitle, NoteFooter };

