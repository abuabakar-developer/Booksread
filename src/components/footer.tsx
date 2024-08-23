import { useState } from 'react';
import Link from 'next/link';

const Footer = () => {
  const [showAbout, setShowAbout] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [email, setEmail] = useState('');

  const handleShowAbout = () => {
    setShowAbout(true);
    setShowContact(false);
  };

  const handleShowContact = () => {
    setShowContact(true);
    setShowAbout(false);
  };

  const handleSubscription = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      alert('Please enter a valid email address.');
      return;
    }

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.status === 201) {
        alert('Subscription successful! Thank you for subscribing.');
        setEmail('');
      } else if (response.status === 409) {
        alert('You are already subscribed.');
      } else {
        alert('Subscription failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900 via-green-900 to-gray-900 text-white py-12 md:py-16 lg:py-20 mt-16 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
        
        {/* Column 1: About */}
        {showAbout && (
          <div className="transition-opacity duration-500 ease-in-out opacity-100">
            <h3 className="text-2xl sm:text-3xl font-extrabold mb-4 text-green-400 border-b-4 border-green-500 pb-2">
              About Us
            </h3>
            <p className="text-base sm:text-lg leading-relaxed">
              Abakar Reads is your one-stop online bookstore, offering a wide range of books across all genres. Our mission is to promote reading by providing an easy and enjoyable shopping experience.
            </p>
          </div>
        )}

        {/* Column 2: Contact Us */}
        {showContact && (
          <div className="transition-opacity duration-500 ease-in-out opacity-100">
            <h3 className="text-2xl sm:text-3xl font-extrabold mb-4 text-green-400 border-b-4 border-green-500 pb-2">
              Contact Us
            </h3>
            <ul className="space-y-2 sm:space-y-3 text-base sm:text-lg">
              <li>
                <span className="font-semibold">Email:</span>{' '}
                <a href="mailto:support@abakarreads.com" className="underline hover:text-green-300">
                  support@abakarreads.com
                </a>
              </li>
              <li>
                <span className="font-semibold">Phone:</span> 03154195240
              </li>
              <li>
                <span className="font-semibold">Address:</span> 123 Bookstore Ave, Read City Jaranwala
              </li>
            </ul>
          </div>
        )}

        {/* Column 3: Quick Links */}
        <div className="space-y-2 sm:space-y-3">
          <h3 className="text-2xl sm:text-3xl font-extrabold mb-4 text-green-400 border-b-4 border-green-500 pb-2">
            Quick Links
          </h3>
          <ul className="space-y-1 sm:space-y-2">
            <li>
              <button onClick={handleShowAbout} className="hover:text-green-300 transition-colors duration-300">
                About Us
              </button>
            </li>
            <li>
              <button onClick={handleShowContact} className="hover:text-green-300 transition-colors duration-300">
                Contact Us
              </button>
            </li>
            <li>
              <Link href="/" className="hover:text-green-300 transition-colors duration-300">
                Home
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Newsletter */}
        <div className="bg-opacity-70 backdrop-blur-lg p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl sm:text-3xl font-extrabold mb-4 text-green-400 border-b-4 border-green-500 pb-2">
            Subscribe to Our Newsletter
          </h3>
          <p className="text-base sm:text-lg mb-4">
            Get updates on the latest releases and special offers directly to your inbox.
          </p>
          <form onSubmit={handleSubscription} className="flex flex-col space-y-3 sm:space-y-4">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="px-4 py-2 rounded-lg bg-gray-800 text-gray-200 placeholder-gray-400 shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button 
              type="submit" 
              className="bg-green-600 hover:bg-green-800 text-white px-4 py-2 rounded-lg shadow-md transition-colors duration-300">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <div className="w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-r from-green-400 to-green-600 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Social Media Links */}
      <div className="border-t border-gray-600 mt-8 pt-6 flex justify-center space-x-6 relative z-10">
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="Github">
          <img src="/github.png" alt="Github" className="w-6 h-6 sm:w-8 sm:h-8 hover:opacity-80 transition-opacity duration-300" />
        </a>
        <a href="https://netlify.com" target="_blank" rel="noopener noreferrer" aria-label="Netlify">
          <img src="/netlify.png" alt="Netlify" className="w-6 h-6 sm:w-8 sm:h-8 hover:opacity-80 transition-opacity duration-300" />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <img src="/linkedun.jpeg" alt="LinkedIn" className="w-6 h-6 sm:w-8 sm:h-8 hover:opacity-80 transition-opacity duration-300" />
        </a>
      </div>

      {/* Copyright */}
      <div className="text-center mt-8 relative z-10">
        <p className="text-xs sm:text-sm text-gray-400">
          &copy; 2024 Abakar Reads. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;


