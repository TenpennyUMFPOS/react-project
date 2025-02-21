import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import Card from '../../components/ui/Card.tsx';

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

export default function CardsPage() {
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
                        <Card card={card} setMyCards={setMyCards} />
                    ))}
                </div>
            )}
        </div>
    );
}
