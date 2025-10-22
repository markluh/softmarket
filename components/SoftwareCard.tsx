import React from 'react';
import { Software } from '../types';
import StarIcon from './icons/StarIcon';
import Button from './Button';

interface SoftwareCardProps {
  software: Software;
  onAddToCart: (software: Software) => void;
  isInCart: boolean;
  onDownloadFree: (software: Software) => void;
}

const SoftwareCard: React.FC<SoftwareCardProps> = ({ software, onAddToCart, isInCart, onDownloadFree }) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out flex flex-col">
      <img className="w-full h-56 object-cover" src={software.imageUrl} alt={software.name} />
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{software.name}</h3>
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 flex-shrink-0">{software.category}</span>
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 h-20 overflow-hidden">{software.description}</p>
        <div className="flex items-center mb-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <StarIcon
              key={index}
              className={`h-5 w-5 ${index < software.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
            />
          ))}
          <span className="text-gray-600 dark:text-gray-400 ml-2 text-sm">{software.rating.toFixed(1)}</span>
        </div>
        <div className="flex justify-between items-center mt-auto">
          {software.price > 0 ? (
            <p className="text-2xl font-extrabold text-gray-800 dark:text-white">${software.price.toFixed(2)}</p>
          ) : (
            <p className="text-2xl font-extrabold text-green-600 dark:text-green-400">Free</p>
          )}
          
          {software.price > 0 ? (
            <Button 
              variant="primary"
              onClick={() => onAddToCart(software)}
              disabled={isInCart}
            >
              {isInCart ? 'In Cart' : 'Add to Cart'}
            </Button>
          ) : (
             <Button 
              variant="success"
              onClick={() => onDownloadFree(software)}
            >
              Download
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SoftwareCard;