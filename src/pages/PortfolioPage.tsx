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

  // Sample portfolio images
  const portfolioImages: PortfolioImage[] = [
    // Athletics images
    ...Array.from({ length: 18 }, (_, i) => ({
      id: i + 1,
      src: `/portfolio/athletics/sample-${i + 1}.jpg`,
      alt: `Athletics Photo ${i + 1}`,
      category: 'athletics' as const
    })),
    // Portraits images (placeholder - you can add actual portrait images)
    ...Array.from({ length: 12 }, (_, i) => ({
      id: i + 19,
      src: `/portfolio/athletics/sample-${(i % 18) + 1}.jpg`, // Using athletics images as placeholders
      alt: `Portrait Photo ${i + 1}`,
      category: 'portraits' as const
    }))
  ];

  const filteredImages = activeCategory 
    ? portfolioImages.filter(img => img.category === activeCategory)
    : [];

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedImage]);

  if (!activeCategory) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sand via-sage/20 to-forest/30 relative overflow-hidden pt-20">
        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float-random opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            >
              <Leaf size={12 + Math.random() * 16} className="text-forest/40" />
            </div>
          ))}
        </div>

        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-caveat font-bold text-forest mb-8 animate-fadeInUp">
              Explore My Work
            </h1>
            <p className="text-xl md:text-2xl text-charcoal/80 mb-16 font-inter leading-relaxed animate-fadeInUp animation-delay-300">
              Discover the stories captured through my lens
            </p>

            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center justify-center">
              {/* Athletics Button */}
              <button
                onClick={() => setActiveCategory('athletics')}
                className="group relative w-80 h-96 rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 animate-fadeInUp animation-delay-500"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-sage to-forest opacity-90 group-hover:opacity-80 transition-opacity" />
                <div className="absolute inset-0 bg-[url('/portfolio/athletics-btn-bg.jpg')] bg-cover bg-center group-hover:scale-110 transition-transform duration-700" />
                <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 text-white">
                  <div className="p-6 bg-white/20 rounded-full mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 backdrop-blur-sm border border-white/30">
                    <Zap size={48} className="group-hover:animate-pulse" />
                  </div>
                  <h2 className="text-4xl font-caveat font-bold mb-4 group-hover:scale-105 transition-transform">
                    Athletics
                  </h2>
                  <p className="text-white/90 font-inter group-hover:text-white transition-colors">
                    Dynamic sports coverage →
                  </p>
                </div>
                <div className="absolute inset-0 border-2 border-white/20 rounded-3xl group-hover:border-white/40 transition-colors" />
              </button>

              {/* Portraits Button */}
              <button
                onClick={() => setActiveCategory('portraits')}
                className="group relative w-80 h-96 rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 animate-fadeInUp animation-delay-700"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-sage/80 to-gold/60 opacity-90 group-hover:opacity-80 transition-opacity" />
                <div className="absolute inset-0 bg-[url('/portfolio/portraits-btn-bg.jpg')] bg-cover bg-center group-hover:scale-110 transition-transform duration-700" />
                <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 text-white">
                  <div className="p-6 bg-white/20 rounded-full mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 backdrop-blur-sm border border-white/30">
                    <Users size={48} className="group-hover:animate-pulse" />
                  </div>
                  <h2 className="text-4xl font-caveat font-bold mb-4 group-hover:scale-105 transition-transform">
                    Portraits
                  </h2>
                  <p className="text-white/90 font-inter group-hover:text-white transition-colors">
                    Timeless personal stories →
                  </p>
                </div>
                <div className="absolute inset-0 border-2 border-white/20 rounded-3xl group-hover:border-white/40 transition-colors" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sand via-sage/10 to-forest/20 relative pt-20">
      <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8 md:py-12">
        {/* Back Button */}
        <button
          onClick={() => setActiveCategory(null)}
          className="mb-12 mt-6 flex items-center gap-3 bg-white/80 backdrop-blur-sm text-forest px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl hover:bg-white/90 transition-all duration-300 group font-inter font-semibold border border-sage/30"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <Leaf size={16} className="text-sage" />
          Back to Portfolio
        </button>

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-7xl font-caveat font-bold text-forest mb-6 animate-fadeInUp">
            {activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Portfolio
          </h1>
          <p className="text-xl text-charcoal/80 max-w-3xl mx-auto font-inter leading-relaxed animate-fadeInUp animation-delay-200">
            {activeCategory === 'athletics' 
              ? 'Capturing the intensity, passion, and triumph of athletic moments'
              : 'Revealing the authentic beauty and unique stories of individuals'
            }
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              className="group relative aspect-square bg-surface rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer animate-fadeInGridItem"
              style={{ animationDelay: `${index * 50}ms` }}
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                <div className="flex items-center gap-2 text-white">
                  <Camera size={16} />
                  <span className="font-inter text-sm font-medium">View Full Size</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredImages.length === 0 && (
          <div className="text-center py-20">
            <div className="mb-6">
              <Camera size={64} className="mx-auto text-charcoal/40" />
            </div>
            <h3 className="text-2xl font-caveat font-bold text-charcoal mb-4">
              Coming Soon
            </h3>
            <p className="text-charcoal/70 font-inter">
              {activeCategory === 'athletics' ? 'Athletic' : 'Portrait'} photos will be available soon.
            </p>
          </div>
        )}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fadeInModal">
          <div className="relative max-w-5xl max-h-[90vh] w-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-sage transition-colors duration-300 z-10"
            >
              <span className="text-2xl font-bold">✕</span>
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
