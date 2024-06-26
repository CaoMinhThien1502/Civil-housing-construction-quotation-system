import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './blog.css'; 
import { doc, getDoc } from "firebase/firestore";
import db from './firebase';
import anh1 from '../../img/house.jpg'
import anh2 from '../../img/bedroom.jpg';
import anh3 from '../../img/kitchen.jpg';
import construct from '../../img/sodo.png';

function UncontrolledExample() {
    const urlParams = new URLSearchParams(window.location.search);
    const blogId = urlParams.get("id");
    const [docData, setDocData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            let docRef;
            if (blogId === "1")
                docRef = doc(db, "01", "sample-blog1");
            else if (blogId === "2")
                docRef = doc(db, "01", "sample-blog2");
            else if (blogId === "3")
                docRef = doc(db, "01", "sample-blog3");
            else if (blogId === "4")
                docRef = doc(db, "01", "sample-blog4");
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setDocData(docSnap.data());
            } else {
                console.log("Không tìm thấy tài liệu!");
            }
        };
        fetchData();
    }, []);

    const slides = [
        { image: docData && docData["Carousel"][0], interval: 1000 },
        { image: docData && docData["Carousel"][1], interval: 1000 },
        { image: docData && docData["Carousel"][2], interval: 1000 },
    ];

    const [showModal, setShowModal] = useState(false);
    const [modalImage, setModalImage] = useState('');

    const handleImageClick = (image) => {
        setModalImage(image);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className="container-blog">
            <div className="row">
                <div className="col-md-3">
                    {docData && (
                        <Card style={{ width: '22rem', height: '37rem', marginTop: '40px', marginLeft: '20px',objectFit: "cover" }}>
                            <Card.Img
                                variant="top"
                                src={docData["Card-Img"][0]}
                                className="card-img-zoom"
                                onClick={() => handleImageClick(docData["Card-Img"][0])}
                            />
                            <Card.Body>
                                <Card.Title>{docData["Card-Body"][0]}</Card.Title>
                                <Card.Text>{docData["Card-Body"][1]}</Card.Text>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                {docData["ListInformation"].map((item, index) => (
                                    <ListGroup.Item key={index}>{item}</ListGroup.Item>
                                ))}
                            </ListGroup>
                            <Card.Body>
                                <Card.Link href="/home">Quay Lại</Card.Link>
                                <Card.Link href="/">Chi Tiết</Card.Link>
                            </Card.Body>
                        </Card>
                    )}
                </div>
                <div className="col-md-9 carousel-container">
                    <Carousel style={{ marginTop: '40px', border: '2px black' }}>
                        {slides.map((slide, index) => (
                            <Carousel.Item key={index} interval={slide.interval}>
                                <img
                                    src={slide.image}
                                    alt={`Slide ${index + 1}`}
                                    style={{ width: '1000px', height: '600px', marginLeft: '40px'}}
                                    onClick={() => handleImageClick(slide.image)}
                                />
                                <Carousel.Caption></Carousel.Caption>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </div>
            </div>

            <Modal show={showModal}  onHide={handleCloseModal} centered >
                <Modal.Body >
                    <img src={modalImage} 
                    alt="Modal" 
                    style={{ width: '100%', height: 'auto' }}
                    class = "modal-img-zoom" />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default UncontrolledExample;
