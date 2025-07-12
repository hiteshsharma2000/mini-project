import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <img
        src="https://placehold.co/400x300?text=404+Not+Found"
        alt="404 Not Found"
        className="mb-6"
      />
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
        Page Not Found
      </h1>
      <p className="text-gray-600 text-center mb-6 max-w-md">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link
        to="/"
        className="inline-block px-6 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
