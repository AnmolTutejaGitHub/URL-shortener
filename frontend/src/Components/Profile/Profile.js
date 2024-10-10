import './Profile.css';
import { useContext } from 'react';
import UserContext from '../../Context/UserContext';
import ProfileCard from './ProfileCard';

function Profile() {
    const { user, setUser } = useContext(UserContext);
    const profileImage = `https://xsgames.co/randomusers/avatar.php?g=${user.gender}`;
    return (
        <div className="profile">
            <div className="profile-div">
                <div className='profile-pic-div'>
                    <img src={profileImage} className='profile-name'></img>
                </div>
                <form className="profile-data">
                    <ProfileCard htmlfor="name" val={user.name} />
                    <ProfileCard htmlfor="email" val={user.email} />
                    <ProfileCard htmlfor="password" val={user.password} />
                </form>
            </div>
        </div >
    );
}

export default Profile;