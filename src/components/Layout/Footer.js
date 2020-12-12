import React, {useState} from 'react'
import {connect, useDispatch} from "react-redux";
import Modal from "../Modal/Modal";
import {hideSupportModal, showSupportModal} from "../../store/actions";
import Support from "../Modal/Support";

const Footer = (props) => {
    const {user} = props
    const {supportModal} = props.modals
    const dispatch = useDispatch()

    return (
        <div
            className="mt-auto footer py-2 mx-4 flex flex-col items-center ml-auto mr-auto w-full text-sm text-gray-500">
            <p className="text-center">Copyright © 2020 Microjobs România. Toate drepturile rezervate.</p>
            <div className="links flex underline cursor-pointer items-center">
                <p>Termeni și condiții</p>
                <p className="ml-2" onClick={(e) => dispatch(showSupportModal())}>Suport</p>
            </div>
            {supportModal && <Modal title="Tichet de suport" closeAction={hideSupportModal}><Support/></Modal>}
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    modals: state.modals,
})

export default connect(mapStateToProps)(Footer)