import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Folder, 
  FileCode, 
  Download, 
  Settings, 
  BookOpen, 
  Check, 
  Copy, 
  Wrench, 
  Terminal, 
  Sparkles, 
  X, 
  ExternalLink, 
  Eye, 
  AlertCircle,
  FileText
} from 'lucide-react';
import JSZip from 'jszip';

import heroAntiqueImg from '../assets/images/hero_antique_1783030350467.jpg';
import marketCannesImg from '../assets/images/market_cannes_1783030364039.jpg';
import contactAntiqueImg from '../assets/images/contact_antique_1783030377771.jpg';

interface WordPressConverterProps {
  customImages: {
    hero: string | null;
    market: string | null;
    contact: string | null;
  };
}

export const WordPressConverter: React.FC<WordPressConverterProps> = ({ customImages }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'config' | 'files' | 'preview' | 'guide'>('config');
  const [copiedFile, setCopiedFile] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);

  // WordPress Theme Metadata State
  const [themeName, setThemeName] = useState('Brocante de Cannes');
  const [themeUri, setThemeUri] = useState('https://brocantecannes.fr');
  const [author, setAuthor] = useState('Brocante de Cannes Dev Team');
  const [authorUri, setAuthorUri] = useState('https://brocantecannes.fr');
  const [description, setDescription] = useState('Thème WordPress sur-mesure premium pour le site d’Antiquités et de Brocante des Allées de la Liberté à Cannes. Conçu avec Tailwind CSS.');
  const [version, setVersion] = useState('1.0.0');
  const [textDomain, setTextDomain] = useState('brocante-cannes');
  const [themePrefix, setThemePrefix] = useState('brocante_cannes');

  // Active file being viewed
  const [activeFile, setActiveFile] = useState<string>('style.css');

  // Convert themeName to slug
  const getSlug = () => themePrefix.trim().toLowerCase().replace(/[^a-z0-9_]/g, '_');

  // WordPress theme template generation templates
  const filesContent: Record<string, string> = {
    'style.css': `/*
Theme Name: ${themeName}
Theme URI: ${themeUri}
Author: ${author}
Author URI: ${authorUri}
Description: ${description}
Version: ${version}
Text Domain: ${textDomain}
Tags: light, custom-background, featured-images, full-width-template, translation-ready
License: GNU General Public License v2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
*/

/* Styles additionnels personnalisés pour la Brocante */
body {
    font-family: 'Inter', sans-serif;
    color: #292524; /* stone-800 */
    background-color: #fafaf9; /* stone-50 */
}

/* Animations d'entrée fluides */
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
    animation: fadeIn 0.6s ease-out forwards;
}
`,

    'functions.php': `<?php
/**
 * ${themeName} functions and definitions
 *
 * @package ${themeName}
 * @version ${version}
 */

if ( ! function_exists( '${getSlug()}_setup' ) ) :
    /**
     * Configuration initiale du thème.
     */
    function ${getSlug()}_setup() {
        // Support du titre de page dynamique
        add_theme_support( 'title-tag' );

        // Support des images à la une (thumbnails)
        add_theme_support( 'post-thumbnails' );

        // Enregistrement du menu principal
        register_nav_menus( array(
            'primary-menu' => esc_html__( 'Menu Principal', '${textDomain}' ),
        ) );

        // Support des formats HTML5
        add_theme_support( 'html5', array(
            'search-form',
            'comment-form',
            'comment-list',
            'gallery',
            'caption',
            'style',
            'script',
        ) );
    }
endif;
add_action( 'after_setup_theme', '${getSlug()}_setup' );

/**
 * Enregistrer et charger les feuilles de style et scripts
 */
function ${getSlug()}_scripts() {
    // Feuille de style principale du thème
    wp_enqueue_style( '${getSlug()}-style', get_stylesheet_uri(), array(), '${version}' );

    // Importation de Tailwind CSS v4 via CDN
    wp_enqueue_style( '${getSlug()}-tailwind', 'https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4', array(), '4.0.0' );

    // Importation des polices Google Fonts (Inter, Playfair Display, JetBrains Mono)
    wp_enqueue_style( '${getSlug()}-fonts', 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=JetBrains+Mono:wght@400;500&display=swap', array(), null );
    
    // Lucide Icons de secours
    wp_enqueue_script( '${getSlug()}-lucide-icons', 'https://unpkg.com/lucide@latest', array(), null, true );
}
add_action( 'wp_enqueue_scripts', '${getSlug()}_scripts' );

/**
 * Enregistrement des Custom Post Types (Types de contenu personnalisés)
 */
function ${getSlug()}_register_custom_post_types() {
    
    // CPT : Trésors (Produits ou Services phares)
    $labels_tresors = array(
        'name'               => _x( 'Trésors de Brocante', 'post type general name', '${textDomain}' ),
        'singular_name'      => _x( 'Trésor', 'post type singular name', '${textDomain}' ),
        'menu_name'          => _x( 'Trésors CPT', 'admin menu', '${textDomain}' ),
        'name_admin_bar'     => _x( 'Trésor', 'add new on admin bar', '${textDomain}' ),
        'add_new'            => _x( 'Ajouter un Trésor', 'tresor', '${textDomain}' ),
        'add_new_item'       => __( 'Ajouter un nouveau Trésor', '${textDomain}' ),
        'new_item'           => __( 'Nouveau Trésor', '${textDomain}' ),
        'edit_item'          => __( 'Modifier le Trésor', '${textDomain}' ),
        'view_item'          => __( 'Voir le Trésor', '${textDomain}' ),
        'all_items'          => __( 'Tous les Trésors', '${textDomain}' ),
        'search_items'       => __( 'Rechercher des Trésors', '${textDomain}' ),
        'not_found'          => __( 'Aucun trésor trouvé.', '${textDomain}' ),
    );

    $args_tresors = array(
        'labels'             => $labels_tresors,
        'public'             => true,
        'publicly_queryable' => true,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'query_var'          => true,
        'rewrite'            => array( 'slug' => 'tresor' ),
        'capability_type'    => 'post',
        'has_archive'        => true,
        'hierarchical'       => false,
        'menu_position'      => 5,
        'menu_icon'          => 'dashicons-tag',
        'supports'           => array( 'title', 'editor', 'thumbnail', 'excerpt' ),
        'show_in_rest'       => true, // Active Gutenberg et l'API REST
    );

    register_post_type( 'brocante_tresor', $args_tresors );

    // CPT : Témoignages clients
    $labels_temoignages = array(
        'name'               => _x( 'Témoignages', 'post type general name', '${textDomain}' ),
        'singular_name'      => _x( 'Témoignage', 'post type singular name', '${textDomain}' ),
        'menu_name'          => _x( 'Témoignages CPT', 'admin menu', '${textDomain}' ),
        'add_new_item'       => __( 'Ajouter un nouveau Témoignage', '${textDomain}' ),
    );

    $args_temoignages = array(
        'labels'             => $labels_temoignages,
        'public'             => true,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'menu_position'      => 6,
        'menu_icon'          => 'dashicons-testimonial',
        'supports'           => array( 'title', 'editor', 'excerpt' ),
        'show_in_rest'       => true,
    );

    register_post_type( 'temoignage', $args_temoignages );
}
add_action( 'init', '${getSlug()}_register_custom_post_types' );
`,

    'header.php': `<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php wp_head(); ?>
</head>
<body <?php body_class("min-h-screen bg-stone-50 flex flex-col justify-between selection:bg-amber-500 selection:text-indigo-950 font-sans antialiased text-stone-800"); ?>>
<?php wp_body_open(); ?>

<header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-stone-100 transition-all duration-300">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
            <!-- Logo -->
            <a href="<?php echo esc_url( home_url( '/' ) ); ?>" className="flex items-center space-x-3 group">
                <div className="w-10 h-10 rounded-xl bg-indigo-950 flex items-center justify-center text-amber-500 shadow-md group-hover:bg-amber-500 group-hover:text-indigo-950 transition-all duration-300">
                    <i data-lucide="gem" className="w-5 h-5"></i>
                </div>
                <div>
                    <span className="font-sans font-semibold text-lg tracking-tight text-stone-900 block leading-tight">
                        <?php bloginfo( 'name' ); ?>
                    </span>
                    <span className="font-mono text-[10px] text-amber-600 tracking-widest uppercase block leading-none">
                        <?php bloginfo( 'description' ); ?>
                    </span>
                </div>
            </a>

            <!-- Navigation Principal WP -->
            <nav className="hidden md:flex space-x-8">
                <?php
                if ( has_nav_menu( 'primary-menu' ) ) {
                    wp_nav_menu( array(
                        'theme_location' => 'primary-menu',
                        'container'      => false,
                        'items_wrap'     => '%3$s',
                        'link_before'    => '<span className="text-stone-500 hover:text-stone-900 py-2 text-sm font-medium transition-colors duration-200">',
                        'link_after'     => '</span>',
                    ) );
                } else {
                    // Fallback statique si le menu n'est pas encore configuré
                    ?>
                    <a href="<?php echo esc_url( home_url( '/' ) ); ?>" className="text-stone-900 font-semibold py-2 text-sm font-medium">Accueil</a>
                    <a href="<?php echo esc_url( home_url( '/a-propos' ) ); ?>" className="text-stone-500 hover:text-stone-900 py-2 text-sm font-medium">À Propos</a>
                    <a href="<?php echo esc_url( home_url( '/contact' ) ); ?>" className="text-stone-500 hover:text-stone-900 py-2 text-sm font-medium">Contact</a>
                    <?php
                }
                ?>
            </nav>

            <!-- Bouton Contact -->
            <div className="hidden md:flex items-center">
                <a href="<?php echo esc_url( home_url( '/contact' ) ); ?>" className="flex items-center space-x-2 bg-indigo-950 text-white hover:bg-amber-500 hover:text-indigo-950 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-sm border border-transparent hover:border-indigo-950/10">
                    <span>Nous Contacter</span>
                </a>
            </div>
        </div>
    </div>
</header>
`,

    'footer.php': `<footer className="bg-indigo-950 text-white pt-16 pb-8 border-t border-indigo-900">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-indigo-900">
            <div className="space-y-4">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-indigo-950 shadow-md">
                        <i data-lucide="gem" className="w-4.5 h-4.5"></i>
                    </div>
                    <span className="font-sans font-semibold text-base tracking-tight text-white block">
                        <?php bloginfo( 'name' ); ?>
                    </span>
                </div>
                <p className="text-xs text-stone-400 leading-relaxed">
                    Le rendez-vous mythique des passionnés d'antiquités et d'objets d'art sous la canopée de platanes à Cannes.
                </p>
            </div>

            <div>
                <h4 className="font-sans font-semibold text-xs uppercase tracking-wider text-amber-500 mb-4">Navigation</h4>
                <ul className="space-y-2 text-xs text-stone-300">
                    <li><a href="<?php echo esc_url( home_url( '/' ) ); ?>" className="hover:text-amber-400 transition-colors">Accueil</a></li>
                    <li><a href="<?php echo esc_url( home_url( '/a-propos' ) ); ?>" className="hover:text-amber-400 transition-colors">À Propos</a></li>
                    <li><a href="<?php echo esc_url( home_url( '/contact' ) ); ?>" className="hover:text-amber-400 transition-colors">Contact</a></li>
                </ul>
            </div>

            <div>
                <h4 className="font-sans font-semibold text-xs uppercase tracking-wider text-amber-500 mb-4">Horaires d'Ouverture</h4>
                <ul className="space-y-2 text-xs text-stone-300 font-mono">
                    <li>Chaque Samedi : 8h00 - 18h00</li>
                    <li>Chaque Lundi : Brocante de Brocanteurs</li>
                    <li>Entrée libre et gratuite</li>
                </ul>
            </div>

            <div>
                <h4 className="font-sans font-semibold text-xs uppercase tracking-wider text-amber-500 mb-4">Adresse & Bureau</h4>
                <address className="space-y-2 text-xs text-stone-300 not-italic">
                    <p>Allées de la Liberté Charles de Gaulle,</p>
                    <p>06400 Cannes, Côte d'Azur, France</p>
                    <p className="pt-2 font-mono text-amber-400">Tél : +33 (0)4 92 99 84 00</p>
                </address>
            </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[10px] font-mono text-stone-500 tracking-wider uppercase">
                &copy; <?php echo date('Y'); ?> <?php bloginfo( 'name' ); ?>. Propulsé par WordPress.
            </p>
            <div className="flex space-x-6 text-[10px] font-mono uppercase tracking-widest text-stone-400">
                <a href="#" className="hover:text-amber-500 transition-colors">Mentions Légales</a>
                <span className="text-stone-700">|</span>
                <a href="#" className="hover:text-amber-500 transition-colors">Règlement Brocante</a>
            </div>
        </div>
    </div>
</footer>

<?php wp_footer(); ?>
<script>
    // Initialise les icônes Lucide de secours si présentes
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
</script>
</body>
</html>
`,

    'front-page.php': `<?php
/**
 * Template Name: Accueil Brocante
 */
get_header();

// Récupération de l'image de couverture depuis le thème ou personnalisée
$hero_img = get_template_directory_uri() . '/images/hero_antique.jpg';
?>

<!-- Section Hero -->
<section className="relative bg-stone-900 py-32 overflow-hidden border-b border-stone-800">
    <div className="absolute inset-0 z-0">
        <img 
            src="<?php echo esc_url($hero_img); ?>" 
            className="w-full h-full object-cover opacity-35 filter brightness-90 saturate-75" 
            alt="Brocante de Cannes" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/40 to-stone-950/20"></div>
    </div>

    <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <span className="font-mono text-xs text-amber-500 tracking-[0.25em] uppercase bg-amber-500/10 border border-amber-500/30 px-4 py-1.5 rounded-full inline-block">
            Rendez-vous hebdomadaire à Cannes
        </span>
        <h1 className="font-sans font-bold text-4xl sm:text-6xl text-white tracking-tight leading-tight">
            Chinez l'Authentique,<br />
            <span className="text-amber-400 font-serif italic font-normal">Découvrez l'Inattendu</span>
        </h1>
        <p className="text-stone-300 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Chaque samedi, retrouvez nos marchands d'art, antiquaires et collectionneurs passionnés aux Allées de la Liberté, sous la douce lumière de la Côte d'Azur.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <a href="<?php echo esc_url( home_url( '/a-propos' ) ); ?>" className="bg-amber-500 hover:bg-amber-600 text-indigo-950 px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-wider transition-all shadow-lg hover:-translate-y-0.5">
                Explorer l'histoire du marché
            </a>
            <a href="<?php echo esc_url( home_url( '/contact' ) ); ?>" className="border border-stone-600 hover:border-white bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-wider transition-all">
                Nous écrire
            </a>
        </div>
    </div>
</section>

<!-- Section Présentation & Trésors -->
<section className="py-24 bg-stone-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="font-sans font-bold text-3xl tracking-tight text-stone-900">
                Nos Allées Regorgent de Merveilles
            </h2>
            <p className="text-stone-600 text-sm sm:text-base">
                Découvrez la richesse de notre marché d'antiquités à Cannes. Voici un aperçu des trésors proposés par nos exposants spécialisés.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <?php
            // WP Query pour récupérer les Trésors (CPT)
            $tresors_query = new WP_Query(array(
                'post_type'      => 'brocante_tresor',
                'posts_per_page' => 6,
                'orderby'        => 'date',
                'order'          => 'DESC'
            ));

            if ($tresors_query->have_posts()) :
                while ($tresors_query->have_posts()) : $tresors_query->the_post();
                    $categories = get_the_excerpt(); // de secours ou taxonomies
                    ?>
                    <article className="bg-white border border-stone-100 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-6">
                            <i data-lucide="gem" className="w-5 h-5"></i>
                        </div>
                        <span className="font-mono text-[9px] font-bold text-amber-600 tracking-widest uppercase bg-stone-50 px-2.5 py-1 rounded-md">
                            Antiquité d'Exception
                        </span>
                        <h3 className="font-sans font-semibold text-lg text-stone-900 mt-4 mb-2">
                            <?php the_title(); ?>
                        </h3>
                        <div className="text-stone-600 text-xs leading-relaxed mb-4">
                            <?php the_content(); ?>
                        </div>
                    </article>
                    <?php
                endwhile;
                wp_reset_postdata();
            else :
                // Contenu de secours statique (SERVICES répliqués de data.ts)
                ?>
                <article className="bg-white border border-stone-100 rounded-3xl p-6 shadow-sm">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-6">
                        <i data-lucide="gem" className="w-5 h-5"></i>
                    </div>
                    <span className="font-mono text-[9px] font-bold text-amber-600 tracking-widest uppercase bg-stone-50 px-2.5 py-1 rounded-md">Art & Orfèvrerie</span>
                    <h3 className="font-sans font-semibold text-lg text-stone-900 mt-4 mb-2">La Brocante des Trésors Cachés</h3>
                    <p className="text-stone-600 text-xs leading-relaxed">Une sélection exclusive d’œuvres d’art, de pièces d’argenterie fine et d’objets précieux dénichés avec passion par nos marchands.</p>
                </article>
                <article className="bg-white border border-stone-100 rounded-3xl p-6 shadow-sm">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-6">
                        <i data-lucide="compass" className="w-5 h-5"></i>
                    </div>
                    <span className="font-mono text-[9px] font-bold text-amber-600 tracking-widest uppercase bg-stone-50 px-2.5 py-1 rounded-md">Curiosités</span>
                    <h3 className="font-sans font-semibold text-lg text-stone-900 mt-4 mb-2">Chinez, Trouvez la Perle Rare !</h3>
                    <p className="text-stone-600 text-xs leading-relaxed">Parcourez nos étals d’antiquités. Que vous soyez amateur ou collectionneur averti, l’objet insolite qui manque à votre collection vous attend.</p>
                </article>
                <article className="bg-white border border-stone-100 rounded-3xl p-6 shadow-sm">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-6">
                        <i data-lucide="tag" className="w-5 h-5"></i>
                    </div>
                    <span className="font-mono text-[9px] font-bold text-amber-600 tracking-widest uppercase bg-stone-50 px-2.5 py-1 rounded-md">Mobilier</span>
                    <h3 className="font-sans font-semibold text-lg text-stone-900 mt-4 mb-2">La Brocante des Bonnes Affaires</h3>
                    <p className="text-stone-600 text-xs leading-relaxed">Des meubles restaurés, des miroirs de style et de magnifiques pièces d’époque proposés à des prix justes pour tous les passionnés.</p>
                </article>
                <?php
            endif;
            ?>
        </div>
    </div>
</section>

<!-- Section Témoignages -->
<section className="py-20 bg-indigo-950 text-white relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-mono text-xs text-amber-500 tracking-widest uppercase">Avis de Chineurs du Monde Entier</span>
            <h2 className="font-sans font-bold text-3xl mt-2">Ce que disent nos visiteurs</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <?php
            // WP Query pour récupérer les Témoignages
            $temoignages_query = new WP_Query(array(
                'post_type'      => 'temoignage',
                'posts_per_page' => 3
            ));

            if ($temoignages_query->have_posts()) :
                while ($temoignages_query->have_posts()) : $temoignages_query->the_post();
                    ?>
                    <div className="bg-indigo-900/50 border border-indigo-800/80 p-8 rounded-3xl space-y-6">
                        <div className="flex space-x-1 text-amber-400">
                            <i data-lucide="star" className="w-4 h-4 fill-amber-400"></i>
                            <i data-lucide="star" className="w-4 h-4 fill-amber-400"></i>
                            <i data-lucide="star" className="w-4 h-4 fill-amber-400"></i>
                            <i data-lucide="star" className="w-4 h-4 fill-amber-400"></i>
                            <i data-lucide="star" className="w-4 h-4 fill-amber-400"></i>
                        </div>
                        <blockquote className="text-stone-200 text-xs leading-relaxed italic">
                            "<?php echo get_the_content(); ?>"
                        </blockquote>
                        <div className="pt-4 border-t border-indigo-800/60">
                            <cite className="not-italic text-sm font-semibold block text-white"><?php the_title(); ?></cite>
                            <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider block mt-1">Visiteur de Cannes</span>
                        </div>
                    </div>
                    <?php
                endwhile;
                wp_reset_postdata();
            else :
                // Témoignages statiques de secours
                ?>
                <div className="bg-indigo-900/50 border border-indigo-800/80 p-8 rounded-3xl">
                    <p className="text-stone-200 text-xs italic">"An absolute gem on the French Riviera! I found a stunning 1930s Art Deco lamp that now takes pride of place in my Chelsea apartment. The vendors are incredibly knowledgeable and welcoming."</p>
                    <div className="pt-4 mt-4 border-t border-indigo-800/60">
                        <cite className="text-sm font-semibold block">Sarah Jenkins</cite>
                        <span className="text-[10px] text-stone-400 font-mono">London, UK</span>
                    </div>
                </div>
                <div className="bg-indigo-900/50 border border-indigo-800/80 p-8 rounded-3xl">
                    <p className="text-stone-200 text-xs italic">"Da collezionista, trovo sempre pezzi rari di design italiano e francese degli anni '50. L'atmosfera sotto i platani di Cannes è magica, un appuntamento imperdibile."</p>
                    <div className="pt-4 mt-4 border-t border-indigo-800/60">
                        <cite className="text-sm font-semibold block">Alessandro Rossi</cite>
                        <span className="text-[10px] text-stone-400 font-mono">Milan, Italy</span>
                    </div>
                </div>
                <?php
            endif;
            ?>
        </div>
    </div>
</section>

<?php get_footer(); ?>
`,

    'page-about.php': `<?php
/**
 * Template Name: Page À Propos
 */
get_header();

$market_img = get_template_directory_uri() . '/images/market_cannes.jpg';
?>

<section className="py-24 bg-stone-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <!-- Text Content -->
            <div className="space-y-6">
                <span className="font-mono text-xs text-amber-600 tracking-widest uppercase">Depuis des décennies</span>
                <h1 className="font-sans font-bold text-3xl sm:text-4xl text-stone-900 tracking-tight">
                    L'Histoire Vivante d'un Marché d'Antiquités d'Exception
                </h1>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                    Situé sur les célèbres Allées de la Liberté, à deux pas du Palais des Festivals et du Vieux Port, le marché d’antiquités de Cannes est une véritable institution de la Riviera française. 
                </p>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                    Sous l'ombrage des platanes centenaires, une trentaine de professionnels rigoureusement sélectionnés déballent chaque samedi des trésors uniques, reflets d'époques révolues, d'un savoir-faire artisanal de premier ordre et d'un patrimoine historique précieux.
                </p>
                
                <div className="grid grid-cols-3 gap-6 pt-6 border-t border-stone-200">
                    <div>
                        <span className="font-sans font-bold text-2xl sm:text-3xl text-indigo-950 block">30+</span>
                        <span className="text-[10px] text-stone-500 font-mono uppercase tracking-wider block">Exposants réguliers</span>
                    </div>
                    <div>
                        <span className="font-sans font-bold text-2xl sm:text-3xl text-indigo-950 block">10k+</span>
                        <span className="text-[10px] text-stone-500 font-mono uppercase tracking-wider block">Trouvailles par an</span>
                    </div>
                    <div>
                        <span className="font-sans font-bold text-2xl sm:text-3xl text-indigo-950 block">100%</span>
                        <span className="text-[10px] text-stone-500 font-mono uppercase tracking-wider block">Passion & Authenticité</span>
                    </div>
                </div>
            </div>

            <!-- Image Side -->
            <div className="relative">
                <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                    <img src="<?php echo esc_url($market_img); ?>" className="w-full h-full object-cover" alt="Marché des antiquités de Cannes" />
                </div>
                <div className="absolute -bottom-8 -left-8 bg-amber-500 text-indigo-950 p-6 rounded-3xl shadow-xl max-w-[240px] border border-amber-600 hidden sm:block">
                    <span className="font-serif italic font-semibold text-lg leading-tight block">"Le véritable charme de la Côte d'Azur d'autrefois"</span>
                </div>
            </div>
        </div>
    </div>
</section>

<?php get_footer(); ?>
`,

    'page-contact.php': `<?php
/**
 * Template Name: Page Contact
 */
get_header();

$contact_img = get_template_directory_uri() . '/images/contact_antique.jpg';
?>

<section className="py-24 bg-stone-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            <!-- Left Info Panel -->
            <div className="space-y-8">
                <div className="space-y-4">
                    <span className="font-mono text-xs text-amber-600 tracking-widest uppercase">Échanges & Correspondance</span>
                    <h1 className="font-sans font-bold text-3xl sm:text-4xl text-stone-900 tracking-tight">Contactez la Brocante de Cannes</h1>
                    <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                        Vous êtes exposant, collectionneur ou simplement de passage et souhaitez en savoir plus sur nos horaires, nos emplacements ou l'origine d'un objet précieux ? Écrivez-nous ou rendez-nous visite sur les Allées de la Liberté.
                    </p>
                </div>

                <div className="aspect-[16/10] rounded-3xl overflow-hidden shadow-xl border border-stone-200">
                    <img src="<?php echo esc_url($contact_img); ?>" className="w-full h-full object-cover" alt="Secrétariat de la Brocante" />
                </div>
            </div>

            <!-- Right Form Panel -->
            <div className="bg-white rounded-3xl p-8 border border-stone-100 shadow-xl space-y-6">
                <h3 className="font-sans font-semibold text-lg text-stone-900 border-b border-stone-100 pb-4">
                    Envoyer un Message Direct
                </h3>

                <!-- Intégration de CF7 ou WPForms si disponible, sinon formulaire statique d'explication -->
                <?php
                // Vous pouvez décommenter et configurer le shortcode de votre formulaire préféré ici :
                // echo do_shortcode('[contact-form-7 id="contact-form" title="Formulaire Contact Brocante"]');
                ?>
                
                <p className="bg-amber-500/10 border border-amber-500/30 text-amber-900 text-xs p-4 rounded-xl leading-relaxed">
                    <strong>Note d'intégration WordPress :</strong> Ce thème est configuré pour accueillir n'importe quel plugin de formulaire. Installez <strong>Contact Form 7</strong> ou <strong>WPForms</strong> et insérez votre shortcode personnalisé dans ce gabarit de page ou directement via l'éditeur WordPress Gutenberg !
                </p>

                <form className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">Votre Nom Complet</label>
                        <input type="text" placeholder="Ex: Jean Martin" className="w-full px-4 py-3 rounded-xl border border-stone-200 text-xs focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 outline-none transition-all" />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">Adresse E-mail</label>
                        <input type="email" placeholder="jean.martin@example.com" className="w-full px-4 py-3 rounded-xl border border-stone-200 text-xs focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 outline-none transition-all" />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">Votre Message</label>
                        <textarea rows={4} placeholder="Comment pouvons-nous vous aider ?" className="w-full px-4 py-3 rounded-xl border border-stone-200 text-xs focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 outline-none transition-all resize-none"></textarea>
                    </div>
                    <button type="button" disabled className="w-full bg-indigo-950 text-white py-3.5 rounded-xl text-xs font-semibold uppercase tracking-widest cursor-not-allowed opacity-80">
                        Envoyer le Message (Thème Actif)
                    </button>
                </form>
            </div>

        </div>
    </div>
</section>

<?php get_footer(); ?>
`
  };

  // Trigger download of WP Theme ZIP
  const handleExportThemeZip = async () => {
    setIsGenerating(true);
    setGenerationProgress(10);
    
    try {
      const zip = new JSZip();
      const themeSlug = getSlug();
      
      // Create root folder for theme
      const themeFolder = zip.folder(themeSlug);
      if (!themeFolder) throw new Error("Could not create theme directory inside ZIP.");

      // Add template text files
      setGenerationProgress(30);
      Object.entries(filesContent).forEach(([fileName, content]) => {
        themeFolder.file(fileName, content);
      });

      // Fetch or convert images for bundling
      setGenerationProgress(55);
      const imagesFolder = themeFolder.folder('images');
      if (imagesFolder) {
        // Fetch hero image
        const heroData = customImages.hero 
          ? base64ToUint8Array(customImages.hero) 
          : await fetchImageAsUint8Array(heroAntiqueImg);
        if (heroData) imagesFolder.file('hero_antique.jpg', heroData);

        // Fetch market image
        const marketData = customImages.market 
          ? base64ToUint8Array(customImages.market) 
          : await fetchImageAsUint8Array(marketCannesImg);
        if (marketData) imagesFolder.file('market_cannes.jpg', marketData);

        // Fetch contact image
        const contactData = customImages.contact 
          ? base64ToUint8Array(customImages.contact) 
          : await fetchImageAsUint8Array(contactAntiqueImg);
        if (contactData) imagesFolder.file('contact_antique.jpg', contactData);
      }

      setGenerationProgress(80);

      // Generate zip file
      const blob = await zip.generateAsync({ type: 'blob' });
      setGenerationProgress(95);

      // Native browser trigger download
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${themeSlug}-wordpress-theme.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setGenerationProgress(100);
      setTimeout(() => {
        setIsGenerating(false);
        setGenerationProgress(0);
      }, 1000);

    } catch (error) {
      console.error("ZIP Generation failed", error);
      alert("Une erreur est survenue lors de la compilation de votre thème WordPress.");
      setIsGenerating(false);
      setGenerationProgress(0);
    }
  };

  // Convert Base64 string to Uint8Array helper
  const base64ToUint8Array = (base64String: string): Uint8Array => {
    const base64Data = base64String.includes(';base64,') 
      ? base64String.split(';base64,')[1] 
      : base64String;
    const binaryString = window.atob(base64Data);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  };

  // Fetch static asset via fetch helper
  const fetchImageAsUint8Array = async (url: string): Promise<Uint8Array | null> => {
    try {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      return new Uint8Array(arrayBuffer);
    } catch (e) {
      console.error("Failed to fetch asset", url, e);
      return null;
    }
  };

  // Copy code file content to clipboard helper
  const handleCopyCode = (filename: string) => {
    const code = filesContent[filename];
    if (code) {
      navigator.clipboard.writeText(code).then(() => {
        setCopiedFile(filename);
        setTimeout(() => setCopiedFile(null), 2000);
      });
    }
  };

  return (
    <>
      {/* Floating button stacked nicely above the photo configuration button on the bottom right */}
      <div className="fixed bottom-24 right-6 z-40">
        <motion.button
          onClick={() => setIsOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-indigo-950 hover:bg-amber-500 text-white hover:text-indigo-950 p-4 rounded-full shadow-2xl flex items-center gap-2 cursor-pointer transition-all duration-300 border border-white/10 font-sans font-medium group"
        >
          <div className="w-5 h-5 flex items-center justify-center bg-amber-500 group-hover:bg-indigo-950 text-indigo-950 group-hover:text-amber-500 rounded-lg transition-colors duration-300">
            <span className="font-serif italic font-bold text-xs">W</span>
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider pr-1">
            Convertir en WordPress
          </span>
        </motion.button>
      </div>

      {/* Main Drawer Dashboard */}
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
              transition={{ type: 'spring', damping: 28, stiffness: 180 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-4xl bg-stone-950 text-stone-100 z-50 shadow-2xl flex flex-col justify-between border-l border-stone-800"
            >
              {/* Header */}
              <div className="p-6 border-b border-stone-800 flex justify-between items-center bg-stone-900/40">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-serif text-lg font-extrabold italic">
                    W
                  </div>
                  <div>
                    <h2 className="font-sans font-semibold text-lg tracking-tight text-white flex items-center gap-2">
                      Convertisseur WordPress Pro
                    </h2>
                    <p className="text-[11px] font-mono text-stone-400 tracking-wider uppercase">
                      Convertissez & Exportez en Thème d'Antiquités complet
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

              {/* Navigation Tabs */}
              <div className="flex bg-stone-900 border-b border-stone-800 px-6 overflow-x-auto gap-2">
                {[
                  { id: 'config', label: '1. Config Thème', icon: Settings },
                  { id: 'files', label: '2. Fichiers du Thème', icon: Folder },
                  { id: 'preview', label: '3. Admin CPT', icon: Eye },
                  { id: 'guide', label: '4. Guide d\'Usage', icon: BookOpen },
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex items-center gap-2 py-4 px-3 text-xs font-semibold border-b-2 uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                        activeTab === tab.id
                          ? 'border-amber-500 text-amber-500 font-bold'
                          : 'border-transparent text-stone-400 hover:text-white'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Scrollable Main Workspace Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                
                {/* 1. Configuration Panel */}
                {activeTab === 'config' && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="bg-amber-500/5 border border-amber-500/15 p-5 rounded-2xl space-y-2">
                      <div className="flex items-center gap-2 text-amber-500">
                        <Sparkles className="w-4 h-4" />
                        <span className="text-xs font-semibold uppercase tracking-wider font-sans">Convertisseur Thématique</span>
                      </div>
                      <p className="text-xs text-stone-300 leading-relaxed">
                        Entrez les détails de votre site ci-dessous pour personnaliser le style de votre thème WordPress. Toutes les variables PHP, les en-têtes CSS, ainsi que les namespaces de fonctions seront automatiquement générés et prêts à l'installation.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <label className="block text-[11px] font-semibold text-stone-400 uppercase tracking-wider">Nom du Thème</label>
                        <input 
                          type="text" 
                          value={themeName} 
                          onChange={(e) => setThemeName(e.target.value)}
                          className="w-full bg-stone-900 border border-stone-800 focus:border-amber-500 text-stone-100 px-4 py-3 rounded-xl text-xs font-sans outline-none transition-all" 
                          placeholder="Brocante de Cannes" 
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-[11px] font-semibold text-stone-400 uppercase tracking-wider">Slug / Préfixe PHP (Unique)</label>
                        <input 
                          type="text" 
                          value={themePrefix} 
                          onChange={(e) => setThemePrefix(e.target.value)}
                          className="w-full bg-stone-900 border border-stone-800 focus:border-amber-500 text-stone-100 px-4 py-3 rounded-xl text-xs font-sans outline-none transition-all" 
                          placeholder="brocante_cannes" 
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-[11px] font-semibold text-stone-400 uppercase tracking-wider">Auteur du Thème</label>
                        <input 
                          type="text" 
                          value={author} 
                          onChange={(e) => setAuthor(e.target.value)}
                          className="w-full bg-stone-900 border border-stone-800 focus:border-amber-500 text-stone-100 px-4 py-3 rounded-xl text-xs font-sans outline-none transition-all" 
                          placeholder="Chineur Cannes" 
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-[11px] font-semibold text-stone-400 uppercase tracking-wider">Text Domain (Langues)</label>
                        <input 
                          type="text" 
                          value={textDomain} 
                          onChange={(e) => setTextDomain(e.target.value)}
                          className="w-full bg-stone-900 border border-stone-800 focus:border-amber-500 text-stone-100 px-4 py-3 rounded-xl text-xs font-sans outline-none transition-all" 
                          placeholder="brocante-cannes" 
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-[11px] font-semibold text-stone-400 uppercase tracking-wider">URL du Thème</label>
                        <input 
                          type="text" 
                          value={themeUri} 
                          onChange={(e) => setThemeUri(e.target.value)}
                          className="w-full bg-stone-900 border border-stone-800 focus:border-amber-500 text-stone-100 px-4 py-3 rounded-xl text-xs font-sans outline-none transition-all" 
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-[11px] font-semibold text-stone-400 uppercase tracking-wider">Version du Thème</label>
                        <input 
                          type="text" 
                          value={version} 
                          onChange={(e) => setVersion(e.target.value)}
                          className="w-full bg-stone-900 border border-stone-800 focus:border-amber-500 text-stone-100 px-4 py-3 rounded-xl text-xs font-sans outline-none transition-all" 
                        />
                      </div>

                      <div className="space-y-1.5 md:col-span-2">
                        <label className="block text-[11px] font-semibold text-stone-400 uppercase tracking-wider">Description</label>
                        <textarea 
                          value={description} 
                          onChange={(e) => setDescription(e.target.value)}
                          rows={3}
                          className="w-full bg-stone-900 border border-stone-800 focus:border-amber-500 text-stone-100 px-4 py-3 rounded-xl text-xs font-sans outline-none transition-all resize-none" 
                        />
                      </div>
                    </div>

                    {/* Features mapped */}
                    <div className="border border-stone-800 bg-stone-900/20 p-5 rounded-2xl">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-1.5">
                        <Wrench className="w-4 h-4 text-amber-500" />
                        Fonctionnalités converties & activées d'office :
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-300">
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span>Custom Post Type : <strong>Trésors de Brocante</strong></span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span>Custom Post Type : <strong>Témoignages Clients</strong></span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span>Mise en file d’attente Tailwind CSS v4</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span>Support des images à la une & titre de page</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span>Gabarit de page d'accueil d'exception</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span>Intégration d'un menu d'en-tête dynamique</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}

                {/* 2. File Explorer Panel */}
                {activeTab === 'files' && (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[480px] animate-fade-in">
                    {/* Left File Tree */}
                    <div className="bg-stone-900/60 rounded-2xl border border-stone-800 p-4 overflow-y-auto space-y-2">
                      <span className="text-[10px] font-mono text-stone-500 uppercase tracking-widest block mb-2 px-2">Dossier du Thème</span>
                      <div className="flex items-center gap-2 p-2 rounded-lg bg-stone-900 border border-stone-800 mb-4 text-xs font-semibold text-white">
                        <Folder className="w-4 h-4 text-amber-500 shrink-0" />
                        <span>wp-content/themes/{getSlug()}/</span>
                      </div>
                      
                      {Object.keys(filesContent).map((fileName) => (
                        <button
                          key={fileName}
                          onClick={() => setActiveFile(fileName)}
                          className={`w-full text-left p-3 rounded-xl flex items-center justify-between text-xs transition-all cursor-pointer ${
                            activeFile === fileName
                              ? 'bg-amber-500/10 border border-amber-500/30 text-amber-500 font-bold'
                              : 'bg-stone-950/20 hover:bg-stone-800/40 border border-transparent text-stone-300'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <FileCode className="w-4 h-4 shrink-0 text-stone-400" />
                            <span>{fileName}</span>
                          </div>
                          {fileName === 'functions.php' && (
                            <span className="bg-amber-500/10 text-[9px] px-1.5 py-0.5 rounded text-amber-500 font-mono">CPT</span>
                          )}
                        </button>
                      ))}
                    </div>

                    {/* Right Code Viewer */}
                    <div className="lg:col-span-2 bg-stone-950 border border-stone-800 rounded-2xl flex flex-col overflow-hidden relative">
                      {/* Sub-header inside code viewer */}
                      <div className="p-4 border-b border-stone-800 flex justify-between items-center bg-stone-900/40">
                        <div className="flex items-center gap-2">
                          <Terminal className="w-4 h-4 text-stone-400" />
                          <span className="text-xs font-mono font-bold text-stone-300">{activeFile}</span>
                        </div>
                        <button
                          onClick={() => handleCopyCode(activeFile)}
                          className="flex items-center gap-1.5 text-stone-400 hover:text-white bg-stone-900 hover:bg-stone-800 border border-stone-800 rounded-lg px-2.5 py-1 text-[11px] font-mono transition-colors cursor-pointer"
                        >
                          {copiedFile === activeFile ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span>Copié !</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copier le Code</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Real-time styled code block */}
                      <pre className="flex-1 overflow-auto p-4 text-[11px] font-mono text-stone-300 bg-stone-950 leading-relaxed whitespace-pre select-all">
                        {filesContent[activeFile]}
                      </pre>
                    </div>
                  </div>
                )}

                {/* 3. Simulated WordPress Admin Area */}
                {activeTab === 'preview' && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="bg-indigo-950/40 border border-indigo-900/50 p-5 rounded-2xl space-y-2">
                      <div className="flex items-center gap-2 text-amber-500">
                        <ExternalLink className="w-4 h-4" />
                        <span className="text-xs font-semibold uppercase tracking-wider font-sans">Simulateur Admin WordPress</span>
                      </div>
                      <p className="text-xs text-stone-300 leading-relaxed">
                        Voici à quoi ressemblera votre panneau d'administration WordPress une fois que vous aurez installé ce thème personnalisé. Le thème génère automatiquement les menus personnalisés pour saisir de nouvelles antiquités ou gérer vos témoignages !
                      </p>
                    </div>

                    {/* Interactive mock interface */}
                    <div className="bg-white text-stone-800 rounded-2xl overflow-hidden border border-stone-200 shadow-xl flex h-[350px]">
                      {/* Sidebar */}
                      <div className="w-52 bg-stone-900 text-stone-400 flex flex-col justify-between shrink-0 font-sans p-3">
                        <div className="space-y-4">
                          {/* Top site title */}
                          <div className="flex items-center gap-2 px-2 py-1 bg-stone-800 text-white rounded-lg">
                            <div className="w-4.5 h-4.5 rounded bg-amber-500 text-indigo-950 flex items-center justify-center font-bold text-[10px]">W</div>
                            <span className="text-[11px] font-semibold truncate">{themeName} Admin</span>
                          </div>

                          {/* Navigation items */}
                          <div className="space-y-1">
                            {[
                              { label: 'Tableau de bord', icon: 'dashboard', active: false },
                              { label: 'Articles', icon: 'admin-post', active: false },
                              { label: 'Médias', icon: 'admin-media', active: false },
                              { label: 'Pages', icon: 'admin-page', active: false },
                              { label: 'Trésors CPT', icon: 'tag', active: true, badge: '10' },
                              { label: 'Témoignages CPT', icon: 'testimonial', active: false, badge: '3' },
                              { label: 'Apparence', icon: 'admin-appearance', active: false },
                              { label: 'Extensions', icon: 'admin-plugins', active: false },
                            ].map((item, idx) => (
                              <div
                                key={idx}
                                className={`flex items-center justify-between px-2 py-1.5 rounded-md text-[11px] cursor-pointer transition-colors ${
                                  item.active 
                                    ? 'bg-amber-500 text-stone-900 font-semibold' 
                                    : 'hover:bg-stone-800 hover:text-white'
                                }`}
                              >
                                <span className="truncate">{item.label}</span>
                                {item.badge && (
                                  <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full ${item.active ? 'bg-stone-900 text-amber-500' : 'bg-stone-800 text-stone-400'}`}>
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Sidebar Footer */}
                        <div className="text-[9px] font-mono text-stone-600 text-center border-t border-stone-800 pt-2 uppercase tracking-wider">
                          WP Version 6.4.2
                        </div>
                      </div>

                      {/* Content Area */}
                      <div className="flex-grow p-6 bg-stone-50 overflow-y-auto space-y-6">
                        <div className="flex justify-between items-center pb-4 border-b border-stone-200">
                          <div>
                            <h3 className="font-sans font-bold text-lg text-stone-900">Trésors de Brocante</h3>
                            <p className="text-stone-500 text-[11px]">Gérez les pièces d'exception affichées dynamiquement sur votre page d'accueil</p>
                          </div>
                          <button className="bg-indigo-950 hover:bg-amber-500 text-white hover:text-indigo-950 text-[11px] font-bold px-3 py-1.5 rounded-lg shadow cursor-pointer transition-colors">
                            + Ajouter un Trésor
                          </button>
                        </div>

                        {/* List of custom posts mock */}
                        <div className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-sm">
                          <table className="w-full text-[11px] text-left border-collapse">
                            <thead>
                              <tr className="bg-stone-100 border-b border-stone-200 text-stone-600 font-bold uppercase tracking-wider">
                                <th className="p-3">Titre de l'antiquité</th>
                                <th className="p-3">Catégorie</th>
                                <th className="p-3">Date de publication</th>
                                <th className="p-3 text-right">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {[
                                { title: 'La Brocante des Trésors Cachés', cat: 'Art & Orfèvrerie', date: 'Aujourd\'hui' },
                                { title: 'Chinez, Trouvez la Perle Rare !', cat: 'Curiosités', date: 'Hier' },
                                { title: 'La Brocante des Bonnes Affaires', cat: 'Mobilier', date: 'Il y a 3 jours' },
                              ].map((post, idx) => (
                                <tr key={idx} className="border-b border-stone-100 hover:bg-stone-50/50">
                                  <td className="p-3 font-semibold text-stone-800">{post.title}</td>
                                  <td className="p-3"><span className="bg-stone-100 text-stone-600 px-2 py-0.5 rounded-md font-mono text-[9px]">{post.cat}</span></td>
                                  <td className="p-3 text-stone-500">{post.date}</td>
                                  <td className="p-3 text-right space-x-2">
                                    <span className="text-amber-600 hover:underline cursor-pointer">Modifier</span>
                                    <span className="text-stone-300">|</span>
                                    <span className="text-rose-600 hover:underline cursor-pointer">Supprimer</span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. Installation & Start Guide */}
                {activeTab === 'guide' && (
                  <div className="space-y-6 animate-fade-in text-xs leading-relaxed text-stone-300">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="font-sans font-bold text-sm text-white flex items-center gap-2">
                          <span className="w-5 h-5 bg-amber-500/10 border border-amber-500/30 text-amber-500 text-[11px] rounded-md flex items-center justify-center font-bold">1</span>
                          Installation du Thème ZIP
                        </h3>
                        <p className="text-stone-400">
                          Téléchargez l'archive <code>{getSlug()}-wordpress-theme.zip</code> depuis ce convertisseur. Rendez-vous sur votre tableau d'administration WordPress, puis allez dans :
                        </p>
                        <div className="bg-stone-900 border border-stone-800 rounded-xl p-3 font-mono text-[11px] text-amber-500">
                          Apparence &gt; Thèmes &gt; Ajouter un thème &gt; Téléverser un thème
                        </div>
                        <p className="text-stone-400">
                          Sélectionnez le fichier zip et cliquez sur <strong>Installer maintenant</strong> puis <strong>Activer</strong>.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <h3 className="font-sans font-bold text-sm text-white flex items-center gap-2">
                          <span className="w-5 h-5 bg-amber-500/10 border border-amber-500/30 text-amber-500 text-[11px] rounded-md flex items-center justify-center font-bold">2</span>
                          Activation de la Page d'Accueil
                        </h3>
                        <p className="text-stone-400">
                          Par défaut, WordPress affiche vos derniers articles sur la page d'accueil. Pour utiliser le gabarit du site de brocante :
                        </p>
                        <ol className="list-decimal pl-5 space-y-1.5 text-stone-400">
                          <li>Créez une page nommée <strong>"Accueil"</strong> et attribuez-lui le modèle de page <em>"Accueil Brocante"</em>.</li>
                          <li>Allez dans <strong>Réglages &gt; Lecture</strong>.</li>
                          <li>Choisissez d'afficher <em>Une page statique</em> et sélectionnez <strong>"Accueil"</strong>.</li>
                        </ol>
                      </div>

                      <div className="space-y-4">
                        <h3 className="font-sans font-bold text-sm text-white flex items-center gap-2">
                          <span className="w-5 h-5 bg-amber-500/10 border border-amber-500/30 text-amber-500 text-[11px] rounded-md flex items-center justify-center font-bold">3</span>
                          Configuration des Menus
                        </h3>
                        <p className="text-stone-400">
                          Le thème enregistre un emplacement de menu nommé <strong>"Menu Principal"</strong>. Créez votre menu de navigation dans :
                        </p>
                        <div className="bg-stone-900 border border-stone-800 rounded-xl p-3 font-mono text-[11px] text-amber-500">
                          Apparence &gt; Menus
                        </div>
                        <p className="text-stone-400">
                          Associez-le à l'emplacement coché <strong>"Menu Principal"</strong> pour qu'il prenne l'élégant style Riviera dans l'en-tête du site !
                        </p>
                      </div>

                      <div className="space-y-4">
                        <h3 className="font-sans font-bold text-sm text-white flex items-center gap-2">
                          <span className="w-5 h-5 bg-amber-500/10 border border-amber-500/30 text-amber-500 text-[11px] rounded-md flex items-center justify-center font-bold">4</span>
                          Alimenter vos Antiquités (CPT)
                        </h3>
                        <p className="text-stone-400">
                          Chaque pièce ou étal de brocante s'ajoute simplement depuis le menu <strong>"Trésors CPT"</strong> de votre admin WordPress. Remplissez le titre, le texte de description et le tour est joué !
                        </p>
                        <div className="flex items-center gap-2 text-[11px] bg-indigo-950/40 p-3 rounded-lg border border-indigo-900 text-stone-300">
                          <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                          <span>Si aucun Trésor n'est créé dans l'admin, les 10 trésors par défaut de Cannes s'affichent d'office !</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* Progress and status banner for ZIP Generation */}
              {isGenerating && (
                <div className="bg-stone-900 border-t border-stone-800 px-6 py-3 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2.5 text-amber-500">
                    <span className="animate-spin w-3.5 h-3.5 border-2 border-amber-500 border-t-transparent rounded-full" />
                    <span>Compilation de votre thème WordPress...</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-40 bg-stone-800 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-amber-500 h-1.5 transition-all duration-300" style={{ width: `${generationProgress}%` }} />
                    </div>
                    <span className="font-bold text-white">{generationProgress}%</span>
                  </div>
                </div>
              )}

              {/* Footer Panel Controls */}
              <div className="p-6 border-t border-stone-800 bg-stone-900/30 flex items-center justify-between gap-4">
                <div className="text-xs text-stone-400">
                  Version de l'exporteur : <strong className="font-mono text-stone-300">WordPress Riviera Theme Exporter v2.1</strong>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="border border-stone-800 hover:border-stone-700 hover:bg-stone-900 text-stone-300 px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer"
                  >
                    Fermer
                  </button>

                  <button
                    type="button"
                    onClick={handleExportThemeZip}
                    disabled={isGenerating}
                    className="bg-amber-500 hover:bg-amber-600 text-indigo-950 px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-2 shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:pointer-events-none disabled:-translate-y-0"
                  >
                    <Download className="w-4 h-4" />
                    Télécharger Thème (.zip)
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
