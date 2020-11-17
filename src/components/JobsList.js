import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {connect, useDispatch} from 'react-redux';
import {addJobModal, hideAddJobModal, hideJobModal, showLoginModal, storeJobs} from "../store/actions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Job from "./Job";
import {login} from "../store/actions";
import {useCookies} from "react-cookie";
import Modal from "./Modal/Modal";
import AddJob from "./Modal/AddJob";
import JobDetails from "./Modal/JobDetails";
import Page from "./Layout/Page";


const JobsList = (props) => {
    const {jobs, modals, user} = props
    const dispatch = useDispatch()
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/jobs/`)
            .then(response => {
                dispatch(storeJobs(response.data))
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    const handleAddJob = (e) => {
        if (user) dispatch(addJobModal())
        else dispatch(showLoginModal())
    }


    return (
        <Page>
            <div className="mt-20 mb-20 md:max-w-xl lg:max-w-2xl mx-auto">
                <div className="flex items-center mb-4">
                    <h3 className="text-2xl text-gray-900">Microjoburile zilei</h3>
                    <div
                        className="ml-auto bg-indigo-600 hover:bg-indigo-500 py-2 px-4 rounded text-white cursor-pointer transition-all duration-200"
                        onClick={(e) => handleAddJob(e)}><FontAwesomeIcon icon="briefcase"/> Adaugă job
                    </div>
                </div>
                {modals.addJobModal && <Modal title='Adaugă job' closeAction={hideAddJobModal}><AddJob/></Modal>}
                <div>
                    {jobs && jobs.map(job => <Job key={job._id} job={job}/>)}
                </div>
                {modals.jobModal && <Modal title={modals.jobModal.title} type="job-details" closeAction={hideJobModal}>
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