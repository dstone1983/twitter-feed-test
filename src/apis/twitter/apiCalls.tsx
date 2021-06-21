import twitter from './axiosInstance'

export const popular = (query?: string, max_id_number?: string | number) => {
    const q = query || 'news'
    const max_id = max_id_number || 1406216711519367200
    let params = {
        q: encodeURI(q),
        max_id,
        lang: 'en',
        result_type: 'popular',
        count: 5,
        tweet_mode: 'extended',
    }

    return twitter.get('', {params}).then(response => response.data)
}