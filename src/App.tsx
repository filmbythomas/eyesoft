import React, { useState, useEffect, useRef } from 'react';
import { useConvexAuth } from "convex/react";
import Layout from './components/Layout';
import MainPage from './pages/MainPage';
import AboutPage from './pages/AboutPage';
import PortfolioPage from './pages/PortfolioPage';
import PricingBookingPage from './pages/PricingBookingPage';
import FundingDetailsPage from './pages/FundingDetailsPage';
import NotFoundPage from './pages/NotFoundPage';
import FundingWidget from './components/FundingWidget';

export type Page = "home" | "about" | "portfolio" | "pricing" | "funding-details";

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(() => {
    const hash = window.location.hash.replace(/^#/, '');
    if (hash) {
      if (['home', 'about', 'portfolio', 'pricing', 'funding-details'].includes(hash)) {
        return hash as Page;
      }
    }
    return 'home';
  });
  const { isLoading, isAuthenticated } = useConvexAuth();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const [navbarHeight, setNavbarHeight] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash: string = window.location.hash.replace(/^#/, '');
      let newPageCandidate: Page | null = null;

      if (['home', 'about', 'portfolio', 'pricing', 'funding-details'].includes(hash)) {
        newPageCandidate = hash as Page;
      } else if (hash === '') {
        newPageCandidate = 'home';
      } else { 
        newPageCandidate = 'home';
        window.location.hash = 'home'; 
      }

      if (newPageCandidate) { // Check if newPageCandidate is not null
        if (newPageCandidate !== currentPage) {
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentPage(newPageCandidate as Page);
                window.scrollTo(0, 0);
                setTimeout(() => setIsTransitioning(false), 50); 
            }, 300); 
        } else { // newPageCandidate IS currentPage
            window.scrollTo(0, 0);
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); 

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [currentPage]);


  const handleNavigate = (page: Page) => {
    if (currentPage !== page) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentPage(page);
        window.location.hash = page;
        window.scrollTo(0, 0);
        setTimeout(() => setIsTransitioning(false), 50);
      }, 300); 
    } else {
      window.scrollTo(0,0); 
    }
  };
  
  const handleNavbarHeightChange = (height: number) => {
    setNavbarHeight(height);
  };


  let content;
  if (isLoading) {
    content = <div className="flex items-center justify-center min-h-screen bg-background text-primary"><div className="text-2xl font-bold">Loading...</div></div>;
  } else {
    switch (currentPage) {
      case 'home':
        content = <MainPage onNavigate={handleNavigate} />;
        break;
      case 'about':
        content = <AboutPage />;
        break;
      case 'portfolio':
        content = <PortfolioPage />;
        break;
      case 'pricing':
        content = <PricingBookingPage />;
        break;
      case 'funding-details':
        content = <FundingDetailsPage />;
        break;
      default:
        content = <NotFoundPage onNavigate={() => handleNavigate('home')} />;
    }
  }

  // Show funding widget on all pages except home
  const showFundingWidget = currentPage !== 'home';
  
  // Calculate the funding widget height
  const fundingWidgetHeight = 68; // Updated height for the enhanced widget
  
  return (
    <Layout currentPage={currentPage} onNavigate={handleNavigate} onNavbarHeightChange={handleNavbarHeightChange}>
      {showFundingWidget ? (
        <FundingWidget 
          onNavigate={handleNavigate} 
          pageType={currentPage}
          navbarHeight={navbarHeight} 
        />
      ) : null}
      <div 
        ref={mainContentRef} 
        className={`transition-opacity duration-300 ease-in-out ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
        style={{ paddingTop: (currentPage === 'home' || currentPage === 'portfolio') ? '0px' : `${navbarHeight}px` }}
      > 
        {content}
      </div>
    </Layout>
  );
};

export default App;
