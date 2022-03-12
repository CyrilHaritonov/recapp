import React from "react";
import {Card, CardBody, CardTitle, Row, Spinner} from "reactstrap";
import {PlaylistComponent} from "./playlistComponent";
import {useSelector} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSquarePlus} from "@fortawesome/free-regular-svg-icons";
import {Link} from "react-router-dom";
import {serverAddress} from "../shared/serverAddress";

export const ListComponent = () => {
    const playlists = useSelector(state => state.playlists.playlists);
    const isLoggedIn = useSelector(state => state.login.status);
    const playlistFetchingStatus = useSelector(state => state.playlists.status);
    if (isLoggedIn) {
        if (playlistFetchingStatus === "success") {
            return (
                <>
                    <Row className="justify-content-center">
                        {playlists.map((playlist) => <PlaylistComponent name={playlist.name} date={playlist.date}
                                                                      imgSrc={playlist?.songs[0]?.thumbnail ? playlist.songs[0].thumbnail: serverAddress + "/img/default.jpg"} key={playlist.id}
                                                                      id={playlist.id}/>)}
                        <div className="col-12 listComponent col-md-3 m-2 d-flex align-items-center justify-content-center">
                            <Link to={"/newplaylist"}>
                                <Card className={"bg-black text-white"}>
                                    <CardBody style={{height: "auto"}}
                                              className={"d-flex addNewPlaylist justify-content-center align-items-center flex-column"}>
                                        <FontAwesomeIcon icon={faSquarePlus} style={{fontSize: "750%"}}/>
                                        <CardTitle className={"justify-content-center"}>
                                            <div style={{textAlign: "center"}}>Create new playlist</div>
                                        </CardTitle>
                                    </CardBody>
                                </Card>
                            </Link>
                        </div>
                    </Row>
                </>
            );
        } else if (playlistFetchingStatus === "loading"){
            return (
                <>
                    <div className={"d-flex justify-content-center align-items-center"} style={{height: "250px"}}>
                        <Spinner color={"secondary"}/>
                    </div>
                </>
            );
        } else {
            return (
                <>
                    <div className={"d-flex justify-content-center align-content-center"}>
                        <h1 color={"danger"}>Failed to load playlists.</h1>
                    </div>
                </>
            );
        }
    } else {
        return (
            <>
                <div className={"d-flex justify-content-center text-white-50"}>
                    <h1 className={"mt-5"}>You have to be logged in to see your playlists.</h1>
                </div>
            </>
        );
    }
}