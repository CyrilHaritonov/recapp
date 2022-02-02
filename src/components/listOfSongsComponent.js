import React from "react";
import {Row} from "reactstrap";
import {SongComponent} from "./songComponent";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";

export const ListOfSongsComponent = () => {
    const playlists = useSelector(state => state.playlists.playlists);
    const params = useParams();
    let pickedPlaylist = {};
    if (params !== null) {
        pickedPlaylist = playlists.filter((playlist) => parseInt(params.playlistId) === playlist.id)[0];
    }
    if (pickedPlaylist.songs.length !== 0) {
        return (
            <>
                <Row className={"pt-1 bg-dark rounded-bottom"}>
                    <div>
                    {pickedPlaylist.songs.map((song) => <SongComponent name={song.name} thumbnail={song.thumbnail}
                                                                       length={song.length} key={song.id} author={song.author} id={song.id}/>)}
                    </div>
                </Row>
            </>
        );
    } else {
        return (
            <>
                <div className={"pt-5 d-flex flex-wrap justify-content-center"}>
                    <h1 className={"text-white-50"}>This playlist is currently empty!</h1>
                </div>
            </>
        );
    }
}