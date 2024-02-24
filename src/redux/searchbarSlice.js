import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: "searchBarSlice",
    initialState: {
        searchBar: false,
        posts: []
    },
    reducers: {
        toggleSearchBar: (state) => {
            state.searchBar = !state.searchBar
        },
        fillPosts: (state, action) => {
            state.posts = action.payload
        }
    }
})

export const { toggleSearchBar, fillPosts } = slice.actions
export default slice.reducer
