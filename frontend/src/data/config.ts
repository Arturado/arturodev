const API = 'http://127.0.0.1:4000/api';

export type SiteConfig = {
  site_name: string;
  site_title: string;
  site_description: string;
  site_email: string;
  site_location: string;
  site_available: string;
  social_github: string;
  social_linkedin: string;
  social_twitter: string;
  primary_color: string;
  show_blog: string;
  show_experience: string;
  show_portfolio: string;
};

export async function getConfig(): Promise<SiteConfig> {
  try {
    const res = await fetch(`${API}/config`, { cache: 'no-store' });
    if (!res.ok) return {} as SiteConfig;
    return res.json();
  } catch {
    return {} as SiteConfig;
  }
}