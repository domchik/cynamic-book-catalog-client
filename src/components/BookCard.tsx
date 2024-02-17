import React from 'react';
import {Book} from '../models/Book';
import {Link} from 'react-router-dom';

interface BookCardProps {
    book: Book;
    onDelete: (bookId: number) => void;
}

const BookCard: React.FC<BookCardProps> = ({book, onDelete}) => {
    const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (window.confirm(`Are you sure you want to delete "${book.title}"?`)) {
            onDelete(book.id);
        }
    };
    return (
        <div className="border border-gray-300 shadow-md rounded-md p-4 hover:bg-gray-50">
            <Link to={`/books/${book.id}`}>
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">{book.title}</h3>

                    <button onClick={handleDelete} type="button">
                        <svg className="h-5 w-5 text-red-500 hover:text-red-700" xmlns="http://www.w3.org/2000/svg"
                             fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                        </svg>
                    </button>
                </div>
            </Link>
            <p className="text-gray-600 mt-2">{book.author}</p>
        </div>
    );
};

export default BookCard;
