import { createSlice } from "@reduxjs/toolkit";

const sideBarSlice = createSlice({
    name: "sideBar", 
    initialState: {
        currentIcon: "home"
    }, 
    reducers: {
        setCurrentIcon: (state, action) =>{
            state.currentIcon = action.payload
        }
    }
})

export const {setCurrentIcon} = sideBarSlice.actions
export default sideBarSlice.reducer