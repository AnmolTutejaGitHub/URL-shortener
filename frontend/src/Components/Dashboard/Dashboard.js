import Navigation from "../Navigation/Navigation";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../Home/Home';
import Shorten from "../Shorten/Shorten";
import Stats from "../Stats/Stats";
import Profile from "../Profile/Profile";


function Dashboard() {
    return (
        <div>
            <Navigation />
            <div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="shorten" element={<Shorten />} />
                    <Route path="stats" element={<Stats />} />
                    <Route path="profile" element={<Profile />} />
                </Routes>
            </div>
        </div>
    );
}
export default Dashboard;