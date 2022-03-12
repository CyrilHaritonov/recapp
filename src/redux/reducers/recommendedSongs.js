import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {spotifyApi} from "../../components/headerComponent";

export const getRecs = createAsyncThunk(
    "recommendedSongs/getRecs",
    async (currentState) => {
        let result = [];
        let depth = 3;
        for (let track of currentState){
            spotifyApi.searchArtists(track.author).then(trackData => {
                let artistId = trackData.body.artists.items[0]?.id;
                spotifyApi.getArtistTopTracks(artistId, "RU").then(artistTopTracks => {
                    let iter = 0;
                    for (let item of artistTopTracks.body.tracks){
                        if (iter > 3) break;
                        let name = item.name;
                        let author = item.artists[0].name;
                        let thumbnail = item.album.images[0].url;
                        let length = item.duration_ms;
                        let id = item.uri;
                        result = [...result, {name, author, thumbnail, length, id}];
                        iter++;
                    }
                }).catch((err) => {
                    console.log(err);
                })
                spotifyApi.getArtistRelatedArtists(artistId).then(artistData => {
                    let relatedArtists =  artistData.body.artists;
                    let currentDepth = 0;
                    for (let relatedArtist of relatedArtists){
                        if (currentDepth > depth) break;
                        let relatedId = relatedArtist.id;
                        spotifyApi.getArtistTopTracks(relatedId, "RU").then(topTracksData => {
                            let run = 0;
                            for (let topTrack of topTracksData.body.tracks){
                                if (run > 3) break;
                                let name = topTrack.name;
                                let author = topTrack.artists[0].name;
                                let thumbnail = topTrack.album.images[0].url;
                                let length = topTrack.duration_ms;
                                let id = topTrack.uri;
                                result = [...result, {name, author, thumbnail, length, id}];
                                run++;
                            }
                        }).catch(err => {
                            console.log(err);
                        })
                        currentDepth++;
                    }
                }).catch(err => {
                    console.log(err);
                })
            }).catch(err => {
                console.log(err);
            })
        }
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(result);
            }, 100);
        });
    }
);

export const RecommendedSongs = createSlice({
    name: "recommendedSongs",
    initialState: {
        songs: [],
        status: "loaded"
    },
    reducers: {
        reset: (state) => {
            state.songs = [];
        }
    },
    extraReducers: {
        [getRecs.pending]: (state) => {
            state.status = "loading";
        },
        [getRecs.fulfilled]: (state, action) => {
            let temp = [];
            if (action.payload.length > 15){
                for (let i = 0; i < 15;){
                    let random = Math.floor(Math.random()*action.payload.length);
                    if (temp.indexOf(action.payload[random]) !== -1){
                        continue;
                    }
                    temp.push(action.payload[random]);
                    i++;
                }
            } else {
                temp = action.payload;
            }
            state.songs = temp;
            state.status = "loaded";
        },
        [getRecs.rejected]: (state) => {
            state.status = "failed";
        }
    }
});

export const {reset} = RecommendedSongs.actions;
export default RecommendedSongs.reducer;