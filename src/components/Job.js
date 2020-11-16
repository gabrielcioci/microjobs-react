import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {connect, useDispatch} from "react-redux";
import {jobModal} from "../store/actions";

const Job = (props) => {
    const {modals, job} = props
    const dispatch = useDispatch()

    return (
        <div
            className={`job ${modals.jobModal && modals.jobModal._id === job._id ? 'expanded' : null} flex-col mt-2 rounded py-1 px-4 bg-white shadow-sm border-solid border border-transparent duration-200 transition-all cursor-pointer`}
            onClick={(e) => dispatch(jobModal(props.job))}>
            <div className="flex items-center">
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
                <div className="flex items-center ml-auto flex-no-wrap text-xs">
                    {job.tags.map(tag => {
                        return (
                            <div key={tag}
                                 className="rounded py-1 px-2 text-gray-500 bg-gray-200 ml-2"><FontAwesomeIcon icon="tags" className="text-gray-500 mr-1"/>{tag}</div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    modals: state.modals
})

export default connect(mapStateToProps)(Job)