  import React, { useState, useEffect } from "react";
  import {useParams } from "react-router-dom";
  import { useNavigate } from "react-router-dom";
  import { Header } from "../home/home";
  import image1 from "../../img/BaoGiaPTtietkiem-01.jpg"
  import Form from "react-bootstrap/esm/Form";
  import Button from 'react-bootstrap/Button';
  import Modal from 'react-bootstrap/Modal';
  import InputGroup from 'react-bootstrap/InputGroup';
  import { toast, ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import './price.css';
  import detail from "./detail";


    const ConstructionForm = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const [inputValue, setInputValue] = useState("");
    const [price, setPrice] = useState(0);
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
    const [selectedItemIds, setSelectedItemIds] = useState({
      Combo: "",
      "Loại Nhà": "",
      Hầm: "",
      Tầng: "",
      Mái: "",
    });
    useEffect(() => {
      const fetchDataComboFromSwagger = async () => {
        try {
          const response = await fetch(`http://localhost:8080/building/form-consultant/list?typeCombo=${id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await response.json();
          setSwaggerData(data);
        } catch (error) {
          console.error("Error fetching data from Swagger:", error);
        }
      };
      fetchDataComboFromSwagger();
    }, [id]);
  
    const postDataComboFromSwagger = async (dataPost) => {
      try {
        // Chuẩn bị requestBody với định dạng mong muốn
        const requestBody = {
          area: Number(dataPost.area), // Chuyển giá trị diện tích sang số
          itemIdList: dataPost.itemIdList, // Sử dụng danh sách ID được chọn
          comboType: 0, // Giữ nguyên giá trị mặc định
          status: 0, // Giữ nguyên giá trị mặc định
        };
    
        const response = await fetch(`http://localhost:8080/building/price/list?comboId=${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });
    
        if (response.ok) {
          const data = await response.json();
          return data.price;
        } else {
          console.error("Failed to post data. Server returned:", response.status, response.statusText);
        }
      } catch (error) {
        console.error("Error posting data: ", error);
      }
      return null;
    };
    // Hàm create contract 
    const createContract = async () => {
  const requestBody = {
    area: Number(inputValue), // Đảm bảo rằng giá trị diện tích được chuyển sang số
    itemIdList: Object.values(selectedItemIds).filter(Boolean), // Chuyển object sang array và loại bỏ giá trị falsy
    comboType: 0, // Giữ nguyên giá trị mặc định
    status: 0, // Giữ nguyên giá trị mặc định
  };

  try {
    const response = await fetch(`http://localhost:8080/request-contract/request-contract/create?comboId=${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Contract created successfully:", data);
      toast.success("Contract đã được tạo thành công!");
    } else {
      console.error("Failed to create contract. Server returned:", response.status, response.statusText);
      toast.error("Không thể tạo contract. Vui lòng thử lại!");
    }
  } catch (error) {
    console.error("Error creating contract:", error);
    toast.error("Lỗi khi tạo contract. Vui lòng thử lại!");
  }
};

    // Bổ sung hàm handleChange để xử lý việc thay đổi lựa chọn
    const handleChange = (typeName, selectedId, selectedName) => {
      setSelectedItemNames(prevNames => ({
        ...prevNames,
        [typeName]: selectedName,
      }));
      setSelectedItemIds(prevIds => ({
        ...prevIds,
        [typeName]: selectedId,
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      // Đảm bảo rằng inputValue đã được chuyển đổi thành số
      const areaValue = Number(inputValue);
    
      const requestBody = {
        area: areaValue, // Sử dụng giá trị đã chuyển đổi
        itemIdList: Object.values(selectedItemIds).filter(Boolean), // Chuyển đổi object thành array và lọc bỏ các giá trị falsy
        comboType: 0, // Giả sử giá trị mặc định là 0
        status: 0, // Giả sử giá trị mặc định là 0
      };
    
      const fetchedPrice = await postDataComboFromSwagger(requestBody);
      if (fetchedPrice !== undefined) { // Sửa đổi điều kiện kiểm tra dựa trên phản hồi thực tế từ hàm postDataComboFromSwagger
        setPrice(fetchedPrice);
        toast.success('Báo giá thành công!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setModalShow(true);
      } else {
        toast.error('Có lỗi xảy ra khi báo giá!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    };
  

    // handleIdDetail
      const redirectToDetail = (id) => {
      navigate(`/detail?id=${id}`);
      }
    
    return (
      <>
        <Header />
        <br />
        <br />
        <br />
        <div className="container mt-5">
        <div className='title'><HeadTitle/></div>
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
          const selectedId = e.target.value; // Get the selected ID
          const selectedName = e.target.options[e.target.selectedIndex].text;
          handleChange(typeName, selectedId, selectedName);

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
              <div className="col-md-12 mb-3 d-flex justify-content-between align-items-center">
                <>
                  <Button variant="primary" onClick={() => setModalShow(true)}>
                    Gửi Báo Giá
                  </Button>
                  <a href="" style={{fontSize: "18px"}} onClick={() => redirectToDetail(id)}> Chi tiết <i class="bi bi-arrow-bar-right"></i></a>
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
            <NoteFooter/> 
        </div>
      </>
    );
  };
  // Title 
  const HeadTitle = () => {
    return(
      <>
        <h2 style={{textAlign : 'center', color: "#3498db", fontFamily: "Georgia", letterSpacing: "3px",fontSize: "46px"}}> BẢNG BÁO GIÁ </h2>
      </>
    )
  }
  const NoteFooter = () => {
    return (
    <div className = 'note-container'>
      <div className= 'note-title'> </div>
      <div className = 'note'>
        <p>1. Giá trên <strong>chưa bao gồm </strong  > GTGT (VAT 10%)  </p>
        <p>2. Giá trên là giá tham khảo, sẽ có chênh lệch chênh dưới 5%  </p>
        <p>3. Để có được giá chính xác, xin hãy liên hệ với nhân viên </p>
      </div>
    </div>
    )
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


  export { ConstructionForm, ConsultImg, HeadTitle, NoteFooter};