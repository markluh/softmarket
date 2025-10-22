import React from 'react';
import { View } from '../types';
import Button from './Button';

const FeatureIcon1: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4M4 7l8 5 8-5" />
  </svg>
);

const FeatureIcon2: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);

const FeatureIcon3: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
  </svg>
);

interface LandingPageProps {
  setView: (view: View) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ setView }) => {
  return (
    <div className="bg-gray-100 dark:bg-gray-800">
      {/* Hero Section */}
      <section className="relative py-40 text-center bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{backgroundImage: "url('https://picsum.photos/seed/tech/1920/1080')"}}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/90 to-gray-800"></div>

        <div className="relative z-10 p-4">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4">
            The Future of Software is Here
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-300 mb-8">
            Discover, purchase, and sell cutting-edge software in a marketplace built for creators and innovators.
          </p>
          <Button 
            onClick={() => setView(View.BROWSE)} 
            variant="primary"
            className="px-10 py-4 text-lg"
          >
            Explore Marketplace
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white">Why Choose Us?</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              The ultimate platform for software enthusiasts.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center">
              <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-500 mb-4">
                <FeatureIcon1 />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Vast Software Library</h3>
              <p className="text-gray-600 dark:text-gray-400">
                From indie gems to professional powerhouses, find the perfect tool for any task.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-500 mb-4">
                <FeatureIcon2 />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">AI-Powered Listings</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Sellers can generate compelling product descriptions instantly with our built-in AI assistant.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-500 mb-4">
                <FeatureIcon3 />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Secure & Easy Payments</h3>
              <p className="text-gray-600 dark:text-gray-400">
                A seamless and secure checkout process with multiple payment options for your convenience.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;