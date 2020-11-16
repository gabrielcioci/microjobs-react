import React, {useState} from 'react'
import {Link} from 'react-router-dom';
import logo from '../../assets/images/mjobs.svg'
import {connect, useDispatch} from "react-redux";

const Footer = (props) => {
    const {user} = props
    const dispatch = useDispatch()

    return (
        <div className="mt-auto footer mb-2 flex items-center">
            <p className="text-sm text-gray-500 ml-auto mr-auto">Copyright © 2020 Microjobs România. Toate drepturile rezervate.</p>
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.auth.user
})

export default connect(mapStateToProps)(Footer)