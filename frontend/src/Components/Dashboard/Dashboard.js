import Navigation from "../Navigation/Navigation";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
function Dashboard() {
    return (
        <div>
            <Navigation />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/shorten" element={<Shorten />} />
                    <Route path="/stats" element={<Stats />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}
export default Dashboard;