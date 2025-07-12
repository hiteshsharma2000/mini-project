import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';

const statusOptions = ['Want to Read', 'Currently Reading', 'Read'];

const MyBooks = () => {
  const { user } = useAuth();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMyBooks = async () => {
    const token = localStorage.getItem('token');
    try {
    const res = await axios.get('https://mini-project-mme9.onrender.com/api/mybooks', {
  headers: {
    Authorization:token,
    'Content-Type': 'application/json',
  },
});
console.log("dsvsdevsde",res.data);
setBooks(res.data)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch My Books');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyBooks();
  }, []);

  const updateStatus = async (bookId, status) => {
    const token = localStorage.getItem('token');
    console.log(bookId);
    
    try {
      let res=await axios.patch(`https://mini-project-mme9.onrender.com/api/mybooks/${bookId}/status`, { status }, {
        headers: {
          Authorization:`${token}`,
          'Content-Type': 'application/json',
        },
      });
   console.log(res)
      setBooks((prev) =>
        prev.map((b) =>
          b._id === bookId ? { ...b, status } : b
        )
      );
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update status');
    }
  };

  const updateRating = async (bookId, rating) => {
    const token = localStorage.getItem('token');
    try {
    let res=await axios.patch(`https://mini-project-mme9.onrender.com/api/mybooks/${bookId}/rating`, { rating }, {
        headers: {
          Authorization: `${token}`,
          'Content-Type': 'application/json',
        },
      });
      console.log(res.data)
      setBooks((prev) =>
        prev.map((b) =>
          b._id === bookId ? { ...b, rating } : b
        )
      );
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update rating');
    }
  };

  if (loading) return <Loader/>;
  if (error) return <h1 className="text-center text-red-600">{error}</h1>;

  if (!books.length) return <h2 className="text-center">No books in your list yet.</h2>;

  return (
  <div className="space-y-6 p-4">
    <h1 className="text-2xl font-bold mb-4">My Books</h1>

    {/* Handle error / empty / invalid states */}
    {(!books || books.length === 0) ? (
      <p className="text-gray-500">No books added yet.</p>
    ) : (
      books.map((b) => {
        if (!b.bookId) {
          return (
            <div
              key={b._id}
              className="border rounded p-4 shadow bg-red-50 text-red-600"
            >
              ⚠️ This book entry is invalid or has been removed.
            </div>
          );
        }

        return (
          <div
            key={b._id}
            className="border rounded p-4 shadow flex flex-col md:flex-row gap-4 items-start"
          >
            <img
              src={b.bookId.coverImage || 'https://placehold.co/128x180?text=No+Image'}
              alt={b.bookId.title || 'Untitled'}
              className="w-32 h-44 object-cover bg-gray-100"
              onError={(e) => {
                e.target.src = 'https://placehold.co/128x180?text=Image+Error';
              }}
            />

            <div className="flex-1 space-y-2">
              <h2 className="text-lg font-semibold">
                {b.bookId.title || 'Untitled'}
              </h2>
              <p className="text-sm text-gray-600">
                By {b.bookId.author || 'Unknown Author'}
              </p>

              <div className="space-x-2">
                <label>Status:</label>
                <select
                  value={b.status}
                  onChange={(e) => updateStatus(b._id, e.target.value)}
                  className="border px-2 py-1 rounded"
                >
                  {statusOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div className="space-x-2">
                <label>Rating:</label>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    className={`text-xl ${b.rating >= star ? 'text-yellow-500' : 'text-gray-400'}`}
                    onClick={() => updateRating(b._id, star)}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      })
    )}
  </div>
);

};

export default MyBooks;
