import {Tweets} from "../../../../store/twitter/reducer";
import Autolinker from 'autolinker';
import parse from 'html-react-parser';
import './TwitterListItem.scss'
import TweetHashList from "./TweetHashList/TweetHashList"

const TwitterListItem = ({tweet, setCurrentSearch}: {tweet: Tweets, setCurrentSearch: (search: string) => any}) => {
    const {full_text, entities: {hashtags}, user: {url, screen_name}} = tweet
    const contentText = parse(Autolinker.link(full_text, {
        replaceFn: (match: any) => {
            switch (match.getType()) {
                case 'url' :
                    return true;  // let Autolinker perform its normal anchor tag replacement
                case 'phone' :
                    return '<a href="http://newplace.to.link.phone.numbers.to/">' + match.getPhoneNumber() + '</a>';

                case 'mention' :
                    const mention = match.getMention()
                    return `<a href="?q=@${mention}">@${mention}</a>`

                case 'hashtag' :
                    const hash = match.getHashtag()
                    return `<a href="?q=#${hash}">#${hash}</a>`
            }
        },
        mention: 'twitter',
        hashtag: "twitter"
    }))

    return (
        <li>
            <div className="profile-image">
                <img src={tweet.user.profile_image_url} alt={`@${tweet.user.screen_name}'s Profile Image`} />
            </div>
            <div className="content">
                <p><a href={url} target="_blank" rel="noreferrer">@{screen_name}</a></p>
                <p className="tweet-text">{contentText}</p>
                {hashtags.length > 0 && <TweetHashList hashtags={hashtags} setCurrentSearch={setCurrentSearch} />}
            </div>
        </li>
    );
};

export default TwitterListItem;
