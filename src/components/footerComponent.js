import React from "react";
import {useSelector} from "react-redux";
import {ListGroup} from "reactstrap";
import RecommendedSong from "./recommendedSongComponent";
import {recdSongs} from "../shared/redcSongs";

export const FooterComponent = ({playlistId}) => {
    const isBeingEdited = useSelector(state => state.editedPlaylist.playlist?.id);

    if (isBeingEdited === playlistId) {
        return (
            <>
                <div  className={"fixed-bottom bg-dark"}>
                    <ListGroup style={{height: "100px"}} className={"bottomRecs d-flex flex-row align-items-center"} horizontal>
                        {recdSongs.map(song => <RecommendedSong id={song.id} title={song.title} author={song.author} thumbnail={song.thumbnail}/>)}
                    </ListGroup>
                </div>
            </>
        );
    } else {
        return (<></>);
    }
}