import { ServiceItem, TestimonialItem } from './types';

export const SERVICES: ServiceItem[] = [
  {
    id: 'secrets',
    title: 'La Brocante des Trésors Cachés',
    description: 'Une sélection exclusive d’œuvres d’art, de pièces d’argenterie fine et d’objets précieux dénichés avec passion par nos marchands.',
    category: 'Art & Orfèvrerie',
    iconName: 'Gem'
  },
  {
    id: 'perle-rare',
    title: 'Chinez, Fouillez, Trouvez la Perle Rare !',
    description: 'Parcourez nos étals d’antiquités. Que vous soyez amateur ou collectionneur averti, l’objet insolite qui manque à votre collection vous attend.',
    category: 'Curiosités',
    iconName: 'Compass'
  },
  {
    id: 'bonnes-affaires',
    title: 'La Brocante des Bonnes Affaires',
    description: 'Des meubles restaurés, des miroirs de style et de magnifiques pièces d’époque proposés à des prix justes pour tous les passionnés.',
    category: 'Mobilier',
    iconName: 'Tag'
  },
  {
    id: 'voyage-vintage',
    title: 'Un Voyage Vintage au Cœur de la Brocante',
    description: 'Une immersion nostalgique parmi les jouets anciens, affiches publicitaires d’époque, disques vinyles et souvenirs d’enfance.',
    category: 'Nostalgie',
    iconName: 'Compass'
  },
  {
    id: 'histoires',
    title: 'Des Objets, des Histoires, des Trouvailles',
    description: 'Derrière chaque patine se cache un secret. Nos marchands se feront un plaisir de vous raconter la provenance et le vécu de chaque pièce.',
    category: 'Art',
    iconName: 'BookOpen'
  },
  {
    id: 'revivre-passe',
    title: 'La Brocante Qui Fait Revivre le Passé',
    description: 'Horloges d’époque, pendules de cheminée et appareils de mesure d’autrefois remis en état de marche par des artisans d’art passionnés.',
    category: 'Horlogerie',
    iconName: 'Clock'
  },
  {
    id: 'coup-de-coeur',
    title: 'Entre Vintage et Coup de Cœur',
    description: 'Maroquinerie de luxe d’occasion, bijoux anciens, boutons de manchette et accessoires de haute couture à l’élégance Riviera.',
    category: 'Mode & Bijoux',
    iconName: 'Heart'
  },
  {
    id: 'amoureux',
    title: 'Le Rendez-vous des Amoureux des Antiquités',
    description: 'Un lieu d’échange cosmopolite sous les platanes des Allées de la Liberté, attirant collectionneurs et décorateurs du monde entier.',
    category: 'Événement',
    iconName: 'Users'
  },
  {
    id: 'bonne-humeur',
    title: 'Brocante & Bonne Humeur au Rendez-vous',
    description: 'Profitez d’une atmosphère cannoise unique, conviviale et chaleureuse, rythmée par l’accent du Sud et la passion de la chine.',
    category: 'Expérience',
    iconName: 'Sun'
  },
  {
    id: 'hier-aujourdhui',
    title: 'Des Trésors d’Hier pour Aujourd’hui',
    description: 'Faites cohabiter le passé et le présent. Intégrez des pièces authentiques d’autrefois au cœur de vos intérieurs modernes.',
    category: 'Design & Déco',
    iconName: 'Sparkles'
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: '1',
    quote: "An absolute gem on the French Riviera! I found a stunning 1930s Art Deco lamp that now takes pride of place in my Chelsea apartment. The vendors are incredibly knowledgeable and welcoming.",
    author: "Sarah Jenkins",
    role: "Interior Designer",
    location: "London, UK",
    rating: 5
  },
  {
    id: '2',
    quote: "Da collezionista, trovo sempre pezzi rari di design italiano e francese degli anni '50. L'atmosfera sotto i platani di Cannes è magica, un appuntamento imperdibile ogni volta che visito la Costa Azzurra.",
    author: "Alessandro Rossi",
    role: "Fine Art Collector",
    location: "Milan, Italy",
    rating: 5
  },
  {
    id: '3',
    quote: "Le rendez-vous incontournable des passionnés. On y trouve des antiquités d'une qualité rare, d'une authenticité certifiée, et un accueil typiquement méridional. Une expérience d'achat incomparable !",
    author: "Jean-Pierre Dubois",
    role: "Chineur passionné",
    location: "Paris, France",
    rating: 5
  }
];
