import React from 'react';
import BookForm from '../components/BookForm';
import {Book} from '../models/Book.ts';
import {bookService} from '../services/bookService.ts';
import {useNavigate} from 'react-router-dom';
import ServerError from '../components/ServerError.tsx';

const AddBook: React.FC = () => {
    const navigate = useNavigate();
    const [errorFetching, setErrorFetching] = React.useState(false);
    const handleBookSubmit = async (book: Book) => {
        try {
            await bookService.addBook(book);
            navigate('/');
        } catch (error) {
            console.error('Error adding a book details:', error);
            setErrorFetching(true);
        }
    };
    return (
        <div>
            {
                errorFetching ?
                    <>
                  <ServerError/>
                    <BookForm onSubmit={handleBookSubmit}/>
                    </>
                    : <BookForm onSubmit={handleBookSubmit}/>
            }
        </div>
    );
};

export default AddBook;
