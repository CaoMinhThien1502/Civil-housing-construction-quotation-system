import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../home/home";
import image1 from "../../img1/img/BaoGiaPTtietkiem-01.jpg";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';

const ConstructionForm = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  const [inputValue,setInputValue] = useState("");
  const [price, setPrice] = useState(0);
  const [landArea, setLandArea] = useState("");
  const [constructionPackage, setConstructionPackage] = useState("");
  const [swaggerData, setSwaggerData] = useState(null);
  const [selectedItemNames, setSelectedItemNames] = useState({
    Combo: "",
    "Loại Nhà": "",
    Hầm: "",
    Tầng: "",
    Mái: "",
  });
  const [selectedItemIds, setSelectedItemIds] = useState({
    Combo: "",
    "Loại Nhà": "",
    Hầm: "",
    Tầng: "",
    Mái: "",
  });
  

  const fetchDataComboFromSwagger = async () => {
    if (id === '0') {
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
    }
    if (id === '1') {
      try {
        const response = await fetch("http://localhost:8080/building/form-consultant/list?typeCombo=1", {
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
    }
    if (id === '2') {
      try {
        const response = await fetch("http://localhost:8080/building/form-consultant/list?typeCombo=2", {
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
    }
  };
  const postDataComboFromSwagger = async(dataPost) => {
    if (id === '0') {
    try {
      const response = await fetch("http://localhost:8080/building/price/list?comboId=0", {
        method: "POST",
        headers: {
          "Content-Type" : "application/json",
        },
        body : JSON.stringify(dataPost),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Data posted successfully:", data);
  
        // Assuming you want to extract the price
        const price = data?.price || 0; // Default to 0 if price is not available
        return data;
      } else {
        console.error("Failed to post data. Server returned:", response.status, response.statusText);
        return null;
      }
    } catch(error) {
      console.error("Error post data: ", error);
    } 
  }
  if (id === '1') {
    try {
      const response = await fetch("http://localhost:8080/building/price/list?comboId=1", {
        method: "POST",
        headers: {
          "Content-Type" : "application/json",
        },
        body : JSON.stringify(dataPost),
      });
      const data = await response.json();
      return data;
    } catch(error) {
      console.error("Error post data: ", error);
    } 
  } 
  if (id === '2') {
    try {
      const response = await fetch("http://localhost:8080/building/price/list?comboId=2", {
        method: "POST",
        headers: {
          "Content-Type" : "application/json",
        },
        body : JSON.stringify(dataPost),
      });
      const data = await response.json();
      // Assuming you want to extract the price
      const price = data?.price || 0; // Default to 0 if price is not available
      return data;
    } catch(error) {
      console.error("Error post data: ", error);
    } 
  }  
};



  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const data = await fetchDataComboFromSwagger();
      setSwaggerData(data);
      console.log("API Response:", data);
  
      if (data && data.comboList && data.itemTypeList) {
        setSwaggerData(data);
        setSelectedItemNames((prevNames) => ({
          ...prevNames,
          Combo: data.comboList[0]?.comboBuildingId || "",
          "Loại nhà": data.itemTypeList[0]?.itemList[0]?.itemId || "",
          Hầm: "",
          Tầng: "",
          Mái: "",
          Diện_tích: inputValue,
        }));
        console.log("Updated selectedItemNames:", selectedItemNames); // Add this line
        setModalShow(true);
        // Chuẩn bị dữ liệu gửi lên server 
        const requestBody = {
          area : inputValue,
          itemIdList : [
            selectedItemNames['Loại Nhà'],
            selectedItemNames['Hầm'],
            selectedItemNames['Tầng'],
            selectedItemNames['Mái'],
          ].filter(Boolean), // Lọc bỏ giá trị undefined
          comboType: 0,
          status : 0,
        };
        // gửi dữ liệu lên server
        const postedData = await postDataComboFromSwagger(requestBody);
        if (postedData) {
          // Do additional actions here if needed
          // For example, update the price state
          setPrice(postedData?.price || 0);
        } else {
          console.log("Data post failed. Check console for error details.");
        }
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
          setSelectedItemNames((prevNames) => ({
            ...prevNames,
            Combo: data.comboList[0]?.comboBuildingId|| "",
            "Loại nhà": data.itemTypeList[0]?.itemList[0]?.itemId || "",
            Hầm: "",
            Tầng: "",
            Mái: "",
          }));
          console.log("Updated selectedItemNames in useEffect:", selectedItemNames); // Add this line
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
                id="comboList.comboBuildingId"
                onChange={(e) => {
                  const selectedName = e.target.options[e.target.selectedIndex].text;
                  setSelectedItemNames((prevNames) => ({
                    ...prevNames,
                    Combo: selectedName || "",
                  }));
                }}
              >
                {swaggerData.comboList.map((combo) => (
                  <option key={combo.comboBuildingId}>{combo.comboBuildingName}</option>
                ))}
              </Form.Select>
            </div>
            {/* Sử dụng itemTypeList cho Loại Nhà, Hầm, Tầng, Mái */}
            {["Loại Nhà", "Hầm", "Tầng", "Mái"].map((typeName, index) => (
  <div key={typeName} className="col-md-6 mb-1">
    <label htmlFor={`itemType.${typeName}`} className="form-label">
      {typeName}
    </label>
    <Form.Select
      id={`itemType.${typeName}`}
      onChange={(e) => {
        const selectedName = e.target.options[e.target.selectedIndex].text;
        setSelectedItemNames((prevNames) => ({
          ...prevNames,
          [typeName]: selectedName || "",
        }));
      }}
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
                  selectedItemNames={selectedItemNames}
                  setSelectedItemNames={setSelectedItemNames}
                  inputValue={inputValue}  // Thêm inputValue vào props
                  setInputValue={setInputValue}
                  price = {price}
                  setPrice = {setPrice}
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
  const { onHide, selectedItemNames,inputValue,setInputValue,setSelectedItemNames,price,setPrice, ...rest } = props;

  useEffect(() => {
    console.log("selectedItemNames:", selectedItemNames);
  }, [selectedItemNames]);

  if (!selectedItemNames) {
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
      <Modal.Header closeButton onClick={onHide}>
        <Modal.Title id="contained-modal-title-vcenter">Bảng Báo Giá</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Diện tích:{inputValue || 'N/A' } </p>
        <p>Combo: {selectedItemNames.Combo || 'N/A'} </p>
        <p>Loại nhà: {selectedItemNames["Loại Nhà"] || 'N/A'} </p>
        <p>Hầm : {selectedItemNames.Hầm || 'N/A'} </p>
        <p>Tầng: {selectedItemNames.Tầng || 'N/A'} </p>
        <p>Mái: {selectedItemNames.Mái || 'N/A'} </p>
        <h5> TOTAL: {price} </h5>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Đăng ký</Button>
      </Modal.Footer>
    </Modal>
  );

}


export { ConstructionForm, ConsultImg };
