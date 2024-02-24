import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
    name: "postSlice",
    initialState: {
        category: null,
        posts: [],
        multiCategories: [],
        has_next: true,
        current_page: 1,
        likedPostIds: [],
        likedPosts: []
    },
    reducers: {
        setCategory: (state, action) => {
            if (state.category == action.payload) {
                state.category = null
            }
            else {
                state.category = action.payload
            }
        },
        fillPosts: (state, action) => {
            const posts = action.payload
            if (posts && posts.length > 0) state.posts = [...state.posts, ...posts]
            else state.posts = []
        },
        setMultiCategory: (state, action) => {
            if (state.multiCategories.includes(action.payload)) {
                state.multiCategories = state.multiCategories.filter(cat => {
                    return cat !== action.payload
                })
            }
            else state.multiCategories.push(action.payload)
        },
        setHasNextPage: (state, action) => {
            state.has_next = action.payload
        },
        incCurrentPage: (state) => {
            state.current_page += 1
        },
        setCurrentPageToDefault: (state) => {
            state.current_page = 1
        },
        setLikedPostsIds: (state, action) => {
            state.likedPostIds = action.payload
        },
        removeLIkedPostId: (state, action) => {
            state.likedPostIds = state.likedPostIds.filter(post => post != action.payload)
        },
        addLikedPostId: (state, action) => {
            state.likedPostIds.push(action.payload);
        },
        setLikedPosts: (state, action) => {
            state.likedPosts = [...action.payload]
        },
        removePostFromLikedPosts: (state, action) =>{
            state.likedPosts = state.likedPosts.filter(post => post.id != action.payload)
        }
    }
})

export const { setCategory, fillPosts, setMultiCategory, setHasNextPage, incCurrentPage, setCurrentPageToDefault, setLikedPostsIds, removeLIkedPostId, addLikedPostId, setLikedPosts, removePostFromLikedPosts } = postSlice.actions
export default postSlice.reducer
