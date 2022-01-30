import React, {useEffect} from "react";
import {Row} from "reactstrap";
import {PlaylistComponent} from "./playlistComponent";
import {useSelector, useDispatch} from "react-redux";
import {getPlaylists} from "../redux/reducers/playlists";

export const ListComponent = () => {
    const playlists = useSelector(state => state.playlists.playlists);
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