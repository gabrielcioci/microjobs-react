import React, {useEffect, useState} from 'react'
import Moment from "react-moment";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from "axios";
import moment from "moment";
import {connect} from "react-redux";

const JobDetails = props => {
    const {jobModal} = props.modals
    const [contactDetails, setContactDetails] = useState(false)
    const [author, setAuthor] = useState('')

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/users/${jobModal.postedBy}`)
            .then(res => setAuthor(res.data))
    }, [])

    return (
            <div className="job-info flex-col">
                <div className="text-lg text-gray-700">{jobModal.description}</div>
                <div className="flex items-center mt-1">
                    <div className="text-lg text-gray-500">Locație: <span
                        className="text-gray-700">{jobModal.location}</span></div>
                </div>
                <div className="flex items-center mt-1">
                    <div className="text-lg text-gray-500">Timp: <span
                        className="text-gray-700">{jobModal.duration} de minute</span>
                    </div>
                </div>
                <div className="flex items-center flex-wrap mt-4 text-xs">
                    {jobModal.tags.map(tag => {
                        return (
                            <div key={tag}
                                 className="rounded py-1 px-2 text-gray-500 bg-gray-200 mr-2"><FontAwesomeIcon
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
                    <div className="flex-col mt-2">
                        <div className="text-gray-600 text-md"><FontAwesomeIcon icon="envelope"
                                                                                className="mr-2"/>{author.email}
                        </div>
                        <div className="text-gray-600 text-md"><FontAwesomeIcon icon="phone-alt"
                                                                                className="mr-2"/>{author.phone}</div>
                    </div>
                </div>}
                <div
                    className="rounded w-full mt-4 py-2 px-4 bg-indigo-600 hover:bg-indigo-500 text-center text-white transition-all duration-200 cursor-pointer"
                    onClick={(e) => setContactDetails(!contactDetails)}>Date de contact
                </div>
            </div>
    )
}

const mapStateToProps = (state) => ({
    modals: state.modals
})

export default connect(mapStateToProps)(JobDetails)