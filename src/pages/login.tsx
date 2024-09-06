import LoginForm from '@/components/LoginForm';
import Link from 'next/link';
import { FC } from 'react';

const LoginPage: FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-500 via-blue-600 to-indigo-700 p-6">
      <div className="relative bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md transform transition-transform duration-500 hover:scale-105">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-300 to-blue-300 opacity-20 rounded-3xl"></div>
        <h1 className="text-4xl font-extrabold mb-6 text-center text-gray-800 relative z-10">
          Welcome Back
        </h1>
        <p className="text-center text-gray-600 mb-8 relative z-10">
          Sign in to your account
        </p>
        <LoginForm />
        <p className="mt-6 text-center text-gray-700 relative z-10">
          Don’t have an account?{' '}
          <Link
            href="/register"
            className="text-blue-700 font-semibold hover:text-indigo-500 hover:underline"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;




