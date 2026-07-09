export interface CardData {
  id: string;
  icon: string;
  iconBg: string;
  title: string;
  description: string;
  photoSrc: string;
  nightPhotoSrc: string;
  videoSrc: string;
  altText: string;
  // Detail page info
  fermentationTime?: string;
  hydration?: string;
  bakingTemp?: string;
  ingredients?: string[];
  steps?: string[];
  funFact?: string;
  bakerTip?: string;
}
