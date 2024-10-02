import {useContext, useState} from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import axios from "axios";



// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const handleLogin = async ({ username, password }) => {
        try {
            const response = await axios.post("/Authentication/login", { username, password });
            setUser(response.data.user);
        } catch (error) {
            console.error("Login failed", error);
            throw error;
        }
    };

    const handleSignUp = async ({ username, password }) => {
        try {
            const response = await axios.post("/Authentication/register", { username, password });
            setUser(response.data.user);
        } catch (error) {
            console.error("Sign up failed", error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ user, handleLogin, handleSignUp }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);