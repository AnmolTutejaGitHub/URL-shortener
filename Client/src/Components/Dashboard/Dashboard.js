import Navigation from "../Navigation/Navigation";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Shorten from "../Shorten/Shorten";
import Stats from "../Stats/Stats";
import Profile from "../Profile/Profile";
import { useContext } from 'react';
import UserContext from '../../Context/UserContext';


function Dashboard() {
    const { user, setUser } = useContext(UserContext);
    return (
        <div>
            <Navigation />
            <div>
                <Routes>
                    <Route path="shorten" element={<Shorten />} />
                    <Route path="stats" element={<Stats />} />
                    <Route path="profile" element={<Profile />} />
                </Routes>
            </div>
        </div>
    );
}
export default Dashboard;