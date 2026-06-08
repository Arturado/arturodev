export type HeroSlide = {
  id: string;
  title: string;
  titleEn?: string;
  subtitle: string;
  subtitleEn?: string;
  description: string;
  descriptionEn?: string;
  ctaText: string;
  ctaTextEn?: string;
  ctaUrl: string;
  imageUrl?: string;
  order: number;
  isActive: boolean;
};

const API = process.env.API_URL || 'http://127.0.0.1:4000/api';

export async function getHeroSlides(): Promise<HeroSlide[]> {
  try {
    const res = await fetch(`${API}/hero-slides`, { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}
