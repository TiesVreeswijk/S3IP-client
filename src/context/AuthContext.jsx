// src/context/AuthContext.jsx
import { createContext, useState } from "react";
import PropTypes from "prop-types";
import { login, signup } from "../api/auth.jsx";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);

    const handleLogin = async ({ username, password }) => {
        try {
            const token = await login({ username, password });
            setToken(token);
            localStorage.setItem("username", username);
            localStorage.setItem("token", token);
            // Add user to the state if needed
            setUser({ username });
        } catch (error) {
            console.error("Login failed", error);
            throw error;
        }
    };

    const handleSignUp = async ({ username, password }) => {
        try {
            const token = await signup({ username, password });
            localStorage.setItem("username", username);
            localStorage.setItem("token", token);
            // Add user to the state if needed
            setUser({ username });
        } catch (error) {
            console.error("Sign up failed", error);
            throw error;
        }
    };

    const handleLogout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("username");
    };

    return (
        <AuthContext.Provider value={{ token, user, handleLogin, handleSignUp, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
