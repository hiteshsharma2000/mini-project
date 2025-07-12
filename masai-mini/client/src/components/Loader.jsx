import React from 'react';

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 animate-background">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white font-bold text-xl animate-pulse">Loading</span>
        </div>
      </div>
    </div>
  );
};

export default Loader;
