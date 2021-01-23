import React, {useState} from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from 'axios'
import GoogleLogin from 'react-google-login'
import {hideLoginModal, login, showRegisterModal} from "../../store/actions";
import {useDispatch} from "react-redux";
import {useCookies} from "react-cookie";
import google from "../../assets/images/google.svg"
import {toast} from "react-toastify";


const Login = props => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [formError, setFormError] = useState(null)
    const dispatch = useDispatch()
    const [cookies, setCookie] = useCookies(['token']);

    const handleChange = (e, method) => {
        method(e.target.value)
    }

    const handleLogin = (res) => {
        dispatch(login(res.data))
        setCookie("token", res.data.token, {path: "/"});
        dispatch(hideLoginModal())
        props.setMenu(false)
        toast.success(`Bun venit, ${res.data.name}!`, {
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
    }

    const handleGoogleResponse = res => {
        axios.post(`${process.env.REACT_APP_API_URL}/api/auth/googlelogin`, {tokenId: res.tokenId})
            .then(res => {
                handleLogin(res)
            })
            .catch(err => setFormError(err.response.data.message))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const credentials = {
            email: email,
            password: password
        }
        axios.post(`${process.env.REACT_APP_API_URL}/api/auth`, credentials)
            .then(res => {
                handleLogin(res)
            })
            .catch(err => setFormError(err.response.data.message))
    }

    return (
        <div>
            <GoogleLogin clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                         onSuccess={handleGoogleResponse}
                         onFailure={handleGoogleResponse} cookiePolicy={'single_host_origin'}
                         className="w-full flex-row items-center justify-center google-login"
                         render={renderProps => (
                             <button className="w-full flex items-center justify-center shadow py-3 text-sm text-gray-600 hover:text-gray-700 transition-all duration-200" onClick={renderProps.onClick} disabled={renderProps.disabled}><img className="w-4 mr-4" src={google} alt="google-logo"/>Autentificare cu Google</button>
                         )}
            />
            <div className="mt-4 flex justify-center w-full text-sm text-gray-500">sau</div>
            <form className="flex-col" onSubmit={handleSubmit}>
                <div className="flex mt-4 items-center">
                    <div className="text-md text-white bg-indigo-600 p-2 rounded-l border-indigo-600 border">
                        <FontAwesomeIcon icon="envelope"/></div>
                    <input type="text"
                           placeholder="Email"
                           className="rounded-r flex w-full border border-gray-300 p-2 outline-none focus:border-indigo-600 text-indigo-800 transition-all duration-200"
                           required name="email" value={email}
                           onChange={(e) => handleChange(e, setEmail)}/>
                </div>
                <div className="flex mt-4">
                    <div className="text-md text-white bg-indigo-600 p-2 rounded-l border-indigo-600 border">
                        <FontAwesomeIcon icon="lock"/></div>
                    <input type="password"
                           placeholder="Parolă"
                           className="rounded-r flex w-full border border-gray-300 p-2 outline-none focus:border-indigo-600 text-indigo-800 transition-all duration-200"
                           required name="password" value={password}
                           onChange={(e) => handleChange(e, setPassword)}/>
                </div>
                {formError &&
                <div
                    className="mt-4 p-1 bg-red-200 border border-red-400 rounded text-xs text-red-600">{formError}</div>}
                <div className="mt-4 w-mxc text-sm text-gray-500">
                    Nu ai cont? <span
                    className="cursor-pointer transition-all duration-200 hover:text-indigo-500 text-indigo-600"
                    onClick={(e) => dispatch(showRegisterModal())}>Înregistrează-te</span>
                </div>
                <input type="submit" value="Autentificare"
                       className="rounded w-full mt-8 py-2 px-4 bg-indigo-600 hover:bg-indigo-500 text-white transition-all duration-200 cursor-pointer"/>
            </form>
        </div>
    )
}

export default Login