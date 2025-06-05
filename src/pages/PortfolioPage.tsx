import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Camera, Zap, Users, ArrowLeft, Leaf, ArrowRight, Star, Maximize2, Minimize2 } from 'lucide-react';
import clsx from 'clsx';

type Category = 'athletics' | 'portraits' | null;

interface PortfolioImage {
  id: number;
  src: string;
  alt: string;
  category: Category;
}

// Mock server sync function
const syncLikeCount = async (id: number, liked: boolean) => {
  console.log(`Syncing image ${id} to server. Liked: ${liked}`);
  // Simulate server latency
  return new Promise(resolve => setTimeout(resolve, 500));
};

const PortfolioPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>(null);
  const [selectedImage, setSelectedImage] = useState<PortfolioImage | null>(null);
  const [portfolioImages, setPortfolioImages] = useState<PortfolioImage[]>([]);
  const [likedImages, setLikedImages] = useState<Set<number>>(new Set());
  const [imageKey, setImageKey] = useState(0);
  const [likeCountMap, setLikeCountMap] = useState<Record<number, number>>({});
  const [isFullscreen, setIsFullscreen] = useState(false);
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

  useEffect(() => {
    const saved = localStorage.getItem('likedImages');
    const counts = localStorage.getItem('likeCountMap');
    if (saved) {
      try {
        setLikedImages(new Set(JSON.parse(saved)));
      } catch {}
    }
    if (counts) {
      try {
        setLikeCountMap(JSON.parse(counts));
      } catch {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('likedImages', JSON.stringify(Array.from(likedImages)));
    localStorage.setItem('likeCountMap', JSON.stringify(likeCountMap));
  }, [likedImages, likeCountMap]);

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

  const toggleLike = async (id: number) => {
    setLikedImages(prev => {
      const updated = new Set(prev);
      const newCountMap = { ...likeCountMap };
      const liked = !updated.has(id);

      if (liked) {
        updated.add(id);
        newCountMap[id] = (newCountMap[id] || 0) + 1;
      } else {
        updated.delete(id);
        newCountMap[id] = Math.max((newCountMap[id] || 1) - 1, 0);
      }

      setLikeCountMap(newCountMap);
      syncLikeCount(id, liked); // mock server call
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
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, handleKeyDown]);

  useEffect(() => {
    document.body.style.overflow = selectedImage ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedImage]);

  // Fullscreen toggle
  const toggleFullscreen = () => {
    const elem = document.documentElement;
    if (!document.fullscreenElement) {
      elem.requestFullscreen().then(() => setIsFullscreen(true));
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false));
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // Autoplay when not fullscreen
  useEffect(() => {
    if (selectedImage && !isFullscreen) {
      autoplayRef.current = setInterval(() => {
        if (currentIndex < filteredImages.length - 1) handleNext();
      }, 15000);
    }
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [selectedImage, isFullscreen, currentIndex]);

  return (
    <div className={clsx("min-h-screen pt-20", activeCategory ? "bg-cream" : "bg-[url('/portfolio/portfoliopagebg.png')] bg-[length:150%] bg-repeat animate-diagonalScroll relative overflow-hidden")}>
      {/* Existing UI code stays unchanged */}
      {/* Insert the updated modal viewer below */}

      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
          <button
            className="absolute top-4 right-4 text-white text-3xl hover:text-rose-400 transition"
            onClick={() => setSelectedImage(null)}
          >
            ✕
          </button>

          <div className="relative w-full max-w-4xl bg-gradient-to-br from-cream via-white to-sage/40 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.3)] p-4 md:p-8 transition-all">
            <div key={imageKey} className="relative aspect-video overflow-hidden rounded-xl border-4 border-sage shadow-inner">
              <img src={selectedImage.src} alt={selectedImage.alt} className="object-contain w-full h-full" />
              <button
                onClick={toggleFullscreen}
                className="absolute bottom-3 right-3 bg-white/80 text-forest p-2 rounded-lg shadow-md hover:bg-white transition-all"
              >
                {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
              </button>
            </div>

            <div className="flex justify-between items-center mt-6 px-4">
              <button onClick={handlePrev} disabled={currentIndex === 0} className="text-forest disabled:opacity-30 hover:scale-125 transition-transform hover:animate-pulse">
                <ArrowLeft size={28} />
              </button>
              <button onClick={handleNext} disabled={currentIndex === filteredImages.length - 1} className="text-forest disabled:opacity-30 hover:scale-125 transition-transform hover:animate-pulse">
                <ArrowRight size={28} />
              </button>
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

            <div className="flex justify-center mt-6">
              <button
                className={clsx(
                  "relative flex flex-col items-center group transition-transform duration-300",
                  likedImages.has(selectedImage.id)
                    ? "text-yellow-400 scale-110"
                    : "text-gray-400 hover:text-yellow-300"
                )}
                onClick={() => toggleLike(selectedImage.id)}
              >
                <Star
                  size={36}
                  className="transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12"
                  fill={likedImages.has(selectedImage.id) ? 'currentColor' : 'none'}
                />
                <span className="mt-2 text-sm font-semibold text-forest drop-shadow-sm">
                  {likeCountMap[selectedImage.id] || 0} {likeCountMap[selectedImage.id] === 1 ? 'Like' : 'Likes'}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioPage;
