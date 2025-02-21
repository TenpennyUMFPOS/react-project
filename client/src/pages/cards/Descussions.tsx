import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Card {
    imgUrl: string | undefined;
    id: number;
    name: string;
    type: string;
    strength: string;
    description: string;
    isFavorite: boolean;
    createdAt: string;
    updatedAt: string;
    userId: number | undefined; // Changed to match backend response
}

export default function Descussions() {
    const [myCards, setMyCards] = useState<Card[]>([]);
    const [loading, setLoading] = useState(true);

    const storedUserId = localStorage.getItem('userId');

    useEffect(() => {
        getAllCards();
    }, []);

    const getAllCards = async () => {
        try {
            const response = await fetch(`http://localhost:3000/getCards`);
            const data = await response.json();
            setMyCards(data);
            setLoading(false);
        } catch (error) {
            console.log("An error occurred in fetching cards:", error);
            setLoading(false);
        }
    };

    return (
        <div className='min-h-screen h-full w-full bg-black flex flex-col'>
            {loading && (
                <div className='flex justify-center items-center self-center mt-36'>
                    <h1 className='text-white text-[50px] font-extrabold font-monospace'>Loading...</h1>
                </div>
            )}
            {!loading && myCards.length === 0 && (
                <div className='flex justify-center items-center self-center mt-36'>
                    <h1 className='text-white text-[50px] font-extrabold font-monospace'>You have no cards yet..</h1>
                </div>
            )}
            {!loading && myCards.length > 0 && (
                <div className='self-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-10 mb-10'>
                    {myCards.map((card) => (
                        <div key={card.id} className='w-[250px] h-[500px] border-2 border-white rounded-lg flex flex-col relative overflow-hidden'>
                            <div className='h-4/6 relative rounded-[5px]'>
                                {/* Card image */}
                                <img
                                    className='border-b-2 border-b-white w-full h-full object-cover rounded-t-lg'
                                    src={`http://localhost:3000/${card.imgUrl?.replace(/\\/g, '/')}`}
                                    alt={card.name}
                                />
                                {/* Strength badge on top-left */}
                                <div className='rounded-full border-2 border-red bg-white w-[50px] h-[50px] absolute top-2 left-2 flex items-center justify-center text-white text-[38px] font-monospace font-bold'>
                                    <h1 className='text-black'>{card.strength}</h1>
                                </div>

                                {/* Owned Ribbon (Only if userId matches storedUserId) */}
                                {storedUserId && card.userId !== undefined && card.userId.toString() === storedUserId && (
                                    <div className="absolute top-0 right-0">
                                        <div
                                            className="bg-red-500 text-white text-xs bg-red font-bold text-center px-4 py-1 mr-[-3px] shadow-lg"
                                            style={{
                                                transform: 'rotate(45deg)',
                                                position: 'absolute',
                                                top: '10px',
                                                right: '-20px',
                                                width: '100px',
                                                boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.6)',
                                            }}
                                        >
                                            Owned
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className='text-white font-monospace flex flex-col items-center mt-10 w-[240px] h-[120px] relative self-center'>
                                <Link to={`/card-details/${card.id}`} className='text-white font-extrabold text-[30px]'>
                                    {card.name}
                                </Link>
                                <h1 className='mt-5'>{card.description}</h1>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
