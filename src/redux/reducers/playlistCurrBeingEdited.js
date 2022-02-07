import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {serverAddress} from "../../shared/serverAddress";

export const putPlaylist = createAsyncThunk(
    "editedPlaylist/putPlaylist",
    async ({playlist}) => {
        return (
            fetch(serverAddress + "playlists/" + `${playlist?.id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(playlist)
            }).then(response => {
                if (!response.ok) {
                    throw new Error('Can not update playlist due to a server error.')
                }
            }).catch(error => {
                    if (error !== undefined){
                        console.log(error)
                    }
                })
        );
    }
);

const PlaylistCurrBeingEdited = createSlice({
    name: "editedPlaylist",
    initialState: {
        playlist : null,
        pickedSong: null
    },
    reducers: {
        setPlaylist: (state, action) => {
            state.playlist = action.payload;
        },
        clearPlaylist: (state) => {
            state.playlist = null;
        },
        deleteSong: (state, action) => {
            state.playlist.songs = state.playlist?.songs.filter(song => (song.id !== action.payload));
        },
        addSong: (state, action) => {
            state.playlist.songs.push(action.payload);
        },
        pickSong: (state, action) => {
            state.pickedSong = action.payload;
        },
        clearPickedSong: (state, action) => {
            state.pickedSong = null;
        },
        swapSongs: (state, action) => {
            let temp1, temp2 = null;
            const tempSong1 = {...state.playlist.songs.filter((song, index) => {
                    if (song.id === action.payload.id) {
                        temp1 = index;
                    }
                    if (song.id === state.pickedSong.id) {
                        temp2 = index;
                    }
                    return song.id === action.payload.id;
                })[0]
            };
            const tempSong2 = {...state.pickedSong};
            state.playlist.songs[temp2] = tempSong1;
            state.playlist.songs[temp1] = tempSong2;
        }
    }
});

export const {setPlaylist, clearPlaylist, deleteSong, addSong, pickSong, clearPickedSong, swapSongs} = PlaylistCurrBeingEdited.actions;
export default PlaylistCurrBeingEdited.reducer;