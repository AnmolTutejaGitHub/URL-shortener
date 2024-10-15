import Login from '../Login/Login';
import SignUp from '../Login/SignUp';
import { Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import './Home.css';
import axios from 'axios';
import { useContext } from 'react';
import UserContext from '../../Context/UserContext';

function Home() {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
        async function DoesTokenExist() {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/users`, { withCredentials: true });
                if (response.status === 200) {
                    setUser(response.data);
                    navigate('/dashboard/shorten');
                } else {
                    navigate('/login');
                }
            } catch (e) {
                console.error('token expired or you logged out thus deleting the token');
                navigate('/login');
            }
        }
        DoesTokenExist();
    }, []);

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