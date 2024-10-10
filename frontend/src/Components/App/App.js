import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "../Home/Home";
import Dashboard from "../Dashboard/Dashboard";
import { createContext } from 'react';
import UserContext from '../../Context/UserContext';

function App() {
    const { user, setUser } = createContext(UserContext);
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/dashboard/*" element={<Dashboard />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App;