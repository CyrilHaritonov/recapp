import React, {useState} from 'react';
import {CardImg, ListGroupItem} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPause, faPlay, faPlus} from "@fortawesome/free-solid-svg-icons";
import {play, stop} from "../redux/reducers/playing";
import {useDispatch, useSelector} from "react-redux";
import {addSong} from "../redux/reducers/playlistCurrBeingEdited";

const RecommendedSong = ({title, author, thumbnail, id}) => {
    const [isOnHover, toggleHover] = useState(false);
    const isPlaying = useSelector(state => state.isPlaying.song);
    const dispatch = useDispatch();
    return (
        <div>
            <ListGroupItem className={"bg-dark recommendedSong " + (isPlaying === id ? "isPlaying" : "")} onMouseEnter={() => toggleHover(true)}
                           onMouseLeave={() => toggleHover(false)}>
                <div className={"d-flex ps-3 pt-3 pe-3"} style={{width: "180px"}}>
                    <div className={"flex-shrink-0"} onClick={() => {
                        if (isPlaying === id) {
                            dispatch(stop());
                        } else {
                            dispatch(play(id));
                        }
                    }}>
                        <CardImg src={thumbnail} style={{width: "50px"}}/>
                        {(isOnHover || isPlaying === id) && (isPlaying === id ? <FontAwesomeIcon className={"playButton"} icon={faPause} style={{
                            position: "absolute",
                            bottom: "33",
                            left: "47",
                            fontSize: "2rem"
                        }}/> : <FontAwesomeIcon className={"playButton"} icon={faPlay} style={{
                            position: "absolute",
                            bottom: "33",
                            left: "38",
                            fontSize: "2rem"
                        }}/>)}
                    </div>
                    <div className={"flex-grow-1 ms-3 text-white-50 ms-0"}>
                        <p className={"mb-0"}>{title}</p>
                        <p className={"mt-0"}>{author}</p>
                        {isOnHover && <FontAwesomeIcon icon={faPlus}
                                                       style={{position: "absolute", left: "170", top: "30", fontSize: "2rem", color: "white"}}
                                                       onClick={() => {
                                                           dispatch(addSong({
                                                               name: title,
                                                               author,
                                                               thumbnail,
                                                               length: "3:20",
                                                               preview: "link",
                                                               id: Math.floor(Math.random() * 10000)
                                                           }))
                                                       }}
                                                       className={"recdSongAdd"}/>}
                    </div>
                </div>
            </ListGroupItem>
        </div>
    );
};

export default RecommendedSong;
