import * as React from "react";
import { useState, createContext, useContext } from "react";
interface AuthProviderProps {
    children: React.ReactNode
}

interface AuthContextValue {
    token: string | null
    user: User
}

interface User {
    id: string;
    userName: string;
    email: string;
}

const AuthContext = createContext<AuthContextValue | null>(null);
export function AuthProvider(props: AuthProviderProps): JSX.Element {
    const [token, setToken] = useState<string | null>(null)
    const [user, setUser] = useState<User | null>(null)
    return <AuthContext.Provider value={{token, user}}>{props.children}</AuthContext.Provider>
}

export function useAuthContext() {
    const context = useContext(AuthContext)
    if(!context){
        throw new Error('useAuthContext must be used within the AuthProvider')
    }
    return context
}