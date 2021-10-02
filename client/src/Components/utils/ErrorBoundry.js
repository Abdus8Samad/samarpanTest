import React from "react";
import { Redirect } from "react-router";

export class ErrorBoundary extends React.Component {
    state = { hasError: false, error: null };

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        console.log(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            
            return <Redirect to='/' />;
        }

        return this.props.children;
    }
}