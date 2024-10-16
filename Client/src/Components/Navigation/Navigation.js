import { Link } from 'react-router-dom';
import './Navigation.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Navigation() {
    const navigate = useNavigate();

    async function logout() {
        await axios.get(`${process.env.REACT_APP_API_URL}/logout`, { withCredentials: true });
        navigate('/');
    }

    return (
        <nav>
            <Link className='link' to="shorten">Shorten</Link>
            <Link className='link' to="stats">Stats</Link>
            <Link className='link' to="profile">Profile</Link>
            <div onClick={logout} className='logged-out'>log out</div>
        </nav>
    );
}

export default Navigation;