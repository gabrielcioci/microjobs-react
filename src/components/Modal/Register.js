import React, {useState} from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from 'axios'
import {hideRegisterModal, showLoginModal} from "../../store/actions";
import {useDispatch} from "react-redux";
import {toast} from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';


const Register = props => {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [formError, setFormError] = useState()
    const dispatch = useDispatch()

    const handleChange = (e, method) => {
        method(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const user = {
            name: name,
            email: email,
            password: password,
            phone: phone
        }
        axios.post(`/api/register`, user)
            .then(res => {
                // show toast
                toast.success(res.data.message, {
                    position: "top-right",
                    className: 'success-toast',
                    autoClose: 8000,
                    closeButton: false,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                dispatch(hideRegisterModal())
            })
            .catch(err => setFormError(err.response.data.message))
    }

    return (
        <form className="flex-col" onSubmit={handleSubmit}>
            <div className="flex items-center">
                <div className="text-md text-white bg-indigo-600 p-2 rounded-l border-indigo-600 border">
                    <FontAwesomeIcon icon="user"/></div>
                <input type="text"
                       placeholder="Nume"
                       className="rounded-r flex w-full border border-gray-300 p-2 outline-none focus:border-indigo-600 text-indigo-800 transition-all duration-200"
                       required name="name" value={name}
                       onChange={(e) => handleChange(e, setName)}/>
            </div>
            <div className="flex items-center mt-6">
                <div className="text-md text-white bg-indigo-600 p-2 rounded-l border-indigo-600 border">
                    <FontAwesomeIcon icon="envelope"/></div>
                <input type="text"
                       placeholder="Email"
                       className="rounded-r flex w-full border border-gray-300 p-2 outline-none focus:border-indigo-600 text-indigo-800 transition-all duration-200"
                       required name="email" value={email}
                       onChange={(e) => handleChange(e, setEmail)}/>
            </div>
            <div className="flex items-center mt-6">
                <div className="text-md text-white bg-indigo-600 p-2 rounded-l border-indigo-600 border">
                    <FontAwesomeIcon icon="phone-alt"/></div>
                <input type="text"
                       placeholder="Număr de telefon"
                       className="rounded-r flex w-full border border-gray-300 p-2 outline-none focus:border-indigo-600 text-indigo-800 transition-all duration-200"
                       required name="phone" value={phone}
                       onChange={(e) => handleChange(e, setPhone)}/>
            </div>
            <div className="flex mt-6">
                <div className="text-md text-white bg-indigo-600 p-2 rounded-l border-indigo-600 border">
                    <FontAwesomeIcon icon="lock"/></div>
                <input type="password"
                       placeholder="Parolă"
                       className="rounded-r flex w-full border border-gray-300 p-2 outline-none focus:border-indigo-600 text-indigo-800 transition-all duration-200"
                       required name="password" value={password}
                       onChange={(e) => handleChange(e, setPassword)}/>
            </div>
            {formError &&
            <div className="mt-4 p-1 bg-red-200 border border-red-400 rounded text-xs text-red-600">{formError}</div>}
            <div className="mt-4 w-mxc text-sm text-gray-500">
                Ai deja cont? <span
                className="cursor-pointer transition-all duration-200 hover:text-indigo-500 text-indigo-600"
                onClick={(e) => dispatch(showLoginModal())}>Autentifică-te</span>
            </div>
            <input type="submit" value="Înregistrare"
                   className="rounded w-full mt-8 py-2 px-4 bg-indigo-600 hover:bg-indigo-500 text-white transition-all duration-200 cursor-pointer"/>
        </form>
    )
}

export default Register