import React from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

const Audiences = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-64">
        <Header />
        <div className="flex-1 p-6 overflow-auto">
          <h1 className="text-2xl font-bold text-gray-900">Audiences</h1>
          <p className="text-gray-600 mt-4">This page is under construction. Check back later for updates!</p>
        </div>
      </div>
    </div>
  );
};

export default Audiences;