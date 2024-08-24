import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const { data: session } = useSession();
  const books = useSelector((state) => state.cart.books);
  const isLoggedIn = Boolean(session?.user);

  return (
    <div className="h-16 w-full bg-gray-600 shadow-lg sticky top-0 z-10">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-white text-2xl font-bold hover:text-gray-300 transition duration-150">
            Abakar&apos;s Reads
          </Link>
        </div>
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <span className="text-white">Welcome, {session.user?.name}!</span>
              <button
                onClick={() => signOut()}
                className="px-3 py-1 bg-white text-green-900 rounded-md transition duration-150 hover:bg-gray-700 hover:text-white"
              >
                Logout
              </button>
              <Link href="/cart" className="relative flex items-center text-white hover:text-gray-300 transition duration-150">
                <AiOutlineShoppingCart className="text-xl" />
                <span className="absolute bottom-0.5 left-3 w-4 h-4 bg-white text-green-900 flex items-center justify-center rounded-full text-xs">
                  {books?.length}
                </span>
              </Link>
            </>
          ) : (
            <>
              <Link href="/login" className="px-4 py-2 bg-gray-700 text-white rounded-md transition duration-150 hover:bg-gray-600">
                Log in
              </Link>
              <Link href="/register" className="text-white hover:text-gray-300 transition duration-150">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

