import {createSlice} from "@reduxjs/toolkit";

const loginSlice = createSlice({
    name: "status",
    initialState: {
        status: false
    },
    reducers: {
        update: (state) => {
            state.status = !!localStorage.getItem("accessToken");
        }
    }
});

export const {update} = loginSlice.actions;
export default loginSlice.reducer;