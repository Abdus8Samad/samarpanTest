import React, { useState, useContext } from 'react'

const UserContext = React.createContext();
const SetUserContext = React.createContext();

export const useUser = () => useContext(UserContext);

export const useSetUser = () => useContext(SetUserContext);

export const UserProvider = ({children}) =>{
    const [user, setUser] = useState("");
    return(
        <UserContext.Provider value={user}>
            <SetUserContext.Provider value={(e, val) => setUser(e, val)}>
                {children}
            </SetUserContext.Provider>
        </UserContext.Provider>
    )
}