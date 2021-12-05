import React from "react";
import { UserProvider } from "./User";
import  { SnackbarProvider } from 'notistack';
import { LoadingProvider } from "./LoadingState";

const ContextsProvider = ({children}) =>{
    return(
        <UserProvider>
            <LoadingProvider>
                <SnackbarProvider>
                    {children}
                </SnackbarProvider>
            </LoadingProvider>
        </UserProvider>
    )
}

export default ContextsProvider;