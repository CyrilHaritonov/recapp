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
        playlist : null
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
        }
    }
});

export const {setPlaylist, clearPlaylist, deleteSong, addSong} = PlaylistCurrBeingEdited.actions;
export default PlaylistCurrBeingEdited.reducer;