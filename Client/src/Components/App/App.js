import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "../Home/Home";
import Dashboard from "../Dashboard/Dashboard";
import { useContext } from 'react';
import UserContext from '../../Context/UserContext';
import './App.css';
import OTPValidation from '../OTPValidation/OTPValidation';

function App() {
    const { user, setUser } = useContext(UserContext);
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/*" element={<Home />} />
                    <Route path="/dashboard/*" element={<Dashboard />} />
                    <Route path="/OTPValidation" element={<OTPValidation />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App;