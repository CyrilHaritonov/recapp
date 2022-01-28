import {configureStore} from "@reduxjs/toolkit";
import playlistsReducer from "./reducers/playlists";
export const store = configureStore({
    reducer: {
        playlists: playlistsReducer
    }
});