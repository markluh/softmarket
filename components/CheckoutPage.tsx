import React, { useState } from 'react';
import { Software, View } from '../types';
import Button from './Button';

interface CheckoutPageProps {
  cartItems: Software[];
  onConfirmPurchase: (paymentMethod: string) => void;
  setView: (view: View) => void;
}

type PaymentMethod = 'credit-card' | 'paypal' | 'wallet';

const CreditCardIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
  </svg>
);

const PayPalIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M8.32 21.18c.52.12 1.05.18 1.59.18h.11c3.9 0 6.9-2.78 7.52-6.55.13-.79.23-1.6.28-2.42.06-1.13.06-1.14 0-1.16-.05-.82-.16-1.63-.29-2.42-.5-3.2-2.75-5.52-5.7-6.24-1.12-.27-2.28-.4-3.47-.4H8.4c-1.1 0-2.12.28-3.03.82-2.3 1.35-3.62 3.8-3.3 6.5.22 1.83 1.45 3.46 3.03 4.23.5.24.9.36 1.22.36.16 0 .32-.03.49-.09.34-.13.5-.52.37-.87-.1-.28-.35-.44-.63-.58-1.1-.55-1.8-1.58-1.95-2.8-.2-1.78.8-3.5 2.3-4.4 1.1-.64 2.3-.9 3.4-.64.4.1.78.22 1.15.38 2.22.9 3.63 3 3.3 5.3s-2.03 4.2-4.2 4.5c-1.1.15-2.2.1-3.2-.09-.16-.03-.32-.06-.49-.09-.34-.06-.68.16-.75.52-.06.34.16.68.52.75z" />
    </svg>
);

const WalletIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
  </svg>
);


const CheckoutPage: React.FC<CheckoutPageProps> = ({ cartItems, onConfirmPurchase, setView }) => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('credit-card');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  const handlePurchase = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
        let method = 'Credit Card';
        if (paymentMethod === 'paypal') method = 'PayPal';
        if (paymentMethod === 'wallet') method = 'SoftMarket Wallet';
        onConfirmPurchase(method);
        setIsProcessing(false);
    }, 1500); // Simulate network delay
  };

  const renderPaymentDetails = () => {
    switch(paymentMethod) {
      case 'credit-card':
        return (
          <div className="space-y-4">
            <div>
              <label htmlFor="card-number" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Card Number</label>
              <input type="text" id="card-number" placeholder="**** **** **** ****" className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="expiry-date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Expiry Date</label>
                <input type="text" id="expiry-date" placeholder="MM / YY" className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label htmlFor="cvc" className="block text-sm font-medium text-gray-700 dark:text-gray-300">CVC</label>
                <input type="text" id="cvc" placeholder="***" className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
              </div>
            </div>
          </div>
        );
      case 'paypal':
        return <p className="text-gray-600 dark:text-gray-400">You will be redirected to PayPal to complete your purchase.</p>;
      case 'wallet':
        return (
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <p className="font-semibold text-blue-800 dark:text-blue-300">SoftMarket Wallet Balance</p>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-200">$5,000.00</p>
            </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8">Checkout</h2>
      <form onSubmit={handlePurchase} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Payment Details Column */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 p-8 rounded-lg shadow-xl space-y-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Payment Method</h3>
          <div className="space-y-4">
            {/* Payment Options */}
            <div className="grid sm:grid-cols-3 gap-4">
              <button type="button" onClick={() => setPaymentMethod('credit-card')} className={`flex items-center space-x-3 p-4 border rounded-lg transition-colors ${paymentMethod === 'credit-card' ? 'border-blue-500 ring-2 ring-blue-500' : 'border-gray-300 dark:border-gray-600'}`}>
                <CreditCardIcon /> <span>Credit Card</span>
              </button>
              <button type="button" onClick={() => setPaymentMethod('paypal')} className={`flex items-center space-x-3 p-4 border rounded-lg transition-colors ${paymentMethod === 'paypal' ? 'border-blue-500 ring-2 ring-blue-500' : 'border-gray-300 dark:border-gray-600'}`}>
                <PayPalIcon /> <span>PayPal</span>
              </button>
               <button type="button" onClick={() => setPaymentMethod('wallet')} className={`flex items-center space-x-3 p-4 border rounded-lg transition-colors ${paymentMethod === 'wallet' ? 'border-blue-500 ring-2 ring-blue-500' : 'border-gray-300 dark:border-gray-600'}`}>
                <WalletIcon /> <span>Wallet</span>
              </button>
            </div>
            {/* Payment Form */}
            <div className="pt-4">
              {renderPaymentDetails()}
            </div>
          </div>
        </div>

        {/* Order Summary Column */}
        <div className="lg:col-span-1 bg-white dark:bg-gray-900 rounded-lg shadow-xl">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white p-6 border-b border-gray-200 dark:border-gray-700">Order Summary</h3>
          <div className="p-6 space-y-4">
            <ul className="space-y-3">
              {cartItems.map(item => (
                <li key={item.id} className="flex justify-between items-start">
                  <span className="text-gray-700 dark:text-gray-300">{item.name}</span>
                  <span className="font-semibold text-gray-900 dark:text-white">${item.price.toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 flex justify-between text-xl font-bold text-gray-900 dark:text-white">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>
           <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-b-lg space-y-4">
            <Button type="submit" variant="success" className="w-full" isLoading={isProcessing}>
              {isProcessing ? 'Processing...' : `Confirm Purchase - $${totalPrice.toFixed(2)}`}
            </Button>
            <Button type="button" variant="secondary" onClick={() => setView(View.CART)} className="w-full">
              Back to Cart
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;