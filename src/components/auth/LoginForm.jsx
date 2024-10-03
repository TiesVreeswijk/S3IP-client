import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { handleLogin } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Submitting sign-up form');
            await handleLogin({ username, password });
            navigate("/dashboard");  // Redirect to dashboard
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-800">
            <div className="bg-gray-300 p-8 rounded-lg shadow-lg w-80">
                <h2 className="text-2xl font-bold text-center mb-6 text-black">Log in</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-2 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300">
                        Log in
                    </button>
                </form>
                <p className="mt-4 text-center text-black text-sm">
                    Don’t have an account? <a href="/signup" className="text-blue-500 hover:underline">Sign up</a>
                </p>
            </div>
        </div>
    );
};

export default LoginForm;