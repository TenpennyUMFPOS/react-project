import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Nav from '../ui/Nav.tsx';

interface User {
    username: string;
}

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
    userId: number;
    User: User;
}

interface Comment {
    createdAt: string | number | Date;
    id: number;
    comment: string;
    userId: number;
    cardId: number;
    User: User; // to get the user's name
}

function CardDetails() {
    const { cardId } = useParams<{ cardId: string }>();
    const [card, setCard] = useState<Card | null>(null);
    const [comments, setComments] = useState<Comment[]>([]); // To store the comments
    const [newComment, setNewComment] = useState<string>(''); // For handling new comment input
    const [isLoading, setIsLoading] = useState<boolean>(true); // Loading state

    // Fetch card details
    useEffect(() => {
        const getCardDetails = async () => {
            try {
                const response = await fetch(`http://localhost:3000/card/${cardId}`);
                const data = await response.json();
                setCard(data);
            } catch (error) {
                console.error('Error fetching card details:', error);
            }
        };
        getCardDetails();
    }, [cardId]);

    // Fetch comments when card details are loaded
    useEffect(() => {
        if (cardId) {
            const getComments = async () => {
                try {
                    const response = await fetch(`http://localhost:3000/card/${cardId}/comments`);
                    const data = await response.json();
                    console.log(data); // Log the response data to ensure it's an array
                    setComments(Array.isArray(data) ? data : []); // Ensure the state is always an array
                    setIsLoading(false); // Set loading to false once data is fetched
                } catch (error) {
                    console.error('Error fetching comments:', error);
                    setIsLoading(false);
                }
            };
            getComments();
        }
    }, [cardId]);

    // Handle comment submission
    const handleCommentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Make sure the comment is not empty
        if (!newComment.trim()) {
            alert('Please enter a comment');
            return;
        }

        const userId = localStorage.getItem('userId');

        try {
            const response = await fetch(`http://localhost:3000/addComment/${cardId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId,
                    comment: newComment,
                }),
            });

            if (response.ok) {
                const newCommentData = await response.json();
                setComments((prevComments) => [...prevComments, newCommentData]); // Update the comments list
                setNewComment(''); // Clear the comment input
            } else {
                console.error('Error adding comment:', response.statusText);
            }
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };

    return (
        <div className="h-full w-full bg-black flex flex-col font-monospace">
            <Nav />
            {card ? (
                <div className="flex flex-row gap-10 p-10">
                    {/* Left side: Owner's name and Card details */}
                    <div className="flex flex-col items-center w-1/2 pt-6 pl-10 ml-10">
                        <div className="text-white font-bold text-xl mb-4">
                            Owner: <span className='text-golden'>{card.User.username}</span>
                        </div>
                        <div className="w-3/4 h-auto">
                            <img
                                className="w-full h-full object-cover rounded-md border-2 border-white"
                                src={`http://localhost:3000/${card.imgUrl?.replace(/\\/g, '/')}`}
                                alt={card.name}
                            />
                        </div>
                    </div>

                    {/* Right side: Comment section */}
                    <div className="bg-gray-100 p-6 w-1/2">
                        <h2 className="text-lg font-bold mb-4">Comments</h2>
                        <div className="flex flex-col space-y-4">
                            {/* Display comments */}
                            {isLoading ? (
                                <div className="flex justify-center items-center self-center mt-36">
                                    <h1 className="text-white text-[50px] font-extrabold font-monospace">Loading...</h1>
                                </div>
                            ) : Array.isArray(comments) && comments.length === 0 ? (
                                <p className="text-white">No comments yet. Be the first to comment!</p>
                            ) : Array.isArray(comments) ? (
                                comments.map((comment) => (
                                    <div key={comment.id} className="bg-black text-white p-4 rounded-lg border-[1px] border-green shadow-md">
                                        <div className="flex justify-between">
                                            <h3 className="text-lg font-bold">{comment.User.username}</h3>
                                            <p className="text-gray-700 text-sm mb-2">Posted on {new Date(comment.createdAt).toLocaleDateString()}</p>
                                        </div>
                                        <div className="border-t-2 border-green">
                                            <p className="text-gray-700 mt-3">{comment.comment}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-white">Unexpected error, comments are not in the expected format.</p>
                            )}

                            {/* Add Comment Form */}
                            <form className="bg-black p-4 rounded-lg shadow-md border-[1px] border-purple-500 text-white" onSubmit={handleCommentSubmit}>
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-bold mb-2" htmlFor="comment">
                                        Comment
                                    </label>
                                    <textarea
                                        className="shadow appearance-none border-[1px] border-white bg-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-white"
                                        id="comment"
                                        rows={3}
                                        placeholder="Enter your comment"
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                    />
                                </div>
                                <button
                                    className="font-semibold hover:bg-black hover:text-white hover:ring hover:ring-purple-500 transition duration-300 inline-flex items-center justify-center text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-black h-10 px-4 py-2"
                                    type="submit"
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex justify-center items-center self-center mt-36">
                    <h1 className="text-white text-[50px] font-extrabold font-monospace">Loading...</h1>
                </div>
            )}
        </div>
    );
}

export default CardDetails;
