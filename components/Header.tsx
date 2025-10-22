import React from 'react';
import { View, User } from '../types';
import Button from './Button';

interface HeaderProps {
  currentView: View;
  setView: (view: View) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  currentUser: User | null;
  onLogout: () => void;
  cartItemCount: number;
}

const Header: React.FC<HeaderProps> = ({ currentView, setView, searchTerm, setSearchTerm, currentUser, onLogout, cartItemCount }) => {
  return (
    <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <button onClick={() => setView(View.BROWSE)} className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2h-8zM4 4a2 2 0 012-2h2v12H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
          </svg>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Soft<span className="text-blue-500">Market</span>
          </h1>
        </button>

        <div className="flex-1 flex justify-center px-4 min-w-0">
          <div className={`w-full max-w-md ${currentView === View.BROWSE ? 'visible' : 'invisible'}`}>
            <label htmlFor="search" className="sr-only">Search</label>
            <div className="relative text-gray-400 focus-within:text-gray-600">
              <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                id="search"
                name="search"
                className="block w-full bg-white dark:bg-gray-800 py-2 pl-10 pr-3 border border-gray-300 dark:border-gray-600 rounded-md leading-5 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search by name or category"
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        <nav className="flex items-center space-x-2 sm:space-x-4">
          <Button 
            onClick={() => setView(View.BROWSE)}
            variant={currentView === View.BROWSE ? 'primary' : 'secondary'}
            >
            Browse
          </Button>
          
          {currentUser ? (
            <>
              <Button 
                onClick={() => setView(View.SELL)}
                variant={currentView === View.SELL ? 'primary' : 'secondary'}
                className="hidden sm:inline-flex"
              >
                Sell
              </Button>
              <button 
                onClick={() => setView(View.PROFILE)}
                className="text-gray-700 dark:text-gray-300 text-sm hidden lg:block hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200"
              >
                Welcome, <span className="font-semibold">{currentUser.name}</span>
              </button>
              <Button onClick={onLogout} variant="secondary">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button 
                onClick={() => setView(View.REGISTER)}
                variant={currentView === View.REGISTER ? 'primary' : 'secondary'}
                className="hidden sm:inline-flex"
              >
                Register
              </Button>
              <Button 
                onClick={() => setView(View.LOGIN)}
                variant={currentView === View.LOGIN ? 'primary' : 'secondary'}
              >
                Login
              </Button>
            </>
          )}

          <button onClick={() => setView(View.CART)} className="relative p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500">
            <span className="sr-only">View cart</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                {cartItemCount}
              </span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;