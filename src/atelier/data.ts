import { CardData } from './types';

export const showcaseCards: CardData[] = [
  {
    id: 'pains-levain',
    icon: 'grain',
    iconBg: '#a3704c',
    title: 'Pains au Levain Naturel & Farines Bio',
    description: 'Fermentation lente de 24h',
    photoSrc: '/gallery/pain-levain-boule.webp',
    nightPhotoSrc: '/gallery/pain-campagne.webp',
    videoSrc: '',
    altText: 'Pains au Levain Naturel & Farines Bio',
    fermentationTime: '24 heures (Température contrôlée)',
    hydration: '78%',
    bakingTemp: '245°C (Four à sole)',
    ingredients: [
      'Farine de blé de population Bio (T80)',
      'Eau de source filtrée',
      'Levain naturel de seigle sauvage',
      'Sel de Guérande récolté à la main'
    ],
    steps: [
      'Autolyse prolongée des farines et de l’eau pendant 1 heure',
      'Inoculation douce du levain jeune suivi d’un pétrissage manuel',
      'Rabats d’étirement successifs toutes les 30 minutes (Bulk fermentation)',
      'Mise en forme délicate en banneton et repos de 18h au froid à 4°C',
      'Cuisson sur pierre brûlante avec injection de buée saturée'
    ],
    funFact: 'Le levain utilisé dans notre atelier est entretenu quotidiennement depuis 2018 avec une farine de seigle complète.',
    bakerTip: 'Pour une croûte croustillante et brillante, n’hésitez pas à déposer quelques glaçons dans un lèchefrite préchauffé juste après l’enfournement.'
  },
  {
    id: 'viennoiseries-beurre',
    icon: 'bakery_dining',
    iconBg: '#d4a373',
    title: 'Viennoiseries Pur Beurre AOP',
    description: "Feuilletage d'une croustillance divine",
    photoSrc: '/gallery/vienn-croissant.webp',
    nightPhotoSrc: '/gallery/vienn-pain-chocolat.webp',
    videoSrc: '',
    altText: 'Viennoiseries Pur Beurre AOP',
    fermentationTime: '16 heures (Pointage lent au froid)',
    hydration: '58% (Lait entier)',
    bakingTemp: '185°C (Chaleur tournante)',
    ingredients: [
      'Farine de gruau d’or de force (T45)',
      'Beurre de tourage d’Échiré AOP (84% M.G.)',
      'Lait entier cru local',
      'Levure boulangère fraîche',
      'Sucre de canne blond de canne'
    ],
    steps: [
      'Pétrissage de la détrempe sans excès de force pour préserver l’élasticité',
      'Repost nocturne de la détrempe pour harmoniser la température du pâton',
      'Enchâssement du beurre froid et réalisation de 3 tours simples précis',
      'Détente de la pâte au congélateur entre chaque pliage',
      'Façonnage délicat à la main et pousse lente à 25°C avant dorure double'
    ],
    funFact: 'La réussite du feuilletage réside dans l’alternance parfaite de couches de beurre et de pâte sans aucun déchirement.',
    bakerTip: 'Baissez la température du four de 10°C à mi-cuisson pour permettre au cœur de la viennoiserie de cuire sans brûler la croûte externe.'
  },
  {
    id: 'patisseries-fines',
    icon: 'cake',
    iconBg: '#e07a5f',
    title: 'Pâtisseries Fines & Saisonnières',
    description: 'Fruits locaux et sucres non raffinés',
    photoSrc: '/gallery/patis-mille-feuille.webp',
    nightPhotoSrc: '/gallery/patis-opera.webp',
    videoSrc: '',
    altText: 'Pâtisseries Fines & Saisonnières',
    fermentationTime: 'Sans objet (Création pâtissière)',
    hydration: 'Variable (Infusions botaniques)',
    bakingTemp: '165°C (Four ventilé doux)',
    ingredients: [
      'Farine d’épeautre clair ancienne (T70)',
      'Sucre de fleur de coco à faible index glycémique',
      'Fruits de saison mûris sur l’arbre',
      'Fleurs comestibles et herbes sauvages infusées',
      'Poudre d’amandes brutes'
    ],
    steps: [
      'Sabler la farine avec le beurre doux noisette et le sucre de coco',
      'Cuisson à blanc de la pâte pour obtenir un fond friable et doré',
      'Confection d’une compotée de fruits fraîche acidulée à la verveine',
      'Montage géométrique des fruits frais en cercles concentriques harmonieux',
      'Nappage léger d’un sirop de fleur de sureau pour une brillance épurée'
    ],
    funFact: 'Nous ajustons le taux de sucre hebdomadairement selon la sucrosité naturelle des fruits récoltés.',
    bakerTip: 'Une pincée de fleur de sel dans la pâte sablée rehaussera la rondeur fruitée sans saturer vos papilles de sucre.'
  },
  {
    id: 'snacking-recettes',
    icon: 'lunch_dining',
    iconBg: '#4f772d',
    title: 'Snacking',
    description: 'Sandwichs frais & recettes boulangères',
    photoSrc: '/gallery/snack-sandwich-poulet.webp',
    nightPhotoSrc: '/gallery/snack-quiche-lorraine.webp',
    videoSrc: '',
    altText: 'Snacking et recettes boulangères',
    fermentationTime: '18 heures (Pâte de pain de campagne)',
    hydration: '75%',
    bakingTemp: '230°C',
    ingredients: [
      'Pain focaccia moelleux à l’huile d’olive vierge',
      'Légumes d’été rôtis au thym et à l’ail rose',
      'Fromage de chèvre frais de la ferme voisine',
      'Pesto de basilic frais broyé minute',
      'Roquette sauvage poivrée'
    ],
    steps: [
      'Étaler la pâte à focaccia garnie d’huile de première pression à froid',
      'Cuire jusqu’à obtenir des alvéoles dorées et légèrement craquantes',
      'Laisser refroidir puis trancher horizontalement avec douceur',
      'Garnir généreusement de légumes grillés confits, chèvre frais et herbes',
      'Passer sous le gril de cuisson quelques secondes avant dégustation'
    ],
    funFact: 'La focaccia de notre snacking est cuite sur une couche fine de semoule de blé dur pour une texture craquante sous la dent.',
    bakerTip: 'Ajoutez une goutte de vinaigre balsamique réduit dans le pesto pour apporter de l’acidité qui tranchera avec le gras de l’huile d’olive.'
  }
];
