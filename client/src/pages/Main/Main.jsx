import React from 'react';
import './main.css'
import About from '../About/About'
import Header from '../../components/Header/Header'
import { Routes, Route } from "react-router-dom";


const Main = () => {
    return (
        <div className="main-container">
            <Routes>
                <Route path='/' element={
                <>
                <Header/>
                <About />
                </>
                } />
            </Routes>
        </div>
    )
}
export default Main;