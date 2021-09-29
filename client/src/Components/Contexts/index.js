import React from "react";
import { AlertProvider } from "./Alerts";
import { UserProvider } from "./User";

const ContextsProvider = ({children}) =>{
    return(
        <UserProvider>
            <AlertProvider>
                {children}
            </AlertProvider>
        </UserProvider>
    )
}

export default ContextsProvider;