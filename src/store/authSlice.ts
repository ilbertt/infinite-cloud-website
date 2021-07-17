import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { AuthState, UserModel } from "../models/auth.model";
import * as storage from '../services/storage';

const initialState: AuthState = {
    user: null,
    status: 'loading',
};

export const loadUserData = createAsyncThunk('auth/loadUserData', async () => {
    const userData = await storage.getObject<UserModel>('user-data');
    return userData;
});

export const storeUserData = createAsyncThunk('auth/storeUserData', async (userData: UserModel) => {
    await storage.setObject('user-data', userData);
    return userData;
});

export const removeUserData = createAsyncThunk('auth/removeUserData', async () => {
    return await storage.remove('user-data');
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(loadUserData.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(loadUserData.fulfilled, (state, action) => {
                state.user = action.payload;
                state.status = 'idle';
            })
            .addCase(storeUserData.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(removeUserData.fulfilled, (state, action) => {
                state.user = null;
            })
    }
});

// export const {setAskedRequest} = activistSlice.actions;
export default authSlice.reducer;