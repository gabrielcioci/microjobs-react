import React from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useDispatch} from "react-redux";

const Modal = (props) => {
    const {title, closeAction, type} = props
    const dispatch = useDispatch()
    return (
        <div className="absolute modal-container top-0 left-0 right-0 bottom-0">
            <div className="modal md:w-1/4 px-6 py-4 rounded shadow-md bg-white">
                <div className={`modal-header flex items-center ${type && type === 'job-details' ? 'mb-4' : 'mb-6'}`}>
                    <div
                        className={`text-gray-700 text-xl ${type && type === 'job-details' && 'text-indigo-600 text-2xl'}`}>{title}</div>
                    <div
                        className="text-gray-300 text-lg cursor-pointer hover:text-gray-400 transition-all duration-200 ml-auto"
                        onClick={(e) => dispatch(closeAction())}><FontAwesomeIcon icon="times"/></div>
                </div>
                <div className="modal-body">
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default Modal