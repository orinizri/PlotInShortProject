import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserState } from '../../context/user.context';
import './profile.css'

const Profile = () => {
    const [user, setUser] = UserState();
    const navigate = useNavigate()


    useEffect(() => {
        if (!user) {
            navigate('/')
        } // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    return (
        <div>
            <div className="profile">
                <h2>{user.name}</h2>
                <p className="email">{user.email}</p>
            </div>
        </div>
    );
};

export default Profile;