import React, {useEffect, useState} from "react";
import {
    Button,
    ButtonGroup,
    Form,
    FormFeedback,
    FormGroup,
    Input,
    Label,
    ListGroup,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row
} from "reactstrap";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {SongComponent} from "./songComponent";
import {FooterComponent} from "./footerComponent";
import {clearPickedSong, clearPlaylist, putPlaylist, setPlaylist} from "../redux/reducers/playlistCurrBeingEdited";
import {deletePlaylist, update, updateSingle} from "../redux/reducers/playlists";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen} from "@fortawesome/free-solid-svg-icons";
import {spotifyApi} from "./headerComponent";
import {SearchResult} from "./searchResultComponent";

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
                                                                           author={song.author} number={index}
                                                                           id={song.id}
                                                                           playlistId={pickedPlaylist.id}/>);


    const songsOnEdit = playlistCurrBeingEdited?.songs.map((song, index) =>
        <SongComponent name={song.name} thumbnail={song.thumbnail}
                       length={song.length} key={song.id} number={index}
                       author={song.author} id={song.id} playlistId={pickedPlaylist.id}/>);
    const isBeingEdited = playlistCurrBeingEdited?.id === pickedPlaylist.id;
    const dispatch = useDispatch();
    const [isConfModalOpen, toggleConfModal] = useState(false);
    const [isRenameModalOpen, toggleRenameModal] = useState(false);
    const [newName, changeNewName] = useState("");
    const [newNameTouched, toggleNewNameTouched] = useState(false);
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        if (!search) return setSearchResults([]);
        //console.log(searchResults);
        let cancel = false;
        spotifyApi.searchTracks(search, {limit: 10}).then(res => {
            if (cancel) return;
            setSearchResults(res.body.tracks.items.map(track => {
                const largestAlbumImage = track.album.images.reduce((largest, image) => {
                    if (image.height > largest.height) return image;
                    return largest;
                }, track.album.images[0]);

                return {
                    artist: track.artists[0].name,
                    title: track.name,
                    uri: track.uri,
                    albumUri: largestAlbumImage.url,
                    duration: track.duration_ms
                }
            })
        )});
        return () => (cancel = true);
    }, [search]);


    return (
        <>
            <Row>
                <div style={{height: "300px"}}
                     className={"d-flex align-items-center col-md-12 col-lg-3 justify-content-center"}>
                    <img className={"cover"}
                         src={pickedPlaylist?.songs[0]?.thumbnail ? pickedPlaylist.songs[0].thumbnail : "/img/default.jpg"}
                         alt={pickedPlaylist.name}
                         style={{height: "200px"}}/>
                    <img src={pickedPlaylist?.songs[0]?.thumbnail ? pickedPlaylist.songs[0].thumbnail : "/img/default.jpg"} style={{zIndex: "-2"}} alt={pickedPlaylist.name}
                         className={"blurred"}/>
                </div>
                <div
                    className={"d-flex flex-column ms-lg-0 align-items-center align-items-lg-start justify-content-center mb-5 text-white col-md-12 col-lg-4"}>
                    <h1>{isBeingEdited ? playlistCurrBeingEdited.name : pickedPlaylist.name} {isBeingEdited ? <FontAwesomeIcon icon={faPen} style={{fontSize: "1.3rem", marginBottom: "5px"}} className={"editNameOnHover"} onClick={
                        () => {
                            toggleRenameModal(true);
                        }
                    }/>: ""} </h1>
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
                        <div
                            className={"col-12 col-lg-5 order-lg-2 mt-lg-5 d-flex justify-content-center me-auto mb-5 mb-lg-0"}>
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
                                            dispatch(clearPickedSong());
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
                                <Input className={"mt-lg-5"} autoComplete={"off"} name={"searchForSongs"} placeholder={"Search for s song"} type={"search"}
                                       id={"songSearch"} value={search} onChange={e => setSearch(e.target.value)} style={{opacity: "1"}}/>
                                <Label for={"songSearch"}>Search for a song</Label>
                                {search.length !== 0 && <ListGroup className={"searchSuggestions"} style={{position: "absolute", height: "300px", overflowY: "auto", zIndex: "1000"}}>
                                    {searchResults.map(result => <SearchResult title={result.title} author={result.artist} thumbnail={result.albumUri} id={result.uri} duration={result.duration}/>)}
                                </ListGroup>}
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
            <div className={" d-flex flex-wrap justify-content-center align-items-center"}
                 style={{textAlign: "center"}}>
                <h1 className={"text-white"}>This playlist is currently empty!<br/>Start editing it to add songs.</h1>
            </div>}
            <Row style={{height: "300px"}}>

            </Row>
            <Modal isOpen={isConfModalOpen} toggle={() => toggleConfModal(!isConfModalOpen)}
                   style={{marginTop: "40vh"}}>
                <ModalHeader toggle={() => toggleConfModal(!isConfModalOpen)}
                             className={"bg-dark text-white-50 border-0"}>
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
            <Modal isOpen={isRenameModalOpen} toggle={() => toggleRenameModal(false)} style={{marginTop: "30vh"}}>
                <ModalHeader toggle={() => toggleRenameModal(false)} className={"bg-dark text-white-50 border-0"}>
                    Rename playlist
                </ModalHeader>
                <ModalBody className={"bg-dark border-0"}>
                    <Form onSubmit={(obj) => {
                        obj.preventDefault();
                    }}>
                        <FormGroup floating>
                            <Input placeholder={"Enter new name"} value={newName} onChange={(data) => changeNewName(data.target.value)}
                                   valid={newName !== "" && newName.length >= 3 && newName.length <= 15} invalid={(newName === "" || (newName.length < 3 || newName.length > 15)) && newNameTouched} onClick={() => toggleNewNameTouched(true)}/>
                            <Label for={"newNameInput"}>Enter new name</Label>
                            {newName === "" && <FormFeedback>Playlist name is required!</FormFeedback>}
                            {(newName.length < 3 || newName.length > 15) && <FormFeedback>Playlist name length should be from 3 to 15 symbols!</FormFeedback>}
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter className={"bg-dark text-white-50 border-0"}>
                    <Button onClick={() => {
                        if (newName !== "" && newName.length >= 3 && newName.length <= 15) {
                            toggleRenameModal(false);
                            dispatch(setPlaylist({...playlistCurrBeingEdited, name: newName}));
                            toggleNewNameTouched(false);
                            changeNewName("");
                        } else {
                            toggleNewNameTouched(true);
                        }
                    }}>Rename</Button>
                </ModalFooter>
            </Modal>
            <FooterComponent playlistId={pickedPlaylist.id}/>
        </>
    );
}