import React from "react";
import {Button, ButtonGroup, Form, FormGroup, Input, Label, Row} from "reactstrap";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {SongComponent} from "./songComponent";
import {toggle} from "../redux/reducers/editing";
import {FooterComponent} from "./footerComponent";

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
    const isSearchVisible = useSelector(state => state.isBeingEdited.status);
    const dispatch = useDispatch();

    return (
        <>
            <Row>
                <div style={{height: "300px"}}
                     className={"d-flex align-items-center col-md-12 col-lg-3 justify-content-center"}>
                    <img className={"cover"} src={pickedPlaylist.thumbnail} alt={pickedPlaylist.name}
                         style={{height: "200px"}}/>
                    <img src={pickedPlaylist.thumbnail} style={{zIndex: "-2"}} alt={pickedPlaylist.name} className={"blurred"}/>
                </div>
                <div
                    className={"d-flex flex-column ms-lg-0 align-items-center align-items-lg-start justify-content-center mb-5 text-white col-md-12 col-lg-4"}>
                    <h1>{pickedPlaylist.name}</h1>
                    <div>Number of songs: {pickedPlaylist.songs.length}</div>
                    <div>Created on: {new Intl.DateTimeFormat('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: '2-digit'
                    }).format(new Date(Date.parse(pickedPlaylist.date)))}</div>
                    <div>Context: {pickedPlaylist.context}</div>
                </div>
                {!isSearchVisible &&
                <div className={"col-md-12 col-lg-4 ms-lg-5 mb-5 mb-lg-0 justify-content-center align-items-center d-flex"}>
                    <ButtonGroup size={"lg"}>
                        <Button className={"playlistOptions"}
                                style={{backgroundColor: "rgba(0, 0, 0, 0.6)", color: "white", borderColor: "black"}}
                                onClick={() => dispatch(toggle())}>Edit playlist</Button>
                        <Button className={"playlistOptions"}
                                style={{backgroundColor: "rgba(0, 0, 0, 0.6)", color: "white", borderColor: "black"}}>Delete
                            playlist</Button>
                        <Button className={"playlistOptions"}
                                style={{backgroundColor: "rgba(0, 0, 0, 0.6)", color: "white", borderColor: "black"}}>Export
                            to Spotify</Button>
                    </ButtonGroup>
                </div>}
                {isSearchVisible &&
                <div className={"col-md-12 col-lg-5 mt-lg-5"}>
                    <Row>
                        <Form className={"col-8 ms-auto"} inline>
                            <FormGroup floating className={"ms-md-5 ms-lg-0"}>
                                <Input className={"mt-lg-5"} name={"searchForSongs"} placeholder={"Search for s song"} id={"songSearch"} style={{opacity: "1"}}/>
                                <Label for={"songSearch"}>Search for a song</Label>
                            </FormGroup>
                        </Form>
                        <div className={"col-3 mt-lg-5 me-auto"}>
                            <Button className={"playlistOptions"} style={{backgroundColor: "rgba(0, 0, 0, 0.6)", color: "white", borderColor: "black", height: "58px"}}
                                    onClick={() => dispatch(toggle())}>Stop editing</Button>
                        </div>
                    </Row>
                </div>
                }
            </Row>
            <Row className={"mt-5 mt-lg-0"} style={{boxShadow: "0 0 20px black"}}>
                {pickedPlaylist.songs.length !== 0 && songs}
            </Row>
            {pickedPlaylist.songs.length === 0 &&
            <div className={" d-flex flex-wrap justify-content-center align-items-center"}>
                <h1 className={"text-white"}>This playlist is currently empty!</h1>
            </div>}
            <Row style={{height: "300px"}}>

            </Row>
            <FooterComponent/>
        </>
    );
}