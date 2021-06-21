import {createSlice} from "@reduxjs/toolkit";
import {getPopularTweets} from "./actions";
import _ from 'lodash';

export interface InitialState {
    loading: boolean;
    tweets: Tweets[]
    hashtags: Array<string>
    next_result: string
}

export interface Tweets {
    created_at: string;
    entities: Entities;
    user: User;
    full_text: string
}

interface User {
    profile_image_url: string;
    screen_name: string;
    url: string;
}

interface Entities {
    hashtags: Array<HashTags>
}

export interface HashTags {
    text: string;
    indices: number[]
}

const initialState: InitialState = {
    loading: true,
    next_result: '',
    tweets: [],
    hashtags: []
}

export const TwitterSlice = createSlice({
    name: 'Twitter',
    initialState,
    reducers: {},
    extraReducers: {
        [getPopularTweets.pending.toString()]: (state) => {
            state.loading = true
        },
        [getPopularTweets.rejected.toString()]: (state) => {
            state.loading = false
        },
        [getPopularTweets.fulfilled.toString()]: (state, actions) => {
            const {statuses, search_metadata} = actions.payload

            if (!actions.meta.arg.isLoadMore) {
                return {
                    ...state,
                    loading: false,
                    tweets: statuses,
                    next_result: search_metadata.next_results,
                    hashtags: _.uniqWith(statuses.reduce((hashArray: string[], status: Tweets) => {
                        if (status.entities.hashtags.length === 0) return [...hashArray]

                        const filteredHash = status.entities.hashtags.map((tag) => {
                            return {text: tag.text}
                        })

                        return [...hashArray, ...filteredHash]
                    }, []), _.isEqual)
                }
            } else {
                return {
                    ...state,
                    loading: false,
                    tweets: [...state.tweets, ...statuses],
                    next_result: search_metadata.next_results,
                    hashtags: _.uniqWith(statuses.reduce((hashArray: string[], status: Tweets) => {
                        if (status.entities.hashtags.length === 0) return [...hashArray]
                        const filteredHash = status.entities.hashtags.map((tag) => {
                            return {text: tag.text}
                        })
                        return [...hashArray, ...filteredHash]
                    }, [...state.hashtags]), _.isEqual)
                }
            }
        }
    }
})

export const TwitterReducer = TwitterSlice.reducer

