import React, {useState} from 'react';
import {Button, Form, FormFeedback, FormGroup, Input, Label} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {pushPlaylist, reset, updateContext, updateName} from "../redux/reducers/newPlaylist";
import {useNavigate} from "react-router-dom";
import {spotifyApi} from "./headerComponent";

const CreateNewPlaylistComponent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const playlistName = useSelector(state => state.newPlaylist.name);
    const playlistContext = useSelector(state => state.newPlaylist.context);
    const playlist = useSelector(state => state.playlists.playlists);
    const [nameTouched, toggleNameTouched] = useState(false);
    const [contextTouched, toggleContextTouched] = useState(true);
    let newId = 0;
    if (playlist.length > 0) {
        newId = playlist.reduce((max, playlist) => max > playlist.id ? max : playlist.id) + 1;
    }
    const onSubmit = () => {
        if (playlistName !== "" && playlistContext !== "" && playlistName.length >= 3 && playlistName.length <= 15) {
            spotifyApi.getMe().then((data) => {
                dispatch(pushPlaylist({username: data.body.display_name, name: playlistName, context: playlistContext, id: newId}));
                dispatch(reset());
                navigate('/');
            }).catch(() => {
                console.log("failed to get me");
            })
        } else {
            toggleNameTouched(true);
        }
    }
    return (
        <div>
            <Form className={"d-flex justify-content-center"} onSubmit={(obj) => {
                obj.preventDefault();
            }}>
                <div className={"col-6 mt-5"}>
                    <h2 className={"text-white-50"}>Create new playlist</h2>
                    <FormGroup floating className={"mt-3"}>
                        <Input valid={playlistName !== "" && playlistName.length >= 3 && playlistName.length <= 15}
                               invalid={(playlistName.length < 3 || playlistName.length > 15 || playlistName === "") && nameTouched}
                               placeholder={"Name"}
                               onClick={() => toggleNameTouched(true)}
                               value={playlistName}
                               onChange={(data) => {
                                   dispatch(updateName(data.target.value))
                               }}/>
                        <Label for={"playlistName"}>Enter playlist name</Label>
                        {playlistName === "" && <FormFeedback>Playlist name is required!</FormFeedback>}
                        {(playlistName.length < 3 || playlistName.length > 15) && <FormFeedback>Playlist name length should be from 3 to 15 symbols!</FormFeedback>}
                    </FormGroup>
                    <FormGroup>
                        <Input valid={playlistContext !== ""} invalid={playlistContext === "" && contextTouched}
                               bsSize={"lg"}
                               placeholder={"Choose context"} type={"select"}
                               onClick={() => toggleContextTouched(true)}
                               value={playlistContext}
                               onChange={(data) => {
                                   dispatch(updateContext(data.target.value))
                               }}>
                            <option>
                                Context 1
                            </option>
                            <option>
                                Context 2
                            </option>
                            <option>
                                Context 3
                            </option>
                            <option>
                                Context 4
                            </option>
                            <option>
                                Context 5
                            </option>
                        </Input>
                        {playlistContext === "" && <FormFeedback>Playlist context is required!</FormFeedback>}
                    </FormGroup>
                    <Button outline size={"lg"} onClick={() => onSubmit()}>Create</Button>
                </div>
            </Form>
        </div>
    );
};

export default CreateNewPlaylistComponent;
