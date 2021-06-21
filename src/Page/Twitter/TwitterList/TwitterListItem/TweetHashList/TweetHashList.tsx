import {HashTags} from "../../../../../store/twitter/reducer";
import './TweetHashList.scss'

const TweetHashList = ({hashtags, setCurrentSearch}: {hashtags: HashTags[], setCurrentSearch: (search: string) => any}) => {
    return (
        <div className="tweet-hash-list">
            {
                hashtags.map((tag, index) => {
                    return (<button key={index} onClick={() => setCurrentSearch(`#${tag.text}`)}>#{tag.text}</button>)
                })
            }
        </div>
    );
};

export default TweetHashList;
