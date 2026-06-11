import { createAsyncThunk } from "@reduxjs/toolkit";
import API from '../../services/API';

export const getPrompts = createAsyncThunk(
    'prompts/getPrompts',
    async (arg, thunkAPI) => {
        try {
            const response = await API("api/v1/prompt/getall", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const promptData = await response.json();

            if (promptData?.success && promptData?.prompts) {
                return promptData.prompts;
            } else {
                return thunkAPI.rejectWithValue(promptData?.message || "Failed to retrieve prompts");
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
