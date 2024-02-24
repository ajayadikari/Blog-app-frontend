import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        refreshTokenExpired: false
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        setRefreshToken: (state, action) => {
            state.refreshTokenExpired = action
        }, 
        clearAuth: (store) =>{
            store.user = null
        }
    }
})

export const { setUser, setRefreshToken } = authSlice.actions
export default authSlice.reducer