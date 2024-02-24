import { configureStore } from '@reduxjs/toolkit'
import searchBarReducer from './searchbarSlice'
import postSlice from './postSlice'
import auth from './authSlice'
import sideBarSlice from './sideBarSlice'
const store = configureStore({
    reducer: {
        searchBar: searchBarReducer, 
        posts: postSlice,
        auth: auth, 
        sideBar: sideBarSlice
    }
})

export default store