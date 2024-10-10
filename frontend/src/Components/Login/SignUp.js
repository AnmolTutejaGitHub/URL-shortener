import { useState } from "react";
import './Login.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    async function handleSignup(e) {
        e.preventDefault();

        const user = {
            email,
            password,
            name,
            gender
        }

        try {
            const response = await axios.post('http://localhost:6969/signup', user);
            if (response.status === 200) {
                navigate('/login');
            }
        } catch (e) {
            if (e.response) {
                setError(e.response.data.error);
            } else {
                setError('some error occured');
            }
        }
    }

    return (
        <div className='login'>
            <div className='login-div'>
                <div className='login-heading'>Sign Up</div>

                <div>
                    <label htmlFor="name" className='login-label'>Name</label>
                    <input name="name" placeholder="Enter Your Name" required onChange={(e) => { setName(e.target.value) }} className='login-input'></input>
                </div>

                <div>
                    <label htmlFor="email" className='login-label'>Email</label>
                    <input name="email" placeholder="Enter Your Email" required onChange={(e) => { setEmail(e.target.value) }} className='login-input'></input>
                </div>

                <div>
                    <label htmlFor="password" className='login-label' >Password</label>
                    <input name="password" placeholder="Enter Your password" required onChange={(e) => { setPassword(e.target.value) }} className='login-input'></input>
                </div>

                <div>
                    <label htmlFor="gender" className='login-label'>Gender</label>
                    <input name="gender" placeholder="Enter Your Gender" required onChange={(e) => { setGender(e.target.value) }} className='login-input'></input>
                </div>

                <p>Already have an account ? <Link to="/login">login here</Link></p>
                <button className='login-btn' onClick={handleSignup}>Sign up</button>
                <p>{error}</p>

            </div>
        </div>
    );
}
export default SignUp;