import React from 'react'
import {logout, hideLogoutModal} from "../../store/actions";
import {useDispatch} from "react-redux";
import {useCookies} from "react-cookie";

const Logout = props => {
    const dispatch = useDispatch()
    const [cookies, setCookie, removeCookie] = useCookies(['token'])

    const handleLogout = () => {
        dispatch(logout())
        removeCookie('token')
        dispatch(hideLogoutModal())
        props.setMenu(false)
    }

    return (
        <div className="flex-col">
            <div className="text-gray-600">Esti sigur că vrei să te deconectezi?</div>
            <div onClick={(e) => handleLogout(e)}
                 className="rounded w-full text-center mt-8 py-2 px-4 bg-gray-200 hover:bg-gray-300 hover:text-gray-600 text-gray-500 transition-all duration-200 cursor-pointer">Deconectează-te
            </div>
        </div>
    )
}

export default Logout