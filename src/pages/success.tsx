// pages/success.tsx
import { useRouter } from 'next/router';

const Success = () => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-100 via-green-200 to-green-300 p-4">
      <div className="bg-white rounded-lg shadow-2xl p-6 md:p-12 w-full max-w-lg flex flex-col items-center justify-center text-center">
        <div className="relative mb-6">
          <svg
            className="w-24 h-24 text-green-600 animate-pulse"
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
            <div className="w-24 h-24 border-4 border-green-600 rounded-full animate-ping"></div>
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4 animate-fade-in">
          Congratulations!
        </h1>
        <p className="text-base md:text-lg text-gray-700 mb-6">
          Your order has been successfully placed. We’re processing it and will update you with the details soon.
        </p>
        <p className="text-sm md:text-md text-gray-600 mb-8">
          Check your email for a confirmation message with transaction details.
        </p>
        <button
          onClick={() => router.push('/')}
          className="bg-green-700 text-white px-6 py-3 md:px-8 md:py-4 rounded-lg shadow-lg hover:bg-green-800 transition duration-300 transform hover:scale-105"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default Success;



       
