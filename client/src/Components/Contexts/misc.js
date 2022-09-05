import React, { useState, useContext } from 'react'

const MiscContext = React.createContext();
const SetMiscContext = React.createContext();

export const useMisc = () => useContext(MiscContext);
export const useSetMisc = () => useContext(SetMiscContext);

export const MiscProvider = ({children}) =>{
    const [misc, setMisc] = useState({
        userLoaded: false,
        isTopbar: true,
        isFooter: true,
        title: "Home"
    });
    return(
        <MiscContext.Provider value={misc}>
            <SetMiscContext.Provider value={(e) => setMisc(e)}>
                {children}
            </SetMiscContext.Provider>
        </MiscContext.Provider>
    )
}