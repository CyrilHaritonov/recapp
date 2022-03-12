import {configureStore} from "@reduxjs/toolkit";
import playlistsReducer from "./reducers/playlists";
import loginReducer from "./reducers/login";
import newPlaylist from "./reducers/newPlaylist";
import isPlaying from "./reducers/playing";
import editedPlaylist from "./reducers/playlistCurrBeingEdited";
import recommendedSongs from "./reducers/recommendedSongs";

export const store = configureStore({
    reducer: {
        playlists: playlistsReducer,
        login: loginReducer,
        newPlaylist,
        isPlaying,
        editedPlaylist,
        recommendedSongs
    }
});