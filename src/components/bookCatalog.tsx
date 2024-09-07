"use client";
import React, { useEffect, useState } from "react";
import BookCard from "./bookCard";
import Pagination from "./pagination";
import Details from "@/app/details/[id]/page";
import { fetchBooks } from "../lib/fetchBooks";
import LatestBooksSection from "./LatestBooksSection";

type Book = {
  id: string;
  title: string;
  author: string;
};

const BookCatalog = () => {
  const [query, setQuery] = useState("the lord of the rings");
  const [searchType, setSearchType] = useState("intitle");
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 6;
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const booksData = await fetchBooks(`${searchType}:${query}`);
        setBooks(booksData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [query, searchType]);

  const endOffset = itemOffset + itemsPerPage;
  const currentBooks = books.slice(itemOffset, endOffset);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearchTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchType(e.target.value === "title" ? "intitle" : "inauthor");
  };

  const handleBookClick = (book: Book) => {
    setSelectedBookId(book.id);
  };

  if (selectedBookId) {
    return <Details params={{ id: selectedBookId }} />;
  }

  return (
    <div className="py-20 mt-10 h-full w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Latest Books Section */}
        <LatestBooksSection />

        {/* Book Catalog Section */}
        <div className="bg-gradient-to-b from-gray-200 via-gray-300 to-gray-400 py-20 mt-16 rounded-lg shadow-lg">
          <div className="flex flex-col justify-center items-center gap-5 mb-10">
            <h5 className="text-2xl text-gray-900 font-semibold tracking-wide">Book Collection</h5>
            <h2 className="text-5xl text-gray-900 font-extrabold leading-tight text-center">
              Embark on Your Next Adventure
            </h2>
            <div className="flex gap-2 w-full max-w-lg shadow-lg rounded-full overflow-hidden bg-white backdrop-blur-md">
              <input
                type="text"
                value={query}
                onChange={handleSearch}
                placeholder="Search by title or author..."
                className="border-0 p-4 w-full rounded-l-full focus:ring-4 focus:ring-blue-500 outline-none bg-transparent placeholder-gray-500"
              />
              <select
                value={searchType}
                onChange={handleSearchTypeChange}
                className="border-0 p-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-r-full cursor-pointer focus:ring-4 focus:ring-blue-500 outline-none"
              >
                <option value="title">Title</option>
                <option value="author">Author</option>
              </select>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center mt-20">
              <div className="border-t-4 border-b-4 border-blue-600 rounded-full w-16 h-16 animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {currentBooks.map((book: Book) => (
                <div 
                  key={book.id} 
                  onClick={() => handleBookClick(book)} 
                  className="relative transform transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer bg-white backdrop-blur-md shadow-lg rounded-lg p-4"
                >
                  <BookCard book={book} />
                  <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full px-2 py-1 text-xs">New</div>
                </div>
              ))}
            </div>
          )}

          {!isLoading && (
            <div className="mt-10">
              <Pagination
                setItemOffset={setItemOffset}
                itemsPerPage={itemsPerPage}
                books={books}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCatalog;




