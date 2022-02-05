import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPause, faPlay, faXmark} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {play, stop} from "../redux/reducers/playing";
import {deleteSong} from "../redux/reducers/playlistCurrBeingEdited";

export const SongComponent = ({thumbnail, name, length, author, id, playlistId, number}) => {
    const [isOnHover, changeHover] = useState(false);
    const isBeingEdited = useSelector(state => state.editedPlaylist.playlist?.id);
    const isPlaying = useSelector(state => state.isPlaying.song);
    const dispatch = useDispatch();
    return (
        <>
            <div className={"d-flex text-white-50 ps-2 pt-2 pb-2 songInstance " + (isPlaying === id ? "isPlaying" : "")}
                 style={{backgroundColor: "rgba(0, 0, 0, 0.6)"}}
                 onMouseEnter={() => {
                     changeHover(true)
                 }} onMouseLeave={() => {
                changeHover(false)
            }}>
                <div onClick={() => {
                    if (isPlaying === id) {
                        dispatch(stop());
                    } else {
                        dispatch(play(id));
                    }
                }} className={"mt-4 mb-1 ms-2"}>{number + 1}</div>
                <div onClick={() => {
                    if (isPlaying === id) {
                        dispatch(stop());
                    } else {
                        dispatch(play(id));
                    }
                }} className={"flex-shrink-0 ms-3"} style={{position: "relative"}}>
                    <img className={"rounded-1"} src={thumbnail} alt={name} width={"75px"} height={"75px"}/>
                    {(isOnHover || isPlaying === id) && (isPlaying === id ?
                        <FontAwesomeIcon className={"playButton"} icon={faPause} style={{
                            position: "absolute",
                            bottom: "33",
                            left: "27",
                            fontSize: "2rem"
                        }}/> : <FontAwesomeIcon className={"playButton"} icon={faPlay} style={{
                            position: "absolute",
                            bottom: "33",
                            left: "20",
                            fontSize: "2rem"
                        }}/>)}
                </div>
                <div onClick={() => {
                    if (isPlaying === id) {
                        dispatch(stop());
                    } else {
                        dispatch(play(id));
                    }
                }} className={"flex-grow-1 ms-4 mt-3"}>
                    <h5>{name}</h5>
                    <p className={"small"}>{author}</p>
                </div>
                <div className={"me-3 align-items-center d-flex"} onClick={() => {
                    if (isBeingEdited !== playlistId) {
                        if (isPlaying === id) {
                            dispatch(stop());
                        } else {
                            dispatch(play(id));
                        }
                    } else {
                        dispatch(deleteSong(id));
                    }
                }}>
                    {(!isOnHover || !(isBeingEdited === playlistId)) && length}
                    {isOnHover && (isBeingEdited === playlistId) &&
                    <FontAwesomeIcon className={"deleteSong"} icon={faXmark}
                                     style={{position: "relative", fontSize: "2rem"}}/>}
                </div>
            </div>
        </>
    );
}