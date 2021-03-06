import React from 'react'
import './../App.css'
import {Route, Switch} from "react-router-dom"
import Home from "../pages/home/home"
import Products from "../pages/products/products"
import Account from "../pages/account/account"
import Cart from "../pages/cart/cart"
import Checkout from "../pages/checkout/checkout"
import ProductInfo from "../pages/product-info/productInfo"
import Activate from "../pages/account/activate"
import Signin from "../pages/authenitication/Signin";

function Layout() {
    return (
        <Switch>
            <Route path={'/'} exact component={Home}/>
            <Route path={'/products/:id'} exact component={ProductInfo}/>
            <Route exact path={'/page/:pageNumber'} component={Products}/>
            <Route path={'/products'} component={Products}/>
            <Route path={'/account/activate/:token'} component={Activate}/>
            <Route path={'/account'} component={Account}/>
            <Route path={'/cart'} component={Cart}/>
            <Route path={'/checkout'} component={Checkout}/>
            <Route path={'/signin'} component={Signin}/>
        </Switch>
    )
}

export default Layout
