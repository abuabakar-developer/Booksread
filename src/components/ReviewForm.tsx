import { useState } from 'react';
import { useRouter } from 'next/router';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

const ReviewForm = ({ bookId }: { bookId: string }) => {
  const [userName, setUserName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`/api/reviews/${bookId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userName, rating, comment }),
    });

    if (res.ok) {
      setIsSubmitted(true);
      setIsError(false);
      setUserName('');
      setRating(5);
      setComment('');
      setTimeout(() => {
        setIsSubmitted(false);
        router.replace(router.asPath); 
      }, 2000);
    } else {
      setIsError(true);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-lg max-w-lg mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Leave a Review</h2>
      <div className="mb-4">
        <label htmlFor="userName" className="block text-sm font-medium text-gray-700">
          Your Name
        </label>
        <input
          type="text"
          id="userName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition"
          placeholder="Enter your name"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
          Rating
        </label>
        <select
          id="rating"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition"
        >
          {[...Array(5)].map((_, i) => (
            <option key={i} value={i + 1}>
              {i + 1} Star{i + 1 > 1 && 's'}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
          Comment
        </label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition"
          rows={4}
          maxLength={500}
          placeholder="Write your review here..."
          required
        ></textarea>
        <div className="text-right text-xs text-gray-500 mt-1">
          {comment.length}/500 characters
        </div>
      </div>
      {isSubmitted && (
        <div className="flex items-center text-green-600 mb-4">
          <FaCheckCircle className="mr-2" />
          <p>Review submitted successfully!</p>
        </div>
      )}
      {isError && (
        <div className="flex items-center text-red-600 mb-4">
          <FaExclamationCircle className="mr-2" />
          <p>There was an error submitting your review. Please try again.</p>
        </div>
      )}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 px-4 rounded-md shadow hover:from-green-600 hover:to-teal-600 transition-all duration-300"
      >
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;




