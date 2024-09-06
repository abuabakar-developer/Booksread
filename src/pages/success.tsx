// pages/success.tsx
import { useRouter } from 'next/router';

const Success = () => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-4">
      <div className="bg-white rounded-lg shadow-2xl p-6 md:p-12 w-full max-w-lg flex flex-col items-center justify-center text-center transform transition-transform duration-500 hover:scale-105">
        <div className="relative mb-6">
          <svg
            className="w-24 h-24 text-purple-500 animate-pulse"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m5 2a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 border-4 border-purple-500 rounded-full animate-ping"></div>
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-red-400 mb-4 animate-fade-in">
          Congratulations!
        </h1>
        <p className="text-lg md:text-xl text-gray-800 mb-6">
          Your order has been successfully placed.
        </p>
        <p className="text-md md:text-lg text-gray-600 mb-8">
          We’re processing it and will update you soon. Please check your email for the transaction details.
        </p>
        <button
          onClick={() => router.push('/')}
          className="bg-gradient-to-r from-purple-600 to-red-500 text-white px-8 py-4 rounded-full shadow-lg hover:bg-gradient-to-l hover:from-red-500 hover:to-purple-600 transition duration-300 transform hover:scale-110"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default Success;
