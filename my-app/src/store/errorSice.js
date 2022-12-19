import { createSlice } from '@reduxjs/toolkit';

const initialState = {
        file1: '',
        file2: ''
};

const sliceError = createSlice({
    name: "errors",
    initialState,
    reducers: {
        setErrorFile: (state, { payload }) => {
            state[payload.file]= payload.text;
        },
       
    },
});

export const {
    setErrorFile,
} = sliceError.actions;
export default sliceError.reducer;