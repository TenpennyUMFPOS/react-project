import React, { useEffect, useState } from 'react';
import Nav from "../ui/Nav.tsx";
import { useHistory } from "react-router-dom";

function AddCard() {
    const [name, setCardName] = useState('');
    const [type, setCardType] = useState('');
    const [strength, setPower] = useState('');
    const [description, setQuote] = useState('');
    const [error, setError] = useState('');

    const history = useHistory();




    const handleSubmit = async (event) => {
        event.preventDefault();
        const userId = localStorage.getItem('userId');
        console.log(userId)

        try {
            const cardData = {
                name,
                type,
                strength,
                description,
                userId
            };

            const response = await fetch('http://localhost:3000/addCard', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cardData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.log("Adding card failed");
                throw new Error(errorData.message || 'Adding card failed');
            }

            const responseData = await response.json();
            console.log('Card added successfully', responseData);
            history.push('/Cards')
        } catch (error) {
            setError(error.message || 'Adding card failed');
        }
    };

    return (
        <div className='h-screen w-full bg-black flex flex-col'>
            <Nav />
            <div className="bg-black text-white flex min-h-screen flex-col items-center sm:justify-center">
                {/* Your form */}
                <div className="relative mb-40 w-full max-w-lg sm:mt-10">
                    {/* Form content */}
                    <div className="mx-5 border dark:border-b-white/50 dark:border-t-white/50 border-b-white/20 sm:border-t-white/20 shadow-[20px_0_20px_20px] shadow-slate-500/10 dark:shadow-white/20  border-white/20 border-l-white/20 border-r-white/20 sm:shadow-sm">
                        <div className="flex flex-col p-6">
                            {/* Form header */}
                            <h3 className="text-xl font-semibold leading-6 tracking-tighter">Add Card</h3>
                            <p className="mt-1.5 text-sm font-medium text-white/50">Fill out the form to add a new card.</p>
                        </div>
                        <div className="p-6 pt-0">
                            <form onSubmit={handleSubmit}>
                                {/* Form fields */}
                                <div className="mt-4">
                                    <div className="group relative border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                                        <div className="flex justify-between">
                                            <label className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">Card Name</label>
                                        </div>
                                        <div className="flex items-center">
                                            <input type="text" name="cardName" placeholder="Card Name" value={name} onChange={(e) => setCardName(e.target.value)} className="block w-full border-0 bg-transparent p-0 text-sm file:my-1 file:rounded-full file:border-0 file:bg-accent file:px-4 file:py-2 file:font-medium placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 sm:leading-7 text-foreground" />
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <div className="group relative border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                                        <div className="flex justify-between">
                                            <label className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">Card Type</label>
                                        </div>
                                        <div className="flex items-center">
                                            <input type="text" name="cardType" placeholder="Card Type" value={type} onChange={(e) => setCardType(e.target.value)} className="block w-full border-0 bg-transparent p-0 text-sm file:my-1 placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 focus:ring-teal-500 sm:leading-7 text-foreground" />
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <div className="group relative border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                                        <div className="flex justify-between">
                                            <label className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">Power</label>
                                        </div>
                                        <div className="flex items-center">
                                            <input type="number" name="power" placeholder="Power" value={strength} onChange={(e) => setPower(e.target.value)} className="block w-full border-0 bg-transparent p-0 text-sm file:my-1 placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 focus:ring-teal-500 sm:leading-7 text-foreground" />
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <div className="group relative border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                                        <div className="flex justify-between">
                                            <label className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">Quote</label>
                                        </div>
                                        <div className="flex items-center">
                                            <input type="text" name="quote" placeholder="Quote" value={description} onChange={(e) => setQuote(e.target.value)} className="block w-full border-0 bg-transparent p-0 text-sm file:my-1 placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 focus:ring-teal-500 sm:leading-7 text-foreground" />
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4 flex items-center justify-end gap-x-2">
                                    <button className="font-semibold hover:bg-black hover:text-white hover:ring hover:ring-purple-500 transition duration-300 inline-flex items-center justify-center text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-black h-10 px-4 py-2" type="submit"> Add Card</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddCard;
