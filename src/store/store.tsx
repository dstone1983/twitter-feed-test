import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import {TwitterReducer} from "./twitter/reducer";

const middleware = [...getDefaultMiddleware()]
export default configureStore({
    reducer: {
        Twitter: TwitterReducer
    },
    middleware
})