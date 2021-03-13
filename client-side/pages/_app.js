import '../styles/globals.css'
import Layout from "../components/Layout";
import {wrapper} from "../redux/store";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {fetchCartItems, fetchProducts, fetchSections, setAuthenticationHeader, updateCart, uploadCart} from "./api";
import axios from "axios";
import jwtDecode from "jwt-decode";
import {authSuccess} from "../redux/auth/authActions";
import _ from 'lodash'

const AppComponent = ({Component, pageProps}) => {
    const dispatch = useDispatch()
    const [user, setUser] = useState({})

    const {products: cart} = useSelector(state => state.cart)
    const {token} = useSelector(state => state.user)

    useEffect(() => {
        dispatch(updateCart())
    }, [])

    useEffect(() => {
        if (token) {
            setDecodeToken(token)
            dispatch(fetchCartItems())
            !_.isEmpty(cart) && dispatch(uploadCart(cart))
        } else {
            const storedToken = sessionStorage.getItem('oshop')
            setDecodeToken(storedToken && storedToken.split(' ')[1])
        }
        dispatch(fetchSections())
        dispatch(fetchProducts())
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
