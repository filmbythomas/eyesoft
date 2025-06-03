import React, { useState, useEffect, useCallback } from 'react';
import { Camera, Zap, Users, ArrowLeft, Leaf, ArrowRight, Heart } from 'lucide-react';
import clsx from 'clsx';

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
  const [likedImages, setLikedImages] = useState<Set<number>>(new Set());
  const [imageKey, setImageKey] = useState(0); // forces image re-animation on change

  useEffect(() => {
    const athleticsImages = Object.keys(import.meta.glob('/public/portfolio/athletics/*.{jpg,jpeg,png,gif}', { eager: true }));
    const portraitImages = Object.keys(import.meta.glob('/public/portfolio/portraits/*.{jpg,jpeg,png,gif}', { eager: true }));

    const allImages: PortfolioImage[] = [
      ...athleticsImages.map((path, index) => ({
        id: index + 1,
        src: path.replace('/public', ''),
        alt: `Athletics Photo ${index + 1}`,
        category: 'athletics' as const,
      })),
      ...portraitImages.map((path, index) => ({
        id: athleticsImages.length + index + 1,
        src: path.replace('/public', ''),
        alt: `Portrait Photo ${index + 1}`,
        category: 'portraits' as const,
      })),
    ];

    setPortfolioImages(allImages);
  }, []);

  const filteredImages = activeCategory
    ? portfolioImages.filter((img) => img.category === activeCategory)
    : [];

  const currentIndex = selectedImage
    ? filteredImages.findIndex((img) => img.id === selectedImage.id)
    : -1;

  const handlePrev = () => {
    if (selectedImage && currentIndex > 0) {
      setSelectedImage(filteredImages[currentIndex - 1]);
      setImageKey(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (selectedImage && currentIndex < filteredImages.length - 1) {
      setSelectedImage(filteredImages[currentIndex + 1]);
      setImageKey(prev => prev + 1);
    }
  };

  const toggleLike = (id: number) => {
    setLikedImages(prev => {
      const updated = new Set(prev);
      if (updated.has(id)) updated.delete(id);
      else updated.add(id);
      return updated;
    });
  };

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!selectedImage) return;
    if (e.key === 'ArrowLeft') handlePrev();
    if (e.key === 'ArrowRight') handleNext();
    if (e.key === 'Escape') setSelectedImage(null);
  }, [selectedImage, currentIndex]);

  useEffect(() => {
    if (selectedImage) {
      window.addEventListener('keydown', handleKeyDown);
    } else {
      window.removeEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, handleKeyDown]);

  useEffect(() => {
    document.body.style.overflow = selectedImage ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedImage]);

  return (
    <div className={clsx("min-h-screen", activeCategory ? "bg-cream" : "bg-[url('/portfolio/portfoliopagebg.png')] bg-[length:150%] bg-repeat animate-diagonalScroll relative overflow-hidden pt-20")}>
      {!activeCategory && (
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
      )}

      {!activeCategory ? (
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 pt-36 md:pt-48 pb-24">
          <h1 className="text-7xl md:text-8xl font-caveat font-bold text-forest mb-6 animate-fadeInUp">
            Explore My Work
          </h1>
          <p className="text-xl md:text-2xl text-charcoal/80 mb-12 font-inter animate-fadeInUp animation-delay-300">
            Discover the stories captured through my lens
          </p>
          <div className="flex flex-col md:flex-row gap-10">
            {[
              { cat: 'athletics', icon: <Zap size={44} />, text: 'Dynamic sports coverage →', bg: '/portfolio/athletics-btn-bg.jpg', from: 'from-sage to-forest' },
              { cat: 'portraits', icon: <Users size={44} />, text: 'Timeless personal stories →', bg: '/portfolio/portraits-btn-bg.jpg', from: 'from-sage/70 to-gold/60' },
            ].map(({ cat, icon, text, bg, from }) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat as Category)}
                className="group w-80 h-96 rounded-3xl overflow-hidden shadow-pop hover:shadow-3xl hover:scale-105 transition-all animate-fadeInUp animation-delay-500 relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${from} opacity-90 group-hover:opacity-80 transition`} />
                <div className={`absolute inset-0 bg-[url('${bg}')] bg-cover bg-center group-hover:scale-110 transition-transform duration-700`} />
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-white p-6">
                  <div className="p-5 bg-white/20 backdrop-blur-sm rounded-full mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all border border-white/30">
                    {icon}
                  </div>
                  <h2 className="text-4xl font-caveat font-bold mb-2 capitalize">{cat}</h2>
                  <p className="font-inter">{text}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="px-6 lg:px-16 py-8 md:py-12">
          <button
            onClick={() => setActiveCategory(null)}
            className="mb-12 mt-28 flex items-center gap-3 bg-white/80 backdrop-blur-sm text-forest px-6 py-3 rounded-xl shadow-lg hover:shadow-xl hover:bg-white transition-all duration-300 font-inter border border-sage/30"
          >
            <ArrowLeft size={20} />
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
                onClick={() => {
                  setSelectedImage(image);
                  setImageKey(prev => prev + 1);
                }}
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
                {activeCategory === 'athletics'
                  ? 'Check back soon for fresh athletic captures!'
                  : 'New portrait sessions will be uploaded here shortly.'}
              </p>
            </div>
          )}
        </div>
      )}

      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4 animate-fadeIn">
          <button
            className="absolute top-6 right-6 text-white text-xl"
            onClick={() => setSelectedImage(null)}
          >
            ✕
          </button>

          <div className="relative max-w-4xl w-full bg-white p-4 rounded-xl shadow-xl scale-105 transition-transform duration-300">
            <div key={imageKey} className="relative aspect-video overflow-hidden rounded-lg border-4 border-sage animate-slideIn">
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="object-contain w-full h-full"
              />
            </div>

            <div className="flex justify-between items-center mt-4 px-6">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="text-sage disabled:opacity-30 hover:scale-125 transition-transform"
              >
                <ArrowLeft size={28} />
              </button>

              <button
                onClick={handleNext}
                disabled={currentIndex === filteredImages.length - 1}
                className="text-sage disabled:opacity-30 hover:scale-125 transition-transform"
              >
                <ArrowRight size={28} />
              </button>
            </div>

            <div className="flex justify-center gap-4 mt-4 overflow-x-auto px-4">
              {filteredImages
                .slice(Math.max(0, currentIndex - 1), currentIndex + 2)
                .map((img) => (
                  <img
                    key={img.id}
                    src={img.src}
                    alt={img.alt}
                    onClick={() => {
                      setSelectedImage(img);
                      setImageKey(prev => prev + 1);
                    }}
                    className={`w-20 h-20 object-cover rounded-md cursor-pointer transition-all border ${
                      img.id === selectedImage.id
                        ? 'border-sage scale-110'
                        : 'opacity-50 hover:opacity-100'
                    }`}
                  />
                ))}
            </div>

            <div className="flex justify-center mt-4">
              <button
                className={clsx("transition-all", likedImages.has(selectedImage.id) ? "text-rose-500 scale-125" : "text-gray-400 hover:text-rose-400")}
                onClick={() => toggleLike(selectedImage.id)}
              >
                <Heart size={28} fill={likedImages.has(selectedImage.id) ? 'currentColor' : 'none'} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioPage;
