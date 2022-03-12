import React, {useState} from 'react';
import {CardImg, ListGroupItem} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPause, faPlay, faPlus} from "@fortawesome/free-solid-svg-icons";
import {play, stop} from "../redux/reducers/playing";
import {useDispatch, useSelector} from "react-redux";
import {addSong} from "../redux/reducers/playlistCurrBeingEdited";

const RecommendedSong = ({title, author, thumbnail, id, duration}) => {
    const [isOnHover, toggleHover] = useState(false);
    const isPlaying = useSelector(state => state.isPlaying.song);
    const dispatch = useDispatch();
    return (
        <div>
            <ListGroupItem className={"bg-dark recommendedSong " + (isPlaying === id ? "isPlaying" : "")}
                           style={{minWidth: "280px", maxHeight: "82px"}} onMouseEnter={() => toggleHover(true)}
                           onMouseLeave={() => toggleHover(false)}>
                <div className={"d-flex ps-3 pt-2 pe-3"}>
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
                            bottom: "23",
                            left: "47",
                            fontSize: "2rem"
                        }}/> : <FontAwesomeIcon className={"playButton"} icon={faPlay} style={{
                            position: "absolute",
                            bottom: "23",
                            left: "38",
                            fontSize: "2rem"
                        }}/>)}
                    </div>
                    <div className={"flex-grow-1 ms-3 text-white-50 ms-0"}>
                        <p className={"mb-0"}>{title.length > 15 ? title.slice(0, 15) + "..." : title}</p>
                        <p className={"mt-0"}>{author.length > 15 ? author.slice(0, 15) + "..." : author}</p>
                        {isOnHover && <FontAwesomeIcon icon={faPlus}
                                                       style={{position: "absolute", right: "15", bottom: "23", fontSize: "2rem", color: "white"}}
                                                       onClick={() => {
                                                           dispatch(addSong({
                                                               name: title,
                                                               author,
                                                               thumbnail,
                                                               length: `${Math.round((duration/1000)/60)}`+":"+`${Math.round((duration/1000)%60) < 10 ? "0" : ""}`+`${Math.round((duration/1000)%60)}`,
                                                               id
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
