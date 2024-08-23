import RegisterForm from '../components/RegisterForm';
import { FaUserPlus } from 'react-icons/fa';

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 p-6">
      <div className="relative p-10 bg-white shadow-2xl rounded-3xl max-w-lg w-full transform transition duration-500 hover:scale-105 hover:shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 opacity-20 rounded-3xl"></div>
        <div className="flex justify-center mb-6 relative z-10">
          <FaUserPlus className="text-6xl text-blue-600 animate-pulse" />
        </div>
        <h1 className="text-5xl font-bold text-center text-blue-900 mb-8 relative z-10">
          Create Account
        </h1>
        <RegisterForm />
        <p className="mt-8 text-center text-sm text-gray-600 relative z-10">
          Already have an account?{' '}
          <a href="/login" className="text-blue-900 hover:underline font-bold">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}

