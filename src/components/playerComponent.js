import React from 'react';
import SpotifyWebPlayer from "react-spotify-web-playback";
import {useDispatch, useSelector} from "react-redux";
import {stop} from "../redux/reducers/playing";

const Player = () => {
    let accessToken = localStorage.getItem("accessToken");
    let trackUri = useSelector((state) => state.isPlaying.song);
    let dispatch = useDispatch();
    if (!accessToken) return null;
    return (
        <div className={"fixed-bottom"}>
            <SpotifyWebPlayer token={accessToken} showSaveIcon callback={(state) => {
                if (!state.isPlaying && trackUri){
                    dispatch(stop());
                }
            }}
                              uris={trackUri ? [trackUri] : []} play={!!trackUri}
                              styles={{color: "#747779", bgColor: "#1d2024", trackNameColor: "#a4a4a4", sliderColor: "#13bd0e"}}/>
        </div>
    );
};

export default Player;
