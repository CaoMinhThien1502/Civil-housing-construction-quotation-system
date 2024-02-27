import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Session } from '../App';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

function BasicExample() {
    const session = useContext(Session);
    const navigate = useNavigate();

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container className="justify-content-center">
                <Navbar.Brand onClick={() => navigate('/')}>Dashboard</Navbar.Brand>
                {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
                {/* <Navbar.Collapse id="basic-navbar-nav">
                </Navbar.Collapse> */}
            </Container>
        </Navbar>
    );
}

export default BasicExample;