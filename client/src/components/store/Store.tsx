import React, { useEffect, useState } from 'react';
import Nav from '../ui/Nav.tsx';

interface Card {
    id: number;
    name: string;
    type: string;
    strength: string;
    description: string;
    imgUrl?: string;
    createdAt: string;
    updatedAt: string;
    UserId: number;
}

function Store() {
    const [favoriteCards, setFavoriteCards] = useState<Card[]>([]);
    const [loading, setLoading] = useState(true);

    const userId = localStorage.getItem('userId');

    useEffect(() => {
        getFavoriteCards();
    }, []);

    const getFavoriteCards = async () => {
        try {
            const response = await fetch(`http://localhost:3000/cards/favorites/${userId}`);
            const data: Card[] = await response.json();
            setFavoriteCards(data);
            setLoading(false);
        } catch (error) {
            console.log("An error occurred in fetching favorite cards:", error);
            setLoading(false);
        }
    };

    const toggleFavorite = async (cardId: number) => {
        try {
            const response = await fetch(`http://localhost:3000/cards/favorite/${cardId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' }
            });

            if (!response.ok) {
                throw new Error("Failed to remove favorite card");
            }

            // Optimistically remove from UI
            setFavoriteCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
        } catch (error) {
            console.error("Error updating favorite status:", error);
        }
    };

    return (
        <div className='h-screen w-full bg-black flex flex-col'>
            <Nav />
            {loading && (
                <div className='flex justify-center items-center self-center mt-36'>
                    <h1 className='text-white text-[50px] font-extrabold font-monospace'>Loading...</h1>
                </div>
            )}
            {!loading && favoriteCards.length === 0 && (
                <div className='flex justify-center items-center self-center mt-36'>
                    <h1 className='text-white text-[50px] font-extrabold font-monospace'>No favorite cards yet...</h1>
                </div>
            )}
            {!loading && favoriteCards.length > 0 && (
                <div className='self-center flex flex-col md:flex-row gap-10 flex-wrap justify-center mt-20'>
                    {favoriteCards.map((card) => (
                        <div key={card.id} className='w-[250px] h-[500px] border-2 border-white rounded-lg flex flex-col'>
                            <div className='h-4/6 relative rounded-[5px]'>
                                <img
                                    className='border-b-2 border-b-white'
                                    src={`http://localhost:3000/${card.imgUrl?.replace(/\\/g, '/')}`}
                                    alt={card.name}
                                />
                                <div className='rounded-[100%] border-2 border-golden bg-white w-[50px] h-[50px] absolute top-2 left-2 flex items-center justify-center text-black text-[38px] font-monospace font-bold'>
                                    <h1>{card.strength}</h1>
                                </div>
                                {/* Clickable Favorite Star - Removes from favorites */}
                                <button
                                    className='absolute top-[60px] left-5 text-[24px] font-bold'
                                    style={{ color: 'gold' }}
                                    onClick={() => toggleFavorite(card.id)}
                                >
                                    ★
                                </button>
                            </div>
                            <div className='text-white font-monospace flex flex-col items-center mt-10 w-[240px] h-[120px] relative self-center'>
                                <h1 className='text-white font-extrabold text-[30px]'>{card.name}</h1>
                                <h1 className='mt-5'>{card.description}</h1>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Store;
