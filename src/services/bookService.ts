import axios from 'axios';
import {Book} from '../models/Book';

const apiUrl = 'http://localhost:3002'; // for the sake of simplicity

const genres = ['Science Fiction', 'Satire', 'Drama', 'Action', 'Romance', 'Mystery', 'Horror'];
const getAllBooks = async (): Promise<Book[]> => {
    try {
        const response = await axios.get(`${apiUrl}/books`);
        return response.data;
    } catch (error) {
        console.error("Error getting books:", error);
        throw error;
    }
};

const getBookById = async (bookId: string | undefined): Promise<Book> => {
    try {
        const response = await axios.get(`${apiUrl}/books/${bookId}`);
        return response.data;
    }
    catch (error) {
        console.error(`Error getting book ${bookId} :`, error);
        throw error;
    }
}
const addBook = async (book: Book): Promise<void> => {
    try {
        delete book?.id;
        const response = await axios.post(`${apiUrl}/books`, book);
        console.log(response);
    } catch (error) {
        console.error(`Error adding book ${book.id} :`, error);
        throw error;
    }
};

const updateBook = async (book: Book): Promise<void> => {
    try {
        const response = await axios.put(`${apiUrl}/books/${book.id}`, book);
        console.log(response);
    } catch (error) {
        console.error(`Error adding book:`, error);
        throw error;
    }
};

const deleteBook = async (bookId: number): Promise<void> => {
    try {
        const response = await axios.delete(`${apiUrl}/books/${bookId}`);
    } catch (error) {
        console.error(`Error deleting book ${bookId}:`, error);
       throw error;
    }
};


export const bookService = {
    getAllBooks,
    genres,
    addBook,
    getBookById,
    deleteBook,
    updateBook
};

