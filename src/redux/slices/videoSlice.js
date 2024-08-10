import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    volume: 0.6,
    muted: true,
};

const videoSlice = createSlice({
    name: 'video',
    initialState,
    reducers: {
        changeVolume: (state, action) => {
            const volume = action.payload;
            state.volume = volume;
        },
        toggleMuted: (state) => {
            state.muted = !state.muted;
        },
        changeMuted: (state, action) => {
            const muted = action.payload;
            state.muted = muted;
        },
    },
});

const { actions, reducer } = videoSlice;

export const { changeVolume, toggleMuted, changeMuted } = actions;
export default reducer;
