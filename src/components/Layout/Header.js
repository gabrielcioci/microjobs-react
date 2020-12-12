import React, {useState} from 'react'
import {Link} from 'react-router-dom';
import logo from '../../assets/images/mjobs.svg'
import Modal from "../Modal/Modal";
import {connect, useDispatch} from "react-redux";
import {
    showLoginModal,
    hideLoginModal,
    hideRegisterModal,
    showLogoutModal,
    hideLogoutModal, storeJobs
} from "../../store/actions";
import Login from "../Modal/Login";
import Register from "../Modal/Register";
import Logout from "../Modal/Logout";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import SearchInput from "../SearchInput";

const Header = (props) => {
    const {loginModal, registerModal, logoutModal} = props.modals
    const [menu, setMenu] = useState(false)
    const {user} = props
    const dispatch = useDispatch()

    return (
        <nav className="flex items-center bg-white shadow-sm px-4 md:px-8 lg:px-12 py-2">
            <Link to="/" className="text-xl md:text-2xl text-gray-900 flex items-center"><img src={logo} alt="logo"
                                                                                              className="logo mr-4"/><span
                className="md:hidden lg:flex">MicroJobs</span></Link>
            <SearchInput
                className="hidden md:flex ml-0 bg-gray-100 w-3/4 items-center border border-gray-300 rounded px-2 py-1 md:ml-5 md:w-2/4 lg:w-1/3 xl:ml-32"
                elementClass="job" inputClass="bg-gray-100"/>
            <FontAwesomeIcon icon="bars" onClick={(e) => setMenu(true)}
                             className="flex md:hidden ml-auto text-gray-700 cursor-pointer"/>
            <ul className={`hidden relative md:flex ml-auto ${menu && 'mobile-menu'}`}>
                {menu && <FontAwesomeIcon icon="times" onClick={(e) => setMenu(false)}
                                          className="absolute top-0 mt-3 text-lg right-0 mr-4 md:hidden text-gray-700 cursor-pointer"/>}
                <li className="text-gray-700 hover:text-indigo-500 transition-all duration-200">
                    <Link to="/" className="nav-link">Joburi</Link>
                </li>
                {user && user.role === 'professional' &&
                <li className="text-gray-700 md:ml-4 hover:text-indigo-500 transition-all duration-200">
                    <Link to="/review-tool" className="nav-link">Review tool</Link>
                </li>}
                <li className="text-gray-700 md:ml-4 hover:text-indigo-500 cursor-pointer transition-all duration-200">
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