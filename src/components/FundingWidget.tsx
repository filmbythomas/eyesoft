import React, { useEffect, useState, useRef } from 'react';
import { Page } from '../App'; 
import { Heart, Camera } from 'lucide-react';

interface FundingWidgetProps {
  onNavigate: (page: Page) => void;
  pageType?: Page; 
  navbarHeight: number; 
}

const FundingWidget: React.FC<FundingWidgetProps> = ({ onNavigate, pageType, navbarHeight }) => {
  const currentFunding = 326; 
  const fundingGoal = 1200 + 800 + 300 + 200; 
  const progress = Math.min((currentFunding / fundingGoal) * 100, 100);

  const handleWidgetClick = (e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>) => {
    e.preventDefault(); 
    onNavigate('funding-details');
  };

  return (
    <div 
      onClick={handleWidgetClick}
      className={`fixed left-0 right-0 z-30 cursor-pointer group transform transition-all duration-300 overflow-hidden`}
      style={{ top: `${navbarHeight}px` }} 
      role="button" 
      tabIndex={0} 
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleWidgetClick(e as any);}} 
    >
      {/* Enhanced Background with Brand Colors */}
      <div className="absolute inset-0 bg-gradient-to-r from-forest via-sage to-forest opacity-95 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Main Content */}
      <div className="relative z-10 backdrop-blur-sm bg-black/10 border-b border-white/20 shadow-lg">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            
            {/* Left Section - Call to Action */}
            <div className="flex items-center flex-shrink-0 mr-6">
              <div className="relative mr-4">
                <div className="p-2.5 bg-white/20 rounded-full backdrop-blur-sm border border-white/30 group-hover:scale-105 transition-transform duration-300 shadow-lg">
                  <Camera size={22} className="text-white drop-shadow-sm" />
                </div>
              </div>
              <div className="hidden sm:block">
                <p className="text-white font-caveat text-xl font-bold tracking-wide drop-shadow-sm"> 
                  Help Me Upgrade My Gear
                </p>
                <p className="text-white/90 font-inter text-sm font-medium">
                  Support my photography journey
                </p>
              </div>
              <div className="sm:hidden">
                <p className="text-white font-caveat text-lg font-bold tracking-wide drop-shadow-sm"> 
                  Support My Craft
                </p>
              </div>
            </div>

            {/* Center Section - Progress */}
            <div className="flex-grow max-w-sm mx-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-inter text-lg font-bold drop-shadow-sm">
                  ${currentFunding}
                </span>
                <span className="text-white/80 font-inter text-sm font-medium">
                  ${fundingGoal} goal
                </span>
              </div>
              
              {/* Enhanced Progress Bar */}
              <div className="relative h-3 bg-black/30 rounded-full overflow-hidden border border-white/20 shadow-inner">
                <div 
                  className="h-full bg-gradient-to-r from-gold via-sage to-gold rounded-full transition-all duration-700 ease-out shadow-sm relative overflow-hidden" 
                  style={{ width: `${progress}%` }}
                >
                  {/* Enhanced shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                  
                  {/* Progress percentage */}
                  {progress > 25 && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-bold text-white drop-shadow-sm">
                        {Math.round(progress)}%
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Section - Action Button */}
            <div className="flex items-center flex-shrink-0 ml-6">
              <div className="relative">
                <div className="px-5 py-2.5 bg-white/20 rounded-xl backdrop-blur-sm border border-white/30 group-hover:bg-white/30 transition-all duration-300 group-hover:scale-105 shadow-lg">
                  <div className="flex items-center gap-2">
                    <Heart size={18} className="text-white group-hover:text-gold transition-colors duration-300" />
                    <span className="text-white font-inter text-sm font-bold drop-shadow-sm whitespace-nowrap">
                      Details
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gold via-sage to-gold opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>
    </div>
  );
};

export default FundingWidget;
