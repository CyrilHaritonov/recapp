import React, {useState} from 'react';
import {Button, Form, FormFeedback, FormGroup, Input, Label} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {pushPlaylist, reset, updateContext, updateName} from "../redux/reducers/newPlaylist";
import {useNavigate} from "react-router-dom";

const CreateNewPlaylistComponent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const playlistName = useSelector(state => state.newPlaylist.name);
    const playlistContext = useSelector(state => state.newPlaylist.context);
    const playlist = useSelector(state => state.playlists.playlists);
    const [nameTouched, toggleNameTouched] = useState(false);
    const [contextTouched, toggleContextTouched] = useState(false);
    const newId = playlist.length;
    const onSubmit = () => {
        if (playlistName !== "" && playlistContext !== "") {
            dispatch(pushPlaylist({name: playlistName, context: playlistContext, id: newId}));
            dispatch(reset());
            navigate('/playlists');
        } else {
            toggleNameTouched(true);
            toggleContextTouched(true);
        }
    }
    return (
        <div>
            <Form className={"d-flex justify-content-center"}>
                <div className={"col-6 mt-5"}>
                    <h2 className={"text-white-50"}>Create new playlist</h2>
                    <FormGroup floating className={"mt-3"}>
                        <Input valid={playlistName !== ""} invalid={playlistName === "" && nameTouched}
                               placeholder={"Name"}
                               onClick={() => toggleNameTouched(true)}
                               value={playlistName}
                               onChange={(data) => {
                                   dispatch(updateName(data.target.value))
                               }}/>
                        <Label for={"playlistName"}>Enter playlist name</Label>
                        {playlistName === "" && <FormFeedback>Playlist name is required!</FormFeedback>}
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
                            <option disabled hidden selected>
                                Choose context
                            </option>
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
