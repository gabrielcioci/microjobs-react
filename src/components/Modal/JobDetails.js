import React, {useEffect, useState} from 'react'
import Moment from "react-moment";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from "axios";
import {connect, useDispatch} from "react-redux";
import {toast} from "react-toastify";
import {useCookies} from "react-cookie";
import {hideJobModal, storeJobs} from "../../store/actions";

const JobDetails = props => {
    const {jobModal} = props.modals
    const [contactDetails, setContactDetails] = useState(false)
    const [author, setAuthor] = useState('')
    const [cookies, setCookie] = useCookies(['token']);
    const dispatch = useDispatch()

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/users/${jobModal.postedBy}`)
            .then(res => setAuthor(res.data))
    }, [])

    const handleCompleteJob = (e) => {
        const headers = {}
        // Check for token
        if (!cookies.token) return
        headers['X-AUTH-TOKEN'] = cookies.token
        axios.post(`${process.env.REACT_APP_API_URL}/api/jobs/complete/${jobModal._id}`, {}, {headers})
            .then((response) => {
                // Hide Job Details Modal
                dispatch(hideJobModal())
                // Success Toast
                toast.success(response.data.message, {
                    position: "top-right",
                    className: 'success-toast',
                    autoClose: 3000,
                    closeButton: false,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                // Update job list on FE
                axios.get(`${process.env.REACT_APP_API_URL}/api/jobs/`)
                    .then(response => {
                        dispatch(storeJobs(response.data))
                    })
                    .catch((error) => {
                        toast.error(error.response.data.message, {
                            position: "top-right",
                            className: 'error-toast',
                            autoClose: 3000,
                            closeButton: false,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    })
            })
            .catch((error) => {
                toast.error(error.response.data.message, {
                    position: "top-right",
                    className: 'error-toast',
                    autoClose: 3000,
                    closeButton: false,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
    }

    return (
        <div className="job-info flex-col">
            <div className="text-lg text-gray-700">{jobModal.description}</div>
            <div className="flex items-center mt-1">
                <div className="text-lg text-gray-500">Locație: <span
                    className="text-gray-700">{jobModal.location}</span></div>
            </div>
            <div className="flex items-center mt-1">
                <div className="text-lg text-gray-500">Durează: <span
                    className="text-gray-700">{jobModal.duration} min</span>
                </div>
            </div>
            <div className="flex items-center mt-1">
                <div className="text-lg text-gray-500">Recompensă: <span
                    className="text-gray-700">{jobModal.reward} LEI</span>
                </div>
            </div>
            <div className="flex items-center flex-wrap mt-4 text-xs">
                {jobModal.tags.map(tag => {
                    return (
                        <div key={tag}
                             className="rounded py-1 px-2 text-gray-500 bg-gray-200 mr-2 mb-2"><FontAwesomeIcon
                            icon="tags"
                            className="text-gray-500 mr-1"/>{tag}
                        </div>
                    )
                })}
            </div>
            {contactDetails &&
            <div
                className="user-info rounded bg-gray-100 py-2 border border-gray-200 px-4 flex-col items-start mt-6">
                <div className="text-indigo-600 text-xl">{author.name}</div>
                <div className="text-xs text-gray-500">Membru din <Moment format="DD MMM YYYY"
                                                                          date={author.register_date}/></div>
                <div className="mt-2 text-gray-600 text-md"><FontAwesomeIcon icon="phone-alt"
                                                                             className="mr-2"/>{jobModal.phone}</div>
            </div>}
            <div
                className="rounded w-full mt-4 py-2 px-4 bg-indigo-600 hover:bg-indigo-500 text-center text-white transition-all duration-200 cursor-pointer"
                onClick={(e) => setContactDetails(!contactDetails)}>Contactează
            </div>
            {props.user && props.user._id === jobModal.postedBy &&
            <div
                className="mt-2 rounded complete-job w-full justify-center flex flex-row items-center cursor-pointer py-1 px-2 border text-teal-400 border-teal-400 duration-200 transition-all hover:bg-teal-400 hover:text-white">
                <div>
                    <FontAwesomeIcon icon="check"/>
                </div>
                <div className="ml-2" onClick={(e) => handleCompleteJob(e)}>Complet</div>
            </div>}
        </div>
    )
}

const mapStateToProps = (state) => ({
    modals: state.modals,
    user: state.auth.user
})

export default connect(mapStateToProps)(JobDetails)