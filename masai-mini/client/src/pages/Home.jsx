import { useEffect, useState } from 'react';
import axios from 'axios';
import BookCard from '../components/BookCard';
import Loader from '../components/Loader';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // 🔹 Track error

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get('https://mini-project-mme9.onrender.com/api/books');
        if (Array.isArray(res.data)) {
            console.log(res.data)
          setBooks(res.data);
        } else {
          throw new Error('Unexpected response from server');
        }
        setError(null); // clear error if successful
      } catch (err) {
        console.error('Error fetching books:', err);
        setError(err?.response?.data?.message || 'Failed to fetch books');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) return <Loader/>

  if (error) return <h1 className="text-center text-red-600">{error}</h1>;

  if (books.length === 0)
    return <h1 className="text-center text-gray-600">No books found.</h1>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {books.map((book) => (
        <BookCard key={book._id} book={book} />
      ))}
    </div>
  );
};

export default Home;
