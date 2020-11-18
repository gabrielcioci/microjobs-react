import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {connect, useDispatch} from "react-redux";
import {jobModal} from "../store/actions";

const Job = (props) => {
    const {modals, job} = props
    const dispatch = useDispatch()

    return (
        <div
            className={`job ${modals.jobModal && modals.jobModal._id === job._id ? 'expanded' : null} flex flex-col md:flex-row md:items-center mt-2 rounded py-1 px-2 bg-white shadow-sm border-solid border-l-4 border-transparent duration-200 transition-all cursor-pointer`}
            onClick={(e) => dispatch(jobModal(props.job))}>
            <div>
                <h4 className="text-lg text-indigo-600">{job.title}</h4>
                <div className="flex items-center">
                    <p className="text-xs text-gray-500"><FontAwesomeIcon
                        icon="clock" className="mr-1"/> {job.duration} min
                    </p>
                    <p className="text-gray-500 text-xs ml-4"><FontAwesomeIcon icon="map-marker-alt"
                                                                               className="mr-1"/>{job.location}
                    </p>
                </div>
            </div>
            <div className="flex items-center text-xs flex-wrap mt-2 md:mt-0 md:ml-auto md:flex-no-wrap">
                {job.tags.map(tag => {
                    return (
                        <div key={tag}
                             className="rounded py-1 px-2 min-w-mxc text-gray-500 bg-gray-200 mr-2 mb-2 md:mb-0 md:ml-2 md:mr-0">
                            <FontAwesomeIcon icon="tags" className="text-gray-500 mr-1"/>{tag}</div>
                    )
                })}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    modals: state.modals
})

export default connect(mapStateToProps)(Job)