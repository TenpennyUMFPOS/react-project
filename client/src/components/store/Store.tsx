import React, { useEffect, useState } from 'react';
import Nav from '../ui/Nav.tsx';
import geralt from "../../assets/images/geralt.png";
import yennefer from "../../assets/images/yennefer.png";
import decoy from "../../assets/images/decoy.png";


interface Card {
    id: number;
    name: string;
    type: string;
    strength: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    UserId: number;
}

function Store() {
    const [myCards, setMyCards] = useState<Card[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllCards();
    }, []);

    let userId = localStorage.getItem('userId');

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

    const myImages = [
        geralt, yennefer, decoy
    ];

    return (
        <div className='h-screen w-full bg-black flex flex-col '>
            <Nav />
            {loading && <div className='flex justify-center items-center self-center mt-36  '>
                <h1 className='text-white text-[50px] font-extrabold  font-monospace'>Loading...</h1>
            </div>}
            {!loading && myCards.length === 0 && <div className='flex justify-center items-center self-center mt-36  '>
                <h1 className='text-white text-[50px] font-extrabold  font-monospace'>You have no cards yet...</h1>
            </div>}
            {!loading && myCards.length > 0 && (
                <div className=' self-center flex flex-col md:flex-row gap-10 flex-wrap  justify-center mt-20'>
                    {myCards.map((card) => (
                        <div key={card.id} className='w-[250px] h-[500px] border-2 border-black rounded-lg flex flex-col'>
                            <div className='  h-4/6 relative rounded-[5px] '>
                                <img className='border-b-2 border-b-black' src={myImages[card.id - 1] || decoy} alt="" />
                                <div className=' rounded-[100%] border-2 border-golden bg-white w-[50px] h-[50px] absolute top-2 left-2
                             flex items-center justify-center text-black text-[38px] font-monospace font-bold  '>
                                    <h1>{card.strength}</h1>
                                </div>
                            </div>
                            <div className=' text-black font-monospace flex flex-col  items-center mt-10 w-[240px] h-[120px] relative self-center  '>
                                <h1 className='text-black font-extrabold text-[30px]'>{card.name}</h1>
                                <h1 className='mt-5'> {card.description} </h1>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Store
