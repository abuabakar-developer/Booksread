import React from 'react';
import ReactPaginate from 'react-paginate';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';

interface PaginationProps {
  setItemOffset: (offset: number) => void;
  itemsPerPage: number;
  books: any[]; // Adjust this type based on your book structure
}

const Pagination: React.FC<PaginationProps> = ({ setItemOffset, itemsPerPage, books }) => {
  const handlePageClick = (event: { selected: number }) => {
    const newOffset = event.selected * itemsPerPage;
    setItemOffset(newOffset);
  };

  const totalPages = Math.ceil(books.length / itemsPerPage);

  if (totalPages <= 1) {
    return null; 
  }   
          
  return (
    <div className="flex justify-center items-center mt-8">
      <ReactPaginate
        nextClassName="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-200 transition duration-300"
        previousClassName="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-200 transition duration-300"
        pageClassName="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-200 transition duration-300"
        activeClassName="bg-green-500 text-white border-green-500"
        breakClassName="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-200 transition duration-300"
        containerClassName="flex justify-center items-center space-x-2"
        breakLabel="..."
        previousLabel={<AiOutlineArrowLeft size={20} />}
        nextLabel={<AiOutlineArrowRight size={20} />}
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={totalPages}
        renderOnZeroPageCount={null}
        ariaLabel="Pagination Navigation"
        role="navigation"
      />
    </div>
  );
};

export default Pagination;


