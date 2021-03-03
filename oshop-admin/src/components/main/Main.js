import React from "react";
import {Route, Switch} from 'react-router-dom'
import styles from './Main.module.css'
import Products from "../items/products/Products";
import Sections from "../items/sections/Sections";
import Categories from "../items/categories/Categories";
import Orders from "../notifications/orders/Orders";
import Payments from "../notifications/payments/Payments";
import Emails from "../notifications/emails/Emails";
import Admins from "../management/Admins";
import Organizations from "../management/Organizations";
import Users from "../management/Users";
import Dashboard from "../Dashboard";

const Main = () => {
    return (
        <div className={styles.main_container}>
            <Switch>
                {/*Overview*/}
                <Route path={'/'} exact component={Dashboard}/>
                {/*Overview*/}
                {/*Management*/}
                <Route path={'/admins'} component={Admins}/>
                <Route path={'/organizations'} component={Organizations}/>
                <Route path={'/users'} component={Users}/>
                {/*Management*/}
                {/*Items*/}
                <Route path={'/sections'} component={Sections}/>
                <Route path={'/categories'} component={Categories}/>
                <Route path={'/products'} component={Products}/>
                {/*Items*/}
                {/*Notifications*/}
                <Route path={'/orders'} component={Orders}/>
                <Route path={'/payments'} component={Payments}/>
                <Route path={'/emails'} component={Emails}/>
                {/*Notifications*/}
            </Switch>
        </div>
    )
}

export default Main