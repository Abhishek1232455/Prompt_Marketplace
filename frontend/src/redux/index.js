import {configureStore} from '@reduxjs/toolkit'
import authSlice from './authRedux/authSlice'
import promptSlice from './promptRedux/promptSLice'
import { categorySlice } from './category'

export const store = configureStore({
    reducer: {
        user: authSlice.reducer,
        auth: authSlice.reducer,
        prompts: promptSlice.reducer,
        category: categorySlice.reducer
    },
})