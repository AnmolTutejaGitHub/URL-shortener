import { useContext } from 'react';
import UserContext from '../../Context/UserContext';
import StatsRes from './StatsRes';
import './Stats.css';

function Stats() {
    const { user } = useContext(UserContext);

    const renderUrls = user?.urls?.map((urlObj, index) => {
        return (
            <StatsRes srNo={index + 1} key={index} name={urlObj.name} url={urlObj.originalurl} shortened={urlObj.shortened} />
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