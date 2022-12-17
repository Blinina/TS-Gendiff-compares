import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    file1: '',
    file2: '',
};

const sliceForm = createSlice({
    name: "files",
    initialState,
    reducers: {
        setFile1: (state, { payload }) => {
            state.file1 = payload;
        },
        setFile2: (state, { payload }) => {
            state.file2 = payload;
        },
    },
});


export const {
    setFile1, setFile2
} = sliceForm.actions;
export default sliceForm.reducer;