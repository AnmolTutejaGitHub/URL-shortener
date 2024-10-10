import Login from '../Login/Login';
import SignUp from '../Login/SignUp';
import { Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import './Home.css';

function Home() {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('login');
    }, [])

    return (
        <div>
            <div className='header'>
                <h1>Url Shortener</h1>
            </div>
            <div>
                <Routes>
                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<SignUp />} />
                </Routes>
            </div>
        </div>
    );
}

export default Home;