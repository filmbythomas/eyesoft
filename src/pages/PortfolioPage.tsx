import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Camera, Zap, Users, ArrowLeft, Leaf, ArrowRight, Maximize2, Minimize2 } from 'lucide-react';
import clsx from 'clsx';
import { LikeButton } from '../components/LikeButton';

type Category = 'athletics' | 'portraits' | null;

interface PortfolioImage {
  id: number;
  src: string;
  alt: string;
  category: Category;
}

const PortfolioPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>(null);
  const [selectedImage, setSelectedImage] = useState<PortfolioImage | null>(null);
  const [portfolioImages, setPortfolioImages] = useState<PortfolioImage[]>([]);
  const [imageKey, setImageKey] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const athleticsImages = Object.keys(import.meta.glob('/public/portfolio/athletics/*.{jpg,jpeg,png,gif}', { eager: true }));
    const portraitImages = Object.keys(import.meta.glob('/public/portfolio/portraits/*.{jpg,jpeg,png,gif}', { eager: true }));

    const allImages: PortfolioImage[] = [
      ...athleticsImages.map((path, index) => ({
        id: index + 1,
        src: path.replace('/public', ''),
        alt: `Athletics Photo ${index + 1}`,
        category: 'athletics',
      })),
      ...portraitImages.map((path, index) => ({
        id: athleticsImages.length + index + 1,
        src: path.replace('/public', ''),
        alt: `Portrait Photo ${index + 1}`,
        category: 'portraits',
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

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!selectedImage) return;
    if (e.key === 'ArrowLeft') handlePrev();
    if (e.key === 'ArrowRight') handleNext();
    if (e.key === 'Escape') {
      setSelectedImage(null);
      setIsZoomed(false);
    }
  }, [selectedImage, currentIndex]);

  useEffect(() => {
    if (selectedImage) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, handleKeyDown]);

  useEffect(() => {
    document.body.style.overflow = selectedImage ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedImage]);

  useEffect(() => {
    if (selectedImage) {
      autoplayRef.current = setInterval(() => {
        if (currentIndex < filteredImages.length - 1) handleNext();
      }, 15000);
    }
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [selectedImage, currentIndex]);

  return (
    <div className={clsx(
      "min-h-screen",
      activeCategory
        ? "pt-20 bg-cream"
        : "relative overflow-hidden bg-[url('/portfolio/portfoliopagebg.png')] bg-no-repeat bg-cover bg-center md:bg-[length:150%] md:bg-repeat animate-diagonalScroll"
    )}>
      {!activeCategory && <div className="h-[340px] w-full" />}

      {!activeCategory && (
        <>
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
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

          <div className="relative z-30 flex flex-col items-center text-center px-4 pt-52 md:pt-60 pb-24">
            <h1 className="text-6xl md:text-8xl font-caveat font-bold text-forest mb-6 animate-fadeInUp">Explore My Work</h1>
            <p className="text-lg md:text-2xl text-charcoal/80 mb-12 font-inter animate-fadeInUp animation-delay-300">
              Discover the stories captured through my lens
            </p>
            <div className="flex flex-col md:flex-row gap-10">
              {[
                { cat: 'athletics', icon: <Zap size={44} />, text: 'Dynamic sports coverage →', bg: '/portfolio/athletics-btn-bg.jpg' },
                { cat: 'portraits', icon: <Users size={44} />, text: 'Timeless personal stories →', bg: '/portfolio/portraits-btn-bg.jpg' },
              ].map(({ cat, icon, text, bg }) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat as Category)}
                  className="group w-80 h-96 rounded-3xl overflow-hidden shadow-pop hover:shadow-3xl hover:scale-105 transition-all animate-fadeInUp animation-delay-500 relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-sage/70 to-gold/60 opacity-90 group-hover:opacity-80 transition" />
                  <div className={`absolute inset-0 bg-[url('${bg}')] bg-cover bg-center group-hover:scale-110 transition-transform duration-700`} />
                  <div className="relative z-10 flex flex-col items-center justify-center h-full text-white p-6">
                    <div className="p-5 bg-white/20 backdrop-blur-sm rounded-full mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all border border-white/30">{icon}</div>
                    <h2 className="text-4xl font-caveat font-bold mb-2 capitalize">{cat}</h2>
                    <p className="font-inter">{text}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {activeCategory && (
        <div className="px-6 lg:px-16 py-8 md:py-12">
          <button
            onClick={() => setActiveCategory(null)}
            className="mb-20 mt-36 flex items-center gap-3 bg-white/80 backdrop-blur-sm text-forest px-6 py-3 rounded-xl shadow-lg hover:shadow-xl hover:bg-white transition-all duration-300 font-inter border border-sage/30"
          >
            <ArrowLeft size={20} />
            <Leaf size={16} className="text-sage" />
            Back to Portfolio
          </button>

          <div className="text-center mb-16">
            <h1 className="text-6xl font-caveat font-bold text-forest animate-fadeInUp">
              {activeCategory?.charAt(0).toUpperCase() + activeCategory?.slice(1)} Portfolio
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
        </div>
      )}

      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
          <button
            className="absolute top-4 right-4 text-white text-3xl hover:text-red-400 transition"
            onClick={() => {
              setSelectedImage(null);
              setIsZoomed(false);
            }}
          >
            ✕
          </button>

          <div className={clsx("relative w-full transition-all duration-300", isZoomed ? "max-w-6xl" : "max-w-4xl")}>
            <div className={clsx(
              "relative overflow-hidden rounded-xl border-4 shadow-inner transition-all duration-300",
              isZoomed ? "aspect-[3/2]" : "aspect-video border-sage"
            )}>
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="object-contain w-full h-full"
              />
              <button
                onClick={() => setIsZoomed(z => !z)}
                className="absolute bottom-3 right-3 bg-white/90 text-forest p-2 rounded-lg shadow-md hover:bg-white transition-all"
              >
                {isZoomed ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
              </button>
            </div>

            <div className="flex justify-center mt-6">
              <LikeButton imageId={String(selectedImage.id)} />
            </div>

            <div className="flex justify-center gap-4 mt-4 flex-wrap px-4">
              {filteredImages.slice(Math.max(0, currentIndex - 1), currentIndex + 2).map((img) => (
                <img
                  key={img.id}
                  src={img.src}
                  alt={img.alt}
                  onClick={() => {
                    setSelectedImage(img);
                    setImageKey(prev => prev + 1);
                  }}
                  className={clsx(
                    "w-20 h-20 object-cover rounded-lg cursor-pointer transition-all duration-300",
                    img.id === selectedImage.id
                      ? "border-4 border-green-500 shadow-[0_0_10px_rgba(0,128,0,0.4)] scale-110"
                      : "opacity-50 hover:opacity-90"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioPage;
