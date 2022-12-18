import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    file1: '',
    file2: '',
};

const sliceForm = createSlice({
    name: "files",
    initialState,
    reducers: {
        setFile: (state, { payload }) => {
            state[payload.file]= payload.text;
        },
       
        deleteFile: (state, { payload }) => {
            state[payload.file] = '';
        },
    },
});


export const {
    setFile, deleteFile
} = sliceForm.actions;
export default sliceForm.reducer;