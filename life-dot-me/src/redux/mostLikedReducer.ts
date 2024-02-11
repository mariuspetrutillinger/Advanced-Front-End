import { createSlice } from '@reduxjs/toolkit';

const mostLikedSlice = createSlice({
    name: 'mostLiked',
    initialState: {
        value: "",
    },
    reducers: {
        setMostLiked: (state, action) => {
        state.value = action.payload;
        },
    },
});

export default mostLikedSlice.reducer;
export const { setMostLiked } = mostLikedSlice.actions;