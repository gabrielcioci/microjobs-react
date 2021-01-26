import axios from 'axios'
import {storeJobs, login} from "../store/actions";
import config from '../config'

const getCookieValue = (ctx, cookieName) => {

    let cookieSource

    if (ctx && ctx.req && ctx.req.headers && ctx.req.headers.cookie)
        cookieSource = ctx.req.headers.cookie

    if (!cookieSource && typeof document !== 'undefined')
        cookieSource = document.cookie

    if (!cookieSource) return cookieSource

    const cookieValue = cookieSource.split(`${cookieName}=`)[1]

    return cookieValue ? cookieValue : null

}

export default async (endpoint, data = {}, ctx = null, rawError = false) => {

    const headers = {}

    // Get the authentication token
    const authToken = getCookieValue(ctx, 'token')

    // Store the token
    if (authToken) headers['X-AUTH-TOKEN'] = authToken

    try {
        // Make the request
        const res = await axios.post(
            `${config.apiUrl}/api${endpoint}`,
            data,
            {
                headers
            }
        )
        // If we have jobs and access to Redux
        if (res.data && res.data.jobs && ctx && ctx.store) {
            // Add jobs to Redux
            ctx.store.dispatch(storeJobs(res.data.jobs))
        }

        if (res.data && res.data.user && ctx && ctx.store) {
            // Add the user
            ctx.store.dispatch(login(res.data.user))
        }

        // Return the data
        if (res.data) return res.data

    } catch (err) {
        return {error: err.response.data}
    }
}