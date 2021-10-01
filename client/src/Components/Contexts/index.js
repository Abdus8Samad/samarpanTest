import React from "react";
import { UserProvider } from "./User";
import { PathProvider } from './Path';
import  { SnackbarProvider } from 'notistack';

const ContextsProvider = ({children}) =>{
    return(
        <UserProvider>
            <SnackbarProvider>
                {/* <PathProvider> */}
                    {children}
                {/* </PathProvider> */}
            </SnackbarProvider>
        </UserProvider>
    )
}

export default ContextsProvider;