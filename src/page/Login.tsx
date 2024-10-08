// src/components/Login.tsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { loginFailure, loginStart, loginSuccess } from '../redux/slice/authSlice';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate
  const { loading, error, isAuthenticated } = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginStart());

    // Simulate a login API call
    try {
      // Simulate successful login with fake user data
      const fakeUserData = { id: 1, name: 'demo', email: "demo@gmail.com" }; // Replace with actual API call
      // Simulating a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      dispatch(loginSuccess(fakeUserData));

      // Navigate to the dashboard after successful login
      navigate('/dashboard'); // Navigate to the dashboard page
    } catch (err) {
      dispatch(loginFailure('Login failed! Please try again.'));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>
        {isAuthenticated ? (
          <p className="text-center text-green-500">Welcome back!</p>
        ) : (
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full px-4 py-2 font-semibold text-white rounded-md transition-colors duration-300 ${
                loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500'
              }`}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
            {error && <p className="text-red-500 text-center">{error}</p>}
          </form>
        )}
        <p className="text-sm text-center text-gray-500">
          Don't have an account? <a href="/signup" className="text-blue-600 hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
