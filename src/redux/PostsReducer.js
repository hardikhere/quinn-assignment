export const UPDATE_POSTS = "UPDATE_POSTS";

export const _updatePosts = (posts) => {
    return {
        type: UPDATE_POSTS,
        payload: posts
    };
};


const initialState = [];

export const PostsReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_POSTS: return state.concat(action.payload)
        default: return state;
    }
}
