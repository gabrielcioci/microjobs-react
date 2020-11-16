import React from 'react'
import {connect} from "react-redux";
import Page from "./Page";

const AdminPage = props => {
    return (
        <Page>
            {props.user && props.user.role === 'professional' ? props.children : ''}
        </Page>
    )
}

const mapStateToProps = (state) => ({
    user: state.auth.user
})

export default connect(mapStateToProps)(AdminPage)