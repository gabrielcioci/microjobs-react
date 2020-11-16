import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useCookies} from "react-cookie";
import moment from "moment";
import AdminPage from "./Layout/AdminPage";


const Review = (props) => {
    const [jobs, setJobs] = useState()
    const [cookies, setCookie] = useCookies(['token']);


    // Update job list on FE function
    const updateJobList = () => {
        const headers = {}
        // Check for token
        if (!cookies.token) return
        headers['X-AUTH-TOKEN'] = cookies.token
        axios.get(`/api/jobs/draft`,{headers})
            .then(response => {
                setJobs(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    // Get list of unreviewed jobs
    useEffect(() => {
        updateJobList()
    }, [])

    // Posted x time ago
    const durationFromNow = (date) => {
        const now = moment()
        const duration = moment.duration(now.diff(date))
        const hr = Math.floor(duration.asHours())
        const min = Math.floor(duration.asMinutes())
        const dd = Math.floor(duration.asDays())
        if (hr > 24)
            if (dd === 1) return dd + 'zi'
            else return dd + ' zile'
        else if (hr > 0)
            if (hr === 1) return hr + 'ora'
            else return hr + ' ore'
        else if (min === 1) return min + ' minut'
        else return min + ' minute'
    }

    const acceptJob = (job) => {
        const headers = {}
        // Check for token
        if (!cookies.token) return
        headers['X-AUTH-TOKEN'] = cookies.token
        // build the object
        const updatedJob = {
            title: job.title,
            description: job.description,
            duration: job.duration,
            location: job.location,
            tags: job.tags,
            date: job.date,
            reviewed: true,
            postedBy: job.postedBy
        }
        // update job
        axios.post(`/api/jobs/update/${job._id}`, updatedJob, {headers})
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                updateJobList()
            })
    }

    const rejectJob = (job) => {
        const headers = {}
        // Check for token
        if (!cookies.token) return
        headers['X-AUTH-TOKEN'] = cookies.token
        axios.delete(`/api/jobs/${job._id}`, {headers})
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                updateJobList()
            })
    }

    return (
        <AdminPage>
            <div className="mt-20 mb-20 md:max-w-xl lg:max-w-2xl mx-auto">
                <h3 className="text-2xl text-gray-900 mb-6">Joburi de verificat</h3>
                <div className="flex-col">
                    {jobs && jobs.map(job => <div className="flex-col p-4 bg-white shadow-sm mb-4">
                        <div className="text-xl text-indigo-600">{job.title}</div>
                        <div className="text-md text-gray-700">{job.description}</div>
                        <div className="flex items-center mt-1">
                            <div className="text-md text-gray-500">Locație: <span
                                className="text-gray-700">{job.location}</span></div>
                        </div>
                        <div className="flex items-center mt-1">
                            <div className="text-md text-gray-500">Timp: <span
                                className="text-gray-700">{job.duration} de minute</span>
                            </div>
                        </div>
                        <div className="flex items-center flex-wrap mt-4 text-xs">
                            {job.tags.map(tag => {
                                return (
                                    <div key={tag}
                                         className="rounded py-1 px-2 text-gray-500 bg-gray-200 mr-2"><FontAwesomeIcon
                                        icon="tags"
                                        className="text-gray-500 mr-1"/>{tag}
                                    </div>
                                )
                            })}
                        </div>
                        <div className="text-md text-gray-500 mt-2">Postat acum {durationFromNow(job.createdAt)}</div>
                        <div className="flex items-center mt-4">
                            <div
                                className="rounded w-full mr-4 py-2 px-4 bg-red-500 hover:bg-red-600 text-center text-white transition-all duration-200 cursor-pointer"
                                onClick={(e) => rejectJob(job)}>Reject
                            </div>
                            <div
                                className="rounded w-full py-2 px-4 bg-green-500 hover:bg-green-600 text-center text-white transition-all duration-200 cursor-pointer"
                                onClick={(e) => acceptJob(job)}>Accept
                            </div>
                        </div>
                    </div>)}
                </div>
            </div>
        </AdminPage>
    )
}

export default Review