import React, { useState, useCallback, useEffect } from 'react';
import { Software, View, User } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import SoftwareList from './components/SoftwareList';
import SellSoftwareForm from './components/SellSoftwareForm';
import Login from './components/Login';
import Register from './components/Register';
import ProfilePage from './components/ProfilePage';
import LoadingSpinner from './components/LoadingSpinner';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';
import LandingPage from './components/LandingPage';

const initialSoftware: Software[] = [
  {
    id: 1,
    name: 'PhotoMaster Pro',
    description: 'Advanced photo editing software with AI-powered tools and a user-friendly interface for professionals.',
    price: 99.99,
    rating: 5,
    imageUrl: 'https://picsum.photos/seed/photomaster/600/400',
    category: 'Productivity'
  },
  {
    id: 2,
    name: 'CodeWeaver IDE',
    description: 'A next-generation integrated development environment for web developers, supporting over 20 languages.',
    price: 149.50,
    rating: 4,
    imageUrl: 'https://picsum.photos/seed/codeweaver/600/400',
    category: 'Development'
  },
  {
    id: 3,
    name: 'SoundWave Studio',
    description: 'Complete digital audio workstation for music production, recording, and mixing. Includes virtual instruments.',
    price: 299.00,
    rating: 5,
    imageUrl: 'https://picsum.photos/seed/soundwave/600/400',
    category: 'Creativity'
  },
  {
    id: 4,
    name: 'GameForge Engine',
    description: 'A powerful 3D game development engine with a visual scripting interface and a vast asset store.',
    price: 499.99,
    rating: 4,
    imageUrl: 'https://picsum.photos/seed/gameforge/600/400',
    category: 'Development'
  },
  {
    id: 5,
    name: 'SecureVault VPN',
    description: 'Protect your online privacy with military-grade encryption and access geo-restricted content seamlessly.',
    price: 9.99,
    rating: 5,
    imageUrl: 'https://picsum.photos/seed/securevault/600/400',
    category: 'Security'
  },
  {
    id: 6,
    name: 'OfficeSuite Ultimate',
    description: 'A comprehensive office suite with word processing, spreadsheets, presentations, and PDF editing tools.',
    price: 79.99,
    rating: 4,
    imageUrl: 'https://picsum.photos/seed/officesuite/600/400',
    category: 'Productivity'
  },
   {
    id: 7,
    name: 'QuickNote',
    description: 'A lightweight and fast note-taking app for quickly jotting down ideas. Syncs across all your devices.',
    price: 0,
    rating: 4,
    imageUrl: 'https://picsum.photos/seed/quicknote/600/400',
    category: 'Productivity'
  },
];

const ITEMS_PER_PAGE = 3;

const initialUsers: User[] = [
  { id: 1, name: 'user', email: 'user@softmarket.com', password: 'password', listings: [] }
];

const App: React.FC = () => {
  const [view, setView] = useState<View>(View.LANDING);
  const [softwareList, setSoftwareList] = useState<Software[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [postLoginView, setPostLoginView] = useState<View | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState<Software[]>([]);

  useEffect(() => {
    // Simulate initial data fetch
    setIsLoading(true);
    const timer = setTimeout(() => {
        setSoftwareList(initialSoftware);
        setIsLoading(false);
    }, 1000); // 1-second delay

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);
  
  const handleAddToCart = (software: Software) => {
    setCart(prevCart => {
      if (prevCart.find(item => item.id === software.id)) {
        return prevCart;
      }
      return [...prevCart, software];
    });
  };

  const handleDownloadFree = (software: Software) => {
    alert(`Thank you for "downloading" ${software.name}!`);
  };

  const handleRemoveFromCart = (softwareId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== softwareId));
  };
  
  const handleCheckout = () => {
    if (cart.length === 0) return;
    setView(View.CHECKOUT);
  };

  const handleConfirmPurchase = (paymentMethod: string) => {
    const total = cart.reduce((total, item) => total + item.price, 0).toFixed(2);
    alert(`Payment successful using ${paymentMethod}! Thank you for your purchase of ${cart.length} item(s) for a total of $${total}.`);
    setCart([]);
    setView(View.BROWSE);
  };

  const handleAddSoftware = useCallback((newSoftware: Omit<Software, 'id' | 'rating'>) => {
    const newId = softwareList.length > 0 ? Math.max(...softwareList.map(s => s.id)) + 1 : 1;
    const softwareToAdd: Software = {
      ...newSoftware,
      id: newId,
      rating: Math.floor(Math.random() * 2) + 4
    };
    
    setSoftwareList(prevList => [...prevList, softwareToAdd]);
    
    if (currentUser) {
      setCurrentUser(prevUser => prevUser ? { ...prevUser, listings: [...prevUser.listings, newId] } : null);
    }
    
    setView(View.BROWSE);
  }, [currentUser, softwareList]);

  const filteredSoftware = softwareList.filter(software =>
    software.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    software.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredSoftware.length / ITEMS_PER_PAGE);
  const paginatedSoftware = filteredSoftware.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setIsLoading(true);
      window.scrollTo(0, 0);
      setTimeout(() => {
        setCurrentPage(page);
        setIsLoading(false);
      }, 500); // Shorter delay for pagination
    }
  };

  const handleRegister = (newUser: Omit<User, 'id' | 'listings'>) => {
    if (users.some(u => u.name.toLowerCase() === newUser.name.toLowerCase())) {
      alert('Username is already taken.');
      return;
    }
    if (users.some(u => u.email.toLowerCase() === newUser.email.toLowerCase())) {
      alert('An account with this email already exists.');
      return;
    }

    const userToAdd: User = {
      ...newUser,
      id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
      listings: [],
    };

    setUsers(prevUsers => [...prevUsers, userToAdd]);
    setCurrentUser(userToAdd); // Automatically log in the new user
    setView(View.BROWSE);
    alert('Registration successful! Welcome to SoftMarket.');
  };

  const handleLogin = (username: string, password: string): boolean => {
    const user = users.find(u => u.name === username && u.password === password);
    if (user) {
      setCurrentUser(user);
      setView(postLoginView || View.BROWSE);
      setPostLoginView(null);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setView(View.BROWSE);
  };

  const handleViewChange = (newView: View) => {
    if ((newView === View.SELL || newView === View.PROFILE) && !currentUser) {
      setPostLoginView(newView);
      setView(View.LOGIN);
      return;
    }

    if (view === View.BROWSE && newView !== View.BROWSE) {
      setSearchTerm('');
    }
    setView(newView);
  };

  const renderContent = () => {
    if (isLoading && view === View.BROWSE) {
        return <LoadingSpinner />;
    }

    switch (view) {
      case View.LANDING:
        return <LandingPage setView={handleViewChange} />;
      case View.SELL:
        return <SellSoftwareForm onAddSoftware={handleAddSoftware} />;
      case View.LOGIN:
        return <Login onLogin={handleLogin} onCancel={() => setView(View.BROWSE)} onSwitchToRegister={() => setView(View.REGISTER)} />;
      case View.REGISTER:
        return <Register onRegister={handleRegister} onCancel={() => setView(View.BROWSE)} onSwitchToLogin={() => setView(View.LOGIN)} />;
      case View.PROFILE:
        if (!currentUser) {
          // This case should be handled by handleViewChange, but as a fallback:
          return <Login onLogin={handleLogin} onCancel={() => setView(View.BROWSE)} onSwitchToRegister={() => setView(View.REGISTER)} />;
        }
        const userListings = softwareList.filter(s => currentUser.listings.includes(s.id));
        return <ProfilePage user={currentUser} listings={userListings} setView={handleViewChange} onAddToCart={handleAddToCart} cart={cart} onDownloadFree={handleDownloadFree} />;
      case View.CART:
        return <CartPage cartItems={cart} onRemoveFromCart={handleRemoveFromCart} onCheckout={handleCheckout} setView={handleViewChange} />;
      case View.CHECKOUT:
        return <CheckoutPage cartItems={cart} onConfirmPurchase={handleConfirmPurchase} setView={handleViewChange} />;
      case View.BROWSE:
      default:
        return (
          <SoftwareList 
            softwareList={paginatedSoftware} 
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            onAddToCart={handleAddToCart}
            cart={cart}
            onDownloadFree={handleDownloadFree}
          />
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
      <Header
        currentView={view}
        setView={handleViewChange}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        currentUser={currentUser}
        onLogout={handleLogout}
        cartItemCount={cart.length}
      />
      <main className={`flex-grow ${view !== View.LANDING ? 'container mx-auto px-4 py-8' : ''}`}>
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
};

export default App;