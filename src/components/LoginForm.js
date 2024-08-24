import { useState } from 'react';
import { useRouter } from 'next/router';
import { FiMail, FiLock } from 'react-icons/fi';
import Link from 'next/link'; // Import Link from next/link

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();
    setLoading(false);

    if (response.ok) {
      localStorage.setItem('token', result.token);
      router.push('/'); // Redirect to the home page
    } else {
      alert(result.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-500 via-blue-600 to-indigo-700 p-6">
      <div className="w-full max-w-md p-10 space-y-6 bg-white rounded-xl shadow-2xl transform transition-transform duration-500 hover:scale-105">
        <h2 className="text-3xl font-bold text-center text-gray-800 tracking-wide">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <FiMail className="absolute top-3 left-4 text-gray-500" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full px-12 py-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-500 focus:outline-none transition-colors duration-300"
            />
          </div>
          <div className="relative">
            <FiLock className="absolute top-3 left-4 text-gray-500" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full px-12 py-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-500 focus:outline-none transition-colors duration-300"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 transition-all duration-300"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="text-sm text-center text-gray-600 mt-4">
          Don&apos;t have an account?{' '}
          <Link href="/register">
            <a className="text-indigo-500 hover:underline transition-colors duration-200">
              Sign up
            </a>
          </Link>
        </p>
      </div>
    </div>
  );
}
