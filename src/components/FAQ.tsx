import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ChevronDown, HelpCircle, MapPin, Truck, Coins, Sparkles, MessageSquare, ArrowRight } from 'lucide-react';
import { ActiveTab } from '../types';

interface FAQProps {
  setActiveTab: (tab: ActiveTab) => void;
}

interface FAQItem {
  id: string;
  category: 'general' | 'buying' | 'selling';
  question: string;
  answer: string;
  icon: React.ComponentType<any>;
}

export const FAQ: React.FC<FAQProps> = ({ setActiveTab }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'general' | 'buying' | 'selling'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'Toutes les questions' },
    { id: 'general', label: 'Accès & Infos Pratiques' },
    { id: 'buying', label: 'Acheter & Livraisons' },
    { id: 'selling', label: 'Vendre & Estimations' },
  ] as const;

  const faqItems: FAQItem[] = [
    {
      id: 'horaires',
      category: 'general',
      question: 'Quand et où se déroule précisément la Brocante de Cannes ?',
      answer: "La Brocante se tient tous les samedis et dimanches de 08:00 à 18:00, sous les magnifiques platanes ombragés des Allées de la Liberté (06400 Cannes). Le marché est idéalement situé en plein centre-ville, face au Vieux-Port, à deux pas de l'Hôtel de Ville et à seulement quelques minutes de marche du Palais des Festivals.",
      icon: MapPin,
    },
    {
      id: 'payant',
      category: 'general',
      question: "L'accès au marché est-il payant pour les visiteurs ?",
      answer: "Non, l'accès à la Brocante de Cannes est entièrement libre, gratuit et ouvert à tous, tout au long de la journée. C'est l'occasion idéale d'une agréable balade dominicale pour chiner, admirer des pièces uniques ou simplement s'imprégner de l'atmosphère azuréenne.",
      icon: Sparkles,
    },
    {
      id: 'parking',
      category: 'general',
      question: "Comment venir à la brocante et où stationner son véhicule ?",
      answer: "Vous disposez de plusieurs solutions de stationnement à proximité immédiate : le Parking Pantiero (situé sur le port, au pied des Allées), le Parking de l'Hôtel de Ville et le Parking Lamy. En transports en commun, le marché est desservi par de nombreuses lignes de bus et se situe à seulement 10 minutes à pied de la gare SNCF de Cannes.",
      icon: MapPin,
    },
    {
      id: 'authenticite',
      category: 'buying',
      question: "Les antiquités et objets de collection sont-ils garantis authentiques ?",
      answer: "Les marchands de la Brocante de Cannes sont tous des professionnels certifiés et inscrits au registre du commerce. Ils s'engagent à respecter une charte de déontologie stricte en décrivant avec honnêteté l'époque, l'état de conservation et l'origine des œuvres. Pour les acquisitions importantes (meubles estampillés, tableaux cotés, bijoux précieux), n'hésitez pas à demander une facture détaillée qui fait foi d'attestation d'authenticité juridique.",
      icon: Sparkles,
    },
    {
      id: 'paiements',
      category: 'buying',
      question: "Quels sont les moyens de paiement acceptés sur place ?",
      answer: "Le règlement en espèces est couramment pratiqué pour les petits objets. Pour les achats plus importants, la majorité de nos exposants acceptent les virements instantanés et disposent de terminaux de paiement sécurisés par carte bancaire (Visa, Mastercard, Amex). Les chèques de banques françaises sont acceptés sur présentation d'une pièce d'identité en cours de validité.",
      icon: Coins,
    },
    {
      id: 'livraison',
      category: 'buying',
      question: "Proposez-vous un service de livraison pour les objets ou meubles volumineux ?",
      answer: "Oui, la plupart de nos marchands collaborent régulièrement avec des artisans transporteurs locaux et des commissionnaires internationaux habitués aux œuvres d'art. Ils peuvent ainsi établir pour vous un devis sur-mesure et coordonner l'emballage minutieux ainsi que la livraison de vos meubles, grands miroirs ou statues directement chez vous, en France comme à l'international.",
      icon: Truck,
    },
    {
      id: 'vendre',
      category: 'selling',
      question: "Comment puis-je faire estimer ou proposer un objet à la vente ?",
      answer: "Vous pouvez présenter vos objets directement aux marchands sur le marché le week-end (en apportant l'objet ou des photographies détaillées sous différents angles). Vous pouvez également nous contacter par e-mail en joignant des clichés nets, les dimensions, les signatures ou marquages éventuels. Nous transmettrons vos éléments à l'antiquaire membre spécialisé dans votre type d'objet.",
      icon: MessageSquare,
    },
    {
      id: 'succession',
      category: 'selling',
      question: "Réalisez-vous des estimations à domicile pour des successions ou des débarras ?",
      answer: "Absolument. Nos professionnels se déplacent gratuitement à Cannes, Mougins, Antibes, Nice, Grasse et dans l'ensemble des départements des Alpes-Maritimes et du Var. Ils réalisent des estimations objectives en vue de partages, d'achats comptants de collections, de meubles ou de débarras complets et soignés de maisons ou d'appartements.",
      icon: Sparkles,
    },
    {
      id: 'exposer',
      category: 'selling',
      question: "Un particulier peut-il louer un stand pour vendre ses propres objets ?",
      answer: "Non, la Brocante de Cannes est un marché professionnel strictement réglementé. Seuls les marchands professionnels inscrits, munis d'un Kbis de brocanteur/antiquaire et de la carte de commerçant non-sédentaire à jour, sont autorisés à exposer et vendre sur les Allées. Les particuliers souhaitant vider leur maison peuvent toutefois vendre leurs lots directement aux professionnels du marché.",
      icon: Coins,
    },
  ];

  // Toggle accordion item
  const toggleExpand = (id: string) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  };

  // Filter items based on category and search query
  const filteredFaqItems = faqItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-stone-50 min-h-screen">
      
      {/* Editorial Header Section */}
      <section className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4 max-w-3xl mx-auto"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-amber-600 font-semibold">FOIRE AUX QUESTIONS</span>
          <h1 className="font-sans font-medium text-4xl sm:text-5xl text-stone-900 tracking-tight leading-tight">
            Des réponses claires pour <span className="font-serif italic text-amber-500">votre visite</span>
          </h1>
          <p className="text-stone-500 text-sm sm:text-base leading-relaxed">
            Que vous soyez visiteur passionné, acheteur chevronné à la recherche d’une pièce d’art, ou particulier souhaitant faire expertiser un héritage, retrouvez toutes les informations clés sur la Brocante de Cannes.
          </p>
        </motion.div>
      </section>

      {/* Interactive Controls & Filters */}
      <section className="pb-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="space-y-6">
          
          {/* Search Input */}
          <div className="relative max-w-xl mx-auto">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-stone-400">
              <Search className="w-5 h-5" />
            </div>
            <input
              id="faq-search"
              type="text"
              placeholder="Rechercher une question (ex: horaires, livraison, estimation...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-stone-200 rounded-2xl py-4 pl-12 pr-4 text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all shadow-sm text-sm"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-stone-400 hover:text-stone-600"
              >
                Effacer
              </button>
            )}
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setExpandedId(null); // Close expanded when switching categories
                }}
                className={`px-5 py-2.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-indigo-950 text-white shadow-sm'
                    : 'bg-white text-stone-600 border border-stone-200 hover:border-stone-300 hover:bg-stone-50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* FAQ Accordion List Section */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl border border-stone-200/80 shadow-md divide-y divide-stone-100 overflow-hidden">
          
          <AnimatePresence initial={false}>
            {filteredFaqItems.length > 0 ? (
              filteredFaqItems.map((item) => {
                const isExpanded = expandedId === item.id;
                const IconComp = item.icon;
                
                return (
                  <div key={item.id} className="transition-colors duration-200" id={`faq-item-${item.id}`}>
                    <button
                      id={`faq-btn-${item.id}`}
                      onClick={() => toggleExpand(item.id)}
                      className="w-full px-6 sm:px-8 py-5 flex items-start text-left focus:outline-none group cursor-pointer"
                      aria-expanded={isExpanded}
                    >
                      {/* Left icon representative */}
                      <span className="w-10 h-10 rounded-xl bg-stone-50 text-stone-500 flex items-center justify-center shrink-0 mr-4 group-hover:bg-amber-50 group-hover:text-amber-600 transition-all duration-300">
                        <IconComp className="w-4 h-4" />
                      </span>

                      {/* Question text */}
                      <span className="flex-grow font-sans font-medium text-stone-800 text-sm sm:text-base pr-4 leading-snug group-hover:text-indigo-950 transition-colors">
                        {item.question}
                      </span>

                      {/* Chevron indicator */}
                      <span className={`shrink-0 text-stone-400 mt-1.5 transition-transform duration-300 ${isExpanded ? 'rotate-180 text-amber-500' : 'group-hover:text-stone-600'}`}>
                        <ChevronDown className="w-4 h-4" />
                      </span>
                    </button>

                    {/* Accordion expand/collapse transition */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 sm:px-8 pb-6 pl-20 text-stone-600 text-xs sm:text-sm leading-relaxed space-y-2 border-t border-stone-50/50 pt-2">
                            <p>{item.answer}</p>
                            {item.id === 'vendre' && (
                              <button
                                onClick={() => setActiveTab('contact')}
                                className="inline-flex items-center space-x-1.5 text-amber-600 hover:text-amber-700 font-medium text-xs pt-2 group cursor-pointer"
                              >
                                <span>Envoyer des photos via notre formulaire</span>
                                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                              </button>
                            )}
                            {item.id === 'livraison' && (
                              <button
                                onClick={() => setActiveTab('contact')}
                                className="inline-flex items-center space-x-1.5 text-amber-600 hover:text-amber-700 font-medium text-xs pt-2 group cursor-pointer"
                              >
                                <span>Nous poser une question sur le transport</span>
                                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                              </button>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })
            ) : (
              <div className="p-12 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-stone-50 text-stone-400 flex items-center justify-center mx-auto">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-sans font-medium text-stone-800">Aucun résultat trouvé</h3>
                  <p className="text-stone-500 text-xs max-w-md mx-auto">
                    Nous n'avons pas trouvé de réponse correspondant à "{searchQuery}". Essayez avec d'autres mots-clés ou posez-nous votre question directement.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                  className="text-xs text-amber-600 font-semibold underline hover:text-amber-700 cursor-pointer"
                >
                  Réinitialiser la recherche
                </button>
              </div>
            )}
          </AnimatePresence>

        </div>

        {/* CTA Question box */}
        <div className="mt-12 bg-indigo-950 text-white rounded-[32px] p-8 sm:p-10 shadow-xl relative overflow-hidden border border-indigo-900/60">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-900/20 rounded-full blur-3xl -z-10"></div>
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl -z-10"></div>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 relative z-10">
            <div className="space-y-2 max-w-md">
              <span className="font-mono text-[10px] text-amber-500 uppercase tracking-widest font-semibold block">Vous avez une autre question ?</span>
              <h3 className="font-sans font-medium text-xl sm:text-2xl text-white tracking-tight leading-snug">
                Vous ne trouvez pas la réponse à vos questions ?
              </h3>
              <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                Notre équipe et nos marchands partenaires sont à votre disposition pour tout renseignement complémentaire, expertise de meuble ou demande spécifique.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('contact')}
              className="bg-amber-500 hover:bg-white hover:text-indigo-950 text-indigo-950 px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-md shrink-0 w-fit cursor-pointer flex items-center space-x-2"
            >
              <span>Écrivez-nous</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </section>

    </div>
  );
};
