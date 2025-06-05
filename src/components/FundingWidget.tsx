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
      className="fixed left-0 right-0 z-30 cursor-pointer group transform transition-all duration-300 overflow-hidden"
      style={{ top: `${navbarHeight}px` }} 
      role="button" 
      tabIndex={0} 
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleWidgetClick(e as any);}} 
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-forest via-sage to-forest opacity-95 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Content */}
      <div className="relative z-10 backdrop-blur-sm bg-black/10 border-b border-white/20 shadow-lg max-h-[100px] sm:max-h-none">
        <div className="max-w-screen-xl mx-auto px-3 sm:px-6 lg:px-8 py-2 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
            
            {/* Left - CTA */}
            <div className="flex items-center flex-shrink-0">
              <div className="mr-2 sm:mr-4">
                <div className="p-2 bg-white/20 rounded-full backdrop-blur-sm border border-white/30 group-hover:scale-105 transition-transform duration-300 shadow-lg">
                  <Camera size={18} className="text-white drop-shadow-sm" />
                </div>
              </div>
              <div className="hidden sm:block">
                <p className="text-white font-caveat text-lg font-bold tracking-wide drop-shadow-sm"> 
                  Help Me Upgrade My Gear
                </p>
                <p className="text-white/90 font-inter text-xs">
                  Support my photography journey
                </p>
              </div>
              <div className="sm:hidden">
                <p className="text-white font-caveat text-base font-bold tracking-wide drop-shadow-sm"> 
                  Support My Craft
                </p>
              </div>
            </div>

            {/* Center - Progress */}
            <div className="w-full sm:flex-grow sm:max-w-sm mx-auto sm:mx-6">
              <div className="flex items-center justify-between mb-1">
                <span className="text-white font-inter text-sm font-bold drop-shadow-sm">
                  ${currentFunding}
                </span>
                <span className="text-white/80 font-inter text-xs">
                  ${fundingGoal} goal
                </span>
              </div>
              <div className="relative h-2 bg-black/30 rounded-full overflow-hidden border border-white/20 shadow-inner">
                <div 
                  className="h-full bg-gradient-to-r from-gold via-sage to-gold rounded-full transition-all duration-700 ease-out relative overflow-hidden" 
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                  {progress > 25 && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[10px] font-bold text-white drop-shadow-sm">
                        {Math.round(progress)}%
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right - Details Button */}
            <div className="flex items-center justify-center sm:justify-end flex-shrink-0 ml-0 sm:ml-6">
              <div className="px-4 py-1.5 bg-white/20 rounded-lg backdrop-blur-sm border border-white/30 group-hover:bg-white/30 transition-all duration-300 group-hover:scale-105 shadow-lg">
                <div className="flex items-center gap-1">
                  <Heart size={16} className="text-white group-hover:text-gold transition-colors duration-300" />
                  <span className="text-white font-inter text-xs font-bold drop-shadow-sm whitespace-nowrap">
                    Details
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold via-sage to-gold opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>
    </div>
  );
};

export default FundingWidget;
