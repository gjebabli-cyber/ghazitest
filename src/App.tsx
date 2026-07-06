import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Accueil } from './components/Accueil';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { FAQ } from './components/FAQ';
import { PhotoManager } from './components/PhotoManager';
import { WordPressConverter } from './components/WordPressConverter';
import { ActiveTab } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('accueil');
  const [customImages, setCustomImages] = useState<{
    hero: string | null;
    market: string | null;
    contact: string | null;
  }>({
    hero: null,
    market: null,
    contact: null
  });

  // Load custom images from localStorage on mount
  useEffect(() => {
    try {
      const hero = localStorage.getItem('brocante_img_hero');
      const market = localStorage.getItem('brocante_img_market');
      const contact = localStorage.getItem('brocante_img_contact');
      if (hero || market || contact) {
        setCustomImages({ hero, market, contact });
      }
    } catch (e) {
      console.warn("Could not load custom images from localStorage", e);
    }
  }, []);

  const handleUpdateImage = (key: 'hero' | 'market' | 'contact', base64: string | null) => {
    setCustomImages(prev => ({ ...prev, [key]: base64 }));
    try {
      if (base64) {
        localStorage.setItem(`brocante_img_${key}`, base64);
      } else {
        localStorage.removeItem(`brocante_img_${key}`);
      }
    } catch (e) {
      console.error("Failed to save to localStorage", e);
      alert("L'image est trop volumineuse pour être sauvegardée de manière permanente dans le navigateur. Elle sera conservée temporairement pour cette session.");
    }
  };

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col justify-between selection:bg-amber-500 selection:text-indigo-950 font-sans antialiased text-stone-800">
      
      {/* Header with logo & nav actions */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area with fluid motion fade/slide transitions */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
          >
            {activeTab === 'accueil' && (
              <Accueil 
                setActiveTab={setActiveTab} 
                customImage={customImages.hero}
                onUpdateImage={handleUpdateImage}
              />
            )}
            {activeTab === 'about' && (
              <About 
                setActiveTab={setActiveTab} 
                customImage={customImages.market}
                onUpdateImage={handleUpdateImage}
              />
            )}
            {activeTab === 'contact' && (
              <Contact 
                customImage={customImages.contact}
                onUpdateImage={handleUpdateImage}
              />
            )}
            {activeTab === 'faq' && (
              <FAQ 
                setActiveTab={setActiveTab} 
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer with deep navy branding & coordinates */}
      <Footer setActiveTab={setActiveTab} />

      {/* Central Photo Management Dashboard */}
      <PhotoManager customImages={customImages} onUpdateImage={handleUpdateImage} />

      {/* WordPress Theme Export Dashboard */}
      <WordPressConverter customImages={customImages} />

    </div>
  );
}
