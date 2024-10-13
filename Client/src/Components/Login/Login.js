import axios from 'axios';
import { useState } from 'react';
import { useContext } from 'react';
import UserContext from '../../Context/UserContext';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { Link } from 'react-router-dom';

function Login() {
    const { setUser } = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    async function handleLoggin(e) {
        e.preventDefault();
        try {
            const User = await axios.post('http://localhost:6969/login', {
                email,
                password
            }, { withCredentials: true });

            setUser(User.data);
            // navigate('/dashboard/shorten');
            navigate('/OTPValidation');
        } catch (err) {
            setError(err?.response?.data?.error || 'Some error occured');
        }
    }

    return (
        <div className='login'>
            <div className='login-div'>
                <div className='login-heading'>Login & Get Started</div>
                <div className='login-field'>
                    <label htmlFor="email" className='login-label'>Email</label>
                    <input name="email" placeholder="Enter Your Email" required onChange={(e) => { setEmail(e.target.value) }} className='login-input'></input>
                </div>

                <div className='login-field'>
                    <label htmlFor="password" className='login-label' >Password</label>
                    <input name="password" placeholder="Enter Your password" required onChange={(e) => { setPassword(e.target.value) }} className='login-input'></input>
                </div >

                <button onClick={handleLoggin} className='login-btn'>Login</button>

                <p>Don't have an account ? <Link to="/signup" className='login-link'>Register here</Link></p>
                {error && <p className="error">*{error}</p>}

            </div>
        </div>
    );
}
export default Login;