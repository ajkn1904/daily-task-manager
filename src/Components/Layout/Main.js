import React from 'react';
import Header from '../Shared/Header/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../Shared/Footer/Footer';
import { Toaster } from 'react-hot-toast';

const Main = () => {
    return (
        <div>
            <Toaster/>
            <Header/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default Main;