import React, {useEffect} from 'react'
import axios from "axios";
import {login} from "../../store/actions";
import {useCookies} from "react-cookie";
import {useDispatch, connect} from "react-redux";
import Header from "./Header";
import Footer from "./Footer";


const Page = props => {
    const [cookies, setCookie] = useCookies(['token']);
    const dispatch = useDispatch()

    useEffect(() => {
        const headers = {}
        // Check for token
        if (!cookies.token) return
        headers['X-AUTH-TOKEN'] = cookies.token
        // Get user info based on token
        axios.get(`${process.env.REACT_APP_API_URL}/api/auth/user`, {headers})
            .then(res => {
                dispatch(login(res.data))
            })
    }, [])
    return (
        <>
            {!props.hideHeader && <Header/>}
            <div className="container mx-auto px-4 md:px-0">
                {props.children}
            </div>
            {!props.hideFooter && <Footer/>}
        </>
    )
}

const mapStateToProps = (state) => ({
    user: state.auth.user
})

export default connect(mapStateToProps)(Page)