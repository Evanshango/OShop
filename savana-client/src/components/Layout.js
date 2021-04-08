import React from 'react';
import './../App.css'
import {Route, Switch} from "react-router-dom";
import Home from "../pages/home/home";
import Products from "../pages/products/products";
import Account from "../pages/account/account";
import Cart from "../pages/cart/cart";
import Checkout from "../pages/checkout/checkout";
import Product from "../pages/product-info/product";

function Layout() {
    return (
        <Switch>
            <Route path={'/'} exact component={Home}/>
            <Route path={'/products/:id'} exact component={Product}/>
            <Route exact path={'/page/:pageNumber'} component={Products}/>
            <Route path={'/products'} component={Products}/>
            <Route path={'/account'} component={Account}/>
            <Route path={'/cart'} component={Cart}/>
            <Route path={'/checkout'} component={Checkout}/>
        </Switch>
    );
}

export default Layout;