import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {serverAddress} from "../../shared/serverAddress";

export const pushPlaylist = createAsyncThunk(
    'newPlaylist/pushPlaylist',
    async ({username, name, context, id}) => {
        const newPlaylist = {
            user: username,
            id: id,
            name: name,
            date: new Date().toISOString(),
            thumbnail: "/img/default.jpg",
            songs: [],
            context: context,
        }

        return (
            fetch(serverAddress + 'playlists', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newPlaylist)
            }).then(response => {
                if (!response.ok) {
                    throw new Error('Can not add playlist due to a server error.')
                }
            }).then(response => response.json())
                .catch(error => {
                console.log(error)
            })
        );
    });

export const newPlaylist = createSlice({
    name: "newPlaylist",
    initialState: {
        name: '',
        context: 'Context 1',
        wasUpdated: false
    },
    reducers: {
        updateName: (state, action) => {
            state.name = action.payload;
        },
        updateContext: (state, action) => {
            state.context = action.payload;
        },
        reset: (state) => {
            state.name = '';
            state.context = 'Context 1';
            state.wasUpdated = true;
        },
        updateStatus: state => {
            state.wasUpdated = false;
        }
    }
})

export const {updateName, updateContext, reset, updateStatus} = newPlaylist.actions;
export default newPlaylist.reducer;