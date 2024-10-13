import { useState, useContext } from "react";
import axios from 'axios';
import UserContext from '../../Context/UserContext';
import { useNavigate } from 'react-router-dom';
import './OTPValidation.css';
import { Link } from "react-router-dom";

function OTPValidation() {
    const { user } = useContext(UserContext);
    const [enteredOTP, setEnteredOTP] = useState('');
    const [sentOTP, setSentOTP] = useState('');
    const [error, setError] = useState('');
    const [otpSending, setSending] = useState(false);
    const navigate = useNavigate();

    async function sendOTP() {
        try {
            setSending(true);
            const otp = generateOTP();
            setSentOTP(otp);
            const email = user.email;

            await axios.post('http://localhost:6969/otp', { email, otp });
            setError("");
            alert("OTP sent successfully!");
        } catch (e) {
            setError("Error sending OTP");
        } finally {
            setSending(false);
        }
    }

    async function validateOTP() {
        if (sentOTP === enteredOTP) {
            navigate("/*"); // as token is generated from login .. if token home will navigate to dashboard
        } else {
            setError("Invalid OTP");
        }
    }

    function generateOTP() {
        let otp = '';
        for (let i = 0; i < 4; i++) {
            const digit = Math.floor(Math.random() * 10);
            otp += digit.toString();
        }
        return otp;
    }


    return (
        <div>
            <div className='header'>
                <h1>Url Shortener</h1>
            </div>
            <div className="otp-div">
                <div className="otp-box">
                    <div className='login-heading'>OTP validation</div>
                    <input name="otp" placeholder="Enter Your OTP" onChange={(e) => setEnteredOTP(e.target.value)} className='login-input' />
                    <button onClick={sendOTP} className="otp-btn">Send OTP</button>
                    <button onClick={validateOTP} className="otp-btn">Validate OTP</button>
                    {otpSending && <p>Sending....</p>}
                    {error && <p className="error">*{error}</p>}
                </div>
            </div>
        </div>
    );
}

export default OTPValidation;