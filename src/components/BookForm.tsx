import React, {useEffect, useState} from 'react';
import { Book } from '../models/Book';
import { bookService } from '../services/bookService';
import  ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

interface BookFormProps {
    initialBook?: Book;
    onSubmit: (book: Book) => void;
}

const BookForm: React.FC<BookFormProps> = ({ initialBook , onSubmit}) => {
    const [formData, setFormData] = useState<Book>({
        id: initialBook?.id || '',
        title: initialBook?.title || '',
        description: initialBook?.description || '',
        author: initialBook?.author || '',
        publicationDate: null,
        price: initialBook?.price || '',
        genre: initialBook?.genre || ''
    } as Book);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [errors, setErrors] = useState<{ [fieldName: string]: string }>({});
    const submitButtonLabel = initialBook ? 'Update book' : 'Add book';

    useEffect(() => {
        const newFormData = {
            id: initialBook?.id || '',
            title: initialBook?.title || '',
            description: initialBook?.description || '',
            author: initialBook?.author || '',
            publicationDate: null,
            price: initialBook?.price || '',
            genre: initialBook?.genre || ''
        } as Book;

        if (initialBook?.publicationDate) {
            newFormData.publicationDate = initialBook.publicationDate;
            setSelectedDate(new Date(initialBook.publicationDate));
        } else {
            setSelectedDate(null);
        }

        setFormData(newFormData);
    }, [initialBook]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData((prevData) => ({
            ...prevData,
            [event.target.name]: event.target.value
        }));
    };
    const handleDatePickerChange = (date: Date) => {
        setSelectedDate(date);
        setFormData((prevData: Book) => ({
            ...prevData,
            publicationDate : date
        }));
    };

    const validateForm = () => {
        let hasErrors = false;
        const newErrors = {} as { [fieldName: string]: string };
        if (!bookService.genres.includes(formData.genre)) {
            newErrors.genre = 'Please select a genre';
            hasErrors = true;
        }
        if (!formData.title) {
            newErrors.title = 'Title is required';
            hasErrors = true;
        }

        if (!formData.description) {
            newErrors.description = 'Description is required';
            hasErrors = true;
        }

        if (!formData.price) {
            newErrors.price = 'Price is required';
            hasErrors = true;
        }

        if (!formData.author) {
            newErrors.author = 'Author is required';
            hasErrors = true;
        }

        if (!selectedDate) {
            newErrors.publicationDate = 'Publication date is required';
            hasErrors = true;
        }

        if (!formData.price) {
            newErrors.price = 'Price is required';
            hasErrors = true;
        }
        setErrors(newErrors);
        return hasErrors;
    };



    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        debugger
        event.preventDefault();
        const hasErrors = validateForm();
        if (!hasErrors) {
            onSubmit(formData);
        }
    };

    useEffect(() => {
        if (initialBook) {
            setFormData(initialBook);
        }
    }, [initialBook]);
    return (
        <div className="container mx-auto p-6 max-w-5xl">
            {!initialBook ?  <h2 className="text-2xl font-bold mb-6">Add New Book</h2> : null}
            <form onSubmit={handleSubmit} className="shadow-md p-6 rounded-md">
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 font-medium mb-2">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        className="border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm p-2 w-full"
                        value={formData.title}
                        onChange={handleInputChange}
                    />
                    {errors.title && <span className="text-red-500 text-sm">{errors.title}</span>}
                </div>

                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700 font-medium mb-2">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        className="border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm p-2 w-full"
                        value={formData.description}
                        onChange={handleInputChange}
                    />
                    {errors.description && <span className="text-red-500 text-sm">{errors.description}</span>}
                </div>

                <div className="mb-4">
                    <label htmlFor="author" className="block text-gray-700 font-medium mb-2">Author</label>
                    <input
                        type="text"
                        id="author"
                        name="author"
                        className="border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm p-2 w-full"
                        value={formData.author}
                        onChange={handleInputChange}
                    />
                    {errors.author && <span className="text-red-500 text-sm">{errors.author}</span>}
                </div>

                <div className="mb-4">
                    <label htmlFor="publicationDate" className="block text-gray-700 font-medium mb-2">Publication
                        Date</label>
                    <ReactDatePicker
                        id="publicationDate"
                        name="publicationDate"
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        dateFormat="yyyy-MM-dd"
                        selected={selectedDate}
                        onChange={handleDatePickerChange}
                    />
                    {errors.publicationDate && <span className="text-red-500 text-sm m-2">{errors.publicationDate}</span>}
                </div>


                <div className="mb-4">
                    <label htmlFor="price" className="block text-gray-700 font-medium mb-2">Price</label>
                    <input
                        type="text"
                        id="price"
                        name="price"
                        className="border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm p-2 w-full"
                        value={formData.price}
                        onChange={handleInputChange}
                    />
                    {errors.price && <span className="text-red-500 text-sm">{errors.price}</span>}
                </div>

                <div className="mb-4">
                    <label htmlFor="genre" className="block text-gray-700 font-medium mb-2">Genre</label>
                    <select
                        id="genre"
                        name="genre"
                        className="border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 appearance-none rounded-md shadow-sm p-2 w-full"
                        value={formData.genre}
                        onChange={handleInputChange}
                    >
                        <option value="">Select a Genre</option>
                        {bookService.genres.map((genreOption) => (
                            <option key={genreOption} value={genreOption}>
                                {genreOption}
                            </option>
                        ))}
                    </select>
                    {errors.genre && <span className="text-red-500 text-sm">{errors.genre}</span>}
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md w-full mt-4">
                    {submitButtonLabel}
                </button>
            </form>
        </div>
    );
};

export default BookForm;
