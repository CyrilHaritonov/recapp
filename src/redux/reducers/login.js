import {createSlice} from "@reduxjs/toolkit";

const loginSlice = createSlice({
    name: "status",
    initialState: {
        status: false
    },
    reducers: {
        update: (state) => {
            state.status = !state.status;
        }
    }
});

export const {update} = loginSlice.actions;
export default loginSlice.reducer;