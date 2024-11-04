import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://localhost:44385/Auth/login', {
                username,
                password,
            });
            console.log('Login successful:', response.data);
            localStorage.setItem('token', response.data.token); // Store the token in local storage
            navigate('/dashboard'); // Navigate to the dashboard page
        } catch (err) {
            if (err.response) {
                console.error('Login failed:', err.response.data);
                setError(err.response.data);
            } else {
                console.error('Login failed:', err.message);
                setError('An error occurred. Please try again.');
            }
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
                {error && <p className="mt-4 text-center text-red-500 text-sm">{error}</p>}
                <p className="mt-4 text-center text-black text-sm">
                    Don’t have an account? <a href="/signup" className="text-blue-500 hover:underline">Sign up</a>
                </p>
            </div>
        </div>
    );
};

export default LoginForm;