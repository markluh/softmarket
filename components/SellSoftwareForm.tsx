
import React, { useState } from 'react';
import { Software } from '../types';
import Button from './Button';
import { generateDescription } from '../services/geminiService';

interface SellSoftwareFormProps {
  onAddSoftware: (newSoftware: Omit<Software, 'id' | 'rating'>) => void;
}

const SellSoftwareForm: React.FC<SellSoftwareFormProps> = ({ onAddSoftware }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [keywords, setKeywords] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateDescription = async () => {
    if (!name || !keywords) {
      setError('Please enter a software name and some keywords first.');
      return;
    }
    setError(null);
    setIsGenerating(true);
    try {
      const generatedDesc = await generateDescription(name, keywords);
      setDescription(generatedDesc);
    } catch (err) {
      setError('Failed to generate description. Please try again.');
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !description || !category) {
        alert("Please fill all required fields.");
        return;
    }
    onAddSoftware({
      name,
      description,
      price: parseFloat(price),
      imageUrl: imageUrl || `https://picsum.photos/seed/${name.replace(/\s/g, '')}/600/400`,
      category
    });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 p-8 rounded-lg shadow-xl">
      <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">List Your Software</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Software Name</label>
            <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" required />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
            <input type="text" id="category" value={category} onChange={e => setCategory(e.target.value)} placeholder="e.g., Productivity, Development" className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" required />
          </div>
        </div>

        <div>
          <label htmlFor="keywords" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Keywords for AI</label>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Enter keywords to help AI generate a description (e.g., "photo editing, filters, layers").</p>
          <div className="flex items-center space-x-2">
            <input type="text" id="keywords" value={keywords} onChange={e => setKeywords(e.target.value)} className="flex-grow block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            <Button type="button" onClick={handleGenerateDescription} isLoading={isGenerating}>
              Generate Description
            </Button>
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
          <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} rows={5} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" required></textarea>
           {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Price ($)</label>
            <input type="number" id="price" value={price} onChange={e => setPrice(e.target.value)} min="0" step="0.01" className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" required />
          </div>
          <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Image URL (Optional)</label>
            <input type="text" id="imageUrl" value={imageUrl} onChange={e => setImageUrl(e.target.value)} placeholder="Leave blank for automatic image" className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" variant="success">
            List My Software
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SellSoftwareForm;
