import { UserState } from '../../context/user.context';
import { Link } from "react-router-dom";
import { headersToken } from "../../utils/utils";
import api from '../../api/api';
import { useEffect } from 'react';
import Logout from '../Logout/Logout';



function Header() {
    const [user, setUser] = UserState();
    
    useEffect(()=>{
    const getUser = async () => {
        const token = localStorage.getItem('token');
        const  { data } = await api.get("/users/me", headersToken(token));
        setUser(data);
    }
    const invokeUser = async () => {
        try {
            if (!localStorage.getItem('token')) return;
            await getUser()
        } catch (e) {
            console.log(e)
        }
    }
    invokeUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
},  [localStorage.getItem('token')] )
    console.log(user)
    return (
        <nav>
            <p>Plot in Short!</p>
            <div className="buttons-container">
                <Link to="/"><button className="home-button">Home</button></Link>
                <Link to="/about" className="about-button"><button>About</button></Link>
                <Link to="/favorites" className="favorites-button"><button>Favorites</button></Link>
                <Link to="/profile" className="profile-button"><button>Profile</button></Link>

                {user ?
                <>
                <Logout/>
                <span>{`Logged In`}</span>
                </> :
                    <>
                        <Link to="/sign-in" className="sign-in-button"><button>Sign In</button></Link>
                        <Link to="/sign-up" className="sign-up-button"><button>Sign Up</button></Link>
                    </>}
            </div>
        </nav>
    )
}

export default Header;