import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ListGroup} from "reactstrap";
import RecommendedSong from "./recommendedSongComponent";
import {getRecs} from "../redux/reducers/recommendedSongs";

export const FooterComponent = ({playlistId}) => {
    const dispatch = useDispatch();
    const isBeingEdited = useSelector(state => state.editedPlaylist.playlist?.id);
    const songsFromPlaylistBeingEdited = useSelector(state => state.editedPlaylist.playlist?.songs);
    const recommendations = useSelector(state => state.recommendedSongs.songs);
    const recommendationsStatus = useSelector(state => state.recommendedSongs.status);
    useEffect(() => {
        dispatch(getRecs(songsFromPlaylistBeingEdited));
    }, [songsFromPlaylistBeingEdited]);
    if (isBeingEdited === playlistId) {
        if (recommendationsStatus === "loaded") {
            return (
                <>
                    <div style={{marginBottom: "50px"}} className={"fixed-bottom bg-dark footerRecs"}>
                        <ListGroup style={{height: "100px"}} className={"bottomRecs d-flex flex-row align-items-center"}
                                   horizontal>
                            {recommendations.map(song => <RecommendedSong key={song.id} duration={song.length} id={song.id}
                                                                          title={song.name} author={song.author}
                                                                          thumbnail={song.thumbnail}/>)}
                        </ListGroup>
                    </div>
                </>
            );
        } else if (recommendationsStatus === "loading"){
            return (
                <>
                    <h1>Loading...</h1>
                </>
            );
        } else {
            return (
                <>
                    <h1>Failed to fetch recommendations</h1>
                </>
            );
        }
    } else {
        return (<></>);
    }
}