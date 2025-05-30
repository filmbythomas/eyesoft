import React from 'react';
import { Page } from '../App'; 
import { AlertTriangle, Home } from 'lucide-react';

interface NotFoundPageProps {
  onNavigate: (page: Page) => void; 
}

const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  const handleGoHome = () => {
    onNavigate('home'); // Corrected to 'home'
  };

  return (
    <div className="page-container min-h-[calc(100vh-10rem)] flex flex-col items-center justify-center text-center bg-gradient-to-br from-background via-surface to-accent/10">
      <AlertTriangle size={80} className="text-red-500 mb-8 animate-bounce" />
      <h1 className="text-6xl md:text-8xl font-black text-primary mb-4">404</h1>
      <h2 className="text-3xl md:text-4xl font-semibold text-primary-dark mb-6">Oops! Page Not Found.</h2>
      <p className="text-lg md:text-xl text-text-secondary max-w-md mb-10 subtext">
        The page you're looking for seems to have wandered off the path. Don't worry, we can guide you back.
      </p>
      <button
        onClick={handleGoHome}
        className="cta-button font-extrabold text-lg button-tilt-effect flex items-center gap-2.5"
      >
        <Home size={22} />
        Take Me Home
      </button>
    </div>
  );
};

export default NotFoundPage;
