import { configureStore } from "@reduxjs/toolkit"
import { authSlice } from "../auth/helpers/authSlices"

export const store = configureStore({
    reducer: authSlice.reducer
})