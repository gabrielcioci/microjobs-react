import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {connect, useDispatch} from 'react-redux';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import logo from '../assets/images/mjobs.svg'
import Page from "./Layout/Page";
import {Link} from "react-router-dom";


const Activation = (props) => {
    const [successMessage, setSuccessMessage] = useState()
    const [formError, setFormError] = useState(null)
    const dispatch = useDispatch()
    const {id} = props.match.params
    useEffect(() => {
        axios.post(`${process.env.REACT_APP_API_URL}/api/activation/user/${id}`)
            .then(response => {
                setSuccessMessage(response.data.message)
            })
            .catch((error) => {
                setFormError(error.response.data.message)
            })
    }, [])


    return (
        <Page hideHeader={true}>
            <div className="mt-20 mb-20 md:max-w-xl lg:max-w-2xl mx-auto">
                <img src={logo} alt="microjobs-logo" className="w-24 mb-8 ml-auto mr-auto"/>
                {formError &&
                <div className="flex-col">
                    <div
                        className="p-4 bg-red-200 text-center border border-red-400 rounded text-lg text-red-600">
                        {formError}
                    </div>
                    <Link to='/'
                          className="flex w-mxc items-center mt-4 text-gray-500 hover:text-gray-600 duration-200 transition-all">
                        <FontAwesomeIcon icon="arrow-left" className="mr-2"/>Înapoi la pagina principală
                    </Link>
                </div>}
                {successMessage &&
                <div className="flex-col">
                    <div
                        className="flex p-4 items-center bg-green-200 border border-green-400 rounded text-md text-green-600">
                        {successMessage}</div>
                    <Link to='/'
                          className="flex items-center w-mxc mt-4 text-gray-500 hover:text-gray-600 duration-200 transition-all">
                        <FontAwesomeIcon icon="arrow-left" className="mr-2"/>Înapoi la pagina principală
                    </Link>
                </div>}
            </div>
        </Page>
    )
}

const mapStateToProps = (state) => ({
    modals: state.modals
})

export default connect(mapStateToProps)(Activation)