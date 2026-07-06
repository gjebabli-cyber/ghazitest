import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, RotateCcw, X, Upload, Sliders, Image as ImageIcon, Sparkles, Check } from 'lucide-react';

import heroAntiqueImg from '../assets/images/hero_antique_1783030350467.jpg';
import marketCannesImg from '../assets/images/market_cannes_1783030364039.jpg';
import contactAntiqueImg from '../assets/images/contact_antique_1783030377771.jpg';

interface PhotoManagerProps {
  customImages: {
    hero: string | null;
    market: string | null;
    contact: string | null;
  };
  onUpdateImage: (key: 'hero' | 'market' | 'contact', base64: string | null) => void;
}

export const PhotoManager: React.FC<PhotoManagerProps> = ({ customImages, onUpdateImage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDragKey, setActiveDragKey] = useState<'hero' | 'market' | 'contact' | null>(null);

  const fileInputRefHero = useRef<HTMLInputElement>(null);
  const fileInputRefMarket = useRef<HTMLInputElement>(null);
  const fileInputRefContact = useRef<HTMLInputElement>(null);

  const photoSlots = [
    {
      key: 'hero' as const,
      title: 'Photo d’Accueil (En-tête principal)',
      description: 'L’image affichée en haut de la page principale pour captiver vos visiteurs.',
      defaultImg: heroAntiqueImg,
      currentImg: customImages.hero || heroAntiqueImg,
      isCustom: !!customImages.hero,
      inputRef: fileInputRefHero,
    },
    {
      key: 'market' as const,
      title: 'Photo "À Propos" (Le Marché)',
      description: 'Présente les Allées de la Liberté sous la canopée de platanes cannois.',
      defaultImg: marketCannesImg,
      currentImg: customImages.market || marketCannesImg,
      isCustom: !!customImages.market,
      inputRef: fileInputRefMarket,
    },
    {
      key: 'contact' as const,
      title: 'Photo "Contact" (Le Bureau)',
      description: 'Illustre le bureau de correspondance pour inviter aux échanges passionnés.',
      defaultImg: contactAntiqueImg,
      currentImg: customImages.contact || contactAntiqueImg,
      isCustom: !!customImages.contact,
      inputRef: fileInputRefContact,
    }
  ];

  const totalCustomized = photoSlots.filter(slot => slot.isCustom).length;

  const handleFileChange = (key: 'hero' | 'market' | 'contact', file: File) => {
    if (!file.type.startsWith('image/')) {
      alert("Veuillez sélectionner un fichier image valide (JPG, PNG, WebP).");
      return;
    }

    if (file.size > 4 * 1024 * 1024) {
      alert("Cette image est trop volumineuse (maximum 4 Mo). Veuillez utiliser une image compressée.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      if (base64) {
        onUpdateImage(key, base64);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleNativeUpload = (key: 'hero' | 'market' | 'contact', e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileChange(key, file);
    }
  };

  const handleDragOver = (key: 'hero' | 'market' | 'contact', e: React.DragEvent) => {
    e.preventDefault();
    setActiveDragKey(key);
  };

  const handleDragLeave = () => {
    setActiveDragKey(null);
  };

  const handleDrop = (key: 'hero' | 'market' | 'contact', e: React.DragEvent) => {
    e.preventDefault();
    setActiveDragKey(null);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileChange(key, file);
    }
  };

  const resetAll = () => {
    if (confirm("Voulez-vous restaurer l'intégralité des photos d'origine du site ?")) {
      onUpdateImage('hero', null);
      onUpdateImage('market', null);
      onUpdateImage('contact', null);
    }
  };

  return (
    <>
      {/* Floating control widget button on the bottom right */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          onClick={() => setIsOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-indigo-950 hover:bg-amber-500 text-white hover:text-indigo-950 p-4 rounded-full shadow-2xl flex items-center gap-2 cursor-pointer transition-all duration-300 border border-white/10 group font-sans font-medium"
        >
          <div className="relative">
            <Sliders className="w-5 h-5" />
            {totalCustomized > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-amber-500 group-hover:bg-indigo-950 text-indigo-950 group-hover:text-amber-500 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center border border-white">
                {totalCustomized}
              </span>
            )}
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider pr-1">
            Configurer mes photos
          </span>
        </motion.button>
      </div>

      {/* Side panel / drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-stone-900 z-50 backdrop-blur-sm"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-stone-950 text-stone-100 z-50 shadow-2xl flex flex-col justify-between border-l border-stone-800"
            >
              {/* Header */}
              <div className="p-6 border-b border-stone-800 flex justify-between items-center bg-stone-900/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                    <Camera className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-sans font-semibold text-lg tracking-tight text-white flex items-center gap-2">
                      Gestion des Photos
                    </h2>
                    <p className="text-[11px] font-mono text-stone-400 tracking-wider uppercase">
                      Personnalisez les visuels du site
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
                  aria-label="Fermer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                {/* Intro guide */}
                <div className="bg-indigo-950/40 border border-indigo-900/50 p-5 rounded-2xl space-y-2">
                  <div className="flex items-center gap-2 text-amber-500">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-xs font-semibold uppercase tracking-wider font-sans">Créez votre propre brocante</span>
                  </div>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    Remplacez facilement tous les visuels par vos propres photos ! Glissez-déposez une image ou cliquez sur "Sélectionner" pour chaque section. Les modifications sont enregistrées automatiquement dans votre navigateur.
                  </p>
                </div>

                {/* Progress banner */}
                <div className="flex items-center justify-between text-xs bg-stone-900 border border-stone-800 rounded-xl p-4">
                  <span className="text-stone-400">Progression de personnalisation</span>
                  <span className="font-mono bg-amber-500 text-indigo-950 font-bold px-2.5 py-0.5 rounded-full text-[10px]">
                    {totalCustomized} / 3 PHOTOS APPLIQUÉES
                  </span>
                </div>

                {/* Photo slots list */}
                <div className="space-y-6">
                  {photoSlots.map((slot) => (
                    <div
                      key={slot.key}
                      className={`p-4 rounded-2xl border transition-all duration-300 ${
                        slot.isCustom 
                          ? 'bg-stone-900/70 border-amber-500/20' 
                          : 'bg-stone-900/30 border-stone-800/80'
                      }`}
                    >
                      <input
                        type="file"
                        ref={slot.inputRef}
                        onChange={(e) => handleNativeUpload(slot.key, e)}
                        accept="image/*"
                        className="hidden"
                      />

                      <div className="space-y-4">
                        {/* Information Row */}
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-sm font-semibold text-white">{slot.title}</h3>
                            <p className="text-xs text-stone-400 mt-1 leading-relaxed">{slot.description}</p>
                          </div>
                          {slot.isCustom && (
                            <span className="bg-emerald-500/10 text-emerald-400 font-mono text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shrink-0">
                              <Check className="w-3 h-3" /> Modifié
                            </span>
                          )}
                        </div>

                        {/* Drop Zone & Preview Row */}
                        <div
                          onDragOver={(e) => handleDragOver(slot.key, e)}
                          onDragLeave={handleDragLeave}
                          onDrop={(e) => handleDrop(slot.key, e)}
                          onClick={() => slot.inputRef.current?.click()}
                          className={`relative border-2 border-dashed rounded-xl p-3 flex gap-4 items-center cursor-pointer transition-all duration-200 group ${
                            activeDragKey === slot.key
                              ? 'border-amber-500 bg-amber-500/10'
                              : 'border-stone-800 hover:border-stone-600 bg-stone-950/50'
                          }`}
                        >
                          {/* Mini Thumbnail */}
                          <div className="w-20 h-20 rounded-lg overflow-hidden border border-stone-800/60 shrink-0 relative">
                            <img
                              src={slot.currentImg}
                              alt={slot.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              referrerPolicy="no-referrer"
                            />
                            {slot.isCustom && (
                              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-[9px] text-white font-mono uppercase bg-stone-900/90 px-1 py-0.5 rounded">
                                  Éditer
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Upload Call-to-action */}
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center gap-1.5 text-stone-300 text-xs font-semibold">
                              <Upload className="w-3.5 h-3.5 text-amber-500 group-hover:translate-y-[-2px] transition-transform" />
                              <span>Glissez ou cliquez pour charger</span>
                            </div>
                            <p className="text-[10px] text-stone-500 font-mono leading-none">
                              Format JPG, PNG, WebP &bull; Max 4 Mo
                            </p>
                          </div>

                          {/* Quick Clear Button */}
                          {slot.isCustom && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (confirm("Restaurer la photo par défaut ?")) {
                                  onUpdateImage(slot.key, null);
                                }
                              }}
                              className="absolute top-2 right-2 p-1 rounded-md bg-stone-900 hover:bg-rose-600 text-stone-400 hover:text-white transition-colors cursor-pointer"
                              title="Restaurer l'image par défaut"
                            >
                              <RotateCcw className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-stone-800 bg-stone-900/30 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={resetAll}
                  disabled={totalCustomized === 0}
                  className="text-xs text-stone-400 hover:text-rose-400 font-semibold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer disabled:opacity-30 disabled:pointer-events-none transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Tout réinitialiser
                </button>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="bg-white hover:bg-amber-500 text-stone-900 hover:text-indigo-950 px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer"
                >
                  Fermer
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
