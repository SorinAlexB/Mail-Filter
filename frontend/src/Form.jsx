import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Form = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [app_pass, setAppPass] = useState('');

    const resetForm = () => {
        setEmail('');
        setPassword('');
        setName('');
        setAppPass('');
        setErrorMessage('');
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the form from submitting the usual way

        console.log("Form submitted with:", { name, email, password, app_pass }); // Check the email and password

        const formData = {
            name: name,
            email: email,
            password: password,
            app_pass: app_pass,
        };

        try {
            const response = await fetch('http://localhost:5000/form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if(response.status === 409){
                alert(result.message);
                setErrorMessage(result.message);
                return;
            }

            if(!response.ok){
                alert("Something went wrong, please try again!");
                setErrorMessage("Something went wrong, please try again!");
                return;
            }
            navigate('/success');

        } catch (error) {
            console.error('Error during form submission:', error); // Log any errors
        } finally {
            resetForm();
        }
        
    };

    return (
        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
            <form className="space-y-5" onSubmit={handleSubmit}>
                <h5 className="text-xl font-normal text-gray-900 dark:text-white">Create a NoiseBuster account</h5>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                    <input 
                        type="name" 
                        name="name" 
                        id="name" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                        placeholder="name" 
                        required 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                    />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
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
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
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
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your app password</label>
                    <input 
                        type="app_pass" 
                        name="app_pass" 
                        id="app_pass" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                        placeholder="app password" 
                        required 
                        value={app_pass} 
                        onChange={(e) => setAppPass(e.target.value)} 
                    />
                </div>
                <button 
                    type="submit" 
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Create account
                </button>
            </form>
        </div>
    );
}

export default Form;
