import React from 'react';
import { format } from 'timeago.js';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa';

interface ReviewCardProps {
  review: {
    userName: string;
    createdAt: string;
    rating: number;
    content: string;
  };
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const stars = Array(5)
    .fill(0)
    .map((_, i) => (
      <FaStar
        key={i}
        className={`${
          i < review.rating ? 'text-yellow-500' : 'text-gray-300'
        }`}
      />
    ));

  return (
    <div className="w-full max-w-sm md:max-w-md lg:max-w-lg border border-transparent rounded-xl p-4 flex flex-col bg-white shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl duration-300">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Image
            src="/woman.jpg"
            alt="User avatar"
            width={48}
            height={48}
            className="h-12 w-12 rounded-full object-cover border-2"
          />
          <div className="absolute inset-0 rounded-full border-2 border-gradient-to-r from-pink-500 to-yellow-500"></div>
        </div>
        <div>
          <h3 className="text-lg font-bold capitalize text-gray-800 mb-1">{review.userName || 'Anonymous'}</h3>
          <span className="text-xs text-gray-500">{format(review.createdAt) || 'N/A'}</span>
        </div>
      </div>
      <div className="mt-4 flex flex-col">
        <div className="flex items-center mb-2">
          <span className="text-sm text-gray-600">Rating:</span>
          <div className="flex ml-2">{stars}</div>
        </div>
        <p className="text-sm text-gray-700 leading-relaxed">{review.content}</p>
      </div>
    </div>
  );
};

export default ReviewCard;


