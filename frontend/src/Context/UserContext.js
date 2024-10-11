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
                console.error('Error fetching user:', error);
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
