// Passe une URL d'image par le CDN images.weserv.nl : redimensionnement + WebP + qualité.
// Ex. une photo ibb.co de 890 Ko devient un WebP ~88 Ko, et est mis en cache par le CDN.
export const optimizeImg = (url: string, w = 800, q = 72): string => {
  if (!url) return url;
  // Chemins locaux/relatifs (ex. /gallery/x.webp) : déjà optimisés → inchangés.
  if (!/^https?:\/\//i.test(url)) return url;
  if (url.includes('images.weserv.nl')) return url;
  const stripped = url.replace(/^https?:\/\//, '');
  return `https://images.weserv.nl/?url=${stripped}&w=${w}&q=${q}&output=webp`;
};
