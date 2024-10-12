import { useContext } from 'react';
import UserContext from '../../Context/UserContext';
import StatsRes from './StatsRes';
import axios from 'axios';
import './Stats.css';


function Stats() {
    const { user, setUser } = useContext(UserContext);

    async function handleDelete(originalurl) {
        const response = await axios.post('http://localhost:6969/delUserUrl', {
            email: user.email,
            originalurl
        });
        setUser(response.data);
    }

    const renderUrls = user?.urls?.map((urlObj, index) => {
        return (
            <StatsRes srNo={index + 1} key={index} name={urlObj.name} url={urlObj.originalurl} shortened={urlObj.shortened} onDelete={() => { handleDelete(urlObj.originalurl) }} />
        );
    });

    return (
        <div className='stats-div'>
            <table className='stats-table'>
                <thead>
                    <tr>
                        <th>Sr No</th>
                        <th>Name</th>
                        <th>Short URL</th>
                        <th>URL</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {renderUrls}
                </tbody>
            </table>
        </div>
    );
}
export default Stats;