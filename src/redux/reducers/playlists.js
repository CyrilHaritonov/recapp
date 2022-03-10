import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {serverAddress} from "../../shared/serverAddress";
import {spotifyApi} from "../../components/headerComponent";

export const getPlaylists = createAsyncThunk(
    'playlists/getPlaylists',
    async (username) => {
        return (
            fetch(serverAddress + 'playlists' + "?user=" + username)
                .then(response => {
                        if (!response.ok) {
                            console.log("Server failed to serve playlists.");
                        } else {
                            return (response);
                        }
                    }
                ).then(response => response.json())
        );
    }
);

export const deletePlaylist = createAsyncThunk(
    'playlists/deletePlaylist',
    async ({id}) => {
        return (
            fetch(serverAddress + 'playlists/' + `${id}`,
                {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => {
                    if (!response.ok) {
                        console.log("Server failed to delete playlist.");
                    } else {
                        return (response);
                    }
                }).then(response => response.json())
        );
    }
);

export const playlistsSlice = createSlice({
    name: "playlists",
    initialState: {
        playlists: [],
        status: null
    },
    reducers: {
        update: (state, action) => {
            state.playlists = action.payload;
        },
        reset: (state) => {
            state.playlists = [];
        },
        updateSingle: (state, action) => {
            let idToUpdate = null;
            state.playlists.filter((playlist, index) => {
                if (playlist.id === action.payload.id){
                    idToUpdate = index;
                }
                return playlist.id === action.payload.id;
            });
            state.playlists[idToUpdate] = action.payload;
        }
    },
    extraReducers: {
        [getPlaylists.pending]: (state) => {
            state.status = "loading";
        },
        [getPlaylists.fulfilled]: (state, action) => {
            state.playlists = action.payload;
            state.status = "success";
        },
        [getPlaylists.rejected]: (state) => {
            state.status = "failed";
        }
    }
});

export const {update, reset, updateSingle} = playlistsSlice.actions;
export default playlistsSlice.reducer;