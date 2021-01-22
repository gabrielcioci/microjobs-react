import React, {useEffect} from 'react'
import axios from 'axios'
import {useDispatch} from 'react-redux';
import {Redirect} from "react-router-dom";
import {login} from "../store/actions";
import {useCookies} from "react-cookie";
import {toast} from "react-toastify";


const Activation = (props) => {
    const dispatch = useDispatch()
    const [cookies, setCookie] = useCookies(['token']);
    const {id} = props.match.params
    useEffect(() => {
        axios.post(`${process.env.REACT_APP_API_URL}/api/activation/user/${id}`)
            .then(res => {
                dispatch(login(res.data))
                setCookie("token", res.data.token, {path: "/"});
                // show toast & hide form
                toast.success('Felicitări! Contul a fost activat cu succes.', {
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

    return <Redirect to="/"/>
}

export default Activation