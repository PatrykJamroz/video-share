import * as React from "react";
import { useState, createContext, useContext, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useLocation, useNavigate } from "react-router";

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
  const [loading, setLoading] = useState<boolean>(true);
  const [loginErrors, setLoginErrors] = useState({
    username: "",
    password: "",
  });

  const [token, setToken] = useState<Token | null>(() => {
    setLoading(false);
    const maybeToken = localStorage.getItem("token");
    return maybeToken ? JSON.parse(maybeToken) : null;
  });

  const [user, setUser] = useState<User | null>(() => {
    const maybeUser = localStorage.getItem("user");
    return maybeUser ? JSON.parse(maybeUser) : null;
  });

  const location = useLocation();
  const navigate = useNavigate();

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
      //TODO FIX token set as error data, eg. incorrect login details
      if (response.ok) {
        const data: Token = await response.json();
        setToken(data);
        localStorage.setItem("token", JSON.stringify(data));
        setUser(jwt_decode(data.access));
        localStorage.setItem("user", JSON.stringify(jwt_decode(data.access)));
        navigate(location.pathname ?? "/");
      }
      console.log({ response });
    } catch (e) {
      console.log({ e });
      throw new Error(e);
    }
  };

  const logoutUser = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const refreshToken = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refresh: token.refresh,
        }),
      });
      const data: Token = await response.json();
      setToken(data);
      localStorage.setItem("token", JSON.stringify(data));
      setUser(jwt_decode(data.access));
      localStorage.setItem("user", JSON.stringify(jwt_decode(data.access)));
    } catch (e) {
      logoutUser();
      throw new Error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token && loading) {
      refreshToken();
    }

    const interval = setInterval(() => {
      if (token) {
        refreshToken();
      }
    }, 240000);

    return () => clearInterval(interval);
  }, [token, loading]);

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
