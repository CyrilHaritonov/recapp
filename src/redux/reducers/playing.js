import {createSlice} from "@reduxjs/toolkit";

const isPlaying = createSlice({
    name: "isPlaying",
    initialState: {
        song: null
    },
    reducers: {
        play: (state, action) => {
            state.song = action.payload
        },
        stop: (state) => {
            state.song = null
        }
    }
});

export const {play, stop} = isPlaying.actions;
export default isPlaying.reducer;