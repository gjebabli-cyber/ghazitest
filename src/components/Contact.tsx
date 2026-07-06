import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, MapPin, Phone, Clock, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { ImageUploader } from './ImageUploader';
import { ContactFormData } from '../types';

// Importing generated images
import contactAntiqueImg from '../assets/images/contact_antique_1783030377771.jpg';

interface ContactProps {
  customImage: string | null;
  onUpdateImage: (key: 'hero' | 'market' | 'contact', base64: string | null) => void;
}

export const Contact: React.FC<ContactProps> = ({ customImage, onUpdateImage }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    interest: 'Mobilier',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple client side validation
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitError('Veuillez remplir tous les champs obligatoires (Nom, Email, Message).');
      return;
    }

    setSubmitError('');
    setIsSubmitting(true);

    // Simulate sending email api
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        interest: 'Mobilier',
        message: ''
      });
    }, 1500);
  };

  return (
    <div className="bg-stone-50 min-h-screen">
      
      {/* Title Header */}
      <section className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4 max-w-3xl mx-auto"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-amber-600 font-semibold">CONTACT & CORRESPONDANCE</span>
          <h1 className="font-sans font-medium text-4xl sm:text-5xl text-stone-900 tracking-tight leading-tight">
            Échangeons autour de votre passion
          </h1>
          <p className="text-stone-500 text-sm sm:text-base leading-relaxed">
            Une recherche de pièce rare, une demande d'expertise ou de transport ? Nos antiquaires sont à votre entière écoute.
          </p>
        </motion.div>
      </section>

      {/* Main Grid: Form + Coordinates */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Coordinates & Information card */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Elegant Image Box */}
            <div className="rounded-[32px] overflow-hidden shadow-xl border border-stone-200 relative">
              <ImageUploader
                imageKey="contact"
                defaultImage={contactAntiqueImg}
                customImage={customImage}
                onUpdateImage={onUpdateImage}
                alt="Bureau de correspondance d'époque"
                className="w-full h-64"
                imgClassName=""
              >
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/60 via-transparent to-transparent pointer-events-none"></div>
                <div className="absolute bottom-6 left-6 text-white z-20">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-amber-400 block font-semibold">SERVICE DE PRESTIGE</span>
                  <span className="font-sans font-medium text-lg block mt-1">L’excellence à votre écoute</span>
                </div>
              </ImageUploader>
            </div>

            {/* Practical info cards list */}
            <div className="bg-white border border-stone-200/80 rounded-3xl p-8 space-y-6 shadow-sm">
              <h2 className="font-sans font-semibold text-lg text-stone-900">Coordonnées Officielles</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-800 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-sans font-medium text-stone-900 text-sm">Adresse du Marché</h3>
                    <p className="text-stone-500 text-sm mt-1 leading-relaxed">
                      Les allées de la liberté<br />
                      06400 Cannes, France
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-800 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-sans font-medium text-stone-900 text-sm">Adresse Courriel</h3>
                    <a 
                      href="mailto:contact@brocantedecannes.com" 
                      className="text-amber-600 hover:text-stone-900 font-semibold text-sm mt-1 block transition-all"
                    >
                      contact@brocantedecannes.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-800 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-sans font-medium text-stone-900 text-sm">Horaires d'Ouverture</h3>
                    <p className="text-stone-500 text-sm mt-1 leading-relaxed">
                      Chaque Samedi & Dimanche<br />
                      De 08:00 à 18:00 non-stop
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-stone-100">
                <p className="text-stone-400 text-xs leading-relaxed">
                  Notre service d’accompagnement répond aux courriels sous 24 heures de manière personnalisée, en français, anglais et italien.
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-white border border-stone-200/80 rounded-[32px] p-8 sm:p-10 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-indigo-950"></div>
            
            <div className="space-y-6">
              <div>
                <h2 className="font-sans font-medium text-2xl text-stone-900">Formulaire de Contact</h2>
                <p className="text-stone-500 text-xs sm:text-sm mt-1">
                  Remplissez ce formulaire et un antiquaire qualifié prendra contact avec vous.
                </p>
              </div>

              {submitError && (
                <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-xl flex items-center space-x-3 text-sm">
                  <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />
                  <span>{submitError}</span>
                </div>
              )}

              <AnimatePresence mode="wait">
                {!submitSuccess ? (
                  <motion.form 
                    key="contact-form"
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-xs font-semibold text-stone-700 uppercase tracking-wider block">
                          Nom Complet *
                        </label>
                        <input 
                          type="text" 
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Ex: Alexandre Dubois"
                          className="w-full bg-stone-50 border border-stone-200 focus:border-amber-500 focus:bg-white focus:ring-1 focus:ring-amber-500/20 rounded-xl px-4 py-3 text-sm text-stone-900 outline-none transition-all placeholder-stone-400 cursor-text"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="email" className="text-xs font-semibold text-stone-700 uppercase tracking-wider block">
                          Courriel de Contact *
                        </label>
                        <input 
                          type="email" 
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Ex: alexandre@exemple.com"
                          className="w-full bg-stone-50 border border-stone-200 focus:border-amber-500 focus:bg-white focus:ring-1 focus:ring-amber-500/20 rounded-xl px-4 py-3 text-sm text-stone-900 outline-none transition-all placeholder-stone-400 cursor-text"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-xs font-semibold text-stone-700 uppercase tracking-wider block">
                          Numéro de Téléphone
                        </label>
                        <input 
                          type="tel" 
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Ex: +33 6 12 34 56 78"
                          className="w-full bg-stone-50 border border-stone-200 focus:border-amber-500 focus:bg-white focus:ring-1 focus:ring-amber-500/20 rounded-xl px-4 py-3 text-sm text-stone-900 outline-none transition-all placeholder-stone-400 cursor-text"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="interest" className="text-xs font-semibold text-stone-700 uppercase tracking-wider block">
                          Objet d'intérêt
                        </label>
                        <select 
                          id="interest"
                          name="interest"
                          value={formData.interest}
                          onChange={handleChange}
                          className="w-full bg-stone-50 border border-stone-200 focus:border-amber-500 focus:bg-white focus:ring-1 focus:ring-amber-500/20 rounded-xl px-4 py-3 text-sm text-stone-900 outline-none transition-all cursor-pointer"
                        >
                          <option value="Mobilier">Mobilier d'Époque / Art Déco / Vintage</option>
                          <option value="Luminaires">Luminaires & Lustres anciens</option>
                          <option value="Art">Céramiques & Tableaux</option>
                          <option value="Bijoux">Bijoux & Mode Vintage</option>
                          <option value="Horlogerie">Horlogerie ancienne</option>
                          <option value="Expertise">Demande d'Expertise d'objet</option>
                          <option value="Autre">Autre demande générale</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-xs font-semibold text-stone-700 uppercase tracking-wider block">
                        Votre Message *
                      </label>
                      <textarea 
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Décrivez votre projet d'acquisition, l'objet que vous convoitez, ou vos questions particulières..."
                        className="w-full bg-stone-50 border border-stone-200 focus:border-amber-500 focus:bg-white focus:ring-1 focus:ring-amber-500/20 rounded-xl px-4 py-3 text-sm text-stone-900 outline-none transition-all placeholder-stone-400 resize-none cursor-text"
                      />
                    </div>

                    <div className="flex justify-end pt-2">
                      <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto bg-indigo-950 hover:bg-amber-500 hover:text-indigo-950 text-white font-semibold uppercase tracking-widest text-xs px-8 py-4 rounded-xl flex items-center justify-center space-x-2 transition-all duration-300 disabled:opacity-55 cursor-pointer shadow-sm"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></span>
                            <span>Envoi en cours...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" />
                            <span>Envoyer le Message</span>
                          </>
                        )}
                      </button>
                    </div>
                  </motion.form>
                ) : (
                  <motion.div 
                    key="success-message"
                    className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-8 text-center space-y-4 my-8"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', duration: 0.5 }}
                  >
                    <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="font-sans font-semibold text-xl text-stone-900">Message envoyé avec succès !</h3>
                    <p className="text-stone-600 text-sm leading-relaxed max-w-md mx-auto">
                      Nous vous remercions pour l’intérêt que vous portez à la Brocante de Cannes. Notre service de correspondance étudie votre demande et vous répondra sous 24 heures.
                    </p>
                    <div className="pt-4">
                      <button 
                        onClick={() => setSubmitSuccess(false)}
                        className="text-xs text-indigo-950 font-semibold uppercase tracking-wider hover:text-amber-500 transition-colors border border-stone-200 hover:border-amber-500/20 bg-white px-5 py-2.5 rounded-full cursor-pointer"
                      >
                        Envoyer un autre message
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </section>

      {/* Styled Interactive Custom Map Section - representing Cannes coast */}
      <section className="bg-indigo-950 text-white py-24 px-4 sm:px-6 lg:px-8 border-t border-indigo-900/40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-4 space-y-4">
            <span className="font-mono text-xs uppercase tracking-widest text-amber-500">ACCÈS & RECONNAISSANCE</span>
            <h2 className="font-sans font-medium text-3xl text-white tracking-tight leading-tight">
              Où nous trouver sous la douceur d'Azur
            </h2>
            <p className="text-stone-300 text-sm leading-relaxed">
              Nos exposants s'installent sous la canopée de platanes des Allées de la Liberté Charles de Gaulle, à deux pas de la Croisette, face au port de plaisance de Cannes.
            </p>
            <div className="pt-4 space-y-2 text-xs text-stone-400 font-mono">
              <p>&bull; 5 min de la Gare SNCF de Cannes</p>
              <p>&bull; Parkings à proximité : Pantiero et Palais des Festivals</p>
              <p>&bull; À proximité des terrasses emblématiques</p>
            </div>
          </div>

          <div className="lg:col-span-8 bg-indigo-900/40 border border-indigo-800/60 rounded-[32px] p-4 sm:p-6 shadow-2xl relative h-96 overflow-hidden flex flex-col justify-between">
            {/* Custom high-end interactive visual map of Cannes shore */}
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
            
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {/* stylized SVG Cannes bay representation */}
              <svg viewBox="0 0 800 400" className="w-full h-full text-indigo-400 stroke-indigo-500/30 fill-none stroke-2">
                {/* Coastal outline */}
                <path d="M50,150 C200,140 350,220 500,200 C600,190 700,90 750,80" />
                <path d="M500,200 C520,280 580,320 620,380" />
                {/* Port lines */}
                <path d="M480,210 L440,270" strokeDasharray="4 4" />
                <path d="M440,270 C410,280 380,260 370,230" strokeDasharray="4 4" />
                {/* Islands representation */}
                <circle cx="680" cy="320" r="15" className="fill-indigo-500/15" />
                <circle cx="720" cy="355" r="10" className="fill-indigo-500/15" />
                
                {/* Highlight Point */}
                <g className="animate-bounce">
                  <circle cx="480" cy="195" r="8" className="fill-amber-500" />
                  <circle cx="480" cy="195" r="22" className="stroke-amber-500 fill-none animate-ping" />
                </g>
              </svg>
            </div>

            {/* Float visual card for map details */}
            <div className="relative z-10 bg-indigo-950/90 border border-indigo-800/80 p-5 rounded-2xl max-w-sm m-4 shadow-xl">
              <span className="font-mono text-[9px] text-amber-500 uppercase tracking-widest block font-bold">Localisation Précise</span>
              <h3 className="font-sans font-semibold text-white text-base mt-1">Les Allées de la Liberté</h3>
              <p className="text-stone-300 text-xs mt-1 leading-relaxed">
                Situé le long de la mer, à côté de la Mairie de Cannes et du Kiosque à Musique historique.
              </p>
            </div>

            <div className="relative z-10 self-end bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl text-[10px] font-mono text-stone-300 border border-white/5 m-4">
              Coordonnées GPS : 43.5513° N, 7.0128° E
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
