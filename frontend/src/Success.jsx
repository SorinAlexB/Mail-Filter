import React from 'react'
import { useNavigate } from 'react-router-dom';

function Success() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/');
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full overflow-hidden transition-all duration-300 hover:shadow-3xl animate-fade-in">
            <div className="p-6">
                <h2 className="text-2xl font-bold text-indigo-800 dark:text-white mb-4">Account created with success</h2>
                <button 
                    onClick={handleClick}
                    className="bg-indigo-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-800 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                >
                    Return to login
                </button>
            </div>
        </div>
    );
}

export default Success;
