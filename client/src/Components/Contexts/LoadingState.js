import React, { useContext, useState } from 'react';

const LoadingContext = React.createContext();
const SetLoadingContext = React.createContext();

export const useLoading = () => useContext(LoadingContext);
export const useSetLoading = () => useContext(SetLoadingContext);

export const LoadingProvider = ({children}) =>{
    const [loading, setLoading] = useState({
        user: false,
        movies: false
    });
    return(
        <LoadingContext.Provider value={loading}>
            <SetLoadingContext.Provider value={setLoading}>
                {children}
            </SetLoadingContext.Provider>
        </LoadingContext.Provider>
    )
}