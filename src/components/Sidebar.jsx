import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="flex">
            {/* Toggle Button */}
            <button
                onClick={toggleSidebar}
                className="p-4 text-white bg-gray-800 hover:bg-gray-700 focus:outline-none transition duration-300"
            >
                <FaBars />
            </button>

            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-screen w-64 bg-gray-800 text-white shadow-lg transform ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                } transition-transform duration-300`}
            >
                <div className="p-6 text-2xl font-bold border-b border-gray-700 flex items-center justify-center">
                    <span className="text-blue-400">MyApp</span>
                </div>
                <nav className="flex-1 p-6 space-y-4">
                    <ul>
                        <li>
                            <Link
                                to="/dashboard"
                                className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition duration-300"
                                onClick={toggleSidebar} // Close sidebar when link is clicked
                            >
                                <span className="text-lg font-semibold">Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/profile"
                                className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition duration-300"
                                onClick={toggleSidebar}
                            >
                                <span className="text-lg font-semibold">Profile</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/settings"
                                className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition duration-300"
                                onClick={toggleSidebar}
                            >
                                <span className="text-lg font-semibold">Settings</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className="p-6 border-t border-gray-700">
                    <button
                        onClick={toggleSidebar}
                        className="w-full p-3 text-left rounded-lg hover:bg-gray-700 transition duration-300"
                    >
                        Log Out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
