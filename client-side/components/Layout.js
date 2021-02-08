import Head from "next/head";
import NavBar from "./nav/NavBar";
import styles from './Layout.module.css'

const Layout = ({children}) => {
    return (
        // <div style="background-image: url('http://www.mypicx.com/uploadimg/1312875436_05012011_2.png')"></div>
        // <div style={{backgroundImage: `url('/img_9.jpg')`}}>
        <>
            <Head>
                <title>OSHOP</title>
                <link rel="icon" href={'/fav.png'}/>
            </Head>
            <NavBar/>
            <main className={styles.main_container}>
                {children}
            </main>
        </>
    );
}

export default Layout;