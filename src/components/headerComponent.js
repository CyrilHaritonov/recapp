import React, {useEffect, useState} from "react";
import {
    Button,
    Collapse,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Nav,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavItem,
    NavLink,
    Row
} from "reactstrap";
import {SearchBarComponent} from "./searchBarComponent";
import {useDispatch, useSelector} from "react-redux";
import {getPlaylists, reset} from "../redux/reducers/playlists";
import {update} from "../redux/reducers/login";
import {Link} from "react-router-dom";
import {updateStatus} from "../redux/reducers/newPlaylist";

export const HeaderComponent = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.login.status);
    const wasUpdated = useSelector(state => state.newPlaylist.wasUpdated);
    useEffect(() => {
        if (isLoggedIn){
            dispatch(getPlaylists());
            if (wasUpdated){
                dispatch(getPlaylists());
                dispatch(updateStatus());
            }
        }
        else {
            dispatch(reset());
        }
        }, [isLoggedIn, wasUpdated]);
    const [isNavbarOpen, toggleNav] = useState(false);
    const [isLoginModalOpen, toggleLoginModal] = useState(false);
    return (
        <>
            <Navbar
                color="light"
                expand="md"
                dark
                className="bg-dark navbar-shadow"
                fixed="top"
            >
                <NavbarBrand className="ms-3 ms-md-5 mb-1">
                    <Link to={"/"}>
                        RecApp
                    </Link>
                </NavbarBrand>
                <NavbarToggler className="me-2" onClick={() => toggleNav(!isNavbarOpen)}/>
                <Collapse isOpen={isNavbarOpen} className="flex" navbar>
                    <Nav
                        className="me-auto"
                        navbar
                    >
                        <NavItem>
                            <NavLink>
                                <Link to="/">
                                    My playlists
                                </Link>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink>
                                <Link to="/subscription">
                                    Subscription
                                </Link>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink>
                                <Link to="/github">
                                GitHub
                                </Link>
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <SearchBarComponent/>
                    <Nav navbar className={"ms-lg-5 me-lg-5 ms-md-3 me-md-3"}>
                        <NavItem>
                            {isLoggedIn ?
                                <Button outline onClick={() => dispatch(update())}>Log out</Button>
                                :<Button outline onClick={() => toggleLoginModal(!isLoginModalOpen)}>Login</Button>}
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
            <Modal isOpen={isLoginModalOpen} className={"bg-dark text-white-50 rounded"} toggle={() => toggleLoginModal(!isLoginModalOpen)}
                   style={{border: "5px"}}>
                <ModalHeader className={"bg-dark border-secondary"} toggle={() => toggleLoginModal(!isLoginModalOpen)}
                style={{border: "none"}}>
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
                        dispatch(update()));
                    }}>Login with Spotify</Button>
                </ModalFooter>
            </Modal>
        </>
    );
}