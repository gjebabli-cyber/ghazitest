import React from 'react';
import { Mail, MapPin, Phone, Gem, Instagram, Facebook, Compass, Clock } from 'lucide-react';
import { ActiveTab } from '../types';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-indigo-950 text-stone-300 border-t border-indigo-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-6">
            <div 
              className="flex items-center space-x-3 cursor-pointer group w-fit"
              onClick={() => setActiveTab('accueil')}
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-indigo-950 shadow-md group-hover:bg-white group-hover:text-indigo-950 transition-all duration-300">
                <Gem className="w-5 h-5" />
              </div>
              <div>
                <span className="font-sans font-semibold text-lg tracking-tight text-white block leading-tight">
                  Brocante de Cannes
                </span>
                <span className="font-mono text-[10px] text-amber-500 tracking-widest uppercase block leading-none">
                  Antiquités & Trésors
                </span>
              </div>
            </div>
            <p className="text-stone-400 text-sm max-w-sm leading-relaxed">
              Au cœur de la Côte d’Azur, la brocante de Cannes incarne l’élégance intemporelle et l’art de vivre raffiné. Entre pièces rares, luminaires d’époque et objets d’art soigneusement sélectionnés, elle attire une clientèle en quête d’authenticité et d’exclusivité.
            </p>
            {/* Social Icons */}
            <div className="flex space-x-4">
              <a 
                href="#instagram" 
                className="w-9 h-9 rounded-full bg-indigo-900/50 flex items-center justify-center text-stone-300 hover:text-amber-500 hover:bg-indigo-900 transition-all duration-200"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="#facebook" 
                className="w-9 h-9 rounded-full bg-indigo-900/50 flex items-center justify-center text-stone-300 hover:text-amber-500 hover:bg-indigo-900 transition-all duration-200"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="#pinterest" 
                className="w-9 h-9 rounded-full bg-indigo-900/50 flex items-center justify-center text-stone-300 hover:text-amber-500 hover:bg-indigo-900 transition-all duration-200"
                aria-label="Pinterest"
              >
                <Compass className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-6 border-b border-indigo-900 pb-2 inline-block">
              Navigation
            </h3>
            <ul className="space-y-4">
              <li>
                <button 
                  onClick={() => setActiveTab('accueil')}
                  className="text-stone-400 hover:text-amber-500 transition-colors duration-200 text-sm block cursor-pointer"
                >
                  Accueil
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('about')}
                  className="text-stone-400 hover:text-amber-500 transition-colors duration-200 text-sm block cursor-pointer"
                >
                  À Propos de Nous
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('contact')}
                  className="text-stone-400 hover:text-amber-500 transition-colors duration-200 text-sm block cursor-pointer"
                >
                  Nous Contacter
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('faq')}
                  className="text-stone-400 hover:text-amber-500 transition-colors duration-200 text-sm block cursor-pointer"
                >
                  FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details Column */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-6 border-b border-indigo-900 pb-2 inline-block">
              Informations
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-sm">
                <MapPin className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <span className="text-stone-400 leading-relaxed">
                  Les allées de la liberté<br />
                  06400 Cannes, France
                </span>
              </li>
              <li className="flex items-center space-x-3 text-sm">
                <Mail className="w-4 h-4 text-amber-500" />
                <a 
                  href="mailto:contact@brocantedecannes.com" 
                  className="text-stone-400 hover:text-amber-500 transition-all duration-200"
                >
                  contact@brocantedecannes.com
                </a>
              </li>
              <li className="flex items-start space-x-3 text-sm">
                <Clock className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <span className="text-stone-400 leading-relaxed">
                  <strong className="text-white">Marché Hebdomadaire</strong><br />
                  Tous les Samedis & Dimanches<br />
                  De 08:00 à 18:00
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-indigo-900/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-stone-500 text-xs text-center md:text-left">
            &copy; {currentYear} Brocante de Cannes. Tous droits réservés. Antiquités & Brocante de prestige sur la Côte d’Azur.
          </p>
          <div className="flex space-x-6 text-xs text-stone-500">
            <a href="#legal" className="hover:text-amber-500 transition-colors duration-200">Mentions Légales</a>
            <a href="#privacy" className="hover:text-amber-500 transition-colors duration-200">Politique de Confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
