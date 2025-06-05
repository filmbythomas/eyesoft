import React, { useState, useEffect } from 'react';
import { Camera, Zap, Users, Crown, Leaf, Star, X, Instagram, Mail, ArrowLeft, Check } from 'lucide-react';

type Category = 'athletics' | 'portraits' | null;

interface Feature {
  name: string;
  included: boolean;
}

interface Tier {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
  icon: React.ReactNode;
  bgGradient: string;
  borderColor: string;
  glowColor: string;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTier: string;
  category: Category;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, selectedTier, category }) => {
  const [showUnavailableNotice, setShowUnavailableNotice] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Show unavailable notice after modal animation
      setTimeout(() => setShowUnavailableNotice(true), 600);
    } else {
      document.body.style.overflow = '';
      setShowUnavailableNotice(false);
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const placeholderText = category === 'athletics' 
    ? "Jersey number, game location/time, team details..."
    : "Desired location, preferred time, moodboard ideas, style preferences...";

  const categoryDisplayName = category ? category.charAt(0).toUpperCase() + category.slice(1) : '';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md animate-fadeIn"
        onClick={onClose}
      />
      
      {/* Unavailable Notice Overlay */}
      {showUnavailableNotice && (
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-10 animate-fadeIn">
          <div className="bg-white/95 backdrop-blur-lg p-8 rounded-3xl shadow-2xl max-w-md mx-4 text-center border border-sage/30 animate-bounceIn relative">
            {/* Close Button for Unavailable Notice */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 bg-forest rounded-full flex items-center justify-center shadow-lg hover:bg-forest/80 transition-all duration-300 group"
              aria-label="Close notice"
            >
              <X size={16} className="text-white group-hover:scale-110 transition-transform" />
            </button>
            
            <div className="mb-6">
              <Leaf size={48} className="mx-auto text-forest mb-4 animate-gentle-sway" />
              <h3 className="text-2xl font-caveat font-bold text-forest mb-3">
                Booking Currently Unavailable
              </h3>
              <p className="text-charcoal/80 font-inter leading-relaxed">
                Please reach out to me directly! I'd love to discuss your vision.
              </p>
            </div>
            
            <div className="space-y-4">
              <a
                href="https://www.instagram.com/eyesofteee"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white py-3 px-6 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg group"
              >
                <Instagram size={20} className="group-hover:animate-pulse" />
                Instagram @eyesofteee
              </a>
              
              <a
                href="mailto:filmbythomas@gmail.com"
                className="flex items-center justify-center gap-3 w-full bg-sage text-white py-3 px-6 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-forest group"
              >
                <Mail size={20} className="group-hover:animate-pulse" />
                filmbythomas@gmail.com
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      <div className="relative bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl w-full max-w-lg border border-sage/30 animate-modalSlideUp">
        {/* Close Button - Fixed positioning */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 bg-forest rounded-full flex items-center justify-center shadow-lg hover:bg-forest/80 transition-all duration-300 group z-20"
        >
          <X size={20} className="text-white group-hover:scale-110 transition-transform" />
        </button>

        {/* Modal Content */}
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="inline-block p-4 bg-sage/10 rounded-full mb-4">
              <Camera size={32} className="text-forest" />
            </div>
            <h2 className="text-3xl font-caveat font-bold text-forest mb-2">
              Book Your Session
            </h2>
            <p className="text-charcoal/70 font-inter">
              Selected: <span className="font-semibold text-forest">{selectedTier}</span> • {categoryDisplayName}
            </p>
          </div>

          <form className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-2 font-inter">
                Full Name
              </label>
              <input
                type="text"
                defaultValue="Thomas Garcia"
                className="w-full px-4 py-3 rounded-xl border border-sage/30 bg-white/80 backdrop-blur-sm focus:border-sage focus:ring-2 focus:ring-sage/20 outline-none transition-all font-inter"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-charcoal mb-2 font-inter">
                Email Address
              </label>
              <input
                type="email"
                defaultValue="filmbythomas@gmail.com"
                className="w-full px-4 py-3 rounded-xl border border-sage/30 bg-white/80 backdrop-blur-sm focus:border-sage focus:ring-2 focus:ring-sage/20 outline-none transition-all font-inter"
              />
            </div>

            {category === 'athletics' && (
              <div>
                <label className="block text-sm font-semibold text-charcoal mb-2 font-inter">
                  Sport
                </label>
                <input
                  type="text"
                  defaultValue="Tennis"
                  className="w-full px-4 py-3 rounded-xl border border-sage/30 bg-white/80 backdrop-blur-sm focus:border-sage focus:ring-2 focus:ring-sage/20 outline-none transition-all font-inter"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-charcoal mb-2 font-inter">
                Additional Details
              </label>
              <textarea
                rows={4}
                placeholder={placeholderText}
                className="w-full px-4 py-3 rounded-xl border border-sage/30 bg-white/80 backdrop-blur-sm focus:border-sage focus:ring-2 focus:ring-sage/20 outline-none transition-all resize-none font-inter"
              />
            </div>

            <button
              type="submit"
              disabled
              className="w-full bg-charcoal/30 text-white py-4 rounded-xl font-semibold cursor-not-allowed opacity-50 font-inter"
            >
              Submit Booking Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const athleticsTiers: Tier[] = [
  {
    id: "starter",
    name: "Game Day",
    price: "$30",
    description: "Perfect for social media",
    features: [
      "1 Full Game Coverage",
      "10 edited action and game photos",
      "Quick turnaround"
    ],
    icon: <Camera size={32} className="text-white" />,
    bgGradient: "from-sage/80 to-forest/60",
    borderColor: "border-sage",
    glowColor: "shadow-sage/30"
  },
  {
    id: "pro",
    name: "3 Day Coverage",
    price: "$100",
    description: "Comprehensive game coverage for coaches or multiple games.",
    features: [
      "3 Full game coverage",
      "35-40 edited action and game photos",
      "Team photos (Good for coaches!)",
      "Priority scheduling",
      "Social media / graphic ready photos"
    ],
    popular: true,
    icon: <Zap size={32} className="text-white" />,
    bgGradient: "from-forest to-sage/80",
    borderColor: "border-gold",
    glowColor: "shadow-gold/40"
  },
  {
    id: "elite",
    name: "Season Coverage",
    price: "$300",
    description: "Premium season highlights and action photos",
    features: [
      "Full season game coverage",
      "125+ edited action and game photos",
      "30 seconds - 1 minute highlight reel",
      "Individual athlete portraits",
      "Team photos (Good for coaches!)",
      "Priority scheduling",
      "Social media / graphic ready photos"
    ],
    icon: <Crown size={32} className="text-white" />,
    bgGradient: "from-gold/80 to-forest/70",
    borderColor: "border-gold",
    glowColor: "shadow-gold/50"
  }
];

const portraitsTiers: Tier[] = [
  {
    id: "starter",
    name: "Basic",
    price: "$155",
    features: [
      "1-hour session",
      "20 edited photos",
      "1 chosen location",
    ],
    icon: <Leaf size={32} className="text-white" />,
    bgGradient: "from-sage/80 to-forest/60",
    borderColor: "border-sage",
    glowColor: "shadow-sage/30"
  },
  {
    id: "pro",
    name: "Premium",
    price: "$225",
    features: [
      "2-hour session",
      "40+ edited photos",
      "Up to 2 locations",
      "2 Outfit changes included",
      "10 photocards of your choice"
    ],
    popular: true,
    icon: <Users size={32} className="text-white" />,
    bgGradient: "from-forest to-sage/80",
    borderColor: "border-gold",
    glowColor: "shadow-gold/40"
  },
  {
    id: "elite",
    name: "Ultimate",
    price: "$300",
    features: [
      "3-hour immersive session",
      "60+ edited photos",
      "Up to 3 locations",
      "3 Outfit changes included",
      "5 8x10 photos",
      "Location Consultation",
      "All image files",
    ],
    icon: <Star size={32} className="text-white" />,
    bgGradient: "from-gold/80 to-forest/70",
    borderColor: "border-gold",
    glowColor: "shadow-gold/50"
  }
];

const PricingCard: React.FC<{ tier: Tier; onBook: () => void; index: number }> = ({ tier, onBook, index }) => {
  return (
    <div 
      className={`relative group animate-slideUpStagger`}
      style={{ animationDelay: `${index * 150}ms` }}
    >
      {tier.popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
          <div className="bg-gold text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg animate-gentle-bounce">
            Most Popular
          </div>
        </div>
      )}
      
      <div className={`
        relative h-full bg-gradient-to-br ${tier.bgGradient} backdrop-blur-lg
        rounded-3xl p-8 border-2 ${tier.borderColor} shadow-xl ${tier.glowColor}
        transform transition-all duration-500 hover:scale-105 hover:-translate-y-2
        hover:shadow-2xl group-hover:${tier.glowColor.replace('shadow-', 'shadow-2xl ')}
        perspective-1000 hover:rotate-y-5 flex flex-col
      `}>
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-white/20 rounded-full backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
            {tier.icon}
          </div>
        </div>

        {/* Content */}
        <div className="text-center text-white flex flex-col h-full">
          <h3 className="text-2xl font-caveat font-bold mb-2">{tier.name}</h3>
          <div className="text-4xl font-bold mb-4">{tier.price}</div>
          <p className="text-white/90 mb-6 font-inter text-sm leading-relaxed">
            {tier.description}
          </p>

          {/* Features */}
          <ul className="space-y-3 mb-8 text-left flex-grow">
            {tier.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm font-inter">
                <Check size={16} className="text-white mt-0.5 flex-shrink-0" />
                <span className="text-white/90">{feature}</span>
              </li>
            ))}
          </ul>

          {/* Book Button */}
          <button
            onClick={onBook}
            className="w-full bg-white/20 backdrop-blur-sm text-white py-3 px-6 rounded-xl font-semibold border border-white/30 hover:bg-white/30 hover:scale-105 transition-all duration-300 group/btn font-inter mt-auto"
          >
            <span className="group-hover/btn:animate-pulse">Book Now!</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const PricingBookingPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState('');

  const handleBookNow = (tierName: string) => {
    setSelectedTier(tierName);
    setIsModalOpen(true);
  };

  const tiersToDisplay = activeCategory === 'athletics' ? athleticsTiers : portraitsTiers;

  if (!activeCategory) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sand via-sage/20 to-forest/30 relative overflow-hidden pt-32 md:pt-36">
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
              Pricing
            </h1>
            <p className="text-xl md:text-2xl text-charcoal/80 mb-16 font-inter leading-relaxed animate-fadeInUp animation-delay-300">
              Select a category to explore packages tailored for you
            </p>

            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center justify-center">
              {/* Athletics Button */}
              <button
                onClick={() => setActiveCategory('athletics')}
                className="group relative w-80 h-96 rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 animate-fadeInUp animation-delay-500"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-sage to-forest opacity-90 group-hover:opacity-80 transition-opacity" />
                <div className="absolute inset-0 bg-[url('/pricing/athletics-btn-bg.jpg')] bg-cover bg-center group-hover:scale-110 transition-transform duration-700" />
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
                <div className="absolute inset-0 bg-[url('/pricing/portraits-btn-bg.jpg')] bg-cover bg-center group-hover:scale-110 transition-transform duration-700" />
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
    <div className="min-h-screen bg-gradient-to-br from-sand via-sage/10 to-forest/20 relative pt-32 md:pt-36">
      <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8 md:py-12">
        {/* Back Button */}
        <button
          onClick={() => setActiveCategory(null)}
          className="mb-12 mt-6 flex items-center gap-3 bg-white/80 backdrop-blur-sm text-forest px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl hover:bg-white/90 transition-all duration-300 group font-inter font-semibold border border-sage/30"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <Leaf size={16} className="text-sage" />
          Back to Pricing
        </button>

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-7xl font-caveat font-bold text-forest mb-6 animate-fadeInUp">
            {activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Packages
          </h1>
          <p className="text-xl text-charcoal/80 max-w-3xl mx-auto font-inter leading-relaxed animate-fadeInUp animation-delay-200">
            Crafted with passion, each package is designed to capture your unique story
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tiersToDisplay.map((tier, index) => (
            <PricingCard
              key={tier.id}
              tier={tier}
              onBook={() => handleBookNow(tier.name)}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedTier={selectedTier}
        category={activeCategory}
      />
    </div>
  );
};

export default PricingBookingPage;
