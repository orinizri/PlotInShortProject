import { UserState } from "../../context/user.context";
import api from '../../api/api'
import './sign-up.css';
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const [user, setUser] = UserState();
    const navigate = useNavigate();

    const signUp = async (e) => { //o@r.iiiiii computer
        e.preventDefault();
        console.log(e)
        let name = e.target.parentElement.children[2].value;
        let email = e.target.parentElement.children[4].value;
        let password = e.target.parentElement.children[6].value;
        const userSignUp = {
            name,
            email,
            password
        }
        try {
            const user = await api.post('/users', userSignUp);
            const token = await user.data.token
            setUser(user.data);
            console.log(user)
            localStorage.setItem('token', token);
            navigate('/')
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <div className='sign-up-container'>
            <h2>Create an Account</h2>
            <h3>Keep your favorite graphs in one place.</h3>
            <label htmlFor='name'>Name: </label>
            <input id='name' />
            <label htmlFor='email'>Email: </label>
            <input id='email' />
            <label htmlFor='password'>Password: </label>
            <input id='password' />
            <button onClick={e => signUp(e)}>Create Account</button>
        </div>
    )
}
export default SignUp;