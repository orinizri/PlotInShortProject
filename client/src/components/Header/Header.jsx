import { UserState } from '../../context/user.context';
import { Link } from "react-router-dom";
import SignIn from '../../pages/SignIn/SignIn';


function Header() {
    const [user, setUser] = UserState();




    return (
        <nav>
            <p>Plot in Short!</p>
            <div className="buttons-container">
                <Link to="/"><button className="home-button">Home</button></Link>
                <Link to="/about" className="about-button"><button>About</button></Link>
                <Link to="/favorites" className="favorites-button"><button>Favorites</button></Link>
                <Link to="/profile" className="profile-button"><button>Profile</button></Link>
                {/* <button className="login-button" onClick={e => login(e)}>Login</button> */}
                <SignIn/>
                {/* <AuthenticationButton/> */}
            </div>
        </nav>
    )
}

export default Header;