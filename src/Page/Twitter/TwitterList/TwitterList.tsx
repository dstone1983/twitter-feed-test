import {useSelector} from "react-redux";
import {getTweets} from "../../../store/twitter/selectors";
import {Tweets} from "../../../store/twitter/reducer";
import TwitterListItem from "./TwitterListItem/TwitterListItem";
import './TwitterList.scss'
import {FunctionComponent} from "react";

export interface TwitterListTypes {
    loadMore: () => void
    setCurrentSearch: (search: string) => any
}

const TwitterList: FunctionComponent<TwitterListTypes> = ({loadMore, setCurrentSearch}: TwitterListTypes) => {
    const tweets: Tweets[] = useSelector(state => getTweets(state))

    return (
        <div className="twitter-list">
            {tweets.length > 0 &&
                <ul>
                    {tweets.map((tweet, index) => {
                        return <TwitterListItem key={index} tweet={tweet} setCurrentSearch={setCurrentSearch} />
                    })}
                </ul>
            }
            <button onClick={loadMore}>Load more</button>
        </div>
    );
};

export default TwitterList;
