import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LoginForm from "./components/Auth/LoginForm";

import SignupForm from "./components/auth/SignupForm.jsx";
import TrainingBuilder from "./pages/TrainingBuilder.jsx";
import Sidebar from "./components/Sidebar";

function App() {
    return (
        <Router>
        <div className="flex">
            <Sidebar />
            <div className="flex-1">
                <Routes>
                    <Route path="/" element={<LoginForm />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/signup" element={<SignupForm />} />
                    <Route path="/dashboard" element={<Dashboard /> } />
                    <Route path="/training-builder" element={<TrainingBuilder />} />
                </Routes>
            </div>
        </div>
        </Router>
    );
}

export default App;