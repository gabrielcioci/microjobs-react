import React from 'react'
import {connect} from "react-redux";
import Page from "./Page";

const UserPage = props => {
    return (
        <Page>
            {props.user ? props.children : ''}
        </Page>
    )
}

const mapStateToProps = (state) => ({
    user: state.auth.user
})

export default connect(mapStateToProps)(UserPage)