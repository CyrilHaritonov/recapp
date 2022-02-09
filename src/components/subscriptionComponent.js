import React, {useState} from 'react';
import {Button, Card, CardBody, CardText, CardTitle, Modal, ModalBody, ModalFooter, ModalHeader, Row} from "reactstrap";

const SubscriptionComponent = () => {
    const [isModalOpen, toggleModal] = useState(false);
    return (
        <>
            <Row className={"d-flex mt-5 justify-content-center"}>
                <Card color={"dark"} className={"text-white col-lg-9"}>
                    <CardBody>
                        <CardTitle>
                            <h1>Discover Better Experience with RecApp Plus!</h1>
                        </CardTitle>
                        <CardText className={"mt-5"}>
                            <h4>Create unlimited number of playlists</h4>
                        </CardText>
                        <div className={"d-flex justify-content-center"}>
                            <Button outline size={"lg"} onClick={() => toggleModal(!isModalOpen)}>Subscribe</Button>
                        </div>
                    </CardBody>
                </Card>
            </Row>
            <Modal isOpen={isModalOpen} toggle={() => toggleModal(!isModalOpen)} style={{marginTop: "40vh"}}>
                <ModalHeader className={"bg-dark text-white-50 border-0"}>
                    <h3>Subscribe</h3>
                </ModalHeader>
                <ModalBody className={"bg-dark text-white-50 border-0"}>
                    <h6>This feature is unavailable in mvp version of this app.</h6>
                </ModalBody>
                <ModalFooter className={"bg-dark text-white-50 border-0"}>
                    <Button onClick={() => toggleModal(!isModalOpen)}>Close</Button>
                </ModalFooter>
            </Modal>
        </>
    );
};

export default SubscriptionComponent;
