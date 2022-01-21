import React from "react";
import {Container, Row} from "reactstrap";
import {PlaylistComponent} from "./playlistComponent";
import {playlists} from "../shared/playlists";

export const ListComponent = () => {
    return (
        <>
            <Container className="bg-black mt-5">
                <Row className="justify-content-center">
                    {playlists.map(playlist => <PlaylistComponent name={playlist.name} date={playlist.date}
                                                                  imgSrc={playlist.thumbnail} key={playlist.id}/>)}
                </Row>
            </Container>
        </>
    );
}