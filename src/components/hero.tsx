"use client";
import React, { useRef } from 'react';

const Hero: React.FC = () => {
  // Reference to the Latest Books section
  const latestBooksRef = useRef<HTMLDivElement | null>(null);

  // Scroll to Latest Books section
  const handleScrollToLatestBooks = () => {
    if (latestBooksRef.current) {
      latestBooksRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <div
        className="relative h-[calc(100vh-75px)] w-full bg-center bg-cover bg-fixed"
        style={{ backgroundImage: 'url("/read.jpeg")' }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-gray-900 opacity-80"></div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-start justify-center h-full px-6 md:px-12 lg:px-24 text-white space-y-4">
          
          {/* Hero Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-tight mb-4 drop-shadow-lg animate-fadeIn">
            Discover Your Next <br /> Great <span className="text-yellow-400">Read</span>
          </h1>

          {/* Hero Subtext */}
          <p className="text-lg sm:text-xl lg:text-2xl max-w-lg drop-shadow-md opacity-90 animate-fadeIn delay-200">
            Dive into our vast collection and explore new worlds with immersive stories and insights.
          </p>

          {/* Special Offer */}
          <p className="text-xl sm:text-2xl lg:text-3xl text-yellow-300 font-semibold opacity-95 animate-fadeIn delay-400">
            <strong>New Arrival:</strong> "The Enchanted Forest" - Get 20% off this week!
          </p>   

          {/* Call-to-Action Button */}
          <button
            onClick={handleScrollToLatestBooks}
            className="px-8 py-4 bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-semibold rounded-full transition-transform transform hover:scale-105 duration-300 shadow-2xl hover:shadow-yellow-500/50 animate-fadeIn delay-600"
          >
            Shop Now
          </button>
        </div>
      </div>

      {/* Latest Books Section */}
      <div ref={latestBooksRef} className="latest-books-section py-16 bg-gradient-to-b from-gray-100 via-white to-gray-100 relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 bg-book-pattern bg-center bg-cover"></div>

        {/* Latest Books Heading */}
        <div className="relative z-10 text-center">
          <h2 className="text-5xl sm:text-6xl font-extrabold text-gray-800 mb-4 tracking-tight">
            Latest <span className="text-yellow-500">Books</span>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Hero;
