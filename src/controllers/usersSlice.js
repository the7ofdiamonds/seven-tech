import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
    browserSessionPersistence,
    setPersistence,
    signInWithEmailAndPassword,
    getAuth,
} from 'firebase/auth';

import { projectAuth } from '../services/firebase/config.js';

const initialState = {
    userLoading: false,
    userError: '',
    user_login: '',
    user_pass: '',
    user_email: '',
    first_name: '',
    last_name: '',
    user_id: ''
};

// Signup ?
export const addUser = createAsyncThunk('users/adduser', async (user_data) => {
    try {
        const response = await fetch('/wp-json/seven-tech/v1/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user_data)
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

export const signInEmailAndPassword = createAsyncThunk('users/signInWithEmailAndPassword', async (Email, Password) => {
    const auth = getAuth();
    try {
        signInWithEmailAndPassword(auth, Email, Password);
        setPersistence(auth, browserSessionPersistence);

        const user = projectAuth.currentUser;

        if (!user) {
            throw new Error('User not found.', 404);
        }

        const token = user.getIdToken();
        const data = { idToken: token, user_password: Password };

        const response = await fetch('/wp-json/seven-tech/v1/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errorData = await response.json();
            const errorMessage = errorData.message;
            throw new Error(errorMessage);
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error(error)
        throw error.message;
    }
});

export const getUser = createAsyncThunk('user/getUser', async (_, { getState }) => {
    const { user_email } = getState().user;
    const encodedEmail = encodeURIComponent(user_email);
    try {
        const response = await fetch(`/wp-json/seven-tech/v1/users/${encodedEmail}`, {
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

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(addUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.loading = false
                state.user_id = action.payload
            })
            .addCase(addUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(getUser.pending, (state) => {
                state.userLoading = true
                state.userError = ''
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.userLoading = false;
                state.userError = null;
                state.user_id = action.payload.id
                state.first_name = action.payload.first_name
                state.last_name = action.payload.last_name
            })
            .addCase(getUser.rejected, (state, action) => {
                state.userLoading = false
                state.userError = action.error.message
            })
    }
})

export default usersSlice;