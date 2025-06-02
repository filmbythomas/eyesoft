import React, { useState, useEffect } from 'react';
import { Camera, Zap, Users, ArrowLeft, Leaf } from 'lucide-react';

type Category = 'athletics' | 'portraits' | null;

interface PortfolioImage {
  id: number;
  src: string;
  alt: string;
  category: 'athletics' | 'portraits';
}

const PortfolioPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>(null);
  const [selectedImage, setSelectedImage] = useState<PortfolioImage | null>(null);
  const [portfolioImages, setPortfolioImages] = useState<PortfolioImage[]>([]);

  useEffect(() => {
    const loadImages = async () => {
      const athleticsContext = (window as any).__athleticsImages__;
      const portraitsContext = (window as any).__portraitsImages__;

      const athletics: PortfolioImage[] = (athleticsContext || []).map((filename: string, index: number) => ({
        id: index + 1,
        src: `/athletics/${filename}`,
        alt: `Athletics Photo ${index + 1}`,
        category: 'athletics',
      }));

      const portraits: PortfolioImage[] = (portraitsContext || []).map((filename: string, index: number) => ({
        id: index + athletics.length + 1,
        src: `/portraits/${filename}`,
        alt: `Portrait Photo ${index + 1}`,
        category: 'portraits',
      }));

      setPortfolioImages([...athletics, ...portraits]);
    };

    // Simulate dynamic image discovery (REPLACE THIS in actual dev with a build-time step or server-side list)
    (window as any).__athleticsImages__ = Array.from({ length: 45 }, (_, i) => `sports${i + 1}.jpg`);
    (window as any).__portraitsImages__ = Array.from({ length: 16 }, (_, i) => `portrait${i + 1}.jpg`);

    loadImages();
  }, []);

  const filteredImages = activeCategory
    ? portfolioImages.filter((img) => img.category === activeCategory)
    : [];

  useEffect(() => {
    document.body.style.overflow = selectedImage ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedImage]);

  if (!activeCategory) {
    return (
      <div className="min-h-screen bg-[url('/portfolio/portfoliopagebg.png')] bg-[length:150%] bg-repeat animate-diagonalScroll relative overflow-hidden pt-20">
        {/* Animated Leaves */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float-random opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            >
              <Leaf size={12 + Math.random() * 16} className="text-forest/40" />
            </div>
          ))}
        </div>

        {/* Landing UI */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 pt-36 md:pt-48 pb-24">
          <h1 className="text-7xl md:text-8xl font-caveat font-bold text-forest mb-6 animate-fadeInUp">
            Explore My Work
          </h1>
          <p className="text-xl md:text-2xl text-charcoal/80 mb-12 font-inter animate-fadeInUp animation-delay-300">
            Discover the stories captured through my lens
          </p>

          <div className="flex flex-col md:flex-row gap-10">
            {/* Athletics Card */}
            <button
              onClick={() => setActiveCategory('athletics')}
              className="group w-80 h-96 rounded-3xl overflow-hidden shadow-pop hover:shadow-3xl hover:scale-105 transition-all animate-fadeInUp animation-delay-500 relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-sage to-forest opacity-90 group-hover:opacity-80 transition" />
              <div className="absolute inset-0 bg-[url('/portfolio/athletics-btn-bg.jpg')] bg-cover bg-center group-hover:scale-110 transition-transform duration-700" />
              <div className="relative z-10 flex flex-col items-center justify-center h-full text-white p-6">
                <div className="p-5 bg-white/20 backdrop-blur-sm rounded-full mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all border border-white/30">
                  <Zap size={44} className="group-hover:animate-pulse" />
                </div>
                <h2 className="text-4xl font-caveat font-bold mb-2">Athletics</h2>
                <p className="font-inter">Dynamic sports coverage →</p>
              </div>
            </button>

            {/* Portraits Card */}
            <button
              onClick={() => setActiveCategory('portraits')}
              className="group w-80 h-96 rounded-3xl overflow-hidden shadow-pop hover:shadow-3xl hover:scale-105 transition-all animate-fadeInUp animation-delay-700 relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-sage/70 to-gold/60 opacity-90 group-hover:opacity-80 transition" />
              <div className="absolute inset-0 bg-[url('/portfolio/portraits-btn-bg.jpg')] bg-cover bg-center group-hover:scale-110 transition-transform duration-700" />
              <div className="relative z-10 flex flex-col items-center justify-center h-full text-white p-6">
                <div className="p-5 bg-white/20 backdrop-blur-sm rounded-full mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all border border-white/30">
                  <Users size={44} className="group-hover:animate-pulse" />
                </div>
                <h2 className="text-4xl font-caveat font-bold mb-2">Portraits</h2>
                <p className="font-inter">Timeless personal stories →</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream relative pt-20">
      <div className="px-6 lg:px-16 py-8 md:py-12">
        <button
          onClick={() => setActiveCategory(null)}
          className="mb-12 mt-28 flex items-center gap-3 bg-white/80 backdrop-blur-sm text-forest px-6 py-3 rounded-xl shadow-lg hover:shadow-xl hover:bg-white transition-all duration-300 font-inter border border-sage/30"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <Leaf size={16} className="text-sage" />
          Back to Portfolio
        </button>

        <div className="text-center mb-16">
          <h1 className="text-6xl font-caveat font-bold text-forest animate-fadeInUp">
            {activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Portfolio
          </h1>
          <p className="text-lg text-charcoal/80 font-inter max-w-2xl mx-auto mt-4 animate-fadeInUp animation-delay-200">
            {activeCategory === 'athletics'
              ? 'Capturing the intensity, passion, and triumph of athletic moments'
              : 'Revealing the authentic beauty and unique stories of individuals'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              className="group relative aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 cursor-pointer animate-fadeInUp"
              style={{ animationDelay: `${index * 50}ms` }}
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                <div className="flex items-center gap-2">
                  <Camera size={18} />
                  <span className="text-sm font-inter">View Full Size</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <div className="text-center py-20">
            <Camera size={64} className="mx-auto text-charcoal/40 mb-4" />
            <h3 className="text-2xl font-caveat text-charcoal">Coming Soon</h3>
            <p className="text-charcoal/70 font-inter">
              {activeCategory === 'athletics' ? 'Athletic' : 'Portrait'} photos will be available soon.
            </p>
          </div>
        )}
      </div>

      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="relative max-w-5xl w-full max-h-[90vh]">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-0 right-0 mt-2 mr-2 text-white text-2xl hover:text-sage transition-colors z-10"
            >
              ✕
            </button>
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="w-full h-full object-contain rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioPage;
