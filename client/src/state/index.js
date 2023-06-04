import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "dark",
    userId: "63701cc1f03239b7f700000e", // Correlates to user in mock data [for diplay purpose]
    // Skipping over login authentication process ^^^^
};

export const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        // Essentially a function
        setMode: (state) => {
            state.mode = state.mode === 'light' ? "dark" : 'light';
        }
    }
})

export const { setMode } = globalSlice.actions;

export default globalSlice.reducer;