import React from "react";
import {Card, CardBody, CardImg, CardText, CardTitle} from "reactstrap";

export const PlaylistComponent = ({name, imgSrc, date}) => {
    return (
        <>
            <div className="col-12 col-md-3 m-2">
                <Card inverse color="dark" className={"playlist-card"}>
                    <CardImg alt={name}
                    src={imgSrc} top width="100%"/>
                    <CardBody>
                        <CardTitle>
                            {name}
                        </CardTitle>
                        <CardText>
                            {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(date)))}
                        </CardText>
                    </CardBody>
                </Card>
            </div>
        </>
    );
}