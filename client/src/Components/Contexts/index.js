import React from "react";
import { MiscProvider } from "./misc";
import  { SnackbarProvider } from 'notistack';
import { UserProvider } from "./user";

const ContextsProvider = ({children}) =>{
    return(
        <MiscProvider>
            <UserProvider>
                <SnackbarProvider>
                    {children}
                </SnackbarProvider>
            </UserProvider>
        </MiscProvider>
    )
}

export default ContextsProvider;