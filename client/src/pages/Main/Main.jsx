import React from 'react';
import './main.css'
import About from '../About/About'
import Header from '../../components/Header/Header'
import { Routes, Route } from "react-router-dom";
import SignUp from '../../components/SignUp/SignUp';
import SignIn from '../../components/SignIn/SignIn';
import Profile from '../Profile/Profile';


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
                <Route path='/sign-up' element={
                <>
                <Header/>
                <SignUp />
                </>
                } />
                <Route path='/sign-in' element={
                <>
                <Header/>
                <SignIn />
                </>
                } />
                <Route path='/profile' element={
                <>
                <Header/>
                <Profile />
                </>
                } />
            </Routes>
        </div>
    )
}
export default Main;