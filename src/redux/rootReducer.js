import { combineReducers } from "redux";
import { PostsReducer } from "./PostsReducer";

const rootReducer = combineReducers({
    Posts: PostsReducer,
});
export default rootReducer;