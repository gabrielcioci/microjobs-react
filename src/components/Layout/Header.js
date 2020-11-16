import React, {useState} from 'react'
import {Link} from 'react-router-dom';
import logo from '../../assets/images/mjobs.svg'
import Modal from "../Modal/Modal";
import {connect, useDispatch} from "react-redux";
import {showLoginModal, hideLoginModal, hideRegisterModal, showLogoutModal, hideLogoutModal} from "../../store/actions";
import Login from "../Modal/Login";
import Register from "../Modal/Register";
import Logout from "../Modal/Logout";

const Header = (props) => {
    const {loginModal, registerModal, logoutModal} = props.modals
    const {user} = props
    const dispatch = useDispatch()

    return (
        <nav className="flex items-center bg-white shadow-sm px-6 lg:px-8 xl:px-12 py-2 xl:py-4">
            <Link to="/" className="text-2xl text-gray-900 flex items-center"><img src={logo} alt="logo"
                                                                                   className="logo mr-4"/>MicroJobs</Link>
            <ul className="flex ml-auto">
                <li className="text-gray-700 hover:text-indigo-500 transition-all duration-200">
                    <Link to="/" className="nav-link">Joburi</Link>
                </li>
                {user && user.role === 'professional' ?
                    <li className="text-gray-700 ml-4 hover:text-indigo-500 transition-all duration-200">
                        <Link to="/review-tool" className="nav-link">Review tool</Link>
                    </li> : null}
                <li className="text-gray-700 ml-4 hover:text-indigo-500 cursor-pointer transition-all duration-200">
                    {user ? <div className="nav-link" onClick={(e) => dispatch(showLogoutModal())}>Deconectare</div> :
                        <div className="nav-link"
                             onClick={(e) => dispatch(showLoginModal())}>Autentificare</div>}
                </li>
            </ul>
            {loginModal && <Modal title="Autentificare" closeAction={hideLoginModal}><Login/></Modal>}
            {registerModal && <Modal title="Înregistrare" closeAction={hideRegisterModal}><Register/></Modal>}
            {logoutModal && <Modal title="Deconectare" closeAction={hideLogoutModal}><Logout/></Modal>}
        </nav>
    )
}

const mapStateToProps = (state) => ({
    modals: state.modals,
    user: state.auth.user
})

export default connect(mapStateToProps)(Header)