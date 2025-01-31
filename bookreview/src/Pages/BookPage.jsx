import React, { useState, useEffect } from 'react';
import BookReview from '../Components/BookReview';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function BookPage() {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`https://book-review-platform-mern.vercel.app/api/v1/book/${id}`);
                setBook(response.data.message); 
                
            } catch (err) {
                setError('Failed to fetch book details: ' + err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBookDetails();
    }, [id]);

    

    return (
        <div >
           
            {book ? (
                <>
                    <BookReview book={book} reviews={book.reviews} />
                </>
            ) : (
                <p>No book details available.</p>
            )}
        </div>
    );
}

export default BookPage;
