import React, { useEffect, useState } from 'react';
import Nav from '../../components/ui/Nav.tsx';
import Card from '../../components/ui/Card.tsx';

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

function FavoriteCards() {
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


    return (
        <div className="min-h-screen w-full bg-black flex flex-col">
            {/* Main content wrapper that grows to fill remaining space */}
            <div className="flex-1 flex flex-col">
                {/* Loading state */}
                {loading && (
                    <div className="flex justify-center items-center self-center mt-36">
                        <h1 className="text-white text-[50px] font-extrabold font-monospace">Loading...</h1>
                    </div>
                )}

                {/* No favorites */}
                {!loading && favoriteCards.length === 0 && (
                    <div className="flex justify-center items-center self-center mt-36">
                        <h1 className="text-white text-[50px] font-extrabold font-monospace">
                            No favorite cards yet...
                        </h1>
                    </div>
                )}

                {/* Favorite cards grid */}
                {!loading && favoriteCards.length > 0 && (
                    <div className="self-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-10 mb-10">
                        {favoriteCards.map((card) => (
                            <Card card={card} setMyCards={setFavoriteCards} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default FavoriteCards;
