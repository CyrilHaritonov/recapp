import {configureStore} from "@reduxjs/toolkit";
import playlistsReducer from "./reducers/playlists";
import loginReducer from "./reducers/login";
import newPlaylist from "./reducers/newPlaylist";
export const store = configureStore({
    reducer: {
        playlists: playlistsReducer,
        login: loginReducer,
        newPlaylist: newPlaylist
    }
});