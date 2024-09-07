import { useState } from 'react';
import Link from 'next/link';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaBookOpen, FaTwitter, FaFacebookF, FaInstagram } from 'react-icons/fa';
import { motion } from 'framer-motion';

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
    <footer className="relative bg-gray-900 text-white py-16 md:py-24">
      {/* Custom SVG Wave Background */}
      <div className="absolute inset-0">
        <svg className="w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill="#1f2937" d="M0,224L60,224C120,224,240,224,360,197.3C480,171,600,117,720,106.7C840,96,960,128,1080,160C1200,192,1320,224,1380,240L1440,256L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
        </svg>
      </div>
      
      <div className="container mx-auto px-6 sm:px-10 lg:px-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
        {/* About Us Section */}
        <div className="space-y-6">
          <button
            onClick={handleShowAbout}
            className="text-3xl font-bold mb-5 text-white pb-2 border-b-2 border-white flex items-center transform transition-transform duration-300 hover:scale-110"
          >
            <FaBookOpen className="mr-3" /> About Us
          </button>
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: showAbout ? 1 : 0, height: showAbout ? 'auto' : 0 }}
            className="overflow-hidden"
          >
            <p className="text-base sm:text-lg leading-relaxed">
              Abakar Reads is your premier online bookstore, offering a diverse range of books for all readers. Our mission is to ignite a passion for reading by providing a seamless and delightful shopping experience.
            </p>
          </motion.div>
        </div>

        {/* Contact Us Section */}
        <div className="space-y-6">
          <button
            onClick={handleShowContact}
            className="text-3xl font-bold mb-5 text-white pb-2 border-b-2 border-white flex items-center transform transition-transform duration-300 hover:scale-110"
          >
            <FaEnvelope className="mr-3" /> Contact Us
          </button>
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: showContact ? 1 : 0, height: showContact ? 'auto' : 0 }}
            className="overflow-hidden space-y-4 text-base sm:text-lg"
          >
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
          </motion.ul>
        </div>

        {/* Quick Links Section */}
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
              <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleShowAbout();
                }}
                className="hover:text-gray-300 transition-colors duration-300 cursor-pointer"
              >
                About Us
              </a>
            </li>
            <li>
             <a
            href="#"
             onClick={(e) => {
          e.preventDefault();
          handleShowContact();
        }}
            className="hover:text-gray-300 transition-colors duration-300 cursor-pointer"
          >
        Contact Us
      </a>
    </li>
          </ul>
        </div>

        {/* Newsletter Subscription */}
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
              className="p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-300"
            >
              Subscribe
            </button>
          </form>

          {/* Social Media Links */}
          <div className="flex space-x-4 mt-6">
            <a href="#" className="text-white hover:text-gray-300 transition-colors duration-300">
              <FaTwitter size={24} />
            </a>
            <a href="#" className="text-white hover:text-gray-300 transition-colors duration-300">
              <FaFacebookF size={24} />
            </a>
            <a href="#" className="text-white hover:text-gray-300 transition-colors duration-300">
              <FaInstagram size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

