import { UserState } from "../../context/user.context";
import api from '../../api/api'
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import './sign-in.css'

const SignIn = () => {
    const [user, setUser] = UserState();
    const navigate = useNavigate();

    const login = async (e) => { //o@rr.i 123
        e.preventDefault();
        let password = e.target.parentElement.children[4].value;
        let email = e.target.parentElement.children[2].value;
        const userLogin = {
            email,
            password
        }
        try {
            const { data } = await api.post('/users/login', userLogin);
            const token = await data.token
            setUser(data);
            localStorage.setItem('token', token);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(()=> {
        if (user && user.token) {
            navigate('/')
        } // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    return (
        <div className='sign-in-container'>
            <h2>Sign In</h2>
            <label htmlFor="email">Email: </label>
            <input id='email' />
            <label htmlFor="password">Password: </label>
            <input id='password' />
            <button onClick={(e) => login(e)}>Submit</button>
            {user && !user.token && <div className='error-message'>{Object.values(user)[0]}</div>}
            <div>Not registered yet? <Link to="/sign-up">Create an Account</Link></div>
        </div>
    )
}
export default SignIn;