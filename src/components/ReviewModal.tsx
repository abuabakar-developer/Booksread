import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { AiOutlineClose } from 'react-icons/ai';

interface ReviewModalProps {
  handleHideModal: () => void;
  bookId: string;
  onSubmit: (review: any) => void;
}

const ReviewModal: React.FC<ReviewModalProps> = ({ handleHideModal, bookId, onSubmit }) => {
  const { data: session } = useSession();
  const [rating, setRating] = useState(1);
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!rating || !content) {
      return;
    }

    try {
      const body = {
        rating,
        content,
        bookId,
        userName: session?.user?.name || 'Anonymous',
      };

      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const result = await response.json();

      if (response.ok) {
        onSubmit(result);
        handleHideModal();
      } else {
        console.error('Error submitting review:', result.message);
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div
        className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 sm:p-12 
                  transform transition-transform duration-300 scale-95 hover:scale-100"
      >
        <AiOutlineClose
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 cursor-pointer"
          size={28}
          onClick={handleHideModal}
          aria-label="Close Modal"
        />
        <h2 className="text-center text-3xl sm:text-4xl font-semibold text-gray-800 mb-6">Write a Review</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <label htmlFor="rating" className="block text-gray-600 mb-2">Rating (1-5)</label>
            <input
              type="number"
              id="rating"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              min={1}
              max={5}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none 
                         focus:ring-2 focus:ring-green-500 shadow-sm transition-all"
              placeholder="Enter your rating"
              aria-labelledby="rating"
            />
          </div>
          <div className="relative">
            <label htmlFor="content" className="block text-gray-600 mb-2">Your Experience</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none 
                         focus:ring-2 focus:ring-green-500 shadow-sm h-32 resize-none transition-all"
              placeholder="Describe your experience"
              aria-labelledby="content"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-green-500 to-green-700 
                       text-white text-lg font-semibold rounded-xl shadow-md hover:bg-gradient-to-l 
                       focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200 transform hover:scale-105"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
