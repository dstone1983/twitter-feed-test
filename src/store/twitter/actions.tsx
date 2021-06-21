import {createAsyncThunk} from "@reduxjs/toolkit";
import {popular} from "../../apis/twitter/apiCalls";

export interface PopularTweetsParams {
    value: string;
    max_id?: number | string;
    isLoadMore: boolean
}

export const getPopularTweets = createAsyncThunk('GET_POPULAR_TWEETS', (params: PopularTweetsParams) => {
    return popular(params.value, params.max_id)
})