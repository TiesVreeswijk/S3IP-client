import {Route, Routes, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LoginForm from './components/auth/LoginForm';
import SignupForm from "./components/auth/SignupForm.jsx";
import TrainingBuilder from "./pages/TrainingBuilder.jsx";
import Sidebar from "./components/Sidebar";
import TrainingOverview from "./pages/TrainingOverview";

function App() {
    const location = useLocation();
    const isLoginPage = location.pathname === '/' || location.pathname === '/login';

    return (
        <div className="flex">
            {!isLoginPage && <Sidebar />}
            <div className="flex-1">
                <Routes>
                    <Route path="/" element={<LoginForm />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/signup" element={<SignupForm />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/training-builder" element={<TrainingBuilder />} />
                    <Route path="/training-overview" element={<TrainingOverview />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;