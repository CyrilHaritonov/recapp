import React, {useEffect, useState} from "react";
import {
    Button,
    Collapse,
    Form,
    FormGroup,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Nav,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavItem,
    NavLink, Row
} from "reactstrap";
import {SearchBarComponent} from "./searchBarComponent";
import {useDispatch} from "react-redux";
import {getPlaylists} from "../redux/reducers/playlists";

export const HeaderComponent = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPlaylists());
    }, [dispatch]);
    const [isNavbarOpen, toggleNav] = useState(false);
    const [isLoginModalOpen, toggleLoginModal] = useState(false);
    const [isLoggedIn, changeLoginStatus] = useState(false);
    return (
        <>
            <Navbar
                color="light"
                expand="md"
                dark
                className="bg-dark navbar-shadow"
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
                            <NavLink href="/playlists">
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
                    <SearchBarComponent/>
                    <Nav navbar className={"ms-lg-5 me-lg-5 ms-md-5 me-md-5"}>
                        <NavItem>
                            {isLoggedIn ?
                                <Button onClick={() => changeLoginStatus(!isLoggedIn)}>Log out</Button>
                                :<Button onClick={() => toggleLoginModal(!isLoginModalOpen)}>Login</Button>}
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
            <Modal isOpen={isLoginModalOpen} className={"bg-dark text-white-50"} toggle={() => toggleLoginModal(!isLoginModalOpen)}>
                <ModalHeader className={"bg-dark border-secondary"} toggle={() => toggleLoginModal(!isLoginModalOpen)}>
                    <Row>
                        <h3 className={"modal-title ms-2"}>Login with Spotify</h3>
                    </Row>
                </ModalHeader>
                <ModalBody className={"bg-dark border-dark"}>
                    <div>
                        You will be taken to the Spotify login page.
                        We can not access any of your account`s data except for which you gave us permission to do so.
                    </div>
                </ModalBody>
                <ModalFooter className={"bg-dark border-dark pt-0"}>
                    <Button className={"ms-2 me-auto btn-success"} onClick={() => {
                        return(toggleLoginModal(!isLoginModalOpen),
                        changeLoginStatus(!isLoggedIn));
                    }}>Login with Spotify</Button>
                </ModalFooter>
            </Modal>
        </>
    );
}