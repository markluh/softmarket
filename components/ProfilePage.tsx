import React from 'react';
import { User, Software, View } from '../types';
import SoftwareCard from './SoftwareCard';
import Button from './Button';

interface ProfilePageProps {
  user: User;
  listings: Software[];
  setView: (view: View) => void;
  onAddToCart: (software: Software) => void;
  cart: Software[];
  onDownloadFree: (software: Software) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user, listings, setView, onAddToCart, cart, onDownloadFree }) => {
  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8">My Profile</h2>
      
      <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-xl mb-12">
        <div className="flex items-center space-x-6">
          <div className="flex-shrink-0">
            <div className="h-20 w-20 rounded-full bg-blue-500 flex items-center justify-center text-white text-3xl font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>
          <div className="flex-grow">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{user.name}</h3>
            <p className="text-gray-500 dark:text-gray-400">Member</p>
          </div>
          <Button variant="secondary" onClick={() => alert('Profile editing coming soon!')}>
            Edit Profile
          </Button>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">My Software Listings</h3>
        {listings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {listings.map(software => (
              <SoftwareCard
                key={software.id}
                software={software}
                onAddToCart={onAddToCart}
                isInCart={cart.some(item => item.id === software.id)}
                onDownloadFree={onDownloadFree}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-gray-900 rounded-lg shadow-md">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4M4 7l8 5 8-5" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No listings yet</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">You haven't listed any software. Why not sell your first one?</p>
            <div className="mt-6">
                <Button variant="primary" onClick={() => setView(View.SELL)}>
                    List Software Now
                </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;