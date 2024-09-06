import React from 'react';
import Image from 'next/image';  // Import Next.js Image component

type NewsProps = {
  title: string;
  description: string;
  image?: string;
  date: string;
  link?: string;
};

const NewsCard: React.FC<NewsProps> = ({ title, description, image, date, link }) => {
  return (
    <div className="relative transform transition duration-300 ease-in-out hover:scale-105 cursor-pointer bg-white/70 dark:bg-gray-800/70 backdrop-blur-md shadow-lg rounded-lg p-4">
      {/* Use Next.js Image component instead of <img> */}
      {image && (
        <div className="relative w-full h-40">
          <Image
            src={image}
            alt={title}
            layout="fill"  // Ensures the image covers the container
            objectFit="cover"
            className="rounded-t-lg"
          />
        </div>
      )}
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
        <p className="text-gray-700 dark:text-gray-300">{description}</p>
        <span className="text-sm text-gray-500 dark:text-gray-400">{date}</span>
      </div>
      {link && (
        <a href={link} className="absolute inset-0">
          <span className="sr-only">Read more</span>
        </a>
      )}
    </div>
  );
};

export default NewsCard;
