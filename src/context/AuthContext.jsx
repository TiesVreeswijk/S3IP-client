// src/context/AuthContext.jsx
import { createContext, useState } from "react";
import PropTypes from "prop-types";
import {login} from "../api/auth.jsx";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);

    const handleLogin = async ({ username, password }) => {
        const token = await login({ username, password });
        setToken(token);
        localStorage.setItem("username", username);
        localStorage.setItem("token", token);
    };

    const handleLogout = () => {
        setToken(null);
        localStorage.removeItem("token");
        localStorage.removeItem("username");
    };

    return (
        <AuthContext.Provider value={{ token, handleLogin, handleLogout}}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};