import React, { useState, useEffect, useCallback } from 'react';
import { Camera, Zap, Users, ArrowLeft, Leaf, ArrowRight, Star } from 'lucide-react';
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
  const [imageKey, setImageKey] = useState(0);

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

  useEffect(() => {
    const storedLikes = localStorage.getItem('likedImages');
    if (storedLikes) {
      try {
        const parsed = JSON.parse(storedLikes);
        if (Array.isArray(parsed)) {
          setLikedImages(new Set(parsed));
        }
      } catch {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('likedImages', JSON.stringify(Array.from(likedImages)));
  }, [likedImages]);

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
      {/* ... rest of your unmodified section code ... */}

      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center px-2 md:px-6 py-6 animate-fadeIn">
          <button
            className="absolute top-6 right-6 text-white text-3xl hover:text-rose-400 transition"
            onClick={() => setSelectedImage(null)}
          >
            ✕
          </button>

          <div className="relative w-full max-w-5xl bg-white/10 border border-white/30 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-8 transform scale-[1.5] md:scale-125 transition-transform duration-500 animate-fadeIn">
            <div key={imageKey} className="relative aspect-video overflow-hidden rounded-2xl border-4 border-sage shadow-inner shadow-black/20">
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="object-contain w-full h-full transition-transform duration-700"
              />
            </div>

            <div className="flex justify-between items-center mt-6 px-2">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="text-sage disabled:opacity-30 hover:scale-125 transition-transform hover:animate-bounce"
              >
                <ArrowLeft size={28} />
              </button>
              <button
                onClick={handleNext}
                disabled={currentIndex === filteredImages.length - 1}
                className="text-sage disabled:opacity-30 hover:scale-125 transition-transform hover:animate-bounce"
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
                    className={clsx(
                      "w-20 h-20 object-cover rounded-md cursor-pointer transition-all border animate-fadeIn animate-slideIn",
                      img.id === selectedImage.id
                        ? "border-sage scale-110"
                        : "opacity-50 hover:opacity-100"
                    )}
                  />
                ))}
            </div>

            <div className="flex justify-center mt-6 relative">
              <button
                className={clsx(
                  "transition-all duration-700 relative group",
                  likedImages.has(selectedImage.id)
                    ? "text-yellow-400 scale-125"
                    : "text-gray-400 hover:text-yellow-300"
                )}
                onClick={() => toggleLike(selectedImage.id)}
              >
                <Star
                  size={36}
                  className={clsx(
                    "transition-transform duration-700 group-hover:animate-pulseSpin",
                    likedImages.has(selectedImage.id) && "animate-burstSpin fill-current"
                  )}
                  fill={likedImages.has(selectedImage.id) ? 'currentColor' : 'none'}
                />
                <span className="absolute -right-8 top-1 text-sm text-forest font-semibold">
                  {likedImages.has(selectedImage.id) ? '1' : '0'}
                </span>
              </button>
              <style>{`
                @keyframes burstSpin {
                  0% { transform: rotate(0deg) scale(1); }
                  50% { transform: rotate(20deg) scale(1.3); }
                  100% { transform: rotate(0deg) scale(1); }
                }
                .animate-burstSpin {
                  animation: burstSpin 0.6s ease;
                }
                @keyframes pulseSpin {
                  0%, 100% { transform: rotate(0deg) scale(1); }
                  50% { transform: rotate(10deg) scale(1.2); }
                }
                .animate-pulseSpin {
                  animation: pulseSpin 0.8s ease-in-out infinite;
                }
              `}</style>
            </div>
          </div>
        </div>
      )}

      {activeCategory && (
        <button
          onClick={() => setActiveCategory(null)}
          className="mt-64 mb-12 flex items-center gap-3 bg-white/80 backdrop-blur-sm text-forest px-6 py-3 rounded-xl shadow-lg hover:shadow-xl hover:bg-white transition-all duration-300 font-inter border border-sage/30"
        >
          <ArrowLeft size={20} />
          <Leaf size={16} className="text-sage" />
          Back to Portfolio
        </button>
      )}
    </div>
  );
};

export default PortfolioPage;
