import React from 'react';
import Header from '../Shared/Header/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../Shared/Footer/Footer';
import { Toaster } from 'react-hot-toast';
import useLocalStorage from 'use-local-storage'

const Main = () => {

    const [theme, setTheme] = useLocalStorage('theme' ? 'dark' : 'light')

    const switchTheme = () => {
      const newTheme = theme === 'light' ? 'dark' : 'light';
      setTheme(newTheme)
    }


    return (
        <div data-theme={theme} style={{height: "100%"}}>
            <Toaster/>
            <Header switchTheme={switchTheme} theme={theme}/>
            
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default Main;