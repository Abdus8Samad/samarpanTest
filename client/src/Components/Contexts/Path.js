import React, { useState, useContext } from 'react'

const PathContext = React.createContext();
const SetPathContext = React.createContext();

export const usePath = () => useContext(PathContext);

export const useSetPath = () => useContext(SetPathContext);

export const PathProvider = ({children}) =>{
    const [path, setPath] = useState([]);
    return(
        <PathContext.Provider value={path}>
            <SetPathContext.Provider value={setPath}>
                {children}
            </SetPathContext.Provider>
        </PathContext.Provider>
    )
}