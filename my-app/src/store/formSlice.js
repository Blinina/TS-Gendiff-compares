import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    file1: '',
    file2: '',
    errors: {
        file1: '',
        file2: '',
    },
};

const sliceForm = createSlice({
    name: "files",
    initialState,
    reducers: {
        setFile: (state, { payload }) => {
            state[payload.file] = payload.text;
        },

        deleteFile: (state, { payload }) => {
            state[payload.file] = '';
        },
        setErrorFile: (state, { payload }) => {
            state.errors[payload.file] = payload.text;
        },
    },
});

export const {
    setFile, deleteFile, setErrorFile
} = sliceForm.actions;
export default sliceForm.reducer;