export interface Specimen {
  common: string;
  binomial: string;
  family: string;
  origin: string;
  status: 'Critically Endangered' | 'Endangered' | 'Vulnerable' | 'Rare' | 'Near Threatened' | 'Stable';
  rarityScore: number;
  description: string;
  funFact: string;
  coordinates: string;
  elevation: string;
  photo: {
    url: string;
    text: string;
    pos?: string;
    by: string;
  };
}

export const botanicalSpecimens: Specimen[] = [
  {
    common: "Boule au Levain Naturel",
    binomial: "Panis Fermentatus",
    family: "Levain Sauvage & Fermentation Lente",
    origin: "Croissant Fertile antique & San Francisco, USA",
    status: "Stable",
    rarityScore: 75,
    description: "Une boule de campagne classique au levain naturel, dotée d'une croûte épaisse bien caramélisée et d'une mie ambrée, grasse et très alvéolée. Ensemencé avec un levain de tradition à base de levures sauvages et de bactéries lactiques, ce pain bénéficie d'une fermentation lente de 36 heures à basse température (pointage retardé), développant ainsi des arômes profonds et une acidité subtile.",
    funFact: "Le pain au levain se conserve beaucoup plus longtemps que le pain industriel car l'acidité naturelle produite lors de la fermentation ralentit le rassissement et empêche naturellement l'apparition des moisissures.",
    coordinates: "37.7749° N, 122.4194° O",
    elevation: "75% d'Hydratation",
    photo: {
      url: "/gallery/pain-levain-boule.webp",
      text: "Boule au levain sur planche en bois",
      pos: "center",
      by: "Artisan Boulanger"
    }
  },
  {
    common: "Baguette de Tradition",
    binomial: "Clavicula Panis",
    family: "Pâte Levée (Ensemencement Direct)",
    origin: "Paris, France (Décret Pain du 13 Septembre 1993)",
    status: "Stable",
    rarityScore: 65,
    description: "L'emblème ultime de la boulangerie française. Cette baguette de tradition possède une croûte ultra-croustillante, dorée, fine comme du verre, soulignée par des grignes régulières et bien ouvertes. Sa mie crème est très alvéolée et parfumée. Sa fabrication repose sur un pré-ferment (poolish) pour assurer une extensibilité optimale de la pâte et de délicats arômes de froment.",
    funFact: "Le décret pain de 1993 exige qu'une 'Baguette de tradition française' ne contienne aucun additif, ne soit jamais congelée et soit composée exclusivement de farine de blé, d'eau, de sel et de levure ou levain.",
    coordinates: "48.8566° N, 2.3522° E",
    elevation: "65% d'Hydratation",
    photo: {
      url: "/gallery/pain-baguette.webp",
      text: "Baguette sur lin sombre",
      pos: "center",
      by: "Boulangerie Traditionnelle"
    }
  },
  {
    common: "Miche au Levain de Meule",
    binomial: "Panis Secalinus",
    family: "Farines Complètes Moulues sur Pierre",
    origin: "Bretagne & Provinces Centrales, France",
    status: "Rare",
    rarityScore: 85,
    description: "Une imposante miche rustique inspirée des anciennes fournées de campagne. Préparée à base de farines bises et complètes de blés anciens moulues sur pierre de meule, cette miche généreuse se distingue par une croûte sombre, robuste et maltée, ainsi qu'une mie dense, humide et hautement nutritive aux arômes profonds de seigle et de noisette.",
    funFact: "Autrefois, les miches de campagne étaient cuites dans le four banal du village. Très volumineuses (plusieurs kilos), elles permettaient de nourrir une maisonnée durant plusieurs semaines sans sécher.",
    coordinates: "48.2020° N, 2.9322° O",
    elevation: "85% d'Hydratation",
    photo: {
      url: "/gallery/pain-miche-meule.webp",
      text: "Miche complète coupée en deux",
      pos: "center",
      by: "Four communal de campagne"
    }
  },
  {
    common: "Pain Multicéréales aux Graines",
    binomial: "Panis Seminis",
    family: "Pâte Enrichie aux Graines Torréfiées",
    origin: "Copenhague, Danemark & Europe du Nord",
    status: "Near Threatened",
    rarityScore: 80,
    description: "Un pain à forte hydratation richement parsemé d'un savoureux mélange de graines de courge, de tournesol, de sésame blanc et de lin doré. La mie reste extrêmement tendre et alvéolée, contrastant parfaitement avec le craquant d'une croûte entièrement enrobée de graines grillées exhalant de puissants arômes torréfiés.",
    funFact: "Torréfier les graines avant de les incorporer libère leurs huiles essentielles, ce qui décuple leur parfum et évite qu'elles ne s'imbibent de l'eau de la pâte pendant le pétrissage.",
    coordinates: "55.6761° N, 12.5683° E",
    elevation: "80% d'Hydratation",
    photo: {
      url: "/gallery/pain-multicereales.webp",
      text: "Pain multicéréales aux graines",
      pos: "center",
      by: "Fournil Nordique"
    }
  },
  {
    common: "Pain de Campagne Rustique",
    binomial: "Pain de Campagne",
    family: "Mélange Froment, Grand Épeautre & Seigle",
    origin: "Provinces de la France Rurale",
    status: "Vulnerable",
    rarityScore: 78,
    description: "Un pain rustique à l'ancienne mariant de la farine bise de froment (T80) avec une touche de seigle et de farine de grand épeautre. Façonné entièrement à la main et cuit directement sur sole de pierre avec une forte injection de buée, il possède une croûte rustique bien grignée et une mie colorée subtilement acidulée.",
    funFact: "Le grand épeautre était la céréale reine en Europe durant l'âge de bronze et du fer. Son écorce particulièrement robuste protège naturellement le grain contre les intempéries et les nuisibles.",
    coordinates: "46.2276° N, 2.2137° E",
    elevation: "78% d'Hydratation",
    photo: {
      url: "/gallery/pain-campagne.webp",
      text: "Pain de campagne sur planche de chêne",
      pos: "center",
      by: "Fournil Campagnard"
    }
  },
  {
    common: "Tranches de Levain Alvéolées",
    binomial: "Panis Segmentatus",
    family: "Tranches de Pain au Levain Actif",
    origin: "Boulangeries Traditionnelles Européennes",
    status: "Stable",
    rarityScore: 72,
    description: "De somptueuses tranches révélant la structure hautement alvéolée de la mie, signature d'un levain vigoureux et bien hydraté. Sa texture en bouche est à la fois élastique, tendre et incroyablement fondante. Idéal pour sublimer vos tartines salées ou sucrées.",
    funFact: "Une mie très ouverte aux alvéoles irrégulières est le signe d'une hydratation élevée, d'un pointage soigné, d'un façonnage délicat préservant les bulles de gaz, et d'un réseau glutineux parfaitement structuré.",
    coordinates: "50.8503° N, 4.3517° E",
    elevation: "72% d'Hydratation",
    photo: {
      url: "/gallery/pain-levain-tranches.webp",
      text: "Tranches de pain au levain",
      pos: "center",
      by: "L'Atelier du Levain"
    }
  }
];
