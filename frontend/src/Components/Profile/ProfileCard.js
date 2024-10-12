import './ProfileCard.css';

function ProfileCard({ htmlfor, val }) {
    const profileMap = {
        "name": "Username",
        "email": "Email",
        "gender": "Gender"
    }
    return (
        <div className='profile-card'>
            <label className="label-css" htmlFor={htmlfor}>{profileMap[htmlfor]}</label>
            <input className="profile-input-css" defaultValue={val} disabled></input>
        </div >
    );
}

export default ProfileCard;