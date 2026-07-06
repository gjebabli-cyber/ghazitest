import React from 'react';
import { motion } from 'motion/react';
import { Award, Compass, ShieldCheck, Heart, MapPin, Users } from 'lucide-react';
import { ImageUploader } from './ImageUploader';
import { ActiveTab } from '../types';

// Importing generated images
import marketCannesImg from '../assets/images/market_cannes_1783030364039.jpg';

interface AboutProps {
  setActiveTab: (tab: ActiveTab) => void;
  customImage: string | null;
  onUpdateImage: (key: 'hero' | 'market' | 'contact', base64: string | null) => void;
}

export const About: React.FC<AboutProps> = ({ setActiveTab, customImage, onUpdateImage }) => {
  const commitments = [
    {
      icon: Award,
      title: 'Authenticité Certifiée',
      desc: 'Chaque pièce présentée par nos marchands fait l’objet d’une analyse minutieuse pour garantir son époque, sa manufacture et sa valeur historique.',
    },
    {
      icon: ShieldCheck,
      title: 'Expertise Reconnue',
      desc: 'Notre collectif regroupe des antiquaires et brocanteurs passionnés possédant des décennies d’expérience dans les arts décoratifs et le mobilier ancien.',
    },
    {
      icon: Users,
      title: 'Rayonnement International',
      desc: 'Nous accompagnons une clientèle cosmopolite (architectes d’intérieur, galeries, collectionneurs privés) dans l’acquisition et l’exportation de leurs trouvailles.',
    },
  ];

  return (
    <div className="bg-stone-50 min-h-screen">
      
      {/* Editorial Header Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4 max-w-3xl mx-auto"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-amber-600 font-semibold">NOTRE HISTOIRE & SOUVENIRS</span>
          <h1 className="font-sans font-medium text-4xl sm:text-5xl text-stone-900 tracking-tight leading-tight">
            L’Élégance de la Côte d’Azur & l'Amour du <span className="font-serif italic text-amber-500">bel objet</span>
          </h1>
          <p className="text-stone-500 text-sm sm:text-base leading-relaxed">
            Depuis près de quarante ans, le marché des Allées de la Liberté est le rendez-vous des esthètes en quête d'art de vivre et d'authenticité.
          </p>
        </motion.div>
      </section>

      {/* Narrative Section with Split Image/Text */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Image side - with elegant frame and overlapping card */}
          <div className="lg:col-span-6 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-[40px] overflow-hidden shadow-2xl border border-stone-200"
            >
              <ImageUploader
                imageKey="market"
                defaultImage={marketCannesImg}
                customImage={customImage}
                onUpdateImage={onUpdateImage}
                alt="Les Allées de la Liberté à Cannes"
                className="w-full h-[450px]"
                imgClassName=""
              >
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/40 via-transparent to-transparent pointer-events-none"></div>
              </ImageUploader>
            </motion.div>
            
            {/* Float badge representing Location */}
            <div className="absolute -bottom-6 right-6 bg-amber-500 text-indigo-950 p-6 rounded-3xl shadow-xl border border-white/25 flex items-center space-x-4 max-w-xs z-20">
              <div className="w-10 h-10 rounded-2xl bg-indigo-950 text-white flex items-center justify-center shadow-sm">
                <MapPin className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <span className="font-mono text-[9px] uppercase tracking-wider block font-semibold text-indigo-900">Emplacement Culte</span>
                <span className="text-xs font-semibold block leading-tight mt-0.5">Allées de la Liberté, Cannes</span>
              </div>
            </div>
          </div>

          {/* Narrative Text side */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 text-amber-600 font-mono text-xs tracking-widest uppercase">
              <span className="w-4 h-[1px] bg-amber-600"></span>
              <span>AU COEUR DE LA RIVIERA</span>
            </div>
            
            <h2 className="font-sans font-medium text-3xl text-stone-900 tracking-tight leading-snug">
              Une tradition ancrée sous les platanes d'exception
            </h2>
            
            <div className="space-y-4 text-stone-600 text-sm sm:text-base leading-relaxed">
              <p>
                La Brocante de Cannes s'établit chaque fin de semaine dans le décor enchanteur des <strong className="text-stone-900 font-medium">Allées de la Liberté</strong>. Situé à quelques enjambées du Palais des Festivals et face au Vieux-Port, ce marché historique réunit plus d’une cinquantaine de marchands professionnels d'exception.
              </p>
              <p>
                Loin des vides-greniers ordinaires, notre brocante est un véritable <strong className="text-stone-900 font-medium">musée à ciel ouvert</strong>. Les passionnés de décoration y découvrent un florilège de pièces rares : commodes estampillées, luminaires signés des grands designers italiens et scandinaves, orfèvrerie précieuse, argenterie fine, tableaux de maîtres de l'École Provençale et bijoux de haute couture vintage.
              </p>
              <p>
                C’est cette alliance entre l'élégance intemporelle de Cannes et l'art exigeant de la chine qui fait notre renommée auprès d’une clientèle cosmopolite venant de tous les continents.
              </p>
            </div>

            <div className="pt-4 flex">
              <button 
                onClick={() => setActiveTab('contact')}
                className="bg-indigo-950 hover:bg-amber-500 hover:text-indigo-950 text-white px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
              >
                Nous rendre visite
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Commitments Section (3 Columns cards) */}
      <section className="bg-indigo-950 text-white py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="font-mono text-xs uppercase tracking-widest text-amber-500">NOS CHARTER ET EXIGENCES</span>
            <h2 className="font-sans font-medium text-3xl sm:text-4xl text-white tracking-tight">
              La promesse d’une chine de prestige
            </h2>
            <p className="text-stone-400 text-sm leading-relaxed">
              Nous appliquons des standards élevés pour garantir une expérience de chine haut de gamme.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {commitments.map((item, index) => {
              const IconComp = item.icon;
              return (
                <div 
                  key={index}
                  className="bg-indigo-900/40 border border-indigo-800/40 p-8 rounded-3xl space-y-4 hover:border-amber-500/20 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-2xl bg-amber-500 text-indigo-950 flex items-center justify-center shadow-md">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3 className="font-sans font-medium text-lg text-white">
                    {item.title}
                  </h3>
                  <p className="text-stone-300 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Fine Curations Category Spotlights */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="font-mono text-xs uppercase tracking-widest text-amber-600 font-semibold">NOTRE SELECTION D’EXCEPTION</span>
          <h2 className="font-sans font-medium text-3xl sm:text-4xl text-stone-900 tracking-tight">
            Les catégories de trésors les plus convoitées
          </h2>
          <p className="text-stone-500 text-sm leading-relaxed">
            Chaque week-end, parcourez des étals d'une diversité et d'un raffinement incomparables.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white border border-stone-200/80 p-6 rounded-3xl space-y-4 hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-amber-600 font-semibold block mb-2">CATÉGORIE 01</span>
              <h3 className="font-sans font-medium text-lg text-stone-900 mb-1">Mobilier du XVIIIe au Vintage</h3>
              <p className="text-stone-500 text-sm leading-relaxed">Commodes Louis-Philippe, enfilades scandinaves, tables de créateurs, et assises mythiques restaurées.</p>
            </div>
            <span className="text-[10px] text-stone-400 font-mono mt-4 block">Exclusivité Cannes</span>
          </div>

          <div className="bg-white border border-stone-200/80 p-6 rounded-3xl space-y-4 hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-amber-600 font-semibold block mb-2">CATÉGORIE 02</span>
              <h3 className="font-sans font-medium text-lg text-stone-900 mb-1">Luminaires d'Époque</h3>
              <p className="text-stone-500 text-sm leading-relaxed">Chandeliers d'époque en bronze doré, suspensions de Murano, lampes design Space Age et appliques classiques.</p>
            </div>
            <span className="text-[10px] text-stone-400 font-mono mt-4 block">Exclusivité Cannes</span>
          </div>

          <div className="bg-white border border-stone-200/80 p-6 rounded-3xl space-y-4 hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-amber-600 font-semibold block mb-2">CATÉGORIE 03</span>
              <h3 className="font-sans font-medium text-lg text-stone-900 mb-1">Objets d'Art & Tableaux</h3>
              <p className="text-stone-500 text-sm leading-relaxed">Céramiques de Vallauris, sculptures, argenterie d'exception, verres de Gallé, et peintures d'artistes de la Riviera.</p>
            </div>
            <span className="text-[10px] text-stone-400 font-mono mt-4 block">Exclusivité Cannes</span>
          </div>

          <div className="bg-white border border-stone-200/80 p-6 rounded-3xl space-y-4 hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-amber-600 font-semibold block mb-2">CATÉGORIE 04</span>
              <h3 className="font-sans font-medium text-lg text-stone-900 mb-1">Bijoux & Mode Vintage</h3>
              <p className="text-stone-500 text-sm leading-relaxed">Maroquinerie d'époque, broches antiques, bijoux précieux en or et argent, et carrés de soie signés.</p>
            </div>
            <span className="text-[10px] text-stone-400 font-mono mt-4 block">Exclusivité Cannes</span>
          </div>
        </div>
      </section>

    </div>
  );
};
