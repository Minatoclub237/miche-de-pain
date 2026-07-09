import { Specimen, botanicalSpecimens } from './botanicalData';

// Configuration réutilisable d'une galerie « Le Panis » (une par carte de l'Atelier).
export interface GalleryConfig {
  specimens: Specimen[];
  brandTitle: string;
  brandSubtitle: string;
  welcomeTitle: string;
  welcomeSubtitle: string;
  welcomeIntro: string;
  itemLabel: string; // libellé de la pastille (« Pain », « Viennoiserie »…)
  metricLabel: string; // libellé de la métrique « elevation » dans la fiche (ex. « Taux d'Hydratation »)
}

// ─── Carte 1 : Pains au Levain ───
export const breadGallery: GalleryConfig = {
  specimens: botanicalSpecimens,
  brandTitle: 'PANIS',
  brandSubtitle: 'Exposition Circulaire 3D • Pains Spéciaux & Levains',
  welcomeTitle: 'La Cave aux Pains Artisans',
  welcomeSubtitle: 'Une Exposition Interactive 3D • Levain & Croûte',
  welcomeIntro:
    "Bienvenue dans l'archive numérique des plus grands pains de tradition façonnés à la main et à fermentation lente. Cette exposition est entièrement interactive :",
  itemLabel: 'Pain',
  metricLabel: "Taux d'Hydratation",
};

// ─── Carte 2 : Viennoiseries Pur Beurre AOP ───
const viennoiserieSpecimens: Specimen[] = [
  {
    common: 'Croissant Pur Beurre',
    binomial: 'Corona Butyrum',
    family: 'Pâte Levée Feuilletée (Beurre de Tourage AOP)',
    origin: 'Vienne, Autriche & Paris, France',
    status: 'Stable',
    rarityScore: 70,
    description:
      "L'icône absolue du petit-déjeuner français. Réalisé par tourage d'un beurre d'Échiré AOP au sein d'une détrempe levée, il développe par pliages successifs des dizaines de feuillets aériens. Cuit à cœur, il révèle une croûte lustrée d'un blond profond, un feuilletage qui craque, et un cœur en nid d'abeille moelleux et beurré.",
    funFact:
      "Le croissant descend du 'kipferl' viennois. C'est en 1839, à la Boulangerie Viennoise de Paris, qu'August Zang l'aurait fait connaître aux Français, qui l'ont ensuite feuilleté à leur manière.",
    coordinates: '48.8566° N, 2.3522° E',
    elevation: '55% d\'Hydratation • 3 tours simples',
    photo: {
      url: '/gallery/vienn-croissant.webp',
      text: 'Croissant pur beurre sur ardoise sombre',
      pos: 'center',
      by: 'Maison Miche de Pain',
    },
  },
  {
    common: 'Pain au Chocolat',
    binomial: 'Panis Cacao',
    family: 'Pâte Levée Feuilletée & Barres de Cacao Noir',
    origin: 'Sud-Ouest de la France (dit « chocolatine »)',
    status: 'Stable',
    rarityScore: 72,
    description:
      "Un rectangle de pâte levée feuilletée enroulé autour de deux barres de chocolat noir de couverture. À la cuisson, le beurre de tourage fait éclore le feuilletage tandis que le chocolat fond en un cœur onctueux. Croustillant dehors, tendre et fondant dedans.",
    funFact:
      "Chocolatine ou pain au chocolat ? Le débat divise la France : « chocolatine » domine dans le Sud-Ouest, « pain au chocolat » ailleurs. Les deux désignent exactement la même viennoiserie.",
    coordinates: '43.6047° N, 1.4442° E',
    elevation: '55% d\'Hydratation • Chocolat 55% cacao',
    photo: {
      url: '/gallery/vienn-pain-chocolat.webp',
      text: 'Pain au chocolat doré au cœur fondant',
      pos: 'center',
      by: 'Maison Miche de Pain',
    },
  },
  {
    common: 'Croissant aux Amandes',
    binomial: 'Corona Amygdala',
    family: 'Viennoiserie de Recuisson (Crème d\'Amande)',
    origin: 'Boulangeries parisiennes (recette anti-gaspillage)',
    status: 'Rare',
    rarityScore: 76,
    description:
      "Un croissant garni de crème d'amande, imbibé d'un léger sirop, généreusement recouvert d'amandes effilées puis repassé au four. Le résultat : une viennoiserie fondante et gourmande, saupoudrée de sucre glace, à la fois croustillante en surface et moelleuse à cœur.",
    funFact:
      "C'est une recette d'origine anti-gaspillage : elle est née pour sublimer les croissants de la veille en les regarnissant de frangipane avant une seconde cuisson.",
    coordinates: '48.8534° N, 2.3488° E',
    elevation: '55% d\'Hydratation • Frangipane maison',
    photo: {
      url: '/gallery/vienn-croissant-amandes.webp',
      text: 'Croissant aux amandes garni de crème',
      pos: 'center',
      by: 'Maison Miche de Pain',
    },
  },
  {
    common: 'Chausson aux Pommes',
    binomial: 'Pomum Plicatum',
    family: 'Pâte Feuilletée & Compotée de Pommes Épicée',
    origin: 'Saint-Calais, Sarthe, France',
    status: 'Vulnerable',
    rarityScore: 68,
    description:
      "Un demi-cercle de pâte feuilletée pur beurre renfermant une compotée de pommes acidulée à peine épicée. Le feuilletage, rayé au couteau et doré à l'œuf, gonfle et croustille, contrastant avec le fondant parfumé de la garniture aux pommes.",
    funFact:
      "La légende attribue sa création à Saint-Calais en 1630 : la châtelaine, pour enrayer une épidémie, aurait distribué aux habitants une pâtisserie aux pommes. Une fête la célèbre encore chaque année.",
    coordinates: '47.9236° N, 0.7444° E',
    elevation: '58% d\'Hydratation • Pommes acidulées',
    photo: {
      url: '/gallery/vienn-chausson-pommes.webp',
      text: 'Chausson aux pommes feuilleté',
      pos: 'center',
      by: 'Maison Miche de Pain',
    },
  },
  {
    common: 'Pain aux Raisins',
    binomial: 'Spira Uvae',
    family: 'Pâte Feuilletée, Crème Pâtissière & Raisins',
    origin: 'France (dit « escargot » ou « pain russe »)',
    status: 'Stable',
    rarityScore: 69,
    description:
      "Une spirale de pâte levée feuilletée garnie d'une onctueuse crème pâtissière à la vanille et parsemée de raisins secs longuement macérés. Enroulé en escargot puis lustré au sirop après cuisson, il offre une bouche à la fois moelleuse, crémeuse et délicatement parfumée.",
    funFact:
      "On le surnomme « escargot » pour sa forme enroulée, ou « pain russe » dans certaines régions. Les raisins sont souvent macérés au rhum pour intensifier leur parfum.",
    coordinates: '48.8566° N, 2.3522° E',
    elevation: '55% d\'Hydratation • Crème vanille',
    photo: {
      url: '/gallery/vienn-pain-raisins.webp',
      text: 'Pain aux raisins en spirale',
      pos: 'center',
      by: 'Maison Miche de Pain',
    },
  },
  {
    common: 'Brioche Pur Beurre',
    binomial: 'Mollis Aurea',
    family: 'Pâte Levée Riche (Œufs & Beurre)',
    origin: 'Normandie & Vendée, France',
    status: 'Stable',
    rarityScore: 62,
    description:
      "Une pâte richement enrichie en œufs frais et en beurre, longuement pétrie puis pointée au froid. Sa mie file en longs brins soyeux d'un jaune doré, sa croûte est fine et brillante de dorure. Moelleuse, fondante et beurrée, elle se déguste nature ou toastée.",
    funFact:
      "La célèbre phrase « Qu'ils mangent de la brioche » attribuée à Marie-Antoinette est un mythe : elle apparaît chez Rousseau alors que la reine n'était qu'une enfant, bien avant son arrivée en France.",
    coordinates: '49.1829° N, 0.3707° O',
    elevation: '50% d\'Hydratation • 50% de Beurre',
    photo: {
      url: '/gallery/vienn-brioche.webp',
      text: 'Brioche dorée à la mie filante',
      pos: 'center',
      by: 'Maison Miche de Pain',
    },
  },
];

export const viennoiserieGallery: GalleryConfig = {
  specimens: viennoiserieSpecimens,
  brandTitle: 'VIENNA',
  brandSubtitle: 'Exposition Circulaire 3D • Viennoiseries Pur Beurre AOP',
  welcomeTitle: 'L\'Atelier des Viennoiseries',
  welcomeSubtitle: 'Une Exposition Interactive 3D • Beurre & Feuilletage',
  welcomeIntro:
    'Bienvenue dans la vitrine numérique de nos viennoiseries pur beurre AOP, feuilletées et dorées chaque matin au fournil. Cette exposition est entièrement interactive :',
  itemLabel: 'Viennoiserie',
  metricLabel: "Taux d'Hydratation",
};

// ─── Carte 3 : Pâtisseries Fines & Saisonnières ───
const patisserieSpecimens: Specimen[] = [
  {
    common: 'Éclair au Chocolat',
    binomial: 'Fulgur Cacao',
    family: 'Pâte à Choux & Crème Pâtissière',
    origin: 'Lyon, France (XIXᵉ siècle, attribué à Carême)',
    status: 'Stable',
    rarityScore: 74,
    description:
      "Un long boudin de pâte à choux légère et creuse, garni d'une onctueuse crème pâtissière au chocolat noir, puis nappé d'un fondant brillant. Le contraste entre la coque fine, la crème dense et le glaçage lisse en fait un incontournable des vitrines de pâtisserie.",
    funFact:
      "Son nom viendrait du fait qu'on le mange « en un éclair », tant il est irrésistible — ou du reflet brillant que projette son glaçage fondant.",
    coordinates: '45.7640° N, 4.8357° E',
    elevation: 'Pâte à choux & Fondant',
    photo: {
      url: '/gallery/patis-eclair.webp',
      text: 'Éclair au chocolat glacé au fondant',
      pos: 'center',
      by: 'Maison Miche de Pain',
    },
  },
  {
    common: 'Tarte Fine aux Pommes',
    binomial: 'Malus Discus',
    family: 'Pâte Sablée & Pommes en Rosace',
    origin: 'France (grand classique des terroirs)',
    status: 'Stable',
    rarityScore: 66,
    description:
      "Un fond de pâte sablée croustillant garni d'une fine compotée, sur lequel de délicates lamelles de pommes sont disposées en rosace. Cuite lentement puis lustrée d'un nappage à l'abricot, elle marie le fondant du fruit au sablé beurré.",
    funFact:
      "La disposition des pommes en rosace n'est pas qu'esthétique : elle assure une cuisson régulière et une caramélisation homogène des bords des lamelles.",
    coordinates: '48.8566° N, 2.3522° E',
    elevation: 'Pâte sablée & Nappage abricot',
    photo: {
      url: '/gallery/patis-tarte-pommes.webp',
      text: 'Tarte fine aux pommes en rosace',
      pos: 'center',
      by: 'Maison Miche de Pain',
    },
  },
  {
    common: 'Mille-Feuille Vanille',
    binomial: 'Mille Folia',
    family: 'Feuilletage Caramélisé & Crème Mousseline',
    origin: 'France (perfectionné au XVIIᵉ siècle)',
    status: 'Rare',
    rarityScore: 88,
    description:
      "Trois abaisses de feuilletage caramélisé alternées avec une crème mousseline à la vanille, couronnées d'un glaçage fondant marbré au chocolat. Toute la difficulté réside dans un feuilletage à la fois croustillant et net à la découpe.",
    funFact:
      "On le surnomme parfois « Napoléon », déformation de « napolitain », en référence au style de pâtisserie feuilletée hérité de Naples.",
    coordinates: '48.8566° N, 2.3522° E',
    elevation: 'Feuilletage 6 tours & Mousseline',
    photo: {
      url: '/gallery/patis-mille-feuille.webp',
      text: 'Mille-feuille vanille glacé',
      pos: 'center',
      by: 'Maison Miche de Pain',
    },
  },
  {
    common: 'Opéra',
    binomial: 'Symphonia Nigra',
    family: 'Biscuit Joconde, Ganache & Café',
    origin: 'Paris, France (Maison Dalloyau, 1955)',
    status: 'Rare',
    rarityScore: 90,
    description:
      "Un entremets rectangulaire aux couches précises : biscuit Joconde imbibé de sirop de café, ganache au chocolat noir et crème au beurre au café, le tout scellé sous un glaçage miroir. Une architecture gustative dense et raffinée.",
    funFact:
      "Créé par la Maison Dalloyau, il rend hommage à l'Opéra Garnier. Traditionnellement, une fine feuille d'or alimentaire couronne sa surface lisse.",
    coordinates: '48.8720° N, 2.3316° E',
    elevation: '7 couches & Glaçage miroir',
    photo: {
      url: '/gallery/patis-opera.webp',
      text: 'Opéra glacé au chocolat',
      pos: 'center',
      by: 'Maison Miche de Pain',
    },
  },
  {
    common: 'Tarte au Citron Meringuée',
    binomial: 'Citrus Nix',
    family: 'Pâte Sucrée, Crème de Citron & Meringue',
    origin: 'France (héritée des tourtes citronnées anglo-saxonnes)',
    status: 'Stable',
    rarityScore: 78,
    description:
      "Une pâte sucrée croustillante garnie d'une crème de citron vive et acidulée, surmontée d'une meringue italienne aérienne délicatement dorée au chalumeau. L'équilibre parfait entre l'acidité du citron et la douceur sucrée de la meringue.",
    funFact:
      "La meringue italienne, montée avec un sirop de sucre cuit à 118 °C, est plus stable et brillante que la meringue française : elle ne retombe pas et se colore joliment.",
    coordinates: '43.2965° N, 5.3698° E',
    elevation: 'Crème citron & Meringue italienne',
    photo: {
      url: '/gallery/patis-tarte-citron.webp',
      text: 'Tarte au citron meringuée dorée',
      pos: 'center',
      by: 'Maison Miche de Pain',
    },
  },
  {
    common: 'Paris-Brest',
    binomial: 'Corona Praline',
    family: 'Pâte à Choux & Crème Mousseline Praliné',
    origin: 'Maisons-Laffitte, France (Louis Durand, 1910)',
    status: 'Rare',
    rarityScore: 85,
    description:
      "Une couronne de pâte à choux parsemée d'amandes effilées, généreusement garnie d'une crème mousseline au praliné noisette. Sa forme circulaire et sa richesse en font l'un des sommets de la pâtisserie française classique.",
    funFact:
      "Il fut créé en 1910 en l'honneur de la course cycliste Paris-Brest-Paris : sa forme de couronne évoque une roue de bicyclette.",
    coordinates: '48.9476° N, 2.1447° E',
    elevation: 'Pâte à choux & Mousseline pralinée',
    photo: {
      url: '/gallery/patis-paris-brest.webp',
      text: 'Paris-Brest praliné en couronne',
      pos: 'center',
      by: 'Maison Miche de Pain',
    },
  },
];

export const patisserieGallery: GalleryConfig = {
  specimens: patisserieSpecimens,
  brandTitle: 'GÂTEAUX',
  brandSubtitle: 'Exposition Circulaire 3D • Pâtisseries Fines & Saisonnières',
  welcomeTitle: 'Le Cabinet des Pâtisseries',
  welcomeSubtitle: 'Une Exposition Interactive 3D • Crèmes & Glaçages',
  welcomeIntro:
    'Bienvenue dans la vitrine numérique de nos pâtisseries fines, montées à la main et sublimées de fruits de saison. Cette exposition est entièrement interactive :',
  itemLabel: 'Pâtisserie',
  metricLabel: 'Technique Signature',
};

// ─── Carte 4 : Snacking (sandwichs & recettes boulangères) ───
const snackingSpecimens: Specimen[] = [
  {
    common: 'Sandwich Poulet Crudités',
    binomial: 'Baguetta Pullus',
    family: 'Baguette Tradition & Poulet Rôti',
    origin: 'Boulangeries de quartier, France',
    status: 'Stable',
    rarityScore: 60,
    description:
      "Une demi-baguette de tradition croustillante, garnie de blanc de poulet rôti, de crudités fraîches, de salade croquante et d'une pointe de mayonnaise maison. Le grand classique du déjeuner sur le pouce, préparé minute avec notre pain du jour.",
    funFact:
      "Le secret d'un bon sandwich baguette tient à la fraîcheur du pain : garni trop tôt, la mie s'humidifie ; c'est pourquoi on le prépare à la commande.",
    coordinates: '48.8566° N, 2.3522° E',
    elevation: 'Baguette Tradition du jour',
    photo: {
      url: '/gallery/snack-sandwich-poulet.webp',
      text: 'Sandwich baguette au poulet et crudités',
      pos: 'center',
      by: 'Maison Miche de Pain',
    },
  },
  {
    common: 'Sandwich Poulet Pesto',
    binomial: 'Baguetta Basilicum',
    family: 'Baguette Tradition, Poulet & Pesto',
    origin: 'Inspiration méditerranéenne, France',
    status: 'Stable',
    rarityScore: 63,
    description:
      "Une variation gourmande sur la baguette de tradition : émincé de poulet, pesto de basilic frais broyé minute, roquette poivrée et copeaux. Un sandwich parfumé où l'herbe fraîche et l'huile d'olive réveillent la mie croustillante.",
    funFact:
      "Une goutte de vinaigre balsamique réduit dans le pesto apporte l'acidité qui tranche avec le gras de l'huile d'olive et relève tout le sandwich.",
    coordinates: '43.7102° N, 7.2620° E',
    elevation: 'Baguette Tradition • Pesto maison',
    photo: {
      url: '/gallery/snack-sandwich-poulet-pesto.webp',
      text: 'Sandwich baguette poulet et pesto',
      pos: 'center',
      by: 'Maison Miche de Pain',
    },
  },
  {
    common: 'Sandwich Thon Crudités',
    binomial: 'Baguetta Thunnus',
    family: 'Baguette Tradition & Thon',
    origin: 'Boulangeries de quartier, France',
    status: 'Stable',
    rarityScore: 58,
    description:
      "Une baguette de tradition garnie d'un thon fondant lié à la mayonnaise, rehaussé de crudités croquantes, d'œuf et de salade fraîche. Généreux et rassasiant, il reste l'un des sandwichs préférés des déjeuners rapides.",
    funFact:
      "Émietter le thon puis le mélanger à un peu de fromage frais plutôt qu'à de la seule mayonnaise le rend plus onctueux et moins gras en bouche.",
    coordinates: '48.8566° N, 2.3522° E',
    elevation: 'Baguette Tradition du jour',
    photo: {
      url: '/gallery/snack-sandwich-thon.webp',
      text: 'Sandwich baguette au thon',
      pos: 'center',
      by: 'Maison Miche de Pain',
    },
  },
  {
    common: 'Friand au Fromage',
    binomial: 'Feuilleta Caseus',
    family: 'Pâte Feuilletée & Béchamel au Fromage',
    origin: 'Charcuteries & boulangeries françaises',
    status: 'Stable',
    rarityScore: 66,
    description:
      "Un feuilletage pur beurre doré renfermant une garniture fondante de béchamel au fromage. Croustillant à l'extérieur, moelleux et coulant à cœur, le friand se déguste tiède, tout juste sorti du four, pour un en-cas réconfortant.",
    funFact:
      "Le friand descend du pâté feuilleté lorrain ; sa version au fromage s'est imposée en boulangerie comme l'alternative végétarienne au friand à la viande.",
    coordinates: '48.6921° N, 6.1844° E',
    elevation: 'Feuilletage & Béchamel',
    photo: {
      url: '/gallery/snack-friand-fromage.webp',
      text: 'Friand au fromage doré',
      pos: 'center',
      by: 'Maison Miche de Pain',
    },
  },
  {
    common: 'Quiche Lorraine',
    binomial: 'Torta Lotharingia',
    family: 'Pâte Brisée, Migaine & Lardons',
    origin: 'Lorraine, France (recette du XVIᵉ siècle)',
    status: 'Rare',
    rarityScore: 72,
    description:
      "Un fond de pâte brisée croustillant garni de sa « migaine » — un appareil crémeux d'œufs et de crème fraîche — et de lardons fumés. Dorée au four jusqu'à obtenir une surface tremblotante et ambrée, elle se sert tiède, part généreuse.",
    funFact:
      "La véritable quiche lorraine ne contient ni fromage ni oignon : uniquement œufs, crème et lardons. L'ajout de gruyère en fait, techniquement, une « quiche vosgienne ».",
    coordinates: '48.6921° N, 6.1844° E',
    elevation: 'Pâte brisée • Migaine œufs-crème',
    photo: {
      url: '/gallery/snack-quiche-lorraine.webp',
      text: 'Quiche lorraine sur ardoise',
      pos: 'center',
      by: 'Maison Miche de Pain',
    },
  },
  {
    common: 'Formule Déjeuner',
    binomial: 'Prandium Completum',
    family: 'Sandwich, Boisson & Douceur',
    origin: 'Notre comptoir, Miche de Pain',
    status: 'Stable',
    rarityScore: 55,
    description:
      "L'offre complète du midi : un sandwich baguette au choix, une boisson et une viennoiserie ou pâtisserie du jour. Composée chaque matin avec nos produits frais, la formule change au fil des saisons et des arrivages du fournil.",
    funFact:
      "Composer sa formule autour d'un pain au levain plutôt qu'un pain blanc prolonge la satiété : son index glycémique plus bas évite le coup de fatigue de l'après-midi.",
    coordinates: '48.8760° N, 2.3400° E',
    elevation: 'Sandwich + Boisson + Douceur',
    photo: {
      url: '/gallery/snack-formule-dejeuner.webp',
      text: 'Formule déjeuner sur table sombre',
      pos: 'center',
      by: 'Maison Miche de Pain',
    },
  },
];

export const snackingGallery: GalleryConfig = {
  specimens: snackingSpecimens,
  brandTitle: 'MIDI',
  brandSubtitle: 'Exposition Circulaire 3D • Snacking & Recettes Boulangères',
  welcomeTitle: 'Le Comptoir du Midi',
  welcomeSubtitle: 'Une Exposition Interactive 3D • Sandwichs & Salés',
  welcomeIntro:
    'Bienvenue au comptoir de nos recettes salées, sandwichs sur baguette de tradition et pièces à emporter préparés frais chaque jour. Cette exposition est entièrement interactive :',
  itemLabel: 'Recette',
  metricLabel: 'Base & Garniture',
};
