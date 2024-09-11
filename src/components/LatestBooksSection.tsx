import React, { useEffect, useState } from 'react';
import BookCard from './bookCard';
import Details from '@/app/details/[id]/page';
import { fetchBooks } from '../lib/fetchBooks';
import '@fontsource/poppins';
import '@fontsource/roboto';
import AOS from 'aos';
import 'aos/dist/aos.css';

type Book = { 
  id: string;
  title: string;
  author: string;
};

const LatestBooksSection = ({ latestBooksRef }: { latestBooksRef: React.RefObject<HTMLDivElement> }) => {
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
        AOS.init({ duration: 1000, offset: 100 }); // Initialize AOS
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
    <div
      id="latest-books"
      ref={latestBooksRef}
      className="py-20 bg-gray-100 relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-20">
        <img src="/assets/books-background.svg" alt="Books Background" className="w-full h-full object-cover animate-float-slow" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          className="text-4xl font-bold text-gray-900 mb-10 text-center"
          style={{ fontFamily: 'Poppins, sans-serif' }}
          data-aos="fade-up"
        >
          Discover the Latest Books
        </h2>

        {/* Book Grid with AOS animations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {latestBooks.slice(0, showMore ? 20 : 4).map((book) => (
            <div
              key={book.id}
              onClick={() => handleBookClick(book)}
              className="relative transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl cursor-pointer bg-white backdrop-blur-lg shadow-md rounded-lg p-4"
              data-aos="fade-up"  // AOS animation
              style={{ fontFamily: 'Roboto, sans-serif' }}
            >
              <BookCard book={book} />
              <div className="absolute top-2 right-2 bg-teal-400 text-white rounded-full px-3 py-1 text-xs font-semibold animate-pulse">
                New
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        {!showMore && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handleViewMoreClick}
              className="text-white font-bold py-3 px-8 rounded-full bg-teal-500 hover:bg-teal-600 transition-colors duration-300 shadow-md transform hover:scale-105"
              style={{ fontFamily: 'Poppins, sans-serif' }}
              data-aos="zoom-in"
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
