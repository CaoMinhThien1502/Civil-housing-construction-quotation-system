import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import NavItem from 'react-bootstrap/NavItem';
import NavLink from 'react-bootstrap/NavLink';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Collapse from 'react-bootstrap/Collapse';

function Example() {
    const [show, setShow] = useState(false);
    const [showTab2, setShowTab2] = useState(false);
    const [showTab3, setShowTab3] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleTabClick = (tab) => {
        switch (tab) {
            case 'tab1':
                setShowTab2(false);
                setShowTab3(false);
                break;
            case 'tab2':
                setShowTab2(true);
                setShowTab3(false);
                break;
            case 'tab3':
                setShowTab2(false);
                setShowTab3(true);
                break;
            default:
                break;
        }
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Launch
            </Button>

            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Offcanvas</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav variant="pills" className="flex-column">
                        <NavItem>
                            <NavLink href="/" onClick={() => handleTabClick('tab1')}>Dashboard</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                onClick={() => handleTabClick('tab2')}
                                className="dropdown-item-title"
                            >
                                Combo Management
                            </NavLink>
                            <Collapse in={showTab2}>
                                <div>
                                    <NavItem>
                                        <NavLink href="/combolist">Combo Building List</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="/materiallist">Material List</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="/materialtype">Material Type</NavLink>
                                    </NavItem>
                                </div>
                            </Collapse>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                onClick={() => handleTabClick('tab3')}
                                className="dropdown-item-title"
                            >
                                Building Management
                            </NavLink>
                            <Collapse in={showTab3}>
                                <div>
                                    <NavItem>
                                        <NavLink href="/">Building Management Content</NavLink>
                                    </NavItem>
                                </div>
                            </Collapse>
                        </NavItem>
                    </Nav>

                    {/* Existing content can remain here */}
                    <p>Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.</p>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default Example;