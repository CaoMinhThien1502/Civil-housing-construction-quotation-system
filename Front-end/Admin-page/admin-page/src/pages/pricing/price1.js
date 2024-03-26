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
import { useState } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
function ModalInputArea({ show, handleClose, handleAccept }) {
    const [area, setArea] = useState(""); // Thêm state cho area

    const handleAreaChange = (event) => {
        setArea(event.target.value);
    }

    const handleAcceptWithArea = () => {
        handleAccept(area); // Truyền giá trị của diện tích vào hàm handleAccept
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
                            onChange={handleAreaChange} // Gọi hàm handleAreaChange khi có sự thay đổi trong ô input
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleAcceptWithArea}> {/* Sử dụng hàm handleAcceptWithArea thay vì handleAccept */}
                    Accept
                </Button>
            </Modal.Footer>
        </Modal>
    );
}


function ProductCard({ imageSrc, title, rating, price, discountedPrice }) {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate(); 
    const handleViewPrice = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };
    const handleAccept = (area) => {
        setShowModal(false);
        navigate(`/price1/detail?area=${area}`);
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
                            <span><FaToilet className="icon" /> 1 WC</span>
                        </div>
                        <div className="spec-line">
                            <span><FaParking className="icon" /> 0 hầm</span>
                            <span><FaLayerGroup className="icon" style={{marginLeft: "42px"}} /> 1 tầng</span>
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
    return (
        <Tabs
            defaultActiveKey="home1"
            id="fill-tab-example"
            className="mb-3"
            fill
        >
            <Tab eventKey="home1" title="Biệt thự" >
                <div className="container mb-4">
                    <div className="d-flex justify-content-center row">
                        <ProductCard
                            imageSrc={bietthu1}
                            title="Biệt thự cổ"
                            rating={5}
                            price="13.99/m2"
                            discountedPrice="20.99"
                        />
                        <ProductCard
                            imageSrc={bietthu2}
                            title="Biệt thự hiện đại"
                            rating={5}
                            price="14.99"
                            discountedPrice="20.99"
                        />
                        {/* <ProductCard
                            imageSrc={basement}
                            title="Biệt thự hiện đại"
                            rating={5}
                            price="14.99"
                            discountedPrice="20.99"
                        /> */}

                    </div>
                </div>
            </Tab>
            <Tab eventKey="home2" title="Nhà phố">
                <div className="container mb-4">
                    <div className="d-flex justify-content-center row">
                        <ProductCard
                            imageSrc={bietthu1}
                            title="Biệt thự cổ"
                            rating={5}
                            price="13.99"
                            discountedPrice="20.99"
                        />
                        <ProductCard
                            imageSrc={bietthu2}
                            title="Biệt thự hiện đại"
                            rating={5}
                            price="14.99"
                            discountedPrice="20.99"
                        />
                        <ProductCard
                            imageSrc={basement}
                            title="Biệt thự hiện đại"
                            rating={5}
                            price="14.99"
                            discountedPrice="20.99"
                        />
                    </div>
                </div>
            </Tab>
            <Tab eventKey="home3" title="Nhà cấp IV">
                <div className="container mb-4">
                    <div className="d-flex justify-content-center row">
                        <ProductCard
                            imageSrc={basement}
                            title="Biệt thự cổ"
                            rating={5}
                            price="13.99"
                            discountedPrice="20.99"
                        />
                        <ProductCard
                            imageSrc={basement}
                            title="Biệt thự hiện đại"
                            rating={5}
                            price="14.99"
                            discountedPrice="20.99"
                        />
                        <ProductCard
                            imageSrc={basement}
                            title="Biệt thự hiện đại"
                            rating={5}
                            price="14.99"
                            discountedPrice="20.99"
                        />

                    </div>
                </div>
            </Tab>
        </Tabs>
    );
}

function PriceQuotation() {
    return (
        <>
            <Header />
            <section id='price-quotation-mbody' style = {{marginTop: "55px"}}>
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
