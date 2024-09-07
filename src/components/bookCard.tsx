import React from 'react';
import Image from 'next/image';

interface BookCardProps {
  book: {
    id: string;
    title: string;
    author_name?: string[];
    published_year?: number;
    public_rating?: number;
  };
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const coverImageUrl = `https://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api`;

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl backdrop-blur-md">
      <div className="relative w-full h-64 mb-4 overflow-hidden rounded-lg">
        <Image
          src={coverImageUrl}
          alt={`Cover of ${book.title}`}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
          quality={85}
        />
      </div>
      <h3 className="text-xl font-semibold mb-2 line-clamp-2 text-gray-800">
        {book.title}
      </h3>
      <p className="text-sm mb-1 text-gray-600">
        Author: {book.author_name?.join(', ') || 'Unknown'}
      </p>
      <p className="text-xs mb-1 text-gray-500">
        Published: {book.published_year || 'N/A'}
      </p>
      <p className="text-sm text-gray-700">
        Rating: {book.public_rating ? `${book.public_rating} / 5` : 'N/A'}
      </p>
    </div>
  );
};

export default BookCard;
