import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Sign = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const resetForm = () => {
        setPassword('');
        setAppPass('');
        setErrorMessage('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Form submitted with:", {email, password})

        const formData = {
            email: email,
            password: password,
        };

        try {
            const response = await fetch('http://localhost:5000/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.status === 409) {
                alert(result.message);
                setErrorMessage(result.message);
                return;
            }

            if (!response.ok) {
                alert('Something went wrong, please try again!');
                setErrorMessage("Something went wrong, please try again!");
                return;
            }
            
            navigate('/dashboard'); 

        } catch (error) {
            console.error("Error during form submission:", error);
        } finally {
            resetForm();
        }

    };

  return (
<div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
    <form className="space-y-5" onSubmit={handleSubmit}>
        <h5 className="text-xl font-normal text-gray-900 dark:text-white">Sign in to NoiseBuster</h5>
        <div>
            <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
            <input 
            type="email" 
            name="email" 
            id="email" 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
            placeholder="name@gmx.com" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
        </div>
        <div>
            <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
            <input 
            type="password" 
            name="password" 
            id="password" 
            placeholder="••••••••" 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
            required 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
        </div>
        <div className="flex items-start">
            <div className="flex items-start">
            <a href="/reset" className="ms-12 text-sm text-blue-700 hover:underline dark:text-blue-500">Lost Password?</a>
            </div>
        </div>
        <button 
        type="submit"
        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Login to your account
        </button>
        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            Not registered? <a href="/form" className="text-blue-700 hovr:underline dark:text-blue-500">Create account</a>
        </div>
    </form>
</div>


  )
}

export default Sign