import './App.css';
import {BrowserRouter as Router} from "react-router-dom";
import Content from "./components/Content";
import Signin from "./components/Signin";
import {useSelector} from "react-redux";
import jwtDecode from "jwt-decode"
import axios from "axios";
import store from "./redux/store";
import {AUTH} from "./redux/types";
import {useEffect, useState} from "react";
import ScrollToTop from "./components/ScrollToTop";

function App() {

    const [user, setUser] = useState({})
    const token = useSelector(state => state.user.token)

    useEffect(() => {
        const existingToken = sessionStorage.getItem('savana')

        if (existingToken) {
            const decodedToken = jwtDecode(existingToken.split(' ')[1])
            if (decodedToken.exp * 1000 < Date.now()) {
                sessionStorage.removeItem('savana')
                delete axios.defaults.headers['common']['Authorization']
            } else {
                store.dispatch({
                    type: AUTH.AUTH_SUCCESS,
                    payload: existingToken
                })
                axios.defaults.headers['common']['Authorization'] = existingToken

                const {email, id, role, name} = decodedToken

                userProps({email, id, role, name})
            }
        }
    }, [token])

    const userProps = decodeToken => setUser(decodeToken)

    return (
        <Router>
            <ScrollToTop/>
            {!token ? (
                <Signin/>
            ) : (
                <Content user={user}/>
            )}
        </Router>
    );
}

export default App;
