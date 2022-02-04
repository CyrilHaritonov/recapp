import {createSlice} from "@reduxjs/toolkit";

const Editing = createSlice({
    name: "isBeingEdited",
    initialState: {
        status: false
    },
    reducers: {
        toggle: state => {
            state.status = !state.status
        }
    }
});

export const {toggle} = Editing.actions;
export default Editing.reducer;