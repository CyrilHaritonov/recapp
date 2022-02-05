import React, {useState} from "react";
import {
    Button,
    ButtonGroup,
    Form,
    FormGroup,
    Input,
    Label,
    Modal,
    ModalFooter,
    ModalHeader,
    Row
} from "reactstrap";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {SongComponent} from "./songComponent";
import {FooterComponent} from "./footerComponent";
import {setPlaylist, clearPlaylist} from "../redux/reducers/playlistCurrBeingEdited";
import {putPlaylist} from "../redux/reducers/playlistCurrBeingEdited";
import {updateSingle} from "../redux/reducers/playlists";
import {deletePlaylist, update} from "../redux/reducers/playlists";

export const ListOfSongsComponent = () => {
    const playlists = useSelector(state => state.playlists.playlists);
    const params = useParams();
    const navigate = useNavigate();
    let pickedPlaylist = {};
    if (params !== null) {
        pickedPlaylist = playlists.filter((playlist) => parseInt(params.playlistId) === playlist.id)[0];
    }
    const playlistCurrBeingEdited = useSelector(state => state.editedPlaylist.playlist);

    const songs = pickedPlaylist.songs.map((song, index) => <SongComponent name={song.name} thumbnail={song.thumbnail}
                                                                    length={song.length} key={song.id}
                                                                    author={song.author} number={index} id={song.id} playlistId={pickedPlaylist.id}/>);
    const songsOnEdit = playlistCurrBeingEdited?.songs.map((song, index) => <SongComponent name={song.name} thumbnail={song.thumbnail}
                                                                                    length={song.length} key={song.id} number={index}
                                                                                    author={song.author} id={song.id} playlistId={pickedPlaylist.id}/>);
    const isBeingEdited = playlistCurrBeingEdited?.id === pickedPlaylist.id;
    const dispatch = useDispatch();
    const [isConfModalOpen, toggleConfModal] = useState(false);
    return (
        <>
            <Row>
                <div style={{height: "300px"}}
                     className={"d-flex align-items-center col-md-12 col-lg-3 justify-content-center"}>
                    <img className={"cover"} src={pickedPlaylist?.songs[0]?.thumbnail !== undefined ? pickedPlaylist?.songs[0].thumbnail : "/img/default.jpg"} alt={pickedPlaylist.name}
                         style={{height: "200px"}}/>
                    <img src={pickedPlaylist?.songs[0]?.thumbnail !== undefined ? pickedPlaylist?.songs[0].thumbnail : "/img/default.jpg"} style={{zIndex: "-2"}} alt={pickedPlaylist.name}
                         className={"blurred"}/>
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
                {!isBeingEdited &&
                <div
                    className={"col-md-12 col-lg-4 ms-lg-5 mb-5 mb-lg-0 justify-content-center align-items-center d-flex"}>
                    <ButtonGroup size={"lg"}>
                        <Button className={"playlistOptions"}
                                style={{backgroundColor: "rgba(0, 0, 0, 0.6)", color: "white", borderColor: "black"}}
                                onClick={() => {
                                    dispatch(setPlaylist(pickedPlaylist));
                                }}>Edit playlist</Button>
                        <Button className={"playlistOptions"}
                                onClick={() => {
                                    toggleConfModal(!isConfModalOpen);
                                }}
                                style={{backgroundColor: "rgba(0, 0, 0, 0.6)", color: "white", borderColor: "black"}}>Delete
                            playlist</Button>
                        <Button className={"playlistOptions"}
                                style={{backgroundColor: "rgba(0, 0, 0, 0.6)", color: "white", borderColor: "black"}}>Export
                            to Spotify</Button>
                    </ButtonGroup>
                </div>}
                {isBeingEdited &&
                <div className={"col-md-12 col-lg-5 mt-lg-5"}>
                    <Row>
                        <div className={"col-12 col-lg-5 order-lg-2 mt-lg-5 d-flex justify-content-center me-auto mb-5 mb-lg-0"}>
                            <ButtonGroup>
                                <Button className={"playlistOptions"} style={{
                                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                                    color: "white",
                                    borderColor: "black",
                                    height: "58px"
                                }}
                                        onClick={() => {
                                            dispatch(putPlaylist({playlist: playlistCurrBeingEdited}));
                                            dispatch(updateSingle(playlistCurrBeingEdited));
                                            dispatch(clearPlaylist());
                                        }}>Save Changes</Button>
                                <Button className={"playlistOptions"} style={{
                                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                                    color: "white",
                                    borderColor: "black",
                                    height: "58px"
                                }}
                                        onClick={() => {
                                            dispatch(clearPlaylist());
                                        }}>Cancel</Button>
                            </ButtonGroup>
                        </div>
                        <Form className={"col-12 col-lg-7 ms-lg-auto"} inline>
                            <FormGroup floating className={"ms-lg-0"}>
                                <Input className={"mt-lg-5"} name={"searchForSongs"} placeholder={"Search for s song"}
                                       id={"songSearch"} style={{opacity: "1"}}/>
                                <Label for={"songSearch"}>Search for a song</Label>
                            </FormGroup>
                        </Form>
                    </Row>
                </div>
                }
            </Row>
            <Row className={"mt-5 mt-lg-0"} style={{boxShadow: "0 0 20px black"}}>
                {(pickedPlaylist?.songs.length !== 0 || playlistCurrBeingEdited?.songs.length !== 0) && (isBeingEdited ? songsOnEdit : songs)}
            </Row>
            {(pickedPlaylist?.songs.length === 0 && (playlistCurrBeingEdited?.id !== pickedPlaylist.id || playlistCurrBeingEdited?.songs.length === 0 || playlistCurrBeingEdited?.songs.length === undefined)) &&
            <div className={" d-flex flex-wrap justify-content-center align-items-center"} style={{textAlign: "center"}}>
                <h1 className={"text-white"}>This playlist is currently empty!<br/>Start editing it to add songs.</h1>
            </div>}
            <Row style={{height: "300px"}}>

            </Row>
            <Modal isOpen={isConfModalOpen} toggle={() => toggleConfModal(!isConfModalOpen)} style={{marginTop: "40vh"}}>
                <ModalHeader toggle={() => toggleConfModal(!isConfModalOpen)} className={"bg-dark text-white-50 border-0"}>
                    Are you sure that you want to delete {pickedPlaylist.name} playlist?
                </ModalHeader>
            <ModalFooter className={"bg-dark border-0 d-flex justify-content-start"}>
                <ButtonGroup>
                    <Button color={"danger"} onClick={() => {
                        toggleConfModal(!isConfModalOpen);
                        dispatch(deletePlaylist({id: pickedPlaylist.id}));
                        dispatch(update(playlists.filter(playlist => playlist.id !== pickedPlaylist.id)));
                        navigate('/');
                    }}>
                        Delete
                    </Button>
                    <Button onClick={() => {
                        toggleConfModal(!isConfModalOpen)
                    }}>
                        Cancel
                    </Button>
                </ButtonGroup>
            </ModalFooter>
            </Modal>
            <FooterComponent playlistId={pickedPlaylist.id}/>
        </>
    );
}