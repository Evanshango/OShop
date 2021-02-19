import Head from "next/head";
import Footer from "./footer/Footer";
import NavBar from "./nav/NavBar";

const Layout = ({children}) => {
    return (
        <>
            <Head>
                <title>OSHOP</title>
                <link rel="icon" href={'/favicon.png'}/>
            </Head>
            <NavBar/>
            {children}
            <Footer/>
        </>
    );
}

export default Layout;