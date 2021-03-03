import React, {useEffect, useState} from 'react';
import Navbar from "./navbar/Navbar";
import Sidebar from "./sidebar/Sidebar";
import Main from "./main/Main";
import {useDispatch} from "react-redux";
import {fetchCategories, fetchProducts, fetchSections} from "../api";

function Content() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const dispatch = useDispatch()

    const hideSidebarOnResize = () => setSidebarOpen(false)

    useEffect(() => {
        dispatch(fetchSections())
        dispatch(fetchCategories())
        dispatch(fetchProducts())
        hideSidebarOnResize()
        window.addEventListener('resize', hideSidebarOnResize)
        return () => {
            window.removeEventListener('resize', hideSidebarOnResize)
        }
    }, [])

    const openSidebar = () => {
        setSidebarOpen(true)
    }

    const closeSidebar = () => {
        setSidebarOpen(false)
    }

    return (
        <div className='container'>
            <Navbar openSidebar={openSidebar} sidebarOpen={sidebarOpen}/>
            <Main/>
            <Sidebar closeSidebar={closeSidebar} sidebarOpen={sidebarOpen}/>
        </div>
    );
}

export default Content;