import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  ArrowUpRight, 
  MapPin, 
  Award, 
  Star, 
  Quote, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles,
  Compass,
  Tag
} from 'lucide-react';
import { SERVICES, TESTIMONIALS } from '../data';
import { LucideIcon } from './LucideIcon';
import { ImageUploader } from './ImageUploader';
import { ActiveTab, ServiceItem } from '../types';

// Importing generated images
import heroAntiqueImg from '../assets/images/hero_antique_1783030350467.jpg';

interface AccueilProps {
  setActiveTab: (tab: ActiveTab) => void;
  customImage: string | null;
  onUpdateImage: (key: 'hero' | 'market' | 'contact', base64: string | null) => void;
}

export const Accueil: React.FC<AccueilProps> = ({ setActiveTab, customImage, onUpdateImage }) => {
  // Search state for Chiner
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [searchResults, setSearchResults] = useState<ServiceItem[] | null>(null);
  
  // Testimonial slider state
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Filter for services grid
  const [gridCategory, setGridCategory] = useState('Tous');

  // Service modal details
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const categories = ['Tous', 'Art', 'Mobilier', 'Luminaires', 'Curiosités', 'Bijoux & Mode'];

  // Handle hero search
  const handleChineSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery && selectedCategory === 'Tous') {
      setSearchResults(null);
      return;
    }

    const filtered = SERVICES.filter(service => {
      const matchesSearch = searchQuery 
        ? service.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
          service.description.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      
      const matchesCategory = selectedCategory === 'Tous' 
        ? true 
        : service.category.toLowerCase().includes(selectedCategory.split(' ')[0].toLowerCase()) ||
          service.title.toLowerCase().includes(selectedCategory.split(' ')[0].toLowerCase());

      return matchesSearch && matchesCategory;
    });

    setSearchResults(filtered);
    
    // Smooth scroll to search results
    setTimeout(() => {
      const el = document.getElementById('search-results-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  // Categories of actual services for grid filter
  const gridCategories = ['Tous', 'Mobilier', 'Art', 'Curiosités', 'Nostalgie', 'Design & Déco', 'Mode & Bijoux', 'Expérience'];

  const filteredServices = gridCategory === 'Tous'
    ? SERVICES
    : SERVICES.filter(s => s.category.includes(gridCategory) || s.title.includes(gridCategory));

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  // Steps in the curved timeline path
  const timelineSteps = [
    {
      num: '01',
      title: 'La Sélection Rigoureuse',
      desc: 'Nos experts parcourent l’Europe pour dénicher des pièces d’authenticité certifiée.',
      icon: 'Award'
    },
    {
      num: '02',
      title: 'L’Histoire Préservée',
      desc: 'Chaque objet conserve sa patine d’époque et fait l’objet d’une recherche historique approfondie.',
      icon: 'BookOpen'
    },
    {
      num: '03',
      title: 'L’Écrin Cannois',
      desc: 'Présentation sur nos étals prestigieux des Allées de la Liberté, face au Vieux-Port.',
      icon: 'MapPin'
    },
    {
      num: '04',
      title: 'Votre Coup de Cœur',
      desc: 'L’objet rare rejoint sa nouvelle demeure pour lui insuffler une élégance sans pareille.',
      icon: 'Sparkles'
    }
  ];

  return (
    <div className="relative overflow-hidden bg-stone-50">
      
      {/* HERO SECTION - Inspired by the layout with blue rounded card on left and overlapping photo on right */}
      <section className="relative pt-12 pb-24 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Side: Dark Indigo Card (matches CybSec card in design) */}
          <div className="lg:col-span-7 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-indigo-950 text-white p-8 sm:p-12 md:p-14 rounded-3xl shadow-xl border border-indigo-900/50 relative overflow-hidden"
            >
              {/* Abstract subtle ambient wave in background */}
              <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-amber-500 via-transparent to-transparent"></div>
              
              <div className="relative z-10 space-y-6">
                <div className="inline-flex items-center space-x-2 text-amber-500 font-mono text-xs tracking-widest uppercase">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                  <span>PRESTIGE & ART DE VIVRE</span>
                </div>
                
                <h1 className="font-sans font-medium text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-tight text-white">
                  Trouvez la <span className="text-amber-500 italic font-serif">perle rare</span> au cœur de Cannes
                </h1>
                
                <p className="text-stone-300 text-base sm:text-lg max-w-xl leading-relaxed">
                  Au cœur de la Côte d’Azur, la brocante de Cannes incarne l’élégance intemporelle et l’art de vivre raffiné. Entre pièces rares, luminaires d’époque et objets d’art soigneusement sélectionnés, elle attire une clientèle internationale en quête d’authenticité.
                </p>

                {/* Interactive Search Tool representing "Chiner" exactly like the input bar in reference design */}
                <form 
                  onSubmit={handleChineSearch}
                  className="bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/10 flex flex-col sm:flex-row gap-2 items-center"
                >
                  <div className="relative w-full sm:flex-1">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 w-4 h-4" />
                    <input 
                      type="text" 
                      placeholder="Quel trésor cherchez-vous ?"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-transparent pl-10 pr-4 py-3 text-sm text-white placeholder-stone-400 outline-none focus:ring-0 cursor-text"
                    />
                  </div>
                  
                  <div className="w-full sm:w-auto border-t sm:border-t-0 sm:border-l border-white/10 pt-2 sm:pt-0 sm:pl-2">
                    <select 
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full bg-transparent text-sm text-stone-200 outline-none py-2 px-3 focus:ring-0 cursor-pointer"
                    >
                      <option value="Tous" className="text-stone-900">Toutes Catégories</option>
                      <option value="Mobilier" className="text-stone-900">Mobilier</option>
                      <option value="Luminaires" className="text-stone-900">Luminaires</option>
                      <option value="Art" className="text-stone-900">Art & Orfèvrerie</option>
                      <option value="Curiosités" className="text-stone-900">Curiosités</option>
                      <option value="Bijoux" className="text-stone-900">Bijoux & Mode</option>
                    </select>
                  </div>

                  <button 
                    type="submit"
                    className="w-full sm:w-auto bg-amber-500 hover:bg-white hover:text-indigo-950 text-indigo-950 px-6 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 shrink-0 cursor-pointer"
                  >
                    Chiner
                  </button>
                </form>

                <div className="pt-2 flex flex-wrap gap-x-6 gap-y-2 text-xs text-stone-400 font-mono">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-500" /> Les Allées de la Liberté, Cannes
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-amber-500" /> Certifié Authentique
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Elegant overlapping portrait frame exactly like reference layout */}
          <div className="lg:col-span-5 relative mt-8 lg:mt-0">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative aspect-square sm:aspect-[4/3] lg:aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl border border-stone-200"
            >
              <ImageUploader
                imageKey="hero"
                defaultImage={heroAntiqueImg}
                customImage={customImage}
                onUpdateImage={onUpdateImage}
                alt="Antiquités de prestige de Cannes"
                className="w-full h-full"
                imgClassName="hover:scale-105 transition-transform duration-700 ease-out"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none"></div>
                
                {/* Overlapping badge */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-5 rounded-2xl border border-stone-100 flex items-center justify-between z-20">
                  <div>
                    <span className="text-[10px] text-amber-600 font-mono tracking-wider uppercase block font-semibold">Exposition Unique</span>
                    <span className="text-stone-900 font-medium text-sm block mt-0.5">36 exposants certifiés</span>
                  </div>
                  <div 
                    onClick={() => setActiveTab('about')}
                    className="w-10 h-10 rounded-full bg-indigo-950 hover:bg-amber-500 hover:text-indigo-950 text-white flex items-center justify-center transition-colors duration-300 cursor-pointer"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </ImageUploader>
            </motion.div>
          </div>

        </div>
      </section>

      {/* CHINE SEARCH RESULTS - If user searched something, show it here */}
      <AnimatePresence>
        {searchResults && (
          <section id="search-results-section" className="bg-white border-y border-stone-100 py-16 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-xs font-mono tracking-widest text-amber-600 uppercase">RÉSULTATS DE VOTRE RECHERCHE</h2>
                  <p className="text-stone-900 font-sans font-medium text-2xl mt-1">
                    {searchResults.length === 0 
                      ? "Aucune perle rare ne correspond exactement à ce critère" 
                      : `Nous avons trouvé ${searchResults.length} trésor(s) correspondant`}
                  </p>
                </div>
                <button 
                  onClick={() => setSearchResults(null)}
                  className="text-stone-400 hover:text-stone-900 text-xs font-mono uppercase tracking-wider border-b border-transparent hover:border-stone-400 pb-0.5 transition-all cursor-pointer"
                >
                  Fermer la recherche
                </button>
              </div>

              {searchResults.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {searchResults.map((item) => (
                    <motion.div
                      layout
                      key={item.id}
                      className="bg-stone-50 border border-stone-100 p-6 rounded-2xl hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-[10px] font-mono tracking-wider bg-amber-500/10 text-amber-800 px-2.5 py-1 rounded-full uppercase font-medium">
                            {item.category}
                          </span>
                          <div className="text-amber-600">
                            <LucideIcon name={item.iconName} className="w-5 h-5" />
                          </div>
                        </div>
                        <h3 className="text-stone-900 font-medium text-lg mb-2">{item.title}</h3>
                        <p className="text-stone-600 text-sm leading-relaxed">{item.description}</p>
                      </div>
                      <button 
                        onClick={() => {
                          setSelectedService(item);
                        }}
                        className="mt-6 flex items-center space-x-1.5 text-xs text-indigo-950 font-semibold uppercase tracking-wider hover:text-amber-600 transition-colors cursor-pointer text-left"
                      >
                        <span>Détails de la trouvaille</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="bg-stone-50 rounded-2xl p-12 text-center max-w-lg mx-auto">
                  <p className="text-stone-500 text-sm mb-6 leading-relaxed">
                    N'hésitez pas à nous envoyer un message direct pour nous confier votre recherche personnalisée. Nos marchands se feront une joie de chiner pour vous.
                  </p>
                  <button
                    onClick={() => setActiveTab('contact')}
                    className="inline-flex bg-indigo-950 text-white hover:bg-amber-500 hover:text-indigo-950 px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Faire une demande de recherche
                  </button>
                </div>
              )}
            </div>
          </section>
        )}
      </AnimatePresence>

      {/* THE JOURNEY / PATH SECTION - Inspired by the "What does cyber insurance cover?" path in the design */}
      <section className="bg-white border-y border-stone-100 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center space-x-2 text-amber-600 font-mono text-xs tracking-widest uppercase mb-3">
              <span className="w-6 h-[1px] bg-amber-600"></span>
              <span>LE PARCOURS D’UN TRÉSOR</span>
              <span className="w-6 h-[1px] bg-amber-600"></span>
            </div>
            <h2 className="font-sans font-medium text-3xl sm:text-4xl text-stone-900 tracking-tight">
              Comment naît la perle rare ?
            </h2>
            <p className="text-stone-500 text-sm sm:text-base mt-4 leading-relaxed">
              Un voyage authentique mené par la passion, l'expertise, et l'exclusivité de la Côte d'Azur.
            </p>
          </div>

          {/* Interactive Steps with custom connections (inspired by visual flow in design) */}
          <div className="relative">
            {/* Horizontal timeline line for desktop (hidden on mobile) */}
            <div className="hidden lg:block absolute top-[68px] left-[12%] right-[12%] h-[2px] bg-stone-100 z-0"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {timelineSteps.map((step, index) => (
                <motion.div 
                  key={step.num}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-stone-50/50 hover:bg-white border border-stone-100/70 hover:border-amber-500/20 p-6 rounded-2xl transition-all duration-300 text-center flex flex-col items-center group hover:shadow-md"
                >
                  {/* Step bubble with numeric value */}
                  <div className="relative mb-6">
                    <div className="w-16 h-16 rounded-full bg-white border border-stone-100 shadow-sm flex items-center justify-center text-stone-950 font-mono text-lg font-bold group-hover:bg-indigo-950 group-hover:text-white transition-all duration-300">
                      {step.num}
                    </div>
                    {/* Tiny icon inside float */}
                    <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-amber-500 text-indigo-950 flex items-center justify-center border border-white shadow-sm">
                      <LucideIcon name={step.icon} className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <h3 className="font-sans font-medium text-lg text-stone-900 mb-2 group-hover:text-indigo-950 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-stone-500 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* CORE SERVICES GRID (10 core services/messages provided in the prompt) */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 text-amber-600 font-mono text-xs tracking-widest uppercase mb-2">
              <span className="w-4 h-[1px] bg-amber-600"></span>
              <span>NOS PRESTATIONS & PROGRES</span>
            </div>
            <h2 className="font-sans font-medium text-3xl sm:text-4xl text-stone-900 tracking-tight">
              Trésors d'Antiquités & Art de Vivre
            </h2>
            <p className="text-stone-500 text-sm mt-2 leading-relaxed">
              Explorez les 10 piliers fondamentaux de notre marché de prestige.
            </p>
          </div>

          {/* Filtering row */}
          <div className="flex flex-wrap gap-2">
            {gridCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setGridCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  gridCategory === cat
                    ? 'bg-indigo-950 text-white'
                    : 'bg-white text-stone-600 hover:bg-stone-100 hover:text-stone-900 border border-stone-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* The 10 Services Bento-Style Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service, index) => (
            <motion.div
              layout
              key={service.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-white border border-stone-200/60 p-6 rounded-3xl hover:shadow-lg hover:border-amber-500/20 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  {/* Styled Icon box */}
                  <div className="w-12 h-12 rounded-2xl bg-stone-50 border border-stone-100 flex items-center justify-center text-amber-500 group-hover:bg-indigo-950 group-hover:text-white transition-all duration-300 shadow-sm">
                    <LucideIcon name={service.iconName} className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono tracking-wider text-stone-400 bg-stone-50 border border-stone-100 px-2 py-0.5 rounded-md uppercase">
                    {service.category}
                  </span>
                </div>
                
                <h3 className="font-sans font-medium text-lg text-stone-900 group-hover:text-indigo-950 transition-colors mb-2">
                  {service.title}
                </h3>
                
                <p className="text-stone-500 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="pt-6 border-t border-stone-100 mt-6 flex items-center justify-between">
                <span className="text-stone-400 font-mono text-[10px] uppercase tracking-widest">Cannes Prestige</span>
                <button 
                  onClick={() => setSelectedService(service)}
                  className="w-8 h-8 rounded-full bg-stone-50 hover:bg-amber-500 hover:text-indigo-950 text-stone-600 flex items-center justify-center transition-all duration-200 cursor-pointer"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </section>

      {/* INTERNATIONAL IMPACT STATS SECTION */}
      <section className="bg-indigo-950 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
          <div className="pt-8 md:pt-0 space-y-2">
            <span className="font-sans font-light text-5xl sm:text-6xl text-amber-500 block">36+</span>
            <span className="font-mono text-xs uppercase tracking-widest text-stone-400 block">Marchands Experts</span>
            <p className="text-stone-400 text-xs px-6">Sélectionnés rigoureusement pour leur professionnalisme et leur savoir-faire.</p>
          </div>
          <div className="pt-8 md:pt-0 space-y-2">
            <span className="font-sans font-light text-5xl sm:text-6xl text-amber-500 block">10k+</span>
            <span className="font-mono text-xs uppercase tracking-widest text-stone-400 block">Trésors Vendus / An</span>
            <p className="text-stone-400 text-xs px-6">Exportés dans le monde entier : USA, Royaume-Uni, Europe du Nord et Asie.</p>
          </div>
          <div className="pt-8 md:pt-0 space-y-2">
            <span className="font-sans font-light text-5xl sm:text-6xl text-amber-500 block">40 Ans</span>
            <span className="font-mono text-xs uppercase tracking-widest text-stone-400 block">De Tradition</span>
            <p className="text-stone-400 text-xs px-6">Un rendez-vous d’exception sur la French Riviera ancré dans le cœur des cannois.</p>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS - Inspired by "What people say" panel in design */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center space-x-2 text-amber-600 font-mono text-xs tracking-widest uppercase">
              <span className="w-4 h-[1px] bg-amber-600"></span>
              <span>CLIENTÈLE INTERNATIONALE</span>
            </div>
            <h2 className="font-sans font-medium text-3xl sm:text-4xl text-stone-900 tracking-tight leading-tight">
              Ce que disent nos collectionneurs
            </h2>
            <p className="text-stone-500 text-sm sm:text-base leading-relaxed">
              La brocante de Cannes attire chaque week-end des passionnés d’art, des architectes d’intérieur et des chineurs du monde entier à la recherche de pièces uniques.
            </p>
            
            {/* Quick buttons */}
            <div className="flex space-x-3 pt-2">
              <button 
                onClick={prevTestimonial}
                className="w-11 h-11 rounded-full border border-stone-200 bg-white hover:border-amber-500 hover:text-amber-500 flex items-center justify-center text-stone-600 transition-colors cursor-pointer"
                aria-label="Témoignage précédent"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={nextTestimonial}
                className="w-11 h-11 rounded-full border border-stone-200 bg-white hover:border-amber-500 hover:text-amber-500 flex items-center justify-center text-stone-600 transition-colors cursor-pointer"
                aria-label="Témoignage suivant"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right Cards Slider */}
          <div className="lg:col-span-7 relative">
            <div className="relative overflow-hidden rounded-3xl bg-white border border-stone-200 p-8 sm:p-10 shadow-xl">
              <div className="absolute top-8 right-8 text-stone-100">
                <Quote className="w-20 h-20 rotate-180" />
              </div>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6 relative z-10"
                >
                  {/* Rating */}
                  <div className="flex text-amber-500">
                    {[...Array(TESTIMONIALS[activeTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-stone-700 italic text-base sm:text-lg leading-relaxed font-serif">
                    "{TESTIMONIALS[activeTestimonial].quote}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center space-x-4 pt-4 border-t border-stone-100">
                    {/* Generative initials avatar */}
                    <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-800 font-mono flex items-center justify-center text-sm font-bold">
                      {TESTIMONIALS[activeTestimonial].author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h4 className="font-sans font-medium text-stone-900 text-sm sm:text-base">
                        {TESTIMONIALS[activeTestimonial].author}
                      </h4>
                      <span className="text-stone-400 text-xs block">
                        {TESTIMONIALS[activeTestimonial].role} &bull; <strong className="text-stone-500 font-normal">{TESTIMONIALS[activeTestimonial].location}</strong>
                      </span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Bullet indicators */}
              <div className="flex justify-start space-x-2 mt-8">
                {TESTIMONIALS.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      activeTestimonial === index ? 'w-6 bg-amber-500' : 'w-2 bg-stone-200 hover:bg-stone-300'
                    }`}
                    aria-label={`Aller au témoignage ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CALL TO ACTION - Curved banner matching footer area in mockup design */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-24">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-indigo-950 text-white p-8 sm:p-12 md:p-16 rounded-[40px] shadow-2xl relative overflow-hidden text-center max-w-5xl mx-auto"
        >
          {/* Subtle grid styling */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          
          <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
            <h2 className="font-sans font-medium text-3xl sm:text-4xl text-white tracking-tight leading-tight">
              Une pièce d’exception en tête ou envie de flâner ?
            </h2>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              Chaque samedi et dimanche, retrouvez-nous Allées de la Liberté sous la lumière emblématique de Cannes. Nos marchands se feront un plaisir de vous faire vivre un voyage hors du temps.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => setActiveTab('contact')}
                className="w-full sm:w-auto bg-amber-500 hover:bg-white hover:text-indigo-950 text-indigo-950 px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors shadow-md cursor-pointer"
              >
                Planifier ma visite
              </button>
              <button 
                onClick={() => setActiveTab('about')}
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
              >
                En savoir plus
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* DETAILS MODAL FOR GRID SERVICES */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl relative z-10 border border-stone-200 overflow-hidden"
            >
              {/* Gold gradient accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-amber-500"></div>
              
              <div className="space-y-6">
                <div className="flex justify-between items-start pt-2">
                  <span className="text-[10px] font-mono tracking-widest text-amber-600 uppercase font-semibold bg-amber-500/10 px-3 py-1 rounded-full">
                    {selectedService.category}
                  </span>
                  <button 
                    onClick={() => setSelectedService(null)}
                    className="text-stone-400 hover:text-stone-900 text-xs font-semibold cursor-pointer"
                  >
                    Fermer
                  </button>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-950 text-white flex items-center justify-center">
                    <LucideIcon name={selectedService.iconName} className="w-5 h-5" />
                  </div>
                  <h3 className="font-sans font-semibold text-xl text-stone-900">
                    {selectedService.title}
                  </h3>
                </div>

                <div className="space-y-4 text-stone-600 text-sm leading-relaxed">
                  <p>{selectedService.description}</p>
                  <p>
                    Toutes nos pièces sont expertisées par des historiens de l’art et d'antiquaires de confiance possédant des décennies d'expérience. Nous proposons des services complets d'authentification, de conseils en restauration d'art, et d’expédition sécurisée internationale à destination de nos collectionneurs du monde entier.
                  </p>
                </div>

                <div className="pt-6 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-stone-400 text-xs">Des questions sur ce service ?</span>
                  <button 
                    onClick={() => {
                      setSelectedService(null);
                      setActiveTab('contact');
                    }}
                    className="text-xs bg-indigo-950 hover:bg-amber-500 hover:text-indigo-950 text-white px-4 py-2 rounded-xl uppercase font-semibold tracking-wider transition-colors cursor-pointer"
                  >
                    Nous Demander
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
