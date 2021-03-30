import React, {useEffect} from 'react';
import Navbar from "./nav/Navbar";
import Footer from "./footer/Footer";
import Layout from "./Layout";
import {useDispatch, useSelector} from "react-redux";
import {addCheckOutParam, fetchCartItems, fetchOrderItems, fetchUser, fetchUserAddresses} from "../api";

function Content() {
    const dispatch = useDispatch()
    const {token} = useSelector(state => state.auth)

    useEffect(() => {
        if (token) {
            dispatch(fetchUserAddresses())
            dispatch(fetchCartItems())
            dispatch(fetchOrderItems())
            dispatch(fetchUser())
        }
    }, [token, dispatch])

    useEffect(() => {
        token && dispatch(addCheckOutParam({signedIn: 'signedIn', address: '', payment: ''}))
    }, [token, dispatch])

    return (
        <>
            <Navbar/>
            <Layout/>
            <Footer/>
        </>
    );
}

export default Content;