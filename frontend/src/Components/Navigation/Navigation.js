import { Link } from 'react-router-dom';
function Navigation() {
    return (
        <nav>
            <Link to="/shorten">Shorten</Link>
            <Link to="/stats">Stats</Link>
            <Link to="/profile">Profile</Link>
        </nav>
    );
}
export default Navigation;