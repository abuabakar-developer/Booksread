// components/Hero.tsx
import React from 'react';

interface HeroProps {
  onExploreBooksClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onExploreBooksClick }) => {
  return (
    <div
      className="relative h-[calc(100vh-75px)] w-full bg-center bg-cover"
      style={{ backgroundImage: 'url("/read.jpeg")' }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-start justify-center h-full px-6 md:px-12 lg:px-24">
        <h1 className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl leading-tight mb-4">
          Discover Your Next Great Read
        </h1>
        <p className="text-lg text-gray-300 sm:text-xl lg:text-2xl mb-6">
          Dive into our vast collection and explore new worlds and ideas.
        </p>
        <p className="text-xl text-yellow-300 sm:text-2xl lg:text-3xl mb-8">
          <strong>New Arrival:</strong> "The Enchanted Forest" - Get 20% off this week!
        </p>
      </div>
    </div>
  );
};

export default Hero;



