import React from 'react';
import { Leaf, Target, TrendingUp, Gift, Camera as CameraIcon, Image as ImageIconLucide, DollarSign, ShoppingCart, Zap as EnergyIcon, ExternalLink } from 'lucide-react'; 
import { Page } from '../App'; 


const FundingDetailsPage: React.FC = () => {
  const savingsGoals = [
    { item: "Sony A7IV Camera Body", goal: 1200, current: 326, link: "https://www.bhphotovideo.com/c/product/1667800-REG/sony_ilce_7m4_b_alpha_a7_iv_mirrorless.html", icon: <CameraIcon size={32} className="text-secondary group-hover:text-secondary-light transition-colors" />, description: "Versatile full-frame for stunning image quality.", category: "Camera Body" },
    { item: "Sigma 24-70mm f/2.8 Lens", goal: 800, current: 0, link: "https://www.bhphotovideo.com/c/product/1578576-REG/sigma_24_70mm_f_2_8_dg_dn.html", icon: <ImageIconLucide size={32} className="text-secondary group-hover:text-secondary-light transition-colors" />, description: "Workhorse lens for diverse shooting conditions.", category: "Lens" },
    { item: "Manfrotto Pro Tripod", goal: 300, current: 0, link: "https://www.bhphotovideo.com/c/product/1326009-REG/manfrotto_mk055xpro3_3wus_055_aluminum_tripod.html", icon: <Leaf size={32} className="text-secondary group-hover:text-secondary-light transition-colors" />, description: "Essential for sharp, stable shots, especially in low light.", category: "Accessory" },
    { item: "Godox AD200Pro Light", goal: 200, current: 0, link: "https://www.bhphotovideo.com/c/product/1562007-REG/godox_ad200pro_ttl_pocket_flash.html", icon: <EnergyIcon size={32} className="text-secondary group-hover:text-secondary-light transition-colors" />, description: "Portable flash for creative lighting on the go.", category: "Lighting" },
  ];

  const totalGoal = savingsGoals.reduce((sum, item) => sum + item.goal, 0);
  const totalCurrent = savingsGoals.reduce((sum, item) => sum + item.current, 0);
  const overallProgress = totalGoal > 0 ? Math.min((totalCurrent / totalGoal) * 100, 100) : 0;

  return (
    <div className="page-container min-h-screen bg-background text-text-primary">
      <div className="max-w-5xl mx-auto py-12 md:py-16 pt-32 md:pt-36">
        <header className="text-center mb-16 md:mb-20 animate-fadeInUp">
          <div className="inline-block p-5 bg-surface rounded-full shadow-pop mb-8 border-4 border-secondary/30 transform hover:scale-110 transition-transform duration-300">
            <Target size={64} className="text-primary" />
          </div>
          <h1 className="text-primary font-display font-black tracking-tight text-5xl md:text-6xl">Support My Craft</h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto mt-6 subtext font-sans leading-relaxed">
            I'm deeply passionate about capturing life's authentic moments. Upgrading my gear allows me to elevate the quality, creativity, and storytelling in my work. Your support, in any form, helps fuel this journey. Thank you for considering!
          </p>
        </header>

        <section className="bg-surface p-8 md:p-10 rounded-2xl shadow-card-3d mb-12 md:mb-16 animate-fadeInUp animation-delay-200 border-2 border-accent/20 transform hover:shadow-2xl transition-shadow duration-300">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-5">
            <h2 className="text-3xl font-display font-bold text-primary-dark mb-2 sm:mb-0">Overall Progress:</h2>
            <div className="text-2xl font-semibold text-primary">
              <span className="text-secondary font-bold">${totalCurrent}</span> / <span className="text-text-secondary text-xl">${totalGoal} raised</span>
            </div>
          </div>
          <div className="w-full bg-accent/10 rounded-full h-8 overflow-hidden shadow-inner border border-accent/20">
            <div 
              className="bg-secondary h-full rounded-full transition-all duration-1000 ease-out flex items-center justify-center text-text-on-dark text-sm font-bold shadow-md" 
              style={{ width: `${overallProgress}%` }}
            >
              {overallProgress > 10 ? `${Math.round(overallProgress)}%` : ''}
            </div>
          </div>
        </section>

        <section className="animate-fadeInUp animation-delay-400">
          <h2 className="text-4xl font-display font-black text-primary mb-10 md:mb-12 text-center tracking-tight">My Gear Wishlist</h2>
          <div className="grid md:grid-cols-2 gap-8 md:gap-10">
            {savingsGoals.map((goal, index) => (
              <div 
                key={goal.item} 
                className="bg-surface p-7 rounded-2xl shadow-card-3d hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-[1.035] hover:-translate-y-1 border-2 border-transparent hover:border-secondary/30 flex flex-col group"
              >
                <div className="flex items-center mb-5">
                  <div className="p-4 bg-secondary/10 rounded-xl mr-5 shadow-md border border-secondary/20 group-hover:bg-secondary/25 transition-colors duration-300 transform group-hover:scale-105">
                    {React.cloneElement(goal.icon, { size:30, className: "text-secondary group-hover:text-secondary-light transition-colors duration-300"})}
                  </div>
                  <div>
                    <h3 className="text-2xl font-display font-bold text-primary-dark group-hover:text-primary transition-colors">{goal.item}</h3>
                    <span className="text-xs bg-primary-dark/10 text-primary-dark font-semibold px-2.5 py-1 rounded-full">{goal.category}</span>
                  </div>
                </div>
                <p className="text-text-secondary text-base mb-5 leading-relaxed subtext flex-grow">{goal.description}</p>
                
                <div className="mt-auto pt-4 border-t border-accent/20">
                  <div className="flex justify-between items-center text-base mb-1.5 text-text-secondary font-semibold">
                    <span>Goal: ${goal.goal}</span>
                    <span className="text-primary font-bold">Current: ${goal.current}</span>
                  </div>
                  <div className="w-full bg-accent/10 rounded-full h-4 mb-3 overflow-hidden shadow-inner border border-accent/20">
                    <div 
                      className="bg-secondary h-full rounded-full transition-all duration-700 ease-out shadow-sm" 
                      style={{ width: `${Math.min((goal.current / goal.goal) * 100, 100)}%` }}
                    ></div>
                  </div>
                  {goal.link ? (
                    <a 
                      href={goal.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm text-primary hover:text-primary-dark font-bold group/link"
                    >
                      View Item Example <ExternalLink size={14} className="ml-1.5 opacity-70 group-hover/link:opacity-100 transition-opacity"/>
                    </a>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </section>
        
        <section className="mt-16 md:mt-24 text-center animate-fadeInUp animation-delay-500">
          <div className="bg-primary-dark p-8 md:p-12 rounded-3xl shadow-2xl text-text-on-dark relative overflow-hidden border-4 border-secondary-light/30 transform hover:scale-[1.02] transition-transform duration-300">
            <div className="absolute -inset-4 bg-repeat opacity-[0.04] animate-pulse" style={{backgroundImage: "url('/shared/nature-texture-light.png')", backgroundSize: '300px auto', animationDuration: '20s'}}></div>
            <div className="relative z-10">
              <div className="inline-block p-5 bg-secondary/20 rounded-full shadow-xl mb-8 border-4 border-secondary-light/50 transform group-hover:scale-110 transition-transform duration-300">
                <Gift size={56} className="text-secondary-light drop-shadow-lg" /> 
              </div>
              <h3 className="text-4xl md:text-5xl font-display font-black text-text-on-dark mb-6 tracking-tight" style={{textShadow: '1px 2px 4px rgba(0,0,0,0.3)'}}>Want to Help Me Grow?</h3>
              <p className="text-text-on-dark/90 mb-6 subtext text-lg leading-relaxed max-w-xl mx-auto"> 
                Booking a session is the most direct way to support my craft and help me invest in better gear to capture even more amazing moments for you!
              </p>
              <p className="text-text-on-dark/90 subtext text-lg leading-relaxed max-w-xl mx-auto"> 
                Alternatively, connect with me on <a href="https://www.instagram.com/eyesofteee" target="_blank" rel="noopener noreferrer" className="text-secondary-light hover:text-highlight underline font-bold transition-colors duration-200">Instagram @eyesofteee</a> for collaborations or other ways to show your support.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FundingDetailsPage;
