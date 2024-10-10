import Login from '../Login/Login';
import './Home.css';

function Home() {
    return (
        <div>
            <div className='header'>
                <h1>Url Shortener</h1>
            </div>
            <div>
                <Login />
            </div>
        </div>
    );
}

export default Home;