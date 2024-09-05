import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { AuthContext } from "../helpers/AuthContext"
import { useState, useContext } from "react";

export function CustomNavbar() {
    const { AuthState, setAuthState } = useContext(AuthContext);

    const logOut = async () => {
        localStorage.removeItem("accessToken")
        localStorage.removeItem("username")
        setAuthState(false)
    }

    return (
        <Navbar expand="lg" className="navbar" fixed="top" bg="light" data-bs-theme="light">
            <Container>
                <Navbar.Brand href="/">GiftBerry</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link href="/" class="nav-link disabled">Friends</Nav.Link>
                        <NavDropdown title="Profile" id="basic-nav-dropdown">
                            <NavDropdown.Item href={localStorage.getItem("username")}>{localStorage.getItem("username")}</NavDropdown.Item>
                            <NavDropdown.Item href="EditProfile">Edit Profile</NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item onClick={logOut}>Log Out</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}