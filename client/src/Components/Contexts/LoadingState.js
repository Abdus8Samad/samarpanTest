import React, { useContext, useState } from 'react';

const StateContext = React.createContext();
const SetStateContext = React.createContext();

export const useLoadingState = () => useContext(StateContext);
export const useSetLoadingState = () => useContext(SetStateContext);

export const LoadingStateProvider = ({children}) =>{
    const [loading, setLoading] = useState(true);
    return(
        <StateContext.Provider value={loading}>
            <SetStateContext.Provider value={setLoading}>
                {children}
            </SetStateContext.Provider>
        </StateContext.Provider>
    )
}