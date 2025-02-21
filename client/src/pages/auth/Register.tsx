import React, { useState } from 'react';
import './Register.css';
import { useHistory } from 'react-router-dom';


function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState(null);
    const history = useHistory();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            let item = { username, email, password }


            const response = await fetch("http://localhost:3000/register", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'register failed');
            }
            const userData = await response.json();
            console.log('register successful', userData); // Remove this after testing
            history.push('/Cards')


        } catch (error) {
            setError(error.message || 'register failed catch block');
        }
    }

    return (
        <div className="bg-black text-white flex min-h-screen flex-col items-center pt-16 sm:justify-center sm:pt-0">
            <a href="#">
                <div className="text-foreground font-semibold text-2xl tracking-tighter mx-auto flex items-center gap-2">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" className="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672Zm-7.518-.267A8.25 8.25 0 1 1 20.25 10.5M8.288 14.212A5.25 5.25 0 1 1 17.25 10.5" />
                        </svg>
                    </div>
                    <h1 className="relative w-full flex-none mb-2 text-2xl font-semibold text-white">
                        STREAM-I
                    </h1>
                </div>
            </a>
            <div className="relative mt-12 w-full max-w-lg sm:mt-10">
                <div className="relative -mb-px h-px w-full bg-gradient-to-r from-transparent via-purple-400 to-transparent"
                ></div>
                <div
                    className="mx-5 border dark:border-b-white/50 dark:border-t-white/50 border-b-white/20 sm:border-t-white/20 shadow-[20px_0_20px_20px] shadow-slate-500/10 dark:shadow-white/20  border-white/20 border-l-white/20 border-r-white/20 sm:shadow-sm  ">
                    <div className="flex flex-col p-6">
                        <h3 className="text-xl font-semibold leading-6 tracking-tighter">Register</h3>
                        <p className="mt-1.5 text-sm font-medium text-white/50">Welcome, please enter your details to register.
                        </p>
                    </div>
                    <div className="p-6 pt-0">
                        <form onSubmit={handleSubmit}>
                            <div>
                                <div>
                                    <div
                                        className="group relative  border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                                        <div className="flex justify-between">
                                            <label
                                                className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">Username</label>
                                            <div className="absolute right-3 translate-y-2 text-green-200">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                                    fill="currentColor" className="w-6 h-6">
                                                    <path fill-rule="evenodd"
                                                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                                                        clip-rule="evenodd" />
                                                </svg>
                                            </div>
                                        </div>
                                        <input type="text" name="Username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="block w-full border-0 bg-transparent p-0 text-sm file:my-1 file:rounded-full file:border-0 file:bg-accent file:px-4 file:py-2 file:font-medium placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 sm:leading-7 text-foreground" />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4">
                                <div>
                                    <div
                                        className="group relative  border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                                        <div className="flex justify-between">
                                            <label
                                                className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">Email</label>
                                        </div>
                                        <div className="flex items-center">
                                            <input type="text" name="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}
                                                className="block w-full border-0 bg-transparent p-0 text-sm file:my-1 placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 focus:ring-teal-500 sm:leading-7 text-foreground" />
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="mt-4">
                                <div>
                                    <div
                                        className="group relative  border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                                        <div className="flex justify-between">
                                            <label
                                                className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">Password</label>
                                        </div>
                                        <div className="flex items-center">
                                            <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}
                                                className="block w-full border-0 bg-transparent p-0 text-sm file:my-1 placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 focus:ring-teal-500 sm:leading-7 text-foreground" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 flex items-center justify-between">
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" name="remember"
                                        className="outline-none focus:outline focus:outline-sky-300" />
                                    <span className="text-xs">Remember me</span>
                                </label>
                                <a className="text-sm font-medium text-foreground underline" href="/#">Forgot
                                    password?</a>
                            </div>
                            <div className="mt-4 flex items-center justify-end gap-x-2">

                                <button
                                    className="font-semibold hover:bg-black hover:text-white hover:ring hover:ring-purple-500 transition duration-300 inline-flex items-center justify-center  text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-black h-10 px-4 py-2"
                                    type="submit">Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register
