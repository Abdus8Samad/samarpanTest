import { createContext, useContext, useState } from "react";

const UserContext = createContext();
const SetUserContext = createContext();

export const useUser = () => useContext(UserContext);
export const useSetUser = () => useContext(SetUserContext);

export const UserProvider = ({children}) =>{
    const [user, setUser] = useState("");
    return(
        <SetUserContext.Provider value={(e) => setUser(e)}>
            <UserContext.Provider value={user}>
                {children}
            </UserContext.Provider>
        </SetUserContext.Provider>
    )
}