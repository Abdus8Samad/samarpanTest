import React, { useContext, useState } from "react";

const AlertContext = React.createContext();
const SetAlertContext = React.createContext();

export const useAlert = () => useContext(AlertContext);
export const useSetAlert = () => useContext(SetAlertContext);


export const AlertProvider = ({children}) =>{
    const [alert, setAlert] = useState("");
    return(
        <AlertContext.Provider value={alert}>
            <SetAlertContext.Provider value={setAlert}>
                {children}
            </SetAlertContext.Provider>
        </AlertContext.Provider>
    )
}