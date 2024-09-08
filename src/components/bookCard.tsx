import React from 'react';
import Image from 'next/image';

interface BookCardProps {
  book: {
    id: string;
    title: string;
    author_name?: string[];
    published_year?: number;
    public_rating?: number | null; // Updated to allow null or undefined
  };
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const coverImageUrl = `https://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api`;

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl backdrop-blur-md">
      <div className="relative w-full h-72 mb-4 overflow-hidden rounded-lg">
        <Image
          src={coverImageUrl}
          alt={`Cover of ${book.title}`}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
          quality={85}
        />
      </div>
      <div className="flex flex-col h-full">
        <h3 className="text-lg font-bold text-gray-800 mb-1 line-clamp-2">{book.title}</h3>
        <p className="text-sm text-gray-600 mb-2">
          {book.author_name?.length ? `by ${book.author_name.join(', ')}` : 'Author: Unknown'}
        </p>
        <div className="flex items-center mb-2">
          <span className="text-sm text-gray-500 mr-2">
            Published: {book.published_year || 'N/A'}
          </span>
          {book.public_rating != null && typeof book.public_rating === 'number' && (
            <span className="flex items-center text-sm text-yellow-600">
              {Array.from({ length: 5 }, (_, index) => (
                <svg
                  key={index}
                  xmlns="http://www.w3.org/2000/svg"
                  fill={index < book.public_rating ? "currentColor" : "none"}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.049 2.927C11.469 2.356 12.531 2.356 12.951 2.927L14.09 4.958a1 1 0 00.758.52l2.712.398c1.04.151 1.46 1.43.703 2.142l-1.963 1.903a1 1 0 00-.287 1.041l.464 2.715c.177 1.037-1.017 1.808-2.006 1.307L12 13.255l-2.437 1.283a1 1 0 00-1.327-1.292l-2.407-1.382c-1.065-.613-1.978-1.292-2.2-2.315a1 1 0 00.412-1.19l.675-2.272a1 1 0 00-.226-.981L2.9 6.55c-1.09-.711-1.354-1.991-.313-2.812l2.4-1.951a1 1 0 00.553-.765l.6-2.553z"
                  />
                </svg>
              ))}
              <span className="ml-1 text-gray-700">{book.public_rating.toFixed(1)}</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCard;
