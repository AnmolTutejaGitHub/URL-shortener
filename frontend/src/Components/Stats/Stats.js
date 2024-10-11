import { useContext } from 'react';
import UserContext from '../../Context/UserContext';

function Stats() {
    const { user } = useContext(UserContext);

    const renderUrls = user?.urls?.map((urlObj, index) => {
        return (
            <div key={index}>
                <h2>{urlObj.name}</h2>
                <p>{urlObj.originalurl}</p>
                <p>{urlObj.shortened}</p>
            </div>
        );
    });

    return (
        <div>
            {renderUrls}
        </div>
    );
}
export default Stats;