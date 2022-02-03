import React from "react";
import {Button, ButtonGroup, Row} from "reactstrap";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {SongComponent} from "./songComponent";

export const ListOfSongsComponent = () => {
    const playlists = useSelector(state => state.playlists.playlists);
    const params = useParams();
    let pickedPlaylist = {};
    if (params !== null) {
        pickedPlaylist = playlists.filter((playlist) => parseInt(params.playlistId) === playlist.id)[0];
    }
    const songs = pickedPlaylist.songs.map((song) => <SongComponent name={song.name} thumbnail={song.thumbnail}
                                                                    length={song.length} key={song.id}
                                                                    author={song.author} id={song.id}/>);
    return (
        <>
            <Row>
                <div style={{height: "300px"}} className={"d-flex align-items-center col-md-3 justify-content-center"}>
                    <img className={"cover"} src={pickedPlaylist.thumbnail} alt={pickedPlaylist.name}
                         style={{height: "200px"}}/>
                    <img src={pickedPlaylist.thumbnail} alt={pickedPlaylist.name} className={"blurred"}/>
                </div>
                <div className={"d-flex flex-column  align-items-center align-items-lg-start justify-content-center mb-5 text-white col-md-5"}>
                    <h1>{pickedPlaylist.name}</h1>
                    <div>Number of songs: {pickedPlaylist.songs.length}</div>
                    <div>Created on: {new Intl.DateTimeFormat('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: '2-digit'
                    }).format(new Date(Date.parse(pickedPlaylist.date)))}</div>
                    <div>Context: {pickedPlaylist.context}</div>
                </div>
                <div className={"col-md-4 col-lg-4 mb-5 mb-md-0 justify-content-center align-items-center d-flex"}>
                    <ButtonGroup size={"lg"}>
                        <Button className={"playlistOptions"} style={{backgroundColor: "rgba(0, 0, 0, 0.6)", color: "white", borderColor: "black"}}>Edit playlist</Button>
                        <Button className={"playlistOptions"} style={{backgroundColor: "rgba(0, 0, 0, 0.6)", color: "white", borderColor: "black"}}>Delete playlist</Button>
                        <Button className={"playlistOptions"} style={{backgroundColor: "rgba(0, 0, 0, 0.6)", color: "white", borderColor: "black"}}>Export to Spotify</Button>
                    </ButtonGroup>
                </div>
            </Row>
            <Row className={""} style={{boxShadow: "0 0 20px black"}}>
                {pickedPlaylist.songs.length !== 0 && songs}
            </Row>
            {pickedPlaylist.songs.length === 0 &&
            <div className={" d-flex flex-wrap justify-content-center align-items-center"}>
                <h1 className={"text-white"}>This playlist is currently empty!</h1>
            </div>}
            <Row style={{height: "300px"}}>

            </Row>
        </>
    );
}