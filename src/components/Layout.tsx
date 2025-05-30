import React from 'react';
import Navbar from './Navbar';
import { Page } from '../App'; 
import { Toaster } from 'sonner';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onNavbarHeightChange: (height: number) => void; // Added prop
}

const Footer: React.FC = () => {
  const motto = "Capturing moments, creating memories."; 

  return (
    <footer className="bg-primary-dark text-text-on-dark py-12 md:py-20">
      <div className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <img 
          src="/shared/logo.svg" 
          alt="Eyes Of T Logo" 
          className="h-16 w-auto mx-auto mb-6 opacity-90"
        />
        <p className="text-xl md:text-2xl font-black text-highlight mb-3">
          &copy; {new Date().getFullYear()} Eyes Of T. All Rights Reserved.
        </p>
        <p className="text-lg md:text-xl opacity-80 mt-1 mb-6 italic font-semibold text-secondary-light">
          {motto}
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-8 mt-6">
          <a 
            href="https://www.instagram.com/eyesofteee" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-lg font-bold text-highlight hover:text-secondary-light transition-colors duration-200 underline"
          >
            Instagram: @eyesofteee
          </a>
          <span className="hidden sm:inline opacity-50 text-xl">|</span>
          <a 
            href="mailto:filmbythomas@gmail.com" 
            className="text-lg font-bold text-highlight hover:text-secondary-light transition-colors duration-200 underline"
          >
            Email: filmbythomas@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
};


const Layout: React.FC<LayoutProps> = ({ children, currentPage, onNavigate, onNavbarHeightChange }) => {
  return (
    <div className="app-container flex flex-col min-h-screen">
      <Toaster position="top-center" richColors toastOptions={{
        classNames: {
          toast: 'border-2 !shadow-xl !font-bold !text-base !py-3 !px-4',
          success: '!bg-secondary !border-secondary-light !text-text-on-dark',
          info: '!bg-primary !border-primary-dark !text-text-on-dark',
          warning: '!bg-amber-500 !border-amber-600 !text-text-on-dark',
          error: '!bg-red-600 !border-red-700 !text-text-on-dark',
        }
      }}/>
      <Navbar 
        onNavigate={onNavigate} 
        currentPage={currentPage} 
        onHeightChange={onNavbarHeightChange} // Pass prop down
      />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
