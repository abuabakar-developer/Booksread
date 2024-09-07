import React, { useEffect, useState } from 'react';
import BookCard from './bookCard';
import Details from '@/app/details/[id]/page';
import { fetchBooks } from '../lib/fetchBooks';
import '@fontsource/poppins'; // Importing the "Poppins" font
import '@fontsource/montserrat'; // Montserrat for author
import '@fontsource/roboto-mono';

type Book = {
  id: string;
  title: string;
  author: string;
};

const LatestBooksSection = () => {
  const [latestBooks, setLatestBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const fetchLatestBooks = async () => {
      try {
        setIsLoading(true);
        const booksData = await fetchBooks('orderBy=newest');
        setLatestBooks(booksData.slice(0, 20));
      } catch (error) {
        console.error('Error fetching latest books:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLatestBooks();
  }, []);

  const handleBookClick = (book: Book) => {
    setSelectedBookId(book.id);
  };

  const handleViewMoreClick = () => {
    setShowMore(true);
  };

  if (selectedBookId) {
    return <Details params={{ id: selectedBookId }} />;
  }

  return (
    <div className="py-20 bg-gradient-to-b from-teal-300 via-green-300 to-yellow-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          className="text-4xl font-bold text-gray-900 mb-10 text-center"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          Discover the Latest Books
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {latestBooks.slice(0, showMore ? 20 : 4).map((book) => (
            <div
              key={book.id}
              onClick={() => handleBookClick(book)}
              className="relative transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl cursor-pointer bg-white backdrop-blur-lg shadow-lg rounded-lg p-4"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              <BookCard book={book} />
              <div className="absolute top-2 right-2 bg-teal-500 text-white rounded-full px-3 py-1 text-xs font-semibold animate-pulse">
                New
              </div>
            </div>
          ))}
        </div>
        {!showMore && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handleViewMoreClick}
              className="text-white font-bold py-3 px-8 rounded-full bg-teal-500 hover:bg-green-500 transition-colors duration-300"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              View More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LatestBooksSection;


