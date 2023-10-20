import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    contentLoading: false,
    contentError: '',
    content: '',
    headquarters: ''
};

export const getContent = createAsyncThunk('content/getContent', async (pageSlug) => {

    try {
        const response = await fetch(`/wp-json/seven-tech/content/v1/${pageSlug}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            const errorMessage = errorData.message;
            throw new Error(errorMessage);
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        throw error;
    }
});

export const getHeadquarters = createAsyncThunk('content/getHeadquarters', async () => {

    try {
        const response = await fetch(`/wp-json/seven-tech/headquarters/v1/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            const errorMessage = errorData.message;
            throw new Error(errorMessage);
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        throw error;
    }
});

export const contentSlice = createSlice({
    name: 'content',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getContent.pending, (state) => {
                state.contentLoading = true
                state.contentError = ''
            })
            .addCase(getContent.fulfilled, (state, action) => {
                state.contentLoading = false;
                state.contentError = null;
                state.content = action.payload
            })
            .addCase(getContent.rejected, (state, action) => {
                state.contentLoading = false
                state.contentError = action.error.message
            })
            .addCase(getHeadquarters.pending, (state) => {
                state.contentLoading = true
                state.contentError = ''
            })
            .addCase(getHeadquarters.fulfilled, (state, action) => {
                state.contentLoading = false;
                state.contentError = null;
                state.headquarters = action.payload
            })
            .addCase(getHeadquarters.rejected, (state, action) => {
                state.contentLoading = false
                state.contentError = action.error.message
            })
    }
})

export default contentSlice;