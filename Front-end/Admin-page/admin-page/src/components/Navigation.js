import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Session } from '../App';
import { useContext } from 'react';

function BasicExample() {
    const session = useContext(Session);

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container className="justify-content-center">
                <Navbar.Brand href="/" className="text-center">Dashboard</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {/* All navigation links removed */}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default BasicExample;