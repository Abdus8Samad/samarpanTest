import React from "react";
import { UserProvider } from "./User";
import  { SnackbarProvider } from 'notistack';
import { LoadingStateProvider } from "./LoadingState";

const ContextsProvider = ({children}) =>{
    return(
        <UserProvider>
            <SnackbarProvider>
                <LoadingStateProvider>
                    {children}
                </LoadingStateProvider>
            </SnackbarProvider>
        </UserProvider>
    )
}

export default ContextsProvider;