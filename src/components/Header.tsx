import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone, Gem } from 'lucide-react';
import { ActiveTab } from '../types';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: 'accueil', label: 'Accueil' },
    { id: 'about', label: 'À Propos' },
    { id: 'contact', label: 'Contact' },
    { id: 'faq', label: 'FAQ' },
  ] as const;

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-stone-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => setActiveTab('accueil')}
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-950 flex items-center justify-center text-amber-500 shadow-md group-hover:bg-amber-500 group-hover:text-indigo-950 transition-all duration-300">
              <Gem className="w-5 h-5" />
            </div>
            <div>
              <span className="font-sans font-semibold text-lg tracking-tight text-stone-900 block leading-tight">
                Brocante de Cannes
              </span>
              <span className="font-mono text-[10px] text-amber-600 tracking-widest uppercase block leading-none">
                Antiquités & Trésors
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative py-2 text-sm font-medium transition-colors duration-200 cursor-pointer ${
                  activeTab === item.id 
                    ? 'text-stone-900 font-semibold' 
                    : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                {item.label}
                {activeTab === item.id && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Contact Button */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => setActiveTab('contact')}
              className="flex items-center space-x-2 bg-indigo-950 text-white hover:bg-amber-500 hover:text-indigo-950 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-sm cursor-pointer border border-transparent hover:border-indigo-950/10"
            >
              <span>Nous Contacter</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-50 focus:outline-none cursor-pointer"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-b border-stone-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all duration-150 cursor-pointer ${
                    activeTab === item.id
                      ? 'bg-amber-500/10 text-stone-900 font-semibold border-l-4 border-amber-500 pl-3'
                      : 'text-stone-500 hover:bg-stone-50 hover:text-stone-900 pl-4'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-4 border-t border-stone-100 px-4">
                <button
                  onClick={() => {
                    setActiveTab('contact');
                    setIsOpen(false);
                  }}
                  className="flex w-full items-center justify-center space-x-2 bg-indigo-950 text-white hover:bg-amber-500 hover:text-indigo-950 py-3 rounded-full text-sm font-semibold uppercase tracking-wider transition-all duration-300 shadow-sm"
                >
                  <span>Nous Contacter</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
