import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
    return (
        <>
            <div style={{height: '50px'}}></div>
            <footer className="bg-dark text-white" style={{position: 'fixed', bottom: '0', left: '0', width: '100%'}}>
                <Container>
                    <Row>
                        <Col>
                            <p>© 2022 Your Company. All rights reserved.</p>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </>
    );
};

export default Footer;
