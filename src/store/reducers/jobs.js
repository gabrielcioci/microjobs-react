import {STORE_JOBS} from "../actions/actionTypes";

const initialState = {}

export default function jobsReducer(state = initialState, action) {
    const {jobs, type} = action
    switch (type) {

        case STORE_JOBS:
            return {
                ...state,
                jobs: jobs
            }
        default:
            return state;
    }
}