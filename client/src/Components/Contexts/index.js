import React from "react";
import { UserProvider } from "./User";
import  { SnackbarProvider } from 'notistack';
import { LoadingProvider } from "./LoadingState";

const ContextsProvider = ({children}) =>{
    return(
        <UserProvider>
            <SnackbarProvider>
                <LoadingProvider>
                    {children}
                </LoadingProvider>
            </SnackbarProvider>
        </UserProvider>
    )
}

export default ContextsProvider;