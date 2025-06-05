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

  const aboutImageTiltRef = useRef<HTMLDivElement>(null);
  const [aboutIndex, setAboutIndex] = useState(0);
  const [sportsIndex, setSportsIndex] = useState(0);
  const [portraitIndex, setPortraitIndex] = useState(0);

  const aboutImages = Array.from({ length: 6 }, (_, i) => `/about/aboutme${i + 1}.jpg`);
  const sportsImages = Array.from({ length: 45 }, (_, i) => `/portfolio/athletics/sports${i + 1}.jpg`);
  const portraitImages = Array.from({ length: 16 }, (_, i) => `/portfolio/athletics/portrait${i + 1}.jpg`);

  useEffect(() => {
    const tiltElement = aboutImageTiltRef.current?.querySelector('img');
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

    if (aboutImageTiltRef.current) {
      parentContainer = aboutImageTiltRef.current;
      parentContainer.addEventListener('mousemove', handleMouseMove);
      parentContainer.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (parentContainer) {
        parentContainer.removeEventListener('mousemove', handleMouseMove);
        parentContainer.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  useEffect(() => {
    const aboutInterval = setInterval(() => {
      setAboutIndex((prev) => (prev + 1) % aboutImages.length);
    }, 5000);
    const sportsInterval = setInterval(() => {
      setSportsIndex((prev) => (prev + 1) % sportsImages.length);
    }, 5000);
    const portraitInterval = setInterval(() => {
      setPortraitIndex((prev) => (prev + 1) % portraitImages.length);
    }, 5000);

    return () => {
      clearInterval(aboutInterval);
      clearInterval(sportsInterval);
      clearInterval(portraitInterval);
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
          <div ref={aboutImageTiltRef} className="animate-fadeInUp animation-delay-300 perspective-container">
            <img 
              src={aboutImages[aboutIndex]}
              alt={`About Image ${aboutIndex + 1}`}
              className="rounded-xl shadow-2xl object-cover w-full h-auto md:h-[550px] tilt-effect border-4 border-background transition-opacity duration-700 ease-in-out" 
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-7xl mx-auto mb-16">
          <div className="bg-surface rounded-2xl shadow-2xl overflow-hidden aspect-[4/5] relative group animate-fadeInUp transition-all duration-400">
            <img 
              src={sportsImages[sportsIndex]} 
              alt={`Sports Preview ${sportsIndex + 1}`}
              className="object-cover w-full h-full transition-opacity duration-700 ease-in-out" 
            />
            <div className="absolute bottom-3 left-3 bg-black/50 text-white text-sm px-3 py-1 rounded-md font-semibold shadow-md">
              Athletics
            </div>
          </div>
          <div className="bg-surface rounded-2xl shadow-2xl overflow-hidden aspect-[4/5] relative group animate-fadeInUp transition-all duration-400">
            <img 
              src={portraitImages[portraitIndex]} 
              alt={`Portrait Preview ${portraitIndex + 1}`}
              className="object-cover w-full h-full transition-opacity duration-700 ease-in-out" 
            />
            <div className="absolute bottom-3 left-3 bg-black/50 text-white text-sm px-3 py-1 rounded-md font-semibold shadow-md">
              Portraits
            </div>
          </div>
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
