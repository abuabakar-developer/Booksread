import { useState } from 'react';
import Link from 'next/link';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaBookOpen, FaTwitter, FaFacebookF, FaInstagram } from 'react-icons/fa';

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

      if (response.ok) {
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
    <footer className="relative overflow-hidden bg-gray-900 text-white py-16 md:py-24">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-gray-900 opacity-80 -z-10 rounded-t-full blur-lg"></div>
      <div className="container mx-auto px-6 sm:px-10 lg:px-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">

        {/* About Us Section */}
        <div className="space-y-6">
          <button
            onClick={handleShowAbout}
            className="text-3xl font-bold mb-5 text-white pb-2 border-b-2 border-white flex items-center transform transition-transform duration-300 hover:scale-110"
          >
            <FaBookOpen className="mr-3" /> About Us
          </button>
          {showAbout && (
            <p className="text-base sm:text-lg leading-relaxed">
              Abakar Reads is your premier online bookstore, offering a diverse range of books for all readers. Our mission is to ignite a passion for reading by providing a seamless and delightful shopping experience.
            </p>
          )}
        </div>

        {/* Contact Us Section */}
        <div className="space-y-6">
          <button
            onClick={handleShowContact}
            className="text-3xl font-bold mb-5 text-white pb-2 border-b-2 border-white flex items-center transform transition-transform duration-300 hover:scale-110"
          >
            <FaEnvelope className="mr-3" /> Contact Us
          </button>
          {showContact && (
            <ul className="space-y-4 text-base sm:text-lg">
              <li className="flex items-center">
                <FaEnvelope className="mr-2" /> 
                <a href="mailto:support@abakarreads.com" className="underline hover:text-gray-300">
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
        <div className="space-y-6">
          <h3 className="text-3xl font-bold mb-5 text-white pb-2 border-b-2 border-white flex items-center transform transition-transform duration-300 hover:scale-110">
            <FaBookOpen className="mr-3" /> Quick Links
          </h3>
          <ul className="space-y-4">
            <li>
              <button onClick={handleShowAbout} className="hover:text-gray-300 transition-colors duration-300">
                About Us
              </button>
            </li>
            <li>
              <button onClick={handleShowContact} className="hover:text-gray-300 transition-colors duration-300">
                Contact Us
              </button>
            </li>
            <li>
              <Link href="/" className="hover:text-gray-300 transition-colors duration-300">
                Home
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter Subscription Section */}
        <div className="bg-opacity-80 backdrop-blur-md p-8 rounded-lg shadow-xl">
          <h3 className="text-3xl font-bold mb-5 text-white pb-2 border-b-2 border-white transform transition-transform duration-300 hover:scale-110">
            Subscribe to Our Newsletter
          </h3>
          <p className="text-base sm:text-lg mb-5">
            Stay updated with the latest book releases and exclusive offers.
          </p>
          <form onSubmit={handleSubscription} className="flex flex-col space-y-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-3 rounded-lg bg-gray-800 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-800 text-white px-5 py-3 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Social Media Links */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-5 text-2xl">
        <a href="https://twitter.com" className="text-white hover:text-gray-300 transition-colors duration-300" aria-label="Twitter">
          <FaTwitter />
        </a>
        <a href="https://facebook.com" className="text-white hover:text-gray-300 transition-colors duration-300" aria-label="Facebook">
          <FaFacebookF />
        </a>
        <a href="https://instagram.com" className="text-white hover:text-gray-300 transition-colors duration-300" aria-label="Instagram">
          <FaInstagram />
        </a>
      </div>

      <div className="border-t border-gray-800 mt-14 pt-8 text-center">
        <p className="text-sm sm:text-base">
          &copy; {new Date().getFullYear()} Abakar Reads. All rights reserved.
        </p>
        <p className="mt-2 text-xs sm:text-sm">
          "Reading is to the mind what exercise is to the body."
        </p>
      </div>
    </footer>
  );
};

export default Footer;
