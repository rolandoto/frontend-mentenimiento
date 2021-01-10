import React from 'react';
import { Navbar } from '../components/organisms'

export const MainLayout = props => (
    <>
        <Navbar />
        {props.children}
    </>
)