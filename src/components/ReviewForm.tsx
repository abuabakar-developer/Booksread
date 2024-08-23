import { useState } from 'react';
import { useRouter } from 'next/router';

const ReviewForm = ({ bookId }: { bookId: string }) => {
  const [userName, setUserName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
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
      setUserName('');
      setRating(5);
      setComment('');
      router.replace(router.asPath); // Refresh the page to display the new review
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow-md">
      <h2 className="text-lg font-semibold mb-4">Leave a Review</h2>
      <div className="mb-4">
        <label htmlFor="userName" className="block text-sm font-medium text-gray-700">
          Your Name
        </label>
        <input
          type="text"
          id="userName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
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
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
        >
          {[...Array(5)].map((_, i) => (
            <option key={i} value={i + 1}>
              {i + 1} Star{ i + 1 > 1 && 's'}
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
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
          required
        ></textarea>
      </div>
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 px-4 rounded-md shadow hover:bg-green-700"
      >
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
