import React, { useEffect, useState, useRef } from 'react';
import { Page } from '../App';
import ParticleBackground from '../components/ParticleBackground';

interface MainPageProps {
  onNavigate: (page: Page) => void;
}

const MainPage: React.FC<MainPageProps> = ({ onNavigate }) => {
  const navigateAndSetHash = (page: Page) => {
    onNavigate(page);
  };

  const aboutImageTiltRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const tiltElement = aboutImageTiltRef.current;
    let parentContainer: HTMLElement | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      if (!tiltElement || !parentContainer) return;
      const { left, top, width, height } = parentContainer.getBoundingClientRect();
      const x = e.clientX - left - width / 2;
      const y = e.clientY - top - height / 2;
      const maxTilt = 7;
      const rotateY = (x / (width / 2)) * maxTilt * -1;
      const rotateX = (y / (height / 2)) * maxTilt;
      tiltElement.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;
    };

    const handleMouseLeave = () => {
      if (tiltElement) {
        tiltElement.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
      }
    };

    if (tiltElement) {
      parentContainer = tiltElement.parentElement?.parentElement as HTMLElement;
      if (parentContainer) {
        parentContainer.addEventListener('mousemove', handleMouseMove);
        parentContainer.addEventListener('mouseleave', handleMouseLeave);
      }
    }

    return () => {
      if (parentContainer) {
        parentContainer.removeEventListener('mousemove', handleMouseMove);
        parentContainer.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <div> 
      <section 
        id="hero" 
        className="min-h-screen flex flex-col items-center justify-center relative text-text-on-dark parallax-section"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&amp;fit=crop&amp;w=1920&amp;q=80')" }} 
      >
        <ParticleBackground /> 
        <div className="absolute inset-0 bg-black/60 z-0"></div>
        
        <div className="relative z-10 text-center p-4 animate-fadeInUp">
          <h1 
            className="text-7xl md:text-8xl lg:text-9xl font-black mb-6"
            style={{
              color: '#daad73', 
              textShadow: '0 3px 25px rgba(0,0,0,0.6), 0 1px 10px rgba(var(--color-secondary-rgb),0.35)',
              fontFamily: '"Caveat", cursive'
            }}
          >
            Eyes Of T
          </h1>
          <p 
            className="text-xl md:text-2xl font-sans font-semibold opacity-90 mt-5 subtext" 
            style={{color: '#b7c4b6', textShadow: '0 1px 8px rgba(0,0,0,0.75)'}}
          >
            Capturing life's authentic moments, through my lens.
          </p>
        </div>
      </section>

      <section 
        id="about-preview" 
        className="min-h-screen flex items-center justify-center bg-surface text-text-primary p-8 md:p-12 relative overflow-hidden"
      >
        <div className="relative z-10 grid md:grid-cols-2 gap-10 md:gap-16 items-center max-w-6xl mx-auto">
          <div className="animate-fadeInUp animation-delay-300 perspective-container">
            <img 
              ref={aboutImageTiltRef}
              src="/home/about-preview-image.jpg" 
              alt="About Eyes Of T" 
              className="rounded-xl shadow-2xl object-cover w-full h-auto md:h-[550px] tilt-effect border-4 border-background" 
            />
          </div>
          <div className="text-center md:text-left animate-fadeInUp animation-delay-400">
            <h2 className="text-primary font-extrabold mb-6">Meet T</h2>
            <p className="text-lg md:text-xl text-text-secondary mb-10 leading-relaxed font-sans font-semibold subtext">
              Discover the passion, philosophy, and artistic journey behind Eyes Of T. It's more than photography; it's storytelling etched in light and shadow.
            </p>
            <button 
              onClick={() => navigateAndSetHash('about')}
              className="cta-button font-extrabold text-lg button-tilt-effect"
            >
              My Story &rarr;
            </button>
          </div>
        </div>
      </section>

      <section 
        id="portfolio-preview" 
        className="min-h-screen flex flex-col items-center justify-center bg-background text-text-primary p-8 md:p-12"
      >
        <h2 className="text-primary font-extrabold mb-16 text-center animate-fadeInUp">Glimpses of My Work</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 mb-16 w-full max-w-7xl mx-auto">
          {[1, 2, 3, 4].map(i => ( 
            <div key={i} className={`aspect-w-3 aspect-h-4 bg-surface rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-400 ease-smooth-out group animate-fadeInUp transform hover:-translate-y-2.5 hover:rotate-[-2deg] hover:scale-[1.03]`} style={{animationDelay: `${0.25 + i * 0.1}s`}}>
              <img 
                src={`/home/portfolio-preview-${i}.jpg`} 
                alt={`Portfolio Preview ${i}`} 
                className="w-full h-full object-cover transition-transform duration-500 ease-smooth-out group-hover:scale-110" 
              />
            </div>
          ))}
        </div>
        <button 
          onClick={() => navigateAndSetHash('portfolio')}
          className="bg-secondary text-text-on-dark font-extrabold py-4 px-16 rounded-lg text-xl hover:bg-secondary-light hover:text-text-primary transition-all duration-300 transform hover:scale-105 shadow-pop hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-primary focus:ring-opacity-50 animate-fadeInUp button-tilt-effect"
          style={{animationDelay: '0.8s'}}
        >
          Explore Full Portfolio &rarr;
        </button>
      </section>

      <section 
        id="pricing-preview" 
        className="min-h-screen flex items-center justify-center p-8 md:p-12 relative text-text-on-dark parallax-section"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&amp;fit=crop&amp;w=1920&amp;q=80')" }} 
      >
        <ParticleBackground /> 
        <div className="glass-overlay backdrop-blur-lg"></div> 
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <h2 className="text-text-on-dark font-extrabold mb-10 animate-fadeInUp" style={{textShadow: '0 1px 10px rgba(0,0,0,0.4)'}}>Ready to Create Magic?</h2>
          <p className="text-lg md:text-xl text-text-on-dark text-opacity-85 mb-12 leading-relaxed max-w-2xl mx-auto animate-fadeInUp animation-delay-300 font-sans font-semibold subtext">
            Find the perfect photography package for your story. Athletics, portraits, and more – let's capture unforgettable moments together.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 md:gap-8 mb-12">
            <div className="bg-black/40 backdrop-blur-md p-8 rounded-xl shadow-2xl w-full sm:w-auto transform transition-all duration-300 hover:scale-105 animate-fadeInUp border-2 border-white/25 hover:border-secondary-light" style={{animationDelay: '0.5s'}}>
              <h3 className="font-display text-3xl text-secondary-light mb-2 font-extrabold">Athletics</h3>
              <p className="text-sm text-text-on-dark text-opacity-80 font-sans font-semibold subtext">Dynamic sports coverage.</p>
            </div>
            <div className="bg-black/40 backdrop-blur-md p-8 rounded-xl shadow-2xl w-full sm:w-auto transform transition-all duration-300 hover:scale-105 animate-fadeInUp border-2 border-white/25 hover:border-secondary-light" style={{animationDelay: '0.65s'}}>
              <h3 className="font-display text-3xl text-secondary-light mb-2 font-extrabold">Portraits</h3>
              <p className="text-sm text-text-on-dark text-opacity-80 font-sans font-semibold subtext">Timeless, personal stories.</p>
            </div>
          </div>
          <button 
            onClick={() => navigateAndSetHash('pricing')}
            className="cta-button font-extrabold text-lg button-tilt-effect animate-fadeInUp"
            style={{animationDelay: '0.8s'}}
          >
            View Packages &amp; Book &rarr;
          </button>
        </div>
      </section>
    </div>
  );
};

export default MainPage;
