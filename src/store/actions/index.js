import {
    STORE_JOBS,
    LOGOUT,
    LOGIN,
    REGISTER,
    HIDE_LOGIN_MODAL,
    SHOW_LOGIN_MODAL,
    HIDE_REGISTER_MODAL,
    SHOW_REGISTER_MODAL,
    HIDE_ADD_JOB_MODAL,
    SHOW_ADD_JOB_MODAL,
    HIDE_JOB_MODAL,
    SHOW_JOB_MODAL,
    HIDE_LOGOUT_MODAL,
    SHOW_LOGOUT_MODAL, HIDE_SUPPORT_MODAL, SHOW_SUPPORT_MODAL,
} from "./actionTypes";

export const storeJobs = (jobs) => ({type: STORE_JOBS, jobs})
export const logout = (user) => ({type: LOGOUT, user})
export const login = (user) => ({type: LOGIN, user})
export const register = (user) => ({type: REGISTER, user})
export const hideLoginModal = () => ({type: HIDE_LOGIN_MODAL})
export const showLoginModal = () => ({type: SHOW_LOGIN_MODAL})
export const hideLogoutModal = () => ({type: HIDE_LOGOUT_MODAL})
export const showLogoutModal = () => ({type: SHOW_LOGOUT_MODAL})
export const hideRegisterModal = () => ({type: HIDE_REGISTER_MODAL})
export const showRegisterModal = () => ({type: SHOW_REGISTER_MODAL})
export const hideJobModal = () => ({type: HIDE_JOB_MODAL})
export const jobModal = (job) => ({type: SHOW_JOB_MODAL, job})
export const hideAddJobModal = () => ({type: HIDE_ADD_JOB_MODAL})
export const addJobModal = () => ({type: SHOW_ADD_JOB_MODAL})
export const hideSupportModal = () => ({type: HIDE_SUPPORT_MODAL})
export const showSupportModal = () => ({type: SHOW_SUPPORT_MODAL})
