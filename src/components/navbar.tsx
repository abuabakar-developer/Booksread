
/////navbar.tsx 
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/types/rootState';
import Image from 'next/image';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const books = useSelector((state: RootState) => state.cart.books);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(Boolean(token));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <nav className="bg-gradient-to-r from-purple-800 to-black shadow-md sticky top-0 z-20">
      <div className="max-w-7xl mx-auto h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center text-white text-3xl font-extrabold hover:text-gray-300 transition-colors duration-150">
          Abakar&apos;s Reads
        </Link>
        <div className="flex items-center gap-6">
          {isLoggedIn ? (
            <>
              <span className="text-white text-sm">Welcome, User!</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-md shadow-lg transition-transform transform duration-150 hover:scale-105 hover:from-green-500 hover:to-green-700"
              >
                Logout
              </button>
              <Link href="/cart" className="relative flex items-center text-white hover:text-gray-300 transition-colors duration-150">
                <Image src="/cart.png" alt="Cart" width={32} height={32} className="transition-transform duration-300 transform hover:scale-110" />
                {books.length > 0 && (
                  <span className="absolute top-0 right-0 w-5 h-5 bg-red-600 text-white text-xs flex items-center justify-center rounded-full shadow-lg animate-pulse">
                    {books.length}
                  </span>
                )}
              </Link>
            </>
          ) : (
            <>
              <Link href="/login" className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-md shadow-lg transition-transform transform duration-150 hover:scale-105 hover:from-blue-600 hover:to-blue-800">
                Log in
              </Link>
              <Link href="/register" className="px-4 py-2 text-white rounded-md hover:text-gray-300 transition-colors duration-150">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;





