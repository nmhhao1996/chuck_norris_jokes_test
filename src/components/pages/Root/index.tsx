import React from 'react';
import { Outlet } from 'react-router-dom';
import Banner from '../../ui/Banner';
import NavBar from '../../ui/NavBar';
import Footer from '../../ui/Footer';

const Root: React.FC = () => {
    return (
        <>
            <NavBar />
            <Banner />
            <Outlet />
            <Footer />
        </>
    );
};

export default Root;
