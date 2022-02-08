import { UserState } from "../../context/user.context";
import api from '../../api/api'
import { useNavigate } from "react-router-dom";


const SignIn = () => {
    const [user, setUser] = UserState();

    const navigate = useNavigate()

    const login = async (e) => { //o@r.iiiiiicomputer
        e.preventDefault();
        let password = e.target.previousElementSibling.value
        let email = e.target.parentElement.children[1].value
        const userLogin = {
            email,
            password
        }
        try {
            const user = await api.post('/users/login', userLogin);
            const token = await user.data.token
            console.log(user.data)
            setUser(user.data);
            localStorage.setItem('token', token);
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='sign-in-container'>
            <label htmlFor="email">Email: </label>
            <input id='email'/>
            <label htmlFor="password">Password: </label>
            <input id='password'/>
            <button onClick={e=> login(e)}>Submit</button>
        </div>
    )
}
export default SignIn;