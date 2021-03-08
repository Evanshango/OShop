import '../styles/globals.css'
import Layout from "../components/Layout";
import {wrapper} from "../redux/store";
import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {fetchCartItems, fetchProducts, fetchSections} from "./api";
import axios from "axios";
import jwtDecode from "jwt-decode";
import store from "../../oshop-admin/src/redux/store";
import {AUTH} from "../../oshop-admin/src/redux/types";

const AppComponent = ({Component, pageProps}) => {
    const dispatch = useDispatch()
    const [user, setUser] = useState({})

    useEffect(() => {
        const token = sessionStorage.getItem('oshop')

        if (token) {
            const decodedTkn = jwtDecode(token.split(' ')[1])
            if (decodedTkn.exp * 1000 < Date.now()) {
                sessionStorage.removeItem('oshop')
                delete axios.defaults.headers['common']['Authorization']
            } else {
                store.dispatch({
                    type: AUTH.AUTH_SUCCESS,
                    payload: token
                })
                axios.defaults.headers['common']['Authorization'] = token

                const {email, id, role} = decodedTkn

                userProperties({email, id, role})
            }
        }
        dispatch(fetchSections())
        dispatch(fetchProducts())
        user.id !== '' && dispatch(fetchCartItems(user.id))
    }, [])

    const userProperties = decoded => setUser(decoded)

    return (
        <Layout>
            <Component user={user}{...pageProps}/>
        </Layout>
    )
}

export default wrapper.withRedux(AppComponent)
