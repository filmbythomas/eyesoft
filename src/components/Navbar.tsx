import React, { useState, useEffect, useRef } from 'react';
import { Page } from '../App';

interface NavbarProps {
  onNavigate: (page: Page) => void;
  currentPage: Page;
  onHeightChange: (height: number) => void; 
}

const NavLink: React.FC<{
  page: Page;
  currentPage: Page;
  onNavigate: (page: Page) => void;
  children: React.ReactNode;
  isMobile?: boolean;
}> = ({ page, currentPage, onNavigate, children, isMobile }) => {
  const isActive = currentPage === page;
  const baseClasses = "font-freckle-face text-xl md:text-2xl tracking-wider transition-all duration-300 ease-creative";
  const activeClasses = "text-secondary-light scale-110";
  const inactiveClasses = "text-text-on-dark hover:text-secondary-light hover:scale-105";

  return (
    <a
      href={`#${page}`}
      onClick={(e) => {
        e.preventDefault();
        onNavigate(page);
        if (isMobile) {
          if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
          }
        }
      }}
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses} nav-link-underline ${isActive ? 'active' : ''} py-2 px-1 md:py-0 md:px-0`}
    >
      {children}
    </a>
  );
};

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage, onHeightChange }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      if (currentPage === 'home') {
        // Check if scrolled past the hero section (approximately viewport height)
        setIsScrolledPastHero(scrollY > window.innerHeight * 0.8);
      } else if (currentPage === 'portfolio') {
        // For portfolio, check if scrolled past the category selection
        setIsScrolledPastHero(scrollY > window.innerHeight * 0.6);
      } else {
        setIsScrolledPastHero(false);
      }
    };
    
    handleScroll(); 

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  useEffect(() => {
    if (navRef.current) {
      onHeightChange(navRef.current.offsetHeight);
    }
  }, [isMobileMenuOpen, currentPage, onHeightChange]);

  const navPages: { page: Page; label: string }[] = [
    { page: 'home', label: 'Home' },
    { page: 'about', label: 'About' },
    { page: 'portfolio', label: 'Portfolio' },
    { page: 'pricing', label: 'Packages' },
  ];

  // Determine if current page has light background (excluding portfolio)
  const hasLightBackground = ['about', 'pricing', 'funding-details'].includes(currentPage);
  const isPortfolioPage = currentPage === 'portfolio';

  let navBackgroundClass = 'py-4'; 
  
  if (currentPage === 'home') {
    if (!isMobileMenuOpen) { 
       // Always transparent on home page unless mobile menu is open
       navBackgroundClass = 'py-6';
    } else {
       // Mobile menu open - use solid background
       navBackgroundClass = 'bg-forest shadow-xl py-4';
    }
  } else if (isPortfolioPage) {
    // Portfolio page gets transparent navbar, but solid when scrolled past hero
    if (!isMobileMenuOpen) {
      navBackgroundClass = isScrolledPastHero ? 'bg-forest shadow-xl py-4' : 'py-6';
    } else {
      navBackgroundClass = 'bg-forest shadow-xl py-4';
    }
  } else if (hasLightBackground) {
    // For pages with light backgrounds, use a solid earthy forest green
    navBackgroundClass = 'bg-forest shadow-xl py-4';
  } else {
    // Default solid background for other pages
    navBackgroundClass = 'bg-forest shadow-xl py-4';
  }

  return (
    <nav 
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${navBackgroundClass}`}
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <a
          href="#home"
          onClick={(e) => { e.preventDefault(); onNavigate('home'); }}
          className="flex items-center gap-3 text-text-on-dark hover:text-secondary-light transition-colors duration-300 group"
        >
          <img src="/shared/logo.svg" alt="Eyes Of T Logo" className="h-10 md:h-12 w-auto transition-transform duration-300 group-hover:scale-110" />
          <span 
            className="font-barrio text-4xl md:text-5xl" 
            style={{ textShadow: '2px 2px 3px rgba(0,0,0,0.2)' }}
          >
            Eyes Of T
          </span>
        </a>

        <div className="hidden md:flex items-center space-x-8">
          {navPages.map(({ page, label }) => (
            <NavLink key={page} page={page} currentPage={currentPage} onNavigate={onNavigate}>
              {label}
            </NavLink>
          ))}
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-text-on-dark focus:outline-none p-2"
            aria-label="Toggle menu"
          >
            <div className="space-y-2">
              <span className={`hamburger-line ${isMobileMenuOpen ? 'hamburger-line-top-open' : ''}`}></span>
              <span className={`hamburger-line ${isMobileMenuOpen ? 'hamburger-line-middle-open' : ''}`}></span>
              <span className={`hamburger-line ${isMobileMenuOpen ? 'hamburger-line-bottom-open' : ''}`}></span>
            </div>
          </button>
        </div>
      </div>

      {isMobileMenuOpen ? (
        <div className={`md:hidden absolute top-full left-0 right-0 shadow-xl py-3 ${isPortfolioPage ? 'bg-forest' : (hasLightBackground ? 'bg-forest' : 'bg-forest')}`}>
          <div className="flex flex-col items-center space-y-5 px-4 pt-2 pb-4">
            {navPages.map(({ page, label }) => (
              <NavLink key={page} page={page} currentPage={currentPage} onNavigate={(p) => { onNavigate(p); setIsMobileMenuOpen(false); }} isMobile>
                {label}
              </NavLink>
            ))}
          </div>
        </div>
      ) : null}
    </nav>
  );
};

export default Navbar;
