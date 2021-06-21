import React, {useEffect, useState} from 'react';
import './Twitter.scss'
import Input from "../../Components/Input/Input";
import {faSearch} from "@fortawesome/free-solid-svg-icons/faSearch";
import {useDispatch, useSelector} from "react-redux";
import {getPopularTweets} from "../../store/twitter/actions";
import {getHashtags, getNextResultUrl} from "../../store/twitter/selectors";
import TwitterList from "./TwitterList/TwitterList";
import HashTagFilters from "./HashTagFilters/HashTagFilters";
import useWindowSize from "../../Hooks/resize";

const Twitter = () => {
    const queryString = new URLSearchParams(window.location.search)
    const searchQuery = queryString.get('q') || ''
    const size = useWindowSize()
    console.log(size)
    const dispatch = useDispatch()
    const hashTags = useSelector(state => getHashtags(state))
    const nextUrl = useSelector(state => getNextResultUrl(state))
    const [currentSearch, setCurrentSearch] = useState(searchQuery)

    useEffect(() => {
        setCurrentSearch(searchQuery)
    }, [searchQuery])

    useEffect(() => {
        dispatch(getPopularTweets({value: '', isLoadMore: false}))
    }, [dispatch])

    useEffect(() => {
        dispatch(getPopularTweets({value: currentSearch, isLoadMore: false}))
    }, [currentSearch])

    const setSearch = (value: string) => {
        setCurrentSearch(value)
    }

    const loadMore = () => {
        const params = new URLSearchParams(nextUrl);
        const max_id: string | number = params.get('max_id') || 0;

        dispatch(getPopularTweets({value: currentSearch, max_id, isLoadMore: true}))
    }

    return (
        <div className="container">
            <h1>Tweet Feed</h1>
            <div className="twitter-feed">
                <div className="feed-results">
                    <Input callback={setSearch} iconName={faSearch} placeholder="Search by keyword" defaultValue={currentSearch} />
                    {(hashTags.length > 0 && size[0] <= 768) && <HashTagFilters hashTags={hashTags} setCurrentSearch={setCurrentSearch} />}
                    <TwitterList loadMore={loadMore} setCurrentSearch={setCurrentSearch} />
                </div>
                {(hashTags.length > 0 && size[0] > 768) && <HashTagFilters hashTags={hashTags} setCurrentSearch={setCurrentSearch} />}
            </div>
        </div>
    );
};

export default Twitter;
