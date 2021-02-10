import '../styles/globals.css'
import Layout from "../components/Layout";
import {wrapper} from "../redux/store";
import buildClient from "../network/build-client";
import {useDispatch, useSelector} from "react-redux";
import _ from 'lodash'
import {authSuccess} from "../redux/actions/authActions";

const AppComponent = ({Component, pageProps, userInfo}) => {
    // console.log(userInfo)
    const dispatch = useDispatch()

    const {user} = useSelector(state => state.user)
    if (_.isEmpty(user) && !_.isEmpty(userInfo)){
        dispatch(authSuccess(userInfo))
    }
    // switch (user) {
    //     case !_.isEmpty(userInfo):
    //         return console.log('user is not null')
    //         // dispatch(authSuccess(userInfo))
    //     case !_.isEmpty(user):
    //         // dispatch(authSuccess(user))
    // }
    return (
        <Layout>
            <Component{...pageProps}/>
            {/*<Component user={userInfo} {...pageProps}/>*/}
        </Layout>
    )
}

AppComponent.getInitialProps = async appContext => {
    const client = buildClient(appContext.ctx)

    try {
        const {data} = await client.get('/users/current', {withCredentials: true, credentials: 'include'})
        let pageProps = {}
        if (appContext.Component.getInitialProps) {
            pageProps = await appContext.Component.getInitialProps(appContext.ctx, client, data)
        }
        return {pageProps, userInfo: {...data}}
    } catch (e) {
        console.log('User not logged in')
    }
}

export default wrapper.withRedux(AppComponent)
