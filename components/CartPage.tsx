import React from 'react';
import { Software, View } from '../types';
import Button from './Button';

interface CartPageProps {
  cartItems: Software[];
  onRemoveFromCart: (softwareId: number) => void;
  onCheckout: () => void;
  setView: (view: View) => void;
}

const CartPage: React.FC<CartPageProps> = ({ cartItems, onRemoveFromCart, onCheckout, setView }) => {
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-16 bg-white dark:bg-gray-900 rounded-lg shadow-md">
        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">Your cart is empty</h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Looks like you haven't added any software yet.</p>
        <div className="mt-6">
          <Button variant="primary" onClick={() => setView(View.BROWSE)}>
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8">Your Shopping Cart</h2>
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl">
        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
          {cartItems.map((item) => (
            <li key={item.id} className="p-4 sm:p-6 flex">
              <div className="flex-shrink-0">
                <img className="w-24 h-24 rounded-md object-cover" src={item.imageUrl} alt={item.name} />
              </div>
              <div className="ml-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{item.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{item.category}</p>
                </div>
                <div className="flex items-baseline justify-between mt-2">
                  <p className="text-xl font-semibold text-gray-800 dark:text-white">${item.price.toFixed(2)}</p>
                  <Button variant="secondary" onClick={() => onRemoveFromCart(item.id)}>
                    Remove
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="border-t border-gray-200 dark:border-gray-700 p-4 sm:p-6">
          <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-white">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="mt-6">
            <Button variant="success" onClick={onCheckout} className="w-full">
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;