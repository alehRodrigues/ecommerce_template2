import React from 'react';

export const AuthContext = React.createContext({});

export function AuthProvider(props) {
    const [contextApplication, setContextApplication] = React.useState({
        isLogged: false,
        user: ''
    });

    React.useEffect(() => {
        window.localStorage.setItem(
            'Application',
            JSON.stringify(contextApplication)
        );
        window.localStorage.setItem(
            'isLogged',
            JSON.stringify(contextApplication)
        );
    }, [contextApplication]);

    return (
        <AuthContext.Provider
            value={{ contextApplication, setContextApplication }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}
