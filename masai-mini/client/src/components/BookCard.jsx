import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const BookCard = ({ book }) => {
  const { user } = useAuth();

  const handleAdd = async () => {
    if (!user) return alert('Please login to add books');

  const token = localStorage.getItem('token');

  console.log(token);
  
  if (!token) return alert('Authorization token missing');

  try {
   const res = await axios.post(
  `https://mini-project-mme9.onrender.com/api/mybooks/${book._id}`,
  {}, // no body
  {
    headers: {
      'Authorization':token,
      'Content-Type': 'application/json',
    },
  }
);


    console.log(res,"cwe")
    alert('Book added to My Books!');
  } catch (err) {
    alert(err.response?.data?.message || 'Failed to add book');
  }
  };

  return (
    <div className="border rounded-lg p-4 shadow-md bg-white">
      <img src={book.coverImage} alt={book.title} className="w-full h-64 object-cover mb-3" />
      <h3 className="text-lg font-semibold">{book.title}</h3>
      <p className="text-sm text-gray-600 mb-3">By {book.author}</p>
      <button
        onClick={handleAdd}
        className="bg-indigo-600 text-white px-4 py-2 rounded w-full"
      >
        Want to Read
      </button>
    </div>
  );
};

export default BookCard;
