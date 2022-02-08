import React from 'react';
import './main.css'
import About from '../About/About'
import { Routes, Route } from "react-router-dom";


const Main = () => {
    return (
        <div className="main-container">
            <Routes>
                <Route path='/' element={<About />} />
            </Routes>
        </div>
    )
}
export default Main;