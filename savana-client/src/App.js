import './App.css';
import {useEffect} from "react";
import jwtDecode from "jwt-decode";
import Content from "./components/Content";
import {BrowserRouter as Router} from "react-router-dom";
import {useDispatch} from "react-redux";
import {fetchCategories, fetchOffers, fetchSections, setAuthenticationHeader, signOut, updateCart,} from "./api";
import {authSuccess} from "./redux/auth/authActions";
import ScrollToTop from "./components/ScrollToTop";

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(updateCart())
    }, [dispatch])

    useEffect(() => {
        const existingToken = sessionStorage.getItem('savana')

        if (existingToken) {
            const token = existingToken.split(' ')[1]
            const decodedToken = jwtDecode(token)
            if (decodedToken.exp * 1000 < Date.now()) {
                dispatch(signOut())
            } else {
                dispatch(authSuccess({token}))
                setAuthenticationHeader(token)
            }
        }
    }, [dispatch])

    useEffect(() => {
        dispatch(fetchSections())
        dispatch(fetchCategories())
        dispatch(fetchOffers())
    }, [dispatch])

    return (
        <Router>
            <ScrollToTop/>
            <Content/>
        </Router>
    );
}

export default App;
