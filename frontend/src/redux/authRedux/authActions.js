import { createAsyncThunk } from "@reduxjs/toolkit";
import API from '../../services/API';

export const getCurrentUser = createAsyncThunk(
    'auth/getCurrentUser',
    async (arg, thunkAPI) => {
        try {
            const response = await API("api/v1/auth/current-user", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const userData = await response.json();

            if (userData?.success && userData?.user) {
                return userData.user;
            } else {
                return thunkAPI.rejectWithValue(userData?.message || "Failed to retrieve current user");
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
