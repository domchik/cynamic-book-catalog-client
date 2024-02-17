import React, { useState, useEffect } from 'react';
import { Book } from '../models/Book';
import BookCard from '../components/BookCard';
import { bookService } from '../services/bookService';
import NoBooksFound from '../components/NoBooksFound';
import LoadingSpinner from '../components/LoadingSpinner.tsx';
import ServerError from '../components/ServerError.tsx';

const BookList: React.FC = () => {
    const [allBooks, setAllBooks] = useState<Book[]>([]);
    const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
    const [errorFetching, setErrorFetching] = useState(false);
    useEffect(() => {
        const loadBooks = async () => {
            setIsLoading(true);
            try {
                const fetchedBooks = await bookService.getAllBooks();
                setAllBooks(fetchedBooks);
            } catch (error) {
                console.error('Error fetching books:', error);
                setErrorFetching(true);
            } finally {
                setIsLoading(false);
            }
        };
        loadBooks();
    }, []);

    useEffect(() => {
        const filterBooks = () => {
            const normalizedSearchTerm = searchTerm.toLowerCase();
            setFilteredBooks(allBooks.filter(book => (
                book.title.toLowerCase().includes(normalizedSearchTerm) ||
                book.author.toLowerCase().includes(normalizedSearchTerm) ||
                book.description.toLowerCase().includes(normalizedSearchTerm)
            )));
        };

        filterBooks();
    }, [searchTerm, allBooks]);

    useEffect(() => {
        const filterBooksByGenre = () => {
            if (selectedGenre) {
                setFilteredBooks(allBooks.filter(book => book.genre === selectedGenre));
            } else {
                setFilteredBooks(allBooks);
            }
        };
        filterBooksByGenre();
    }, [selectedGenre, allBooks]);

    const handleDeleteBook = async (bookId: number) => {
        try {
           await bookService.deleteBook(bookId);
            setAllBooks((prevBooks) => {
              return   prevBooks.filter((book) => book.id !== bookId)
            })
            setFilteredBooks((prevBooks) => {
                return prevBooks.filter((book) => book.id !== bookId)}
            );
        } catch (error) {
            setErrorFetching(true);
            console.error("Error deleting book:", error);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Book Catalog</h1>
            <div className="mb-4">
                <label htmlFor="genre-dropdown" className="block text-gray-700 font-medium mb-2">Filter by
                    Genre:</label>
                <select
                    value={selectedGenre || ''}
                    onChange={(e) => setSelectedGenre(e.target.value)}
                    className="border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm p-2 w-full"
                >
                    <option value="">All Genres</option>
                    {bookService.genres.map((genre) => (
                        <option key={genre} value={genre}>
                            {genre}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by title, author, or description"
                    className="border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm p-2 w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} // Ideally I would add debounce function here
                />
            </div>

            {isLoading && <LoadingSpinner loadingText={'Loading books...'}/>}

            {errorFetching && (
               <ServerError/>
            )}

            {!isLoading && filteredBooks.length === 0 && (
                <NoBooksFound/>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredBooks.map((book) => (
                    <BookCard key={book.id} book={book} onDelete={handleDeleteBook} />
                ))}
            </div>
        </div>
    );
};

export default BookList;
