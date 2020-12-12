import {
    SHOW_LOGIN_MODAL,
    HIDE_LOGIN_MODAL,
    SHOW_REGISTER_MODAL,
    HIDE_REGISTER_MODAL,
    SHOW_JOB_MODAL,
    HIDE_JOB_MODAL,
    SHOW_ADD_JOB_MODAL,
    HIDE_ADD_JOB_MODAL,
    HIDE_LOGOUT_MODAL,
    SHOW_LOGOUT_MODAL, SHOW_SUPPORT_MODAL, HIDE_SUPPORT_MODAL
} from '../actions/actionTypes'

const initialState = {
    loginModal: false,
    logoutModal: false,
    registerModal: false,
    addJobModal: false,
    jobModal: null,
    supportModal: false
}

export default function modalReducer(state = initialState, action) {
    const {type, job} = action
    switch (type) {
        case SHOW_LOGIN_MODAL:
            return {
                ...state,
                loginModal: true,
                registerModal: false
            }
        case HIDE_LOGIN_MODAL:
            return {
                ...state,
                loginModal: false
            }
        case SHOW_LOGOUT_MODAL:
            return {
                ...state,
                logoutModal: true,
            }
        case HIDE_LOGOUT_MODAL:
            return {
                ...state,
                logoutModal: false
            }
        case SHOW_REGISTER_MODAL:
            return {
                ...state,
                registerModal: true,
                loginModal: false
            }
        case HIDE_REGISTER_MODAL:
            return {
                ...state,
                registerModal: false
            }
        case SHOW_JOB_MODAL:
            return {
                ...state,
                jobModal: job
            }
        case HIDE_JOB_MODAL:
            return {
                ...state,
                jobModal: null
            }
        case SHOW_ADD_JOB_MODAL:
            return {
                ...state,
                addJobModal: true
            }
        case HIDE_ADD_JOB_MODAL:
            return {
                ...state,
                addJobModal: false
            }
        case SHOW_SUPPORT_MODAL:
            return {
                ...state,
                supportModal: true
            }
        case HIDE_SUPPORT_MODAL:
            return {
                ...state,
                supportModal: false
            }
        default:
            return state;
    }
}