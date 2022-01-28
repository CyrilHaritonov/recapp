import {createSlice} from "@reduxjs/toolkit";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {serverAddress} from "../../shared/serverAddress";

export const getPlaylists = createAsyncThunk(
    'playlists/getPlaylists',
    async () => {
        return (
            fetch(serverAddress + 'playlists')
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

export const playlistsSlice = createSlice({
    name: "playlists",
    initialState: {
        playlists: [],
        status: null
    },
    reducers: {
        update: (state, action) => {
            state.playlists = action.payload;
        }
    },
    extraReducers: {
        [getPlaylists.pending]: (state, action) => {
            state.status = "loading";
        },
        [getPlaylists.fulfilled]: (state, action) => {
            state.playlists = action.payload;
            state.status = "success";
        },
        [getPlaylists.rejected]: (state, action) => {
            state.status = "failed";
        }
    }
});

export const {update} = playlistsSlice.actions;
export default playlistsSlice.reducer;