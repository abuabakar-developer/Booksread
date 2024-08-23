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
    <div className="bg-white/70 dark:bg-gray-800/70 p-6 rounded-xl shadow-lg transform transition-transform hover:scale-105 hover:rotate-1 hover:shadow-2xl backdrop-blur-lg">
      <div className="relative w-full h-64 mb-6 overflow-hidden rounded-lg">
        <Image
          src={coverImageUrl}
          alt={`Cover of ${book.title}`}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
          quality={85}
        />
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">{book.title}</h3>
      <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">Author: {book.author_name?.join(', ') || 'Unknown'}</p>
      <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">Published: {book.published_year || 'N/A'}</p>
      <p className="text-sm text-gray-700 dark:text-gray-300">Rating: {book.public_rating ? `${book.public_rating} / 5` : 'N/A'}</p>
    </div>
  );
};

export default BookCard;

