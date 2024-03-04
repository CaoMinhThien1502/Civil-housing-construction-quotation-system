import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import anh1 from '../../img1/img/house.jpg';
import anh2 from '../../img1/img/bedroom.jpg';
import anh3 from '../../img1/img/kitchen.jpg';
import construct from '../../img1/img/sodo.png';
import './blog.css'; // Thay thế yourStyles.css bằng đường dẫn thực tế đến tệp CSS của bạn

function UncontrolledExample() {
    const slides = [
        { image: anh1, interval: 1000 },
        { image: anh2, interval: 1000 },
        { image: anh3, interval: 1000 },
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
                    <Card style={{ width: '22rem', height: '37rem', marginTop: '40px', marginLeft: '20px' }}>
                        <Card.Img
                            variant="top"
                            src={construct}
                            className="card-img-zoom"
                            onClick={() => handleImageClick(construct)}
                        />
                        <Card.Body>
                            <Card.Title>Nhà Cấp 4</Card.Title>
                            <Card.Text>Được xây dựng và hoàn thành trong 6 tháng</Card.Text>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroup.Item>2 Phòng ngủ</ListGroup.Item>
                            <ListGroup.Item>1 Phòng ăn</ListGroup.Item>
                            <ListGroup.Item>1 Phòng bếp</ListGroup.Item>
                        </ListGroup>
                        <Card.Body>
                            <Card.Link href="/home">Quay Lại</Card.Link>
                            <Card.Link href="/">Chi Tiết</Card.Link>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-md-9 carousel-container">
                    <Carousel style={{ marginTop: '40px', border: '2px black' }}>
                        {slides.map((slide, index) => (
                            <Carousel.Item key={index} interval={slide.interval}>
                                <img
                                    src={slide.image}
                                    alt={`Slide ${index + 1}`}
                                    style={{ width: '1000px', height: '600px', marginLeft: '40px' }}
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
