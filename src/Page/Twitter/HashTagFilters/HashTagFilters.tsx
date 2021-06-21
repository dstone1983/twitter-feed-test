import {HashTags} from "../../../store/twitter/reducer";
import TweetHashList from "../TwitterList/TwitterListItem/TweetHashList/TweetHashList";
import './HashTagFilters.scss'

const HashTagFilters = ({hashTags, setCurrentSearch} : {hashTags: HashTags[], setCurrentSearch: (search: string) => any}) => {
    return (
        <div className="hash-filters">
            <h1>Filter by hashtag</h1>
            <TweetHashList hashtags={hashTags} setCurrentSearch={setCurrentSearch} />
        </div>
    );
};

export default HashTagFilters;
