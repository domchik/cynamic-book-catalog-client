import React from 'react';
import { useParams } from 'react-router-dom';
import { Book } from '../models/Book.ts';
import { bookService } from '../services/bookService.ts';
import { useNavigate } from "react-router-dom";
import BookForm from '../components/BookForm.tsx';
import LoadingSpinner from '../components/LoadingSpinner.tsx';
import ServerError from '../components/ServerError.tsx';


const BookDetails: React.FC = () => {
    const { bookId } = useParams();
    const [book, setBook] = React.useState<Book>();
    const navigate = useNavigate();
    const [errorFetching, setErrorFetching] = React.useState(false);
    React.useEffect(() => {
        const fetchBook = async () => {
            try {
                const bookData = await bookService.getBookById(bookId);
                setBook(bookData);
            } catch (error) {
                console.error('Error fetching book details:', error);
                setErrorFetching(true);
            }
        };

        fetchBook();
    }, [bookId]);

    const handleBookSubmit = async (book: Book) => {
        if (book.id) {
            try {
                await bookService.updateBook(book);
                navigate('/');
            } catch (error) {
                console.error('Error updating the book details:', error);
                setErrorFetching(true);
            }
            return;
        }
        await bookService.addBook(book);
        navigate('/');
        console.log(book);
    };

    if (errorFetching) {
        return (
            <ServerError/>
        );
    }

    if (book) {
        return (
            <div className="container mx-auto p-6">
                <h1 className="text-4xl font-semibold text-gray-800 mb-6 text-center">
                    Book Details: {book.title}
                </h1>
                <BookForm onSubmit={handleBookSubmit} initialBook={book} />
            </div>
        );
    }

    return <LoadingSpinner loadingText="Loading book..." />;

};


export default BookDetails;
