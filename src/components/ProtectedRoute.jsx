// src/components/ProtectedRoute.jsx
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ children }) => {
    const { token } = useAuth();

    if (!token) {
        // Redirect to login if not authenticated
        return <Navigate to="/login" />;
    }

    return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ProtectedRoute;