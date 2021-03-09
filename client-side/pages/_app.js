import '../styles/globals.css'
import Layout from "../components/Layout";
import {wrapper} from "../redux/store";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {fetchCartItems, fetchProducts, fetchSections, setAuthenticationHeader} from "./api";
import axios from "axios";
import jwtDecode from "jwt-decode";
import {authSuccess} from "../redux/auth/authActions";

const AppComponent = ({Component, pageProps}) => {
    const dispatch = useDispatch()
    const [user, setUser] = useState({})

    const {token} = useSelector(state => state.user)

    useEffect(() => {
        if (token) {
            setDecodeToken(token)
        } else {
            const storedToken = sessionStorage.getItem('oshop')
            setDecodeToken(storedToken && storedToken.split(' ')[1])
        }
        dispatch(fetchSections())
        dispatch(fetchProducts())

        token && dispatch(fetchCartItems(user.id))
    }, [token])

    const setDecodeToken = token => {
        const decoded = token && jwtDecode(token)
        if (decoded) {
            if (decoded.exp * 1000 < Date.now()) {
                sessionStorage.removeItem('oshop')
                delete axios.defaults.headers['common']['Authorization']
            } else {
                dispatch(authSuccess(token))
                setAuthenticationHeader(token)
                const {email, id, role} = decoded
                setUser({email, id, role})
            }
        }
    }

    return (
        <Layout>
            <Component user={user}{...pageProps}/>
        </Layout>
    )
}

export default wrapper.withRedux(AppComponent)
