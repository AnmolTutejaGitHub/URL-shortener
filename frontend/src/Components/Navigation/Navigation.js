import { Link } from 'react-router-dom';
import './Navigation.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Navigation() {
    const navigate = useNavigate();

    async function logout() {
        await axios.get('http://localhost:6969/logout', { withCredentials: true });
        navigate('/');
    }

    return (
        <nav>
            <Link className='link' to="shorten">Shorten</Link>
            <Link className='link' to="stats">Stats</Link>
            <Link className='link' to="profile">Profile</Link>
            <button onClick={logout}>log out</button>
        </nav>
    );
}

export default Navigation;