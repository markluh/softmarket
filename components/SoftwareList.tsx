import React from 'react';
import { Software } from '../types';
import SoftwareCard from './SoftwareCard';

interface SoftwareListProps {
  softwareList: Software[];
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onAddToCart: (software: Software) => void;
  cart: Software[];
  onDownloadFree: (software: Software) => void;
}

const SoftwareList: React.FC<SoftwareListProps> = ({ softwareList, totalPages, currentPage, onPageChange, onAddToCart, cart, onDownloadFree }) => {
  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
      <nav className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 px-4 sm:px-0 mt-12">
        <div className="-mt-px w-0 flex-1 flex">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <svg className="mr-3 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Previous
          </button>
        </div>
        <div className="hidden md:-mt-px md:flex">
          {pageNumbers.map(number => (
            <button
              key={number}
              onClick={() => onPageChange(number)}
              className={`border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium transition-colors ${
                currentPage === number
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-500'
              }`}
              aria-current={currentPage === number ? 'page' : undefined}
            >
              {number}
            </button>
          ))}
        </div>
        <div className="-mt-px w-0 flex-1 flex justify-end">
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
            <svg className="ml-3 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </nav>
    )
  }

  return (
    <div>
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">Explore Our Software Marketplace</h2>
        {softwareList.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {softwareList.map(software => (
                  <SoftwareCard 
                    key={software.id}
                    software={software}
                    onAddToCart={onAddToCart}
                    isInCart={cart.some(item => item.id === software.id)}
                    onDownloadFree={onDownloadFree}
                  />
              ))}
            </div>
            {renderPagination()}
          </>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-gray-900 rounded-lg shadow-md">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No software found</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Your search did not match any products. Try a different keyword.</p>
          </div>
        )}
    </div>
  );
};

export default SoftwareList;