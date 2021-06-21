import TweetHashList, {HashList} from "../TwitterList/TwitterListItem/TweetHashList/TweetHashList";
import './HashTagFilters.scss'
import {FunctionComponent} from "react";

const HashTagFilters: FunctionComponent<HashList> = ({hashtags, setCurrentSearch} : HashList) => {
    return (
        <div className="hash-filters">
            <h1>Filter by hashtag</h1>
            <TweetHashList hashtags={hashtags} setCurrentSearch={setCurrentSearch} />
        </div>
    );
};

export default HashTagFilters;
