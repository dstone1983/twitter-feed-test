import {HashTags} from "../../../../../store/twitter/reducer";
import './TweetHashList.scss'
import {FunctionComponent} from "react";

export interface HashList {
    hashtags: HashTags[]
    setCurrentSearch: (search: string) => any
}

const TweetHashList: FunctionComponent<HashList> = ({hashtags, setCurrentSearch}: HashList) => {
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
