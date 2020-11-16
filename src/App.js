import React from 'react'
import './components/FontAwesome/FontAwesome'
import {BrowserRouter as Router, Route} from "react-router-dom"
import Activation from "./components/Activation"
import JobsList from "./components/JobsList"
import {Provider} from 'react-redux';
import store from './store/store'
import {ToastContainer} from "react-toastify";
import Review from "./components/Review";

function App() {
    return (
        <Provider store={store}>
            <Router>
                <ToastContainer/>
                <Route path="/" exact component={JobsList}/>
                <Route path="/activation/user/:id" exact component={Activation}/>
                <Route path="/review-tool" exact component={Review}/>
            </Router>
        </Provider>
    );
}

export default App;
