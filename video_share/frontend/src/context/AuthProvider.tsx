import * as React from "react";
import { useState, createContext, useContext } from "react";
import jwt_decode from "jwt-decode";

interface AuthProviderProps {
  children: React.ReactNode;
}

interface User {
  id: string;
  userName: string;
  email: string;
}

interface Token {
  access: string;
  refresh: string;
}

interface User {
  username: string;
  user_id: number;
  exp: number;
}

interface AuthContextValue {
  token: Token | null;
  user: User;
  loginUser: (username: string, password: string) => void;
  logoutUser: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);
export function AuthProvider(props: AuthProviderProps): JSX.Element {
  const [token, setToken] = useState<Token | null>(() => {
    const maybeToken = localStorage.getItem("token");
    return maybeToken ? JSON.parse(maybeToken) : null;
  });
  const [user, setUser] = useState<User | null>(() => {
    const maybeUser = localStorage.getItem("user");
    return maybeUser ? JSON.parse(maybeUser) : null;
  });

  const loginUser = async (username: string, password: string) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      const data: Token = await response.json();
      setToken(data);
      localStorage.setItem("token", JSON.stringify(data));
      setUser(jwt_decode(data.access));
      localStorage.setItem("user", JSON.stringify(jwt_decode(data.access)));
    } catch (e) {
      throw new Error(e);
    }
  };

  const logoutUser = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ token, user, loginUser, logoutUser }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within the AuthProvider");
  }
  return context;
}
