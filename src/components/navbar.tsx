import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/types/rootState';
import Image from 'next/image';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import BookCatalog from './bookCatalog';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const books = useSelector((state: RootState) => state.cart.books);

  useEffect(() => {
    setIsLoggedIn(Boolean(localStorage.getItem('token')));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  const menuItems = (
    <>
      {isLoggedIn ? (
        <>
          <span className="text-white text-sm">Welcome, User!</span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-transform duration-150 hover:scale-105"
          >
            Logout
          </button>
          <Link href="/cart" className="relative">
            <Image
              src="/cart.png"
              alt="Cart"
              width={32}
              height={32}
              className="transition-transform duration-300 hover:scale-110"
            />
            {books.length > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-600 text-white text-xs flex items-center justify-center rounded-full shadow-lg animate-pulse">
                {books.length}
              </span>
            )}
          </Link>
        </>
      ) : (
        <>
          <Link href="/login" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-transform duration-150 hover:scale-105">
            Log in
          </Link>
          <Link href="/register" className="px-4 py-2 text-white hover:text-gray-300">
            Register
          </Link>
        </>
      )}
    </>
  );

  return (
    <nav className="bg-gradient-to-r from-purple-900 via-indigo-800 to-blue-900 shadow-lg sticky top-0 z-20">
      <div className="max-w-7xl mx-auto h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center text-white text-2xl font-extrabold">
          <Image src="/book-icon.png" alt="Book Icon" width={40} height={40} />
          <span className="ml-2 hover:text-gray-300 transition-colors duration-150">
            Abakar's Reads
          </span>
        </Link>

        {/* Menu Toggle for Mobile */}
        <div className="lg:hidden flex items-center">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle Menu">
            {isMenuOpen ? (
              <XIcon className="w-8 h-8 text-white" />
            ) : (
              <MenuIcon className="w-8 h-8 text-white" />
            )}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-6">{menuItems}</div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-16 left-0 right-0 bg-gradient-to-r from-indigo-800 to-blue-900 shadow-lg p-4 space-y-4 z-10">
            {menuItems}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

