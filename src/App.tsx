
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import BookList from './pages/BookList';
import BookDetails from './pages/BookDetails';
import AddBook from './pages/AddBook';
import Footer from './components/Footer.tsx';

function App() {
    return (
        <BrowserRouter>
            <div className="min-h-screen flex flex-col">
                <Header/>
                <Routes>
                    <Route path="/" element={<BookList/>}/>
                    <Route path="/books/:bookId" element={<BookDetails/>}/>
                    <Route path="/add" element={<AddBook/>}/>
                </Routes>
                <div className="mt-auto">
                    <Footer/>
                </div>
            </div>
        </BrowserRouter>
    );
}
export default App;
