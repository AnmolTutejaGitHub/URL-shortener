import { Link } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
    return (
        <nav>
            <Link className='link' to="shorten">Shorten</Link>
            <Link className='link' to="stats">Stats</Link>
            <Link className='link' to="profile">Profile</Link>
        </nav>
    );
}

export default Navigation;