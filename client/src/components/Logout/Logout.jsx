import { UserState } from "../../context/user.context";
import api from '../../api/api'
import { headersToken } from "../../utils/utils";
import { useNavigate } from "react-router-dom";


const Logout = () => {
    const [user, setUser] = UserState();
    const navigate = useNavigate()
    const logOut = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await api.post('/users/logout', headersToken(token));
            localStorage.removeItem('token');
            setUser(null);
            navigate('/');
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            {user && <button onClick={e => logOut(e)}>LogOut</button>}
        </>
    )
}
export default Logout;