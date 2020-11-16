import React, {useState} from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from 'axios'
import {hideLoginModal, login, showRegisterModal} from "../../store/actions";
import {useDispatch} from "react-redux";
import {useCookies} from "react-cookie";


const Login = props => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [formError, setFormError] = useState(null)
    const dispatch = useDispatch()
    const [cookies, setCookie] = useCookies(['token']);

    const handleChange = (e, method) => {
        method(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const credentials = {
            email: email,
            password: password
        }
        axios.post(`/api/auth`, credentials)
            .then(res => {
                dispatch(login(res.data))
                setCookie("token", res.data.token, {path: "/"});
                dispatch(hideLoginModal())
            })
            .catch(err => setFormError(err.response.data.message))

    }

    return (
        <form className="flex-col" onSubmit={handleSubmit}>
            <div className="flex items-center">
                <div className="text-md text-white bg-indigo-600 p-2 rounded-l border-indigo-600 border">
                    <FontAwesomeIcon icon="envelope"/></div>
                <input type="text"
                       placeholder="Email"
                       className="rounded-r flex w-full border border-gray-300 p-2 outline-none focus:border-indigo-600 text-indigo-800 transition-all duration-200"
                       required name="email" value={email}
                       onChange={(e) => handleChange(e, setEmail)}/>
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
                Nu ai cont? <span
                className="cursor-pointer transition-all duration-200 hover:text-indigo-500 text-indigo-600"
                onClick={(e) => dispatch(showRegisterModal())}>Înregistrează-te</span>
            </div>
            <input type="submit" value="Autentificare"
                   className="rounded w-full mt-8 py-2 px-4 bg-indigo-600 hover:bg-indigo-500 text-white transition-all duration-200 cursor-pointer"/>
        </form>
    )
}

export default Login