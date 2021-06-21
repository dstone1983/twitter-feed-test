import axios, {AxiosRequestConfig} from 'axios';
import {attach} from 'retry-axios';

const axiosConfig: AxiosRequestConfig = {
    baseURL: '/api/twitter',
    responseType: "json"
}

/*
The prepared axios instance used for all connections to the twitter api
 */
export const axiosInstance = axios.create(axiosConfig)

/*
* Interceptor for adding auth headers to requests
*/
axiosInstance.interceptors.request.use(config => {
    config.headers['Authorization'] = `Bearer AAAAAAAAAAAAAAAAAAAAAI4OHgEAAAAAlbk0HSIAqcc3havrrU9j2NeAQ34%3DzJmzwHuQerd8JJ2TeuHfqwKgBt6bK4tk93w3ocBB2vPuKMF3cG`;

    return config
}, error => {
    return Promise.reject(error)
})

let onRetryAttempt = undefined

axiosInstance.defaults.raxConfig = {
    instance: axiosInstance,
    retry: 3,
    noResponseRetries: 3,
    retryDelay: 100,
    httpMethodsToRetry: ['GET', 'HEAD', 'OPTIONS'],
    statusCodesToRetry: [[100, 199], [429, 429], [500, 599]],
    onRetryAttempt
}
attach(axiosInstance)

export default axiosInstance