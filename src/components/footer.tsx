import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaBookOpen, FaInfoCircle, FaGithub, FaLinkedin } from 'react-icons/fa'; 
import { motion } from 'framer-motion';
import AboutUs from './AboutUs';
import ContactUs from './ContactUs'; 

const Footer = () => {
  const [showContact, setShowContact] = useState(false);
  const [showAboutUs, setShowAboutUs] = useState(false);
  const [email, setEmail] = useState('');

  const handleShowContact = () => {
    setShowContact(!showContact);
    setShowAboutUs(false); 
  };

  const handleShowAboutUs = () => {
    setShowAboutUs(!showAboutUs);
    setShowContact(false); 
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
    <footer className="relative bg-gray-900 text-white py-16 md:py-24">
      {/* Conditional AboutUs Section */}
      {showAboutUs && (
        <div className="absolute inset-x-0 top-0 bg-gray-50 text-gray-800 py-12 z-30">
          <AboutUs />
        </div>
      )}

      {/* Conditional ContactUs Section */}
      {showContact && (
        <div className="absolute inset-x-0 top-0 bg-gray-50 text-gray-800 py-12 z-30">
          <ContactUs />
        </div>
      )}

      <div className={`container mx-auto px-6 sm:px-10 lg:px-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10 ${showAboutUs || showContact ? 'pt-48' : 'pt-0'}`}>
        {/* Contact Us Button */}
        <div className="space-y-6">
          <button
            onClick={handleShowContact}
            className="text-3xl font-bold mb-5 text-white pb-2 border-b-2 border-white flex items-center transform transition-transform duration-300 hover:scale-110"
          >
            <FaEnvelope className="mr-3" /> Contact Us
          </button>
        </div>

        {/* About Us Button */}
        <div className="space-y-6">
          <button
            onClick={handleShowAboutUs}
            className="text-3xl font-bold mb-5 text-white pb-2 border-b-2 border-white flex items-center transform transition-transform duration-300 hover:scale-110"
          >
            <FaInfoCircle className="mr-3" /> About Us
          </button>
        </div>

        <div className="space-y-6">
          <h3 className="text-3xl font-bold mb-5 text-white pb-2 border-b-2 border-white flex items-center transform transition-transform duration-300 hover:scale-110">
            <FaBookOpen className="mr-3" /> Quick Links
          </h3>
          <ul className="space-y-4">
            <li>
              <Link href="/" className="hover:text-gray-300 transition-colors duration-300">
                Home
              </Link>
            </li>
            <li>
              <Link href="#latest-books" className="hover:text-gray-300 transition-colors duration-300">
                Books
              </Link>
            </li>
          </ul>
        </div>

        {/* Subscription Section */}
        <div className="space-y-6">
          <h3 className="text-3xl font-bold mb-5 text-white pb-2 border-b-2 border-white transform transition-transform duration-300 hover:scale-110">
            Subscribe to our Newsletter
          </h3>
          <p className="text-base sm:text-lg">
            Stay updated with our latest books, promotions, and offers. Subscribe now!
          </p>
          <form onSubmit={handleSubscription} className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="p-2 rounded-lg border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="submit"
              className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition-colors duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Social Media Icons */}
      <div className="flex justify-center space-x-6 mt-12">
        <a href="https://github.com/abuabakar-developer/abooksread.vercel.app" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-colors duration-300">
          <FaGithub size={32} />
        </a>
        <a href="https://linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-colors duration-300">
          <FaLinkedin size={32} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;







