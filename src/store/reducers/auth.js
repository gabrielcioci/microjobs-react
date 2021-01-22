import {
    LOGIN, LOGOUT, REGISTER
} from '../actions/actionTypes'

const initialState = {
    user: null,
}

export default function authReducer(state = initialState, action) {

    const {type, user} = action
    switch (type) {
        case LOGIN:
        case REGISTER:
            return {
                ...state,
                user: user,
            }
        case LOGOUT:
            return {
                ...state,
                user: null,
            }
        default:
            return state;
    }
}