import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {connect, useDispatch} from 'react-redux';
import {addJobModal, hideAddJobModal, hideJobModal, showLoginModal, storeJobs} from "../store/actions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Job from "./Job";
import Modal from "./Modal/Modal";
import AddJob from "./Modal/AddJob";
import JobDetails from "./Modal/JobDetails";
import Page from "./Layout/Page";
import SearchInput from "./SearchInput";
import {toast} from "react-toastify";


const JobsList = (props) => {
    const {modals, user, jobs} = props
    const [loading, setLoading] = useState(true)
    const [onlyUserJobs, setOnlyUserJobs] = useState(false)
    const dispatch = useDispatch()
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/jobs/`)
            .then(response => {
                setLoading(false)
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
    }, [])

    const handleAddJob = (e) => {
        if (user) dispatch(addJobModal())
        else dispatch(showLoginModal())
    }

    const handleJobsFilter = (e) => {
        setOnlyUserJobs(!onlyUserJobs)
    }


    return (
        <Page>
            <div className="mt-20 mb-20 sm:max-w-xl lg:max-w-2xl mx-auto">
                <div className="flex items-center mb-4">
                    <h3 className="text-2xl text-gray-700">Microjoburile zilei</h3>
                    {user && <div
                        className="flex noselect items-center ml-auto bg-gray-300 hover:text-gray-700 py-2 px-3 md:px-4 rounded text-gray-600 cursor-pointer transition-all duration-200"
                        onClick={handleJobsFilter}>
                        <div>
                            <FontAwesomeIcon icon="align-left"/>
                        </div>
                        <span
                            className="hidden ml-2 md:inline-block">{!onlyUserJobs ? 'Joburile mele' : 'Toate joburile'}</span>
                    </div>}
                    <div
                        className={`${user ? 'ml-2' : 'ml-auto'} bg-indigo-600 shadow-sm hover:bg-indigo-500 py-2 px-3 md:px-4 rounded text-white cursor-pointer transition-all duration-200`}
                        onClick={handleAddJob}><FontAwesomeIcon icon="briefcase"/><span
                        className="hidden md:inline-block ml-2">Adaugă job</span>
                    </div>
                </div>
                {user && onlyUserJobs &&
                <div className="disclaimer p-2 mb-4 bg-gray-300 bg-opacity-75 border border-gray-400 text-gray-500">Dupa
                    finalizarea joburilor nu uita să le marchezi ca fiind completate, pentru a evita confuzia
                    celorlalți utilizatori.
                </div>}
                <SearchInput className="flex mb-2 bg-white p-2 items-center rounded border border-gray-300 md:hidden"
                             elementClass="job"/>
                {modals.addJobModal && <Modal title='Adaugă job' closeAction={hideAddJobModal}><AddJob/></Modal>}
                {loading ?
                    <div className="flex flex-col w-full items-center justify-center mt-16">
                        <div className="lds-ripple">
                            <div/>
                            <div/>
                        </div>
                        <div className="text-sm text-gray-500">Se încarcă joburile...</div>
                    </div>
                    :
                    <div>
                        {jobs ? onlyUserJobs ? jobs.filter((job) => job.postedBy === user._id).map(job => <Job
                                key={job._id} job={job}/>) : jobs.map(job => <Job key={job._id} job={job}/>)
                            :
                            <div className="jobs-empty mt-24 flex flex-col items-center justify-center text-gray-400">
                                <FontAwesomeIcon className="text-3xl" icon="business-time"/>
                                <p className="mt-2 text-md">Niciun job postat momentan.</p>
                            </div>}
                    </div>}
                {modals.jobModal &&
                <Modal title={modals.jobModal.title} type="job-details" closeAction={hideJobModal}>
                    <JobDetails/>
                </Modal>}
            </div>
        </Page>
    )
}

const mapStateToProps = (state) => ({
    jobs: state.jobs.jobs,
    modals: state.modals,
    user: state.auth.user
})

export default connect(mapStateToProps)(JobsList)