import ExperienceClient from "@/components/sections/ExperienceClient";
import type { Experience } from "@/data/experience";

const API = 'http://127.0.0.1:4000/api';

async function getExperience(type: string): Promise<Experience[]> {
  try {
    const res = await fetch(`${API}/experience?type=${type}`, { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function Experience() {
  const [work, education, certifications] = await Promise.all([
    getExperience('work'),
    getExperience('education'),
    getExperience('certification'),
  ]);

  return <ExperienceClient work={work} education={education} certifications={certifications} />;
}