import {combineReducers} from "redux";

import jobs from './jobs'
import auth from './auth'
import modals from "./modals";

export default combineReducers({
    auth,
    jobs,
    modals
})