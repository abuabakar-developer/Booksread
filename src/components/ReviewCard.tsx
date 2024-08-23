import React from 'react';
import { format } from 'timeago.js';
import Image from 'next/image';

interface ReviewCardProps {
  review: {
    userName: string;  
    createdAt: string;
    rating: number;
    content: string;   
  };
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className="w-full max-w-xs border border-transparent rounded-xl p-4 flex flex-col bg-gradient-to-r from-white via-gray-50 to-white shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl">
      <div className="flex items-center gap-4">
        <Image
          src="/woman.jpg"  
          alt="User avatar"
          width={48}
          height={48}
          className="h-12 w-12 rounded-full object-cover border-2 border-gradient-to-r from-pink-500 to-yellow-500"
        />
        <div>
          <h3 className="text-lg font-bold capitalize text-gray-800 mb-1">{review.userName || 'Anonymous'}</h3>
          <span className="text-xs text-gray-500">{format(review.createdAt) || 'N/A'}</span>
        </div>
      </div>
      <div className="mt-4 flex flex-col">
        <p className="text-sm text-gray-600 mb-2">Rating: 
          <span className="ml-1 font-semibold text-yellow-500">{review.rating}/5</span>
        </p>
        <p className="text-sm text-gray-700">{review.content}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
