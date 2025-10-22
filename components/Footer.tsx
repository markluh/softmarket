
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-6 text-center text-gray-600 dark:text-gray-400">
        <p>&copy; {new Date().getFullYear()} SoftMarket. All rights reserved.</p>
        <p className="text-sm mt-1">Your premier destination for buying and selling software.</p>
      </div>
    </footer>
  );
};

export default Footer;
