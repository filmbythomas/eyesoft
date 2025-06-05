import React, { useRef, useEffect, useState } from 'react';
import { Feather, Palette, Leaf } from 'lucide-react'; // Nature & Photography icons

interface IconProps {
  className?: string;
  size?: number; 
}

const PlantDivider: React.FC<{icon?: React.ReactElement<IconProps>}> = ({icon}) => (
  <div className="plant-divider my-6 md:my-8">
    {icon ? React.cloneElement(icon, { className: "plant-motif text-secondary", size: icon.props.size || 32 }) : 
      <Leaf size={32} className="plant-motif text-secondary" />
    }
  </div>
);

const AboutPage: React.FC = () => {
  const tiltRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = Array.from({ length: 6 }, (_, i) => `/about/aboutme${i + 1}.jpg`);

  useEffect(() => {
    const tiltElement = tiltRef.current;
    if (tiltElement) {
      const handleMouseMove = (e: MouseEvent) => {
        if (!tiltElement.parentElement) return;
        const { left, top, width, height } = tiltElement.parentElement.getBoundingClientRect();
        const x = e.clientX - left - width / 2; 
        const y = e.clientY - top - height / 2; 
        const maxTilt = 5; 
        const rotateY = (x / (width / 2)) * maxTilt * -1; 
        const rotateX = (y / (height / 2)) * maxTilt;
        tiltElement.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
      };
      const handleMouseLeave = () => {
        tiltElement.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)';
      };
      const parentContainer = tiltElement.parentElement; 
      if (parentContainer) {
          parentContainer.addEventListener('mousemove', handleMouseMove);
          parentContainer.addEventListener('mouseleave', handleMouseLeave);
          return () => {
              parentContainer.removeEventListener('mousemove', handleMouseMove);
              parentContainer.removeEventListener('mouseleave', handleMouseLeave);
          };
      }
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="page-container bg-background text-text-primary overflow-x-hidden">
      
      <div className="max-w-5xl mx-auto py-10 md:py-16 pt-32 md:pt-36">
        <h1 className="text-center text-primary font-extrabold animate-fadeInUp mb-12 md:mb-20">
          The Eye Behind The Lens
        </h1>
        
        <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-start mb-12 md:mb-20">
          <div className="md:col-span-5 lg:col-span-5 animate-fadeInUp animation-delay-300">
            <div className="perspective-container"> 
              <div ref={tiltRef} className="relative group tilt-effect">
                <div className="absolute -inset-1.5 bg-gradient-to-br from-secondary via-primary to-accent rounded-xl blur-md opacity-50 group-hover:opacity-60 transition-all duration-400"></div>
                <div className="relative p-1.5 bg-surface rounded-xl shadow-2xl border-2 border-surface">
                  <img 
                    src={images[currentIndex]} 
                    alt={`About Me ${currentIndex + 1}`} 
                    className="w-full h-auto object-cover rounded-lg aspect-[4/3] md:aspect-auto md:max-h-[75vh] lg:max-h-[80vh] shadow-lg transition-opacity duration-700 ease-in-out" 
                  />
                  <div className="absolute bottom-2.5 right-2.5 bg-surface bg-opacity-85 px-3 py-1.5 rounded-md text-xs font-sans text-text-primary shadow-md font-bold">
                    T // EyesOfTee
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-7 lg:col-span-7 bg-surface p-6 md:p-10 rounded-2xl shadow-xl animate-fadeInUp animation-delay-400 border-2 border-accent/20">
            <h2 className="text-primary font-extrabold mb-3 text-3xl md:text-4xl">My Journey</h2>
            <PlantDivider icon={<Feather />} />
            <div className="space-y-6 text-text-secondary leading-relaxed text-base md:text-lg font-sans font-semibold">
              <p className="first-letter:text-5xl first-letter:font-extrabold first-letter:text-primary first-letter:mr-2.5 first-letter:float-left">
                Hello! I'm T, the heart and soul behind Eyes Of T. My adventure into photography wasn't a planned expedition but a serendipitous discovery. It started with a borrowed camera, a dash of curiosity, and an insatiable desire to capture the fleeting narratives woven into the fabric of everyday life. You can often find glimpses of my latest work and behind-the-scenes on my Instagram: <a href="https://www.instagram.com/eyesofteee" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-dark font-bold underline transition-colors duration-200">@eyesofteee</a>.
              </p>
              
              <blockquote className="border-l-4 border-secondary pl-5 italic text-text-primary my-8 py-2 bg-primary/5 rounded-r-md shadow-sm">
                "Photography is the art of frozen time... the ability to store emotion and feelings within a frame."
              </blockquote>
              
              <p>
                For me, a photograph is more than just an image; it's a vessel of emotion, a frozen moment of raw honesty, a timeless echo of beauty. My lens seeks out those unscripted instances – the subtle expressions, the vibrant energy, the quiet poetry that often goes unnoticed.
              </p>
              <PlantDivider icon={<Palette />} />
              <h3 className="text-secondary font-extrabold text-xl md:text-2xl mt-8 mb-3">Philosophy & Approach</h3>
              <p>
                My approach is rooted in authenticity. I thrive on natural light, unique perspectives, and genuine connections. Whether I'm courtside capturing the intensity of an athletic feat or in a quiet corner immortalizing a personal story, my aim is to create art that not only looks stunning but feels deeply resonant. 
              </p>
              <p>
                It's about telling <strong className="text-primary-dark font-extrabold">your story</strong>, authentically and beautifully. Let's create something unforgettable together.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
