import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../home/home";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import InputGroup from "react-bootstrap/InputGroup";
import axios from "axios";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
import ToastAfterShowPriceQuoation from "./toast";
import './toast.css';
//payment
import {  HmacSHA256Hash, IpAddr, URL_API, URL_VNPay, command, commandPay, currCode, locale, locate, reciveURL, secretKey, tmnCode, txnRef, version } from '../payment/configpayment';
import { HmacSHA256, HmacSHA512 } from 'crypto-js';
import CryptoJS from "crypto-js";
import Thanks from "../payment/success";
import { element } from "prop-types";


const ConstructionForm = () => {
  const isLoggedIn = !!localStorage.getItem('token');
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  const [inputValue, setInputValue] = useState("");
  const [swaggerData, setSwaggerData] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [toastShow, setToastShow] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const navigate = useNavigate();
  const [selectedItemNames, setSelectedItemNames] = useState({
    Combo: "",
    "Loại Nhà": "",
    Hầm: "",
    Tầng: "",
    Móng: "",
  });
  const [selectedItemIds, setSelectedItemIds] = useState({
    Combo: "",
    "Loại Nhà": "",
    Hầm: "",
    Tầng: "",
    Móng: "",
  });
  const [selectedItemPrices, setSelectedItemPrices] = useState({
    Combo: 0,
    "Loại Nhà": 0,
    Hầm: 0,
    Tầng: 0,
    Móng: 0,
  });
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchDataComboFromSwagger = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/building/form-consultant/list?typeCombo=${id}&email=${localStorage.getItem('mail')}`,  
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
    setSelectedItemIds((prevIds) => ({
      ...prevIds,
      [typeName]: selectedId,
    }));

    const selectedItemType = swaggerData?.itemTypeList.find(
      (itemType) => itemType.itemTypeName === typeName
    );

    if (selectedItemType && selectedItemType.itemList) {
      const selectedItem = selectedItemType.itemList.find(
        (item) => item.itemId === selectedId
      );
      if (selectedItem) {
        const itemPrice = selectedItem.priceItem || 0;
        setSelectedItemPrices((prevPrices) => ({
          ...prevPrices,
          [typeName]: itemPrice,
        }));
      }
    }
  };

  useEffect(() => {
    let totalPrice = 0;
    Object.values(selectedItemPrices).forEach((priceItem) => {
      totalPrice += priceItem;
    });

    totalPrice =
      swaggerData?.comboList.find(
        (combo) => combo.comboBuildingName === selectedItemNames.Combo
      )?.comboPrice *
      inputValue +
      totalPrice;
    setTotalPrice(totalPrice);
  }, [selectedItemPrices, selectedItemNames.Combo, inputValue]);

  //payment
  function parseDate(){
    var today = new Date();
    today.setHours(today.getHours() + 7);
    today = today.toISOString();
    today = today.replaceAll('-','');
    today = today.replaceAll(":",'');
    today = today.replaceAll("T",'');
    let split = today.split(".");
    today = split[0];
    return today;
  }
  const area = Number(inputValue);
    const itemIdList = [
      selectedItemIds.Hầm,
      selectedItemIds["Loại Nhà"],
      selectedItemIds.Móng,
      selectedItemIds.Tầng
    ];
    const comboId = selectedItemIds.Combo;
    const email = localStorage.getItem('mail');
    // Component Thanks
  let amount = 'vnp_Amount='+'20000000';
  let command = '&vnp_Command='+commandPay;
  let createDate = '&vnp_CreateDate='+parseDate();
  let curCode = '&vnp_CurrCode='+currCode;
  let ipAdd = '&vnp_IpAddr=' + IpAddr;
  let local = '&vnp_Locale=' + locale;
  let orderInfor = '&vnp_OrderInfo='+ comboId + '+' + area + '+'+swaggerData?.userId +'+' + selectedItemIds.Hầm + '+'+ selectedItemIds["Loại Nhà"] + '+' + selectedItemIds.Móng + '+'+ selectedItemIds.Tầng; 
                  //  itemIdList.forEach((element) => {orderInfor +=  '+' + element});
  let orderType = '&vnp_OrderType=' + 'BaoGia';
  let returnUrl = '&vnp_ReturnUrl=' + reciveURL;
  let tmn = '&vnp_TmnCode=' + tmnCode;
  let ref = '&vnp_TxnRef=' + txnRef;
  let vpnVersion = '&vnp_Version='+version;
  let plainText = amount+command+createDate+curCode+ipAdd+local+orderInfor+orderType
  +returnUrl+tmn+ref+vpnVersion;
  let sercureHash = HmacSHA512(plainText,secretKey).toString();
  var vnPayURLRequest = URL_VNPay+plainText+"&vnp_SecureHash="+sercureHash
  console.log("hi"+vnPayURLRequest)
  // handleSubmit
  const handleSubmit = async () => {
    const area = Number(inputValue);
    const itemIdList = [
      selectedItemIds.Hầm,
      selectedItemIds["Loại Nhà"],
      selectedItemIds.Móng,
      selectedItemIds.Tầng
    ];
    const comboId = selectedItemIds.Combo;
    const email = localStorage.getItem('mail');

    // orderInfo add
    orderInfor += comboId + ',' + area + ',' + email + ',' + itemIdList;
    window.location.href = vnPayURLRequest;
  }



  const redirectToDetail = (id) => {
    navigate(`/detail?id=${id}`);
  };

  const handleRegister = () => {
    // handleSubmit();
    setModalShow(false);
  };
  const handleShowPriceQuote = () => {
    if (isLoggedIn) {
      setModalShow(true);
    } else {
      alert("Bạn cần đăng nhập để xem báo giá.");
    }
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
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="row g-2"
          >
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
                  const selectedId = e.target.value; // Giả sử giá trị của option chính là comboId
                  const selectedName = e.target.options[e.target.selectedIndex].text;
                  setSelectedItemNames((prevNames) => ({
                    ...prevNames,
                    Combo: selectedName,
                  }));
                  setSelectedItemIds((prevIds) => ({
                    ...prevIds,
                    Combo: selectedId, // Đảm bảo rằng comboId được cập nhật
                  }));
                }}
              >
                {swaggerData.comboList.map((combo) => (
                  <option key={combo.comboBuildingId} value={combo.comboBuildingId}>
                    {combo.comboBuildingName}
                  </option>
                ))}
              </Form.Select>


            </div>
            {["Loại Nhà", "Hầm", "Tầng", "Móng"].map((typeName, index) => (
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
                  {swaggerData && swaggerData.itemTypeList ? (
                    swaggerData.itemTypeList
                      .find((itemType) => {
                        if (itemType.itemTypeName === typeName) {
                          console.log("Found itemType:", itemType);
                        }
                        return itemType.itemTypeName === typeName;
                      })
                      ?.itemList.map((item) => {
                        console.log("Mapping item:", item);
                        return (
                          <option key={item.itemId} value={item.itemId}>
                            {item.itemName}
                          </option>
                        );
                      })
                  ) : (
                    <option value="">Loading...</option>
                  )}
                </Form.Select>
              </div>
            ))}
            <div className="col-md-12 mb-3 d-flex justify-content-between align-items-center">
              <>
                <Button variant="primary" onClick={() => handleShowPriceQuote()}>
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
                {!isRegistered && (
                  <MyVerticallyCenteredModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    selectedItemNames={selectedItemNames}
                    inputValue={inputValue}
                    totalPrice={totalPrice}
                    handleRegister={handleRegister}
                    vnPayURLRequest={vnPayURLRequest}
                    handleSubmit={handleSubmit}
                  />
                )}
                < ToastAfterShowPriceQuoation
                  toastShow={toastShow}
                  setToastShow={setToastShow}
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

function MyVerticallyCenteredModal({
  show,
  onHide,
  selectedItemNames,
  inputValue,
  totalPrice,
  handleRegister,
  vnPayURLRequest,
  handleSubmit,
}) {
  if (!selectedItemNames) {
    return (
      <Modal
        show={show}
        onHide={onHide}
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
          <Button onClick={onHide}>Đóng</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
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
        <p>Diện tích: {inputValue || "N/A"} m2</p>
        <p>Combo: {selectedItemNames.Combo || "N/A"}</p>
        <p>Loại nhà: {selectedItemNames["Loại Nhà"] || "N/A"}</p>
        <p>Hầm : {selectedItemNames.Hầm || "N/A"}</p>
        <p>Tầng: {selectedItemNames.Tầng || "N/A"}</p>
        <p>Móng: {selectedItemNames.Móng || "N/A"}</p>
        <p>TOTAL: {totalPrice || "N/A"}</p>
      </Modal.Body>
      <Modal.Footer>
         <Button onClick={handleSubmit}>Đăng ký</Button> 
        <Button onClick={onHide}>Đóng</Button>
        
      </Modal.Footer>
    </Modal>
  );
}

export { ConstructionForm, HeadTitle, NoteFooter }; 
