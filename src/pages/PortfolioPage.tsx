import React, { useState, useEffect, useCallback } from 'react';
import { Camera, Zap, Users, ArrowLeft, Leaf, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

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
  const [transitionDirection, setTransitionDirection] = useState<1 | -1>(1);

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

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!selectedImage) return;
      if (e.key === 'ArrowRight') navigateImage(1);
      if (e.key === 'ArrowLeft') navigateImage(-1);
      if (e.key === 'Escape') setSelectedImage(null);
    },
    [selectedImage]
  );

  useEffect(() => {
    document.body.style.overflow = selectedImage ? 'hidden' : '';
    if (selectedImage) window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedImage, handleKeyDown]);

  const navigateImage = (direction: 1 | -1) => {
    if (!selectedImage) return;
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    const nextIndex = (currentIndex + direction + filteredImages.length) % filteredImages.length;
    setTransitionDirection(direction);
    setSelectedImage(filteredImages[nextIndex]);
  };

  const toggleLike = (id: number) => {
    setLikedImages(prev => {
      const newLikes = new Set(prev);
      if (newLikes.has(id)) {
        newLikes.delete(id);
      } else {
        newLikes.add(id);
      }
      return newLikes;
    });
  };

  // Modal Animation Variants
  const imageVariants = {
    enter: (direction: 1 | -1) => ({
      x: direction * 300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: 1 | -1) => ({
      x: direction * -300,
      opacity: 0,
    }),
  };

  return (
    <div className="min-h-screen bg-cream relative pt-20">
      {/* ... existing top content ... */}

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {filteredImages.map((image, index) => (
          <div
            key={image.id}
            className="group relative aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 cursor-pointer animate-fadeInUp"
            style={{ animationDelay: `${index * 50}ms` }}
            onClick={() => {
              setSelectedImage(image);
              setTransitionDirection(1);
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

      {/* Modal */}
      <AnimatePresence custom={transitionDirection}>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="relative max-w-5xl w-full scale-105">
              {/* Slide Left */}
              <button
                onClick={() => navigateImage(-1)}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/20 rounded-full hover:bg-white/30 transition"
              >
                <ChevronLeft size={32} className="text-white group-hover:-translate-x-1 transition-transform" />
              </button>

              {/* Slide Right */}
              <button
                onClick={() => navigateImage(1)}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/20 rounded-full hover:bg-white/30 transition"
              >
                <ChevronRight size={32} className="text-white group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Main Image with transition */}
              <motion.img
                key={selectedImage.id}
                src={selectedImage.src}
                alt={selectedImage.alt}
                custom={transitionDirection}
                variants={imageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5 }}
                className="w-full max-h-[80vh] object-contain rounded-xl shadow-2xl"
              />

              {/* Bottom Controls */}
              <div className="mt-4 flex justify-between items-center text-white">
                <div className="text-lg font-caveat">{selectedImage.alt}</div>
                <button
                  onClick={() => toggleLike(selectedImage.id)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
                >
                  <Heart
                    size={28}
                    className={`transition-all ${likedImages.has(selectedImage.id) ? 'fill-red-500 text-red-500' : 'text-white'}`}
                  />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PortfolioPage;
