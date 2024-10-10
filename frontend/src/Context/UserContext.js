import { createContext, useState } from "react";

const UserContext = createContext();

function Provider({ children }) {
    const [user, setUser] = useState({});

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

export { Provider };
export default UserContext;
