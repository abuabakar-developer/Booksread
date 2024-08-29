import { useState } from 'react';
import Link from 'next/link';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaBookOpen } from 'react-icons/fa';

const Footer = () => {
  const [showAbout, setShowAbout] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [email, setEmail] = useState('');

  const handleShowAbout = () => {
    setShowAbout(!showAbout);
    setShowContact(false);
  };

  const handleShowContact = () => {
    setShowContact(!showContact);
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
    <footer className="bg-gradient-to-br from-gray-900 via-black to-green-900 text-white py-14 md:py-20 lg:py-28 relative overflow-hidden">
      <div className="container mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
        
        {/* About Us Section */}
        <div className="space-y-3 sm:space-y-4">
          <button
            onClick={handleShowAbout}
            className="text-2xl sm:text-3xl font-extrabold mb-5 text-green-400 border-b-4 border-green-500 pb-2 transition-transform duration-300 transform hover:scale-105 flex items-center"
          >
            <FaBookOpen className="mr-2" /> About Us
          </button>
          {showAbout && (
            <p className="text-base sm:text-lg leading-relaxed">
              Abakar Reads is your one-stop online bookstore, offering a wide range of books across all genres. Our mission is to promote reading by providing an easy and enjoyable shopping experience.
            </p>
          )}
        </div>

        {/* Contact Us Section */}
        <div className="space-y-3 sm:space-y-4">
          <button
            onClick={handleShowContact}
            className="text-2xl sm:text-3xl font-extrabold mb-5 text-green-400 border-b-4 border-green-500 pb-2 transition-transform duration-300 transform hover:scale-105 flex items-center"
          >
            <FaEnvelope className="mr-2" /> Contact Us
          </button>
          {showContact && (
            <ul className="space-y-3 sm:space-y-4 text-base sm:text-lg">
              <li className="flex items-center">
                <FaEnvelope className="mr-2" /> 
                <a href="mailto:support@abakarreads.com" className="underline hover:text-green-300">
                  support@abakarreads.com
                </a>
              </li>
              <li className="flex items-center">
                <FaPhone className="mr-2" /> 03154195240
              </li>
              <li className="flex items-center">
                <FaMapMarkerAlt className="mr-2" /> 123 Bookstore Ave, Read City Jaranwala
              </li>
            </ul>
          )}
        </div>

        {/* Quick Links Section */}
        <div className="space-y-3 sm:space-y-4">
          <h3 className="text-2xl sm:text-3xl font-extrabold mb-5 text-green-400 border-b-4 border-green-500 pb-2 transition-transform duration-300 transform hover:scale-105 flex items-center">
            <FaBookOpen className="mr-2" /> Quick Links
          </h3>
          <ul className="space-y-2 sm:space-y-3">
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

        {/* Newsletter Subscription Section */}
        <div className="bg-opacity-70 backdrop-blur-lg p-8 rounded-lg shadow-2xl">
          <h3 className="text-2xl sm:text-3xl font-extrabold mb-5 text-green-400 border-b-4 border-green-500 pb-2 transition-transform duration-300 transform hover:scale-105">
            Subscribe to Our Newsletter
          </h3>
          <p className="text-base sm:text-lg mb-5">
            Get updates on the latest releases and special offers directly to your inbox.
          </p>
          <form onSubmit={handleSubscription} className="flex flex-col space-y-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-5 py-3 rounded-lg bg-gray-800 text-gray-200 placeholder-gray-400 shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-800 text-white px-5 py-3 rounded-lg shadow-lg transition-colors duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Background Decorations */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <div className="w-80 h-80 sm:w-[450px] sm:h-[450px] bg-gradient-to-r from-green-400 to-green-600 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="border-t border-gray-600 mt-12 pt-8 text-center">
        <p className="text-sm sm:text-base">
          &copy; {new Date().getFullYear()} Abakar Reads. All rights reserved.
        </p>
        <p className="mt-2 italic text-xs sm:text-sm">
          "Reading is to the mind what exercise is to the body."
        </p>
      </div>
    </footer>
  );
};

export default Footer;
