import React from "react";
import {Row} from "reactstrap";
import {PlaylistComponent} from "./playlistComponent";
import {playlists} from "../shared/playlists";

export const ListComponent = () => {
    return (
        <>
            <Row className="justify-content-center">
                {playlists.map(playlist => <PlaylistComponent name={playlist.name} date={playlist.date}
                                                              imgSrc={playlist.thumbnail} key={playlist.id}
                                                              id={playlist.id}/>)}
            </Row>
        </>
    );
}