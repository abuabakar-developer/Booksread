// components/BookList.tsx
'use client'

import { useState, useEffect, ChangeEvent } from 'react';
import { fetchBooks } from '../lib/fetchBooks';

interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    description?: string;
  };
}

interface BookListProps {
  initialQuery?: string;
}

const BookList: React.FC<BookListProps> = ({ initialQuery = 'harry potter' }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [query, setQuery] = useState(initialQuery);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getBooks = async () => {
      if (query.trim() === '') return;
      setLoading(true);
      try {
        const fetchedBooks = await fetchBooks(query);
        setBooks(fetchedBooks);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
      setLoading(false);
    };

    getBooks();
  }, [query]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div>
      <input 
        type="text" 
        value={query}
        onChange={handleSearch}
        placeholder="Search for books by title or author"
        className="border p-2 mb-4 w-full"
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {books?.map((book) => (
            <div key={book.id} className="border p-4">
              <h2 className="font-bold">{book.volumeInfo?.title ?? 'No Title Available'}</h2>
              <p>{book.volumeInfo?.authors?.join(', ') ?? 'Unknown Author'}</p>
              <p>{book.volumeInfo?.description?.substring(0, 100) ?? 'No Description Available'}...</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookList;
