"use client";
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import BookCard from "./bookCard";
import Pagination from "./pagination";
import Details from "@/app/details/[id]/page";
import { fetchBooks } from "../lib/fetchBooks";
import { SearchIcon } from "@heroicons/react/solid"; 

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
    AOS.init({
      duration: 1000, 
      easing: "ease-in-out", 
      once: true, 
    });

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
    <div className="py-20 mt-10 h-full w-full bg-gradient-to-br from-gray-100 to-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
        <div id="book-catalog-search" className="bg-white shadow-xl rounded-lg p-8" data-aos="fade-up">
          <div className="flex flex-col items-center gap-5 mb-10">
            <h5 className="text-3xl font-bold text-gray-900">Book Collection</h5>
            <h2 className="text-6xl font-extrabold text-gray-900 text-center">
              Embark on Your Next Adventure
            </h2>
          
            <div className="relative flex gap-2 w-full max-w-lg bg-gray-50 rounded-full shadow-md">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <SearchIcon className="w-5 h-5 text-gray-500" />
              </span>
              <input
                type="text"
                value={query}
                onChange={handleSearch}
                placeholder="Search by title or author..."
                className="border-0 p-4 pl-10 w-full rounded-l-full focus:ring-2 focus:ring-blue-500 outline-none bg-transparent placeholder-gray-600"
              />
              <select
                value={searchType}
                onChange={handleSearchTypeChange}
                className="border-0 p-4 bg-blue-600 text-white rounded-r-full cursor-pointer focus:ring-2 focus:ring-blue-500 outline-none"
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentBooks.map((book: Book) => (
                <div 
                  key={book.id} 
                  onClick={() => handleBookClick(book)} 
                  className="relative transform transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer bg-white shadow-lg rounded-lg p-6"
                  data-aos="fade-up"
                >
                  <BookCard book={book} />
                  <div className="absolute top-2 right-2 bg-blue-600 text-white rounded-full px-2 py-1 text-xs font-semibold">
                    New
                  </div>
                </div>
              ))}
            </div>
          )}

          {!isLoading && (
            <div className="mt-10" data-aos="fade-up">
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
