import { createContext, useState } from "react";

const UserContext = createContext();

function Provider({ children }) {
    const [user, setUser] = useState({
        name: 'Anmol',
        email: 'tutejaanmol54@gmail.com',
        password: 122345,
        gender: 'male'
    });

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

export { Provider };
export default UserContext;
