'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  FaCut,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaFacebookF,
} from 'react-icons/fa';

const SalonAuth = () => {
  const [currentPage, setCurrentPage] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      `${currentPage === 'login' ? 'Login' : 'Signup'} successful!`,
      formData
    );
  };

  const SalonIllustration = () => (
    <div className="hidden lg:flex flex-col items-center justify-center space-y-8 bg-gradient-to-br from-pink-100 via-purple-100 to-orange-100 rounded-2xl p-8 xl:p-12">
      <div className="relative">
        <div className="w-32 h-40 bg-gradient-to-b from-gray-200 to-gray-300 rounded-full relative shadow-lg">
          <div className="absolute inset-2 bg-gradient-to-br from-white to-gray-100 rounded-full"></div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-8 bg-gray-400 rounded-b-lg"></div>
        </div>
        <div className="absolute -top-4 -left-4 text-pink-400 text-2xl animate-bounce">
          <FaCut />
        </div>
        <div className="absolute -top-2 -right-6 text-purple-400 text-3xl animate-pulse">
          <FaCut />
        </div>
        <div className="absolute -bottom-4 -right-2 text-orange-400 text-xl animate-bounce delay-1000">
          ✨
        </div>
      </div>
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          Beautiful Websites
        </h3>
        <p className="text-gray-600">Designed for beauty professionals</p>
      </div>
    </div>
  );

  const AuthForm = () => (
    <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-12">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-2 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-purple-400 rounded-xl flex items-center justify-center">
            <FaCut className="text-white" />
          </div>
          <Link
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent"
          >
            SalonBuilder
          </Link>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          {currentPage === 'login'
            ? 'Welcome Back 👋'
            : 'Create Your Free Account'}
        </h1>
        <p className="text-gray-600 text-sm md:text-base">
          {currentPage === 'login'
            ? 'Login to your account and continue building your salon website.'
            : 'Start building your dream salon website today.'}
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {currentPage === 'signup' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => updateFormData('fullName', e.target.value)}
              placeholder="Enter your full name"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData('email', e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => updateFormData('password', e.target.value)}
              placeholder={
                currentPage === 'login'
                  ? 'Enter your password'
                  : 'Create a password'
              }
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {currentPage === 'signup' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={(e) =>
                  updateFormData('confirmPassword', e.target.value)
                }
                placeholder="Confirm your password"
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
        )}

        {currentPage === 'login' && (
          <div className="flex items-center justify-between">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
              />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <button
              type="button"
              className="text-sm text-pink-600 hover:text-pink-700 font-medium"
            >
              Forgot Password?
            </button>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-xl font-semibold text-lg hover:from-pink-600 hover:to-purple-600 transition-all"
        >
          {currentPage === 'login' ? 'Login' : 'Sign Up'}
        </button>

        {/* Social login */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <FaGoogle className="text-red-500 mr-2" /> Google
          </button>
          <button
            type="button"
            className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <FaFacebookF className="text-blue-600 mr-2" /> Facebook
          </button>
        </div>

        <div className="text-center mt-8">
          {currentPage === 'login' ? (
            <p className="text-gray-600">
              Don&apos;t have an account?{' '}
              <button
                type="button"
                onClick={() => setCurrentPage('signup')}
                className="text-pink-600 hover:text-pink-700 font-medium"
              >
                Sign up
              </button>
            </p>
          ) : (
            <p className="text-gray-600">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setCurrentPage('login')}
                className="text-pink-600 hover:text-pink-700 font-medium"
              >
                Login
              </button>
            </p>
          )}
        </div>
      </form>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-12 items-center">
        <AuthForm />
        <SalonIllustration />
      </div>
    </div>
  );
};

export default SalonAuth;
