import React from "react";
import {useSelector} from "react-redux";
import {ListGroup} from "reactstrap";
import RecommendedSong from "./recommendedSongComponent";
import {recdSongs} from "../shared/redcSongs";

export const FooterComponent = () => {
    const isBeingEdited = useSelector(state => state.isBeingEdited.status);
    if (isBeingEdited) {
        return (
            <>
                <div className={"fixed-bottom d-flex flex-row bg-dark align-items-center bottomRecs"} style={{height: "90px", overflow: "scroll"}}>
                    <ListGroup horizontal>
                        {recdSongs.map(song => <RecommendedSong id={song.id} title={song.title} author={song.author} thumbnail={song.thumbnail}/>)}
                    </ListGroup>
                </div>
            </>
        );
    } else {
        return (<></>);
    }
}