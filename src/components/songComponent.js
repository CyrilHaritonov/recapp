import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPause, faPlay, faRetweet, faRightLeft, faXmark} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {play, stop} from "../redux/reducers/playing";
import {clearPickedSong, deleteSong, pickSong, swapSongs} from "../redux/reducers/playlistCurrBeingEdited";

export const SongComponent = (song) => {
    const [isOnHover, changeHover] = useState(false);
    const isBeingEdited = useSelector(state => state.editedPlaylist.playlist?.id);
    const isPlaying = useSelector(state => state.isPlaying.song);
    const pickedSong = useSelector(state => state.editedPlaylist.pickedSong);
    const dispatch = useDispatch();
    const playSong = () => {
        if (isPlaying === song.id) {
            dispatch(stop());
        } else {
            dispatch(play(song.id));
        }
    };

    function switchPlaces(song) {
        if (pickedSong !== undefined && pickedSong !== null) {
            dispatch(swapSongs(song));
            dispatch(clearPickedSong());
        } else {
            dispatch(pickSong(song));
        }
    }

    return (
        <>
            <div
                className={"d-flex text-white-50 ps-2 pt-2 pb-2 songInstance " + (isPlaying === song.id ? "isPlaying" : "")}
                style={{backgroundColor: "rgba(0, 0, 0, 0.6)"}}
                onMouseEnter={() => {
                    changeHover(true)
                }} onMouseLeave={() => {
                changeHover(false)
            }}>
                <div onClick={() => switchPlaces(song)} className={"mt-4 mb-1 ms-2"}
                     style={{minWidth: "16px"}}>{(!isOnHover || isBeingEdited == null) ? (song.number + 1) : ((pickedSong?.id === song.id || pickedSong == null) ?
                        <FontAwesomeIcon className={"swapOnHover"} icon={faRightLeft}/> :
                        <FontAwesomeIcon className={"swapOnHover"} icon={faRetweet}/>
                    )}</div>
                <div onClick={() => playSong()} className={"flex-shrink-0 ms-3"} style={{position: "relative"}}>
                    <img className={"rounded-1"} src={song.thumbnail} alt={song.name} width={"75px"} height={"75px"}/>
                    {(isOnHover || isPlaying === song.id) && (isPlaying === song.id ?
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
                <div onClick={() => playSong()} className={"flex-grow-1 ms-4 mt-3"}>
                    <h5>{song.name}</h5>
                    <p className={"small"}>{song.author}</p>
                </div>
                <div className={"me-3 align-items-center d-flex"} onClick={() => {
                    if (isBeingEdited !== song.playlistId) {
                        playSong();
                    } else {
                        dispatch(deleteSong(song.id));
                    }
                }}>
                    {(!isOnHover || !(isBeingEdited === song.playlistId)) && song.length}
                    {isOnHover && (isBeingEdited === song.playlistId) &&
                    <FontAwesomeIcon className={"deleteSong"} icon={faXmark}
                                     style={{position: "relative", fontSize: "2rem"}}/>}
                </div>
            </div>
        </>
    );
}