import React from "react";
import './price1.css';
import basement from "../../img/basement.jpg";
import basement1 from "../../img/basement2.png";
import bietthu1 from "../../img/bietthu1.jpg";
import bietthu2 from "../../img/bietthu2.jpg";
import house from "../../img/house.png";
import { Header } from "../home/home";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { FaBed, FaBath, FaUtensils, FaLayerGroup, FaHome, FaParking, FaToilet } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
function ModalInputArea({ show, handleClose, handleAccept }) {
    const [area, setArea] = useState("");
    const [constructionType, setConstructionType] = useState(""); 

    const handleAreaChange = (event) => {
        setArea(event.target.value);
    }

    const handleConstructionTypeChange = (event) => {
        setConstructionType(event.target.value);
    }

    const handleAcceptWithArea = () => {
        // Nếu constructionType là null hoặc undefined, sử dụng giá trị mặc định là "Xây phần thô"
        const selectedConstructionType = constructionType || "0";
        handleAccept({ area, constructionType: selectedConstructionType });
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Nhập diện tích đất (m2)</Form.Label>
                        <Form.Control
                            type="text"
                            name="area"
                            placeholder="m2"
                            autoFocus
                            onChange={handleAreaChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
                        <Form.Label>Loại công trình</Form.Label>
                        <Form.Control as="select" onChange={handleConstructionTypeChange}>
                            <option value="0">Xây phần thô</option>
                            <option value="1">Xây hoàn thiện</option>
                            <option value="2">Xây trọn gói</option>
                        </Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleAcceptWithArea}>
                    Accept
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalInputArea;


function ProductCard({ imageSrc, title,id}) {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate(); 
    const handleViewPrice = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };
    const handleAccept = ({area,constructionType}) => {
        setShowModal(false);
        navigate(`/price1/detail?buildingId=${id}&comboTypeId=${constructionType}&area=${area}&title=${encodeURIComponent(title)}`);
    }

    return (
        <div className="col-md-4">
            <div className="card product-card">
                <img className="card-img-top" src={imageSrc} alt={title} />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <div className="specs">
                        <div className="spec-line">
                            <span><FaBed className="icon" /> 1 phòng ngủ</span>
                            <span><FaBath className="icon" /> 1 nhà tắm</span>
                        </div>
                        <div className="spec-line">
                            <span><FaUtensils className="icon" /> 1 phòng bếp</span>
                            <span><FaLayerGroup className="icon" /> 1 tầng</span>
                        </div>
                        <div className="spec-line">
                            <span><FaParking className="icon" /> 0 hầm</span>
                            
                        </div>
                    </div>
                    <div className="buttons">
                        <button className="btn btn-primary btn-sm" onClick={handleViewPrice}>Xem giá</button>
                        <button className="btn btn-outline-primary btn-sm">Chi tiết</button>
                    </div>
                </div>
            </div>
            <ModalInputArea show={showModal} handleClose={handleCloseModal} handleAccept={handleAccept}/>
        </div>
    );
}

function FillExample() {
    const [buildings, setBuildings] = useState([]);
    const [selectedTab, setSelectedTab] = useState('home1'); // Default tab is 'Biệt thự'

    useEffect(() => {
        // Call API to fetch building data based on selected tab
        const buildingTypeId = getBuildingTypeId(selectedTab);
        axios.get(`http://localhost:8080/building/type/get?buildingTypeId=${buildingTypeId}`)
            .then(response => {
                if (response.status === 200) {
                    const data = response.data;
                    if (data.status) {
                        setBuildings(data.buildings);
                    } else {
                        console.error('Error fetching building data');
                    }
                } else {
                    console.error('Error fetching building data');
                }
            })
            .catch(error => console.error('Error fetching building data:', error));
    }, [selectedTab]);

    // Function to get buildingTypeId based on selected tab
    const getBuildingTypeId = (tabKey) => {
        switch (tabKey) {
            case 'home1':
                return 1; // Biệt thự
            case 'home2':
                return 2; // Nhà phố
            case 'home3':
                return 3; // Nhà cấp 4
            default:
                return 1; // Default to Biệt thự
        }
    };

    return (
        <Tabs
            defaultActiveKey="home1"
            id="fill-tab-example"
            className="mb-3"
            fill
            onSelect={(tab) => setSelectedTab(tab)}
        >
            <Tab eventKey="home1" title="Biệt thự">
                <div className="container mb-4">
                    <div className="d-flex justify-content-center row">
                        {buildings.map((item) => 
                            <ProductCard
                                id={item.buildingId}
                                imageSrc={bietthu1}
                                title={item.buildingName}
                            />
                        )}
                    </div>
                </div>
            </Tab>
            <Tab eventKey="home2" title="Nhà phố">
                <div className="container mb-4">
                    <div className="d-flex justify-content-center row">
                        {buildings.map((item) => 
                            <ProductCard
                                id={item.buildingId}
                                imageSrc={bietthu1}
                                title={item.buildingName}
                            />
                        )}
                    </div>
                </div>
            </Tab>
            <Tab eventKey="home3" title="Nhà cấp IV">
                <div className="container mb-4">
                    <div className="d-flex justify-content-center row">
                        {buildings.map((item) => 
                            <ProductCard
                                id={item.buildingId}
                                imageSrc={bietthu1}
                                title={item.buildingName}
                            />
                        )}
                    </div>
                </div>
            </Tab>
        </Tabs>
    );
}

function PriceQuotation() {
    return (
        <>
            <Header className="custom-header"/>
            <section id='price-quotation-mbody' style = {{marginTop: "100px"}}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <FillExample />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export { FillExample, PriceQuotation, ProductCard };
