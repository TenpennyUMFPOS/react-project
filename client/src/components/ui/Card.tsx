import React from 'react'
import { Link } from 'react-router-dom'
export default function Card({ card, setMyCards }) {
    const toggleFavorite = async (cardId: number, isFavorite: boolean) => {
        try {
            const response = await fetch(`http://localhost:3000/cards/favorite/${cardId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' }
            });

            if (!response.ok) {
                throw new Error("Failed to update favorite status");
            }


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
        <div key={card.id} className='w-[250px] h-[500px] border-2 border-white rounded-lg flex flex-col'>
            <div className='h-4/6 relative rounded-[5px]'>
                <img
                    className='border-b-2 border-b-white'
                    src={`http://localhost:3000/${card.imgUrl?.replace(/\\/g, '/')}`}
                    alt={card.name}
                />
                <div className='rounded-[100%] border-2 border-red bg-white w-[50px] h-[50px] absolute top-2 left-2 flex items-center justify-center text-white text-[38px] font-monospace font-bold'>
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

                <Link to={`/card-details/${card.id}`} className='text-white font-extrabold text-[30px]'>
                    {card.name}
                </Link>
                <h1 className='mt-5'>{card.description}</h1>
            </div>
        </div>
    )
}
