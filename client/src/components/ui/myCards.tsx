import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import Nav from './Nav.tsx';

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
    UserId: number;
}

export default function MyCards() {
    const [myCards, setMyCards] = useState<Card[]>([]);
    const [loading, setLoading] = useState(true);
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        getAllCards();
    }, []);

    const getAllCards = async () => {
        try {
            const response = await fetch(`http://localhost:3000/cards/${userId}`);
            const data = await response.json();
            setMyCards(data);
            setLoading(false);
        } catch (error) {
            console.log("An error occurred in fetching cards:", error);
            setLoading(false);
        }
    };

    const toggleFavorite = async (cardId: number, isFavorite: boolean) => {
        try {
            const response = await fetch(`http://localhost:3000/cards/favorite/${cardId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' }
            });

            if (!response.ok) {
                throw new Error("Failed to update favorite status");
            }

            // Update UI immediately (optimistic update)
            setMyCards((prevCards) =>
                prevCards.map((card) =>
                    card.id === cardId ? { ...card, isFavorite: !isFavorite } : card
                )
            );
        } catch (error) {
            console.error("Error updating favorite status:", error);
        }
    };

    return (
        <div className='min-h-screen h-full w-full bg-black flex flex-col'>
            <Nav />
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
                        <div key={card.id} className='w-[250px] h-[500px] border-2 border-white rounded-lg flex flex-col'>
                            <div className='h-4/6 relative rounded-[5px]'>
                                <img
                                    className='border-b-2 border-b-white'
                                    src={`http://localhost:3000/${card.imgUrl?.replace(/\\/g, '/')}`}
                                    alt={card.name}
                                />
                                <div className='rounded-[100%] border-2 border-golden bg-white w-[50px] h-[50px] absolute top-2 left-2 flex items-center justify-center text-white text-[38px] font-monospace font-bold'>
                                    <h1 className='text-black'>{card.strength}</h1>
                                </div>
                                {/* Clickable favorite star */}
                                <button
                                    className='absolute top-[60px] left-5 text-[24px] font-bold'
                                    style={{ color: card.isFavorite ? 'gold' : 'white' }}
                                    onClick={() => toggleFavorite(card.id, card.isFavorite)}
                                >
                                    {card.isFavorite ? '★' : '☆'}
                                </button>
                            </div>
                            <div className='text-white font-monospace flex flex-col items-center mt-10 w-[240px] h-[120px] relative self-center'>
                                {/* Wrap the card name in a Link */}
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
