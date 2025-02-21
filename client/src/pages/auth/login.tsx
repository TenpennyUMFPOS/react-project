import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const history = useHistory();

    const validateForm = () => {
        let valid = true;
        setEmailError('');
        setPasswordError('');

        if (!email) {
            setEmailError('Email is required');
            valid = false;
        } else if (!/^[^\s@]+@[^\s@]+$/.test(email)) {
            setEmailError('Invalid email format musthave @');
            valid = false;
        }

        if (!password) {
            setPasswordError('Password is required');
            valid = false;
        } else if (password.length < 6) {
            setPasswordError('Password must be at least 6 characters');
            valid = false;
        }

        return valid;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateForm()) return;

        try {
            let item = { email, password };
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Login failed');
            }

            const userData = await response.json();
            localStorage.setItem('token', userData.token);
            localStorage.setItem('userId', userData.userId);
            history.push('/test');
        } catch (error) {
            setError(error.message || 'Login failed');
        }
    };

    return (
        <div className="bg-black text-white flex min-h-screen flex-col items-center pt-16 sm:justify-center sm:pt-0">
            <a href="#">
                <div className="text-foreground font-semibold text-2xl tracking-tighter mx-auto flex items-center gap-2">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                            stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672Zm-7.518-.267A8.25 8.25 0 1 1 20.25 10.5M8.288 14.212A5.25 5.25 0 1 1 17.25 10.5" />
                        </svg>
                    </div>
                    <h1 className="relative w-full flex-none mb-2 text-2xl font-semibold text-white">
                        GWENT
                    </h1>
                </div>
            </a>
            <div className="relative mt-12 w-full max-w-lg sm:mt-10">
                <div className="relative -mb-px h-px w-full bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
                <div className="mx-5 border dark:border-b-white/50 dark:border-t-white/50 border-b-white/20 sm:border-t-white/20 shadow-[20px_0_20px_20px] shadow-slate-500/10 dark:shadow-white/20 border-white/20 border-l-white/20 border-r-white/20 sm:shadow-sm">
                    <div className="flex flex-col p-6">
                        <h3 className="text-xl font-semibold leading-6 tracking-tighter">Login</h3>
                        <p className="mt-1.5 text-sm font-medium text-white/50">Welcome back, enter your credentials to continue.</p>
                    </div>
                    <div className="p-6 pt-0">
                        <form onSubmit={handleSubmit}>
                            <div>
                                <div className="group relative border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                                    <label className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">Email</label>
                                    <input type="text" name="Email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
                                        className="block w-full border-0 bg-transparent p-0 text-sm focus:outline-none focus:ring-0 sm:leading-7 text-foreground" />

                                </div>
                                {emailError && <p className="text-red text-xs mt-1">{emailError}</p>}
                            </div>
                            <div className="mt-4">
                                <div className="group relative border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                                    <label className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">Password</label>
                                    <input type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
                                        className="block w-full border-0 bg-transparent p-0 text-sm focus:outline-none focus:ring-0 sm:leading-7 text-foreground" />
                                </div>
                                {passwordError && <p className="text-red text-xs mt-1">{passwordError}</p>}
                            </div>
                            {error && <p className="text-red text-xs mt-1">{error}</p>}
                            <div className="mt-4 flex items-center justify-end gap-x-2">
                                <a className="inline-flex items-center justify-center  text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:ring hover:ring-purple-500 h-10 px-4 py-2 duration-200"
                                    href="/register">Register</a>
                                <button className="font-semibold hover:bg-black hover:text-white hover:ring hover:ring-purple-500 transition duration-300 inline-flex items-center justify-center text-sm bg-white text-black h-10 px-4 py-2" type="submit">Log in</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
