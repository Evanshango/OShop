import '../styles/globals.css'
import Layout from "../components/Layout";
import {wrapper} from "../redux/store";
import buildClient from "../network/build-client";
import {useDispatch, useSelector} from "react-redux";
import _ from 'lodash'
import {authSuccess} from "../redux/actions/authActions";

const AppComponent = ({Component, pageProps, userInfo}) => {
    const dispatch = useDispatch()

    const {user} = useSelector(state => state.user)
    if (_.isEmpty(user)){
        dispatch(authSuccess(userInfo))
    }
    return (
        <Layout>
            <Component user={userInfo} {...pageProps}/>
        </Layout>
    )
}

AppComponent.getInitialProps = async appContext => {
    const client = buildClient(appContext.ctx)
    const {data} = await client.get('/users/current', {withCredentials: true, credentials: 'include'})
    let pageProps = {}
    if (appContext.Component.getInitialProps) {
        pageProps = await appContext.Component.getInitialProps(appContext.ctx, client, data)
    }
    return {pageProps, userInfo: {...data}}
}

export default wrapper.withRedux(AppComponent)
