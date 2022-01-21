import React, {useState} from "react";
import {
    Button,
    Collapse,
    Form,
    FormGroup,
    Input, InputGroup,
    Nav,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavItem,
    NavLink
} from "reactstrap";

export const HeaderComponent = () => {
    const [isNavbarOpen, toggleNav] = useState(0);
    return (
        <>
            <Navbar
                color="light"
                expand="md"
                dark
                className="bg-dark"
                fixed="top"
            >
                <NavbarBrand href="/" className="ms-3 ms-md-5">
                    RecApp
                </NavbarBrand>
                <NavbarToggler className="me-2" onClick={() => toggleNav(!isNavbarOpen)}/>
                <Collapse isOpen={isNavbarOpen} className="flex" navbar>
                    <Nav
                        className="me-auto"
                        navbar
                    >
                        <NavItem>
                            <NavLink href="/myplaylists">
                                My playlists
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/subscription">
                                Subscription
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/github">
                                GitHub
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <Nav className="ms-md-auto me-md-auto" navbar>
                        <NavItem>
                            <Form className="mt-2">
                                <FormGroup row>
                                    <InputGroup>
                                        <Input className="song-search" type="search" placeholder="Search" aria-label="Search"/>
                                        <Button className="song-search" outline>Search</Button>
                                    </InputGroup>
                                </FormGroup>
                            </Form>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </>
    );
}