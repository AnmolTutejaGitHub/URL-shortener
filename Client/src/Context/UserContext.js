import { createContext, useState } from "react";
import { useEffect } from "react";
import axios from 'axios';

const UserContext = createContext();

function Provider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('http://localhost:6969/users', {
                    withCredentials: true
                });

                if (response.status === 200) {
                    setUser(response.data);
                }
            } catch (error) {
                console.error('token expired or you logged out thus deleting the token');
                setUser(null);
            }
        };

        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

export { Provider };
export default UserContext;
