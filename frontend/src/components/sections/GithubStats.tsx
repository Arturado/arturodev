"use client";

import { useEffect, useRef, useState } from "react";
import anime from "animejs";
import { GitHubRepo, GitHubStats as GitHubStatsType, getGithubRepos, getGithubStats } from "@/data/github";
import { useLanguage } from "@/contexts/LanguageContext";

function StatCard({ label, value, index }: { label: string; value: string | number; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      anime({
        targets: cardRef.current,
        opacity: [0, 1],
        translateY: [20, 0],
        delay: 200 + index * 100,
        duration: 800,
        easing: 'easeOutExpo'
      });
    }
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="flex flex-col gap-1 rounded-2xl border p-6 transition-colors duration-300"
      style={{ borderColor: "var(--line)", background: "var(--bg-elev)" }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--fg-faint)",
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: 32,
          letterSpacing: "-0.02em",
          color: "var(--fg)",
        }}
      >
        {value}
      </span>
    </div>
  );
}

function RepoCard({ repo, index }: { repo: GitHubRepo; index: number }) {
  const cardRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      anime({
        targets: cardRef.current,
        opacity: [0, 1],
        translateY: [30, 0],
        delay: 400 + index * 80,
        duration: 800,
        easing: 'easeOutExpo'
      });
    }
  }, [index]);

  return (
    <a
      ref={cardRef}
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col gap-3 rounded-2xl border p-5 transition-all duration-300 hover:border-[var(--primary-color)]"
      style={{ borderColor: "var(--line)", background: "var(--bg-elev)" }}
    >
      <div className="flex items-start justify-between">
        <h3
          className="line-clamp-1 group-hover:text-[var(--primary-color)]"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: 18,
            letterSpacing: "-0.01em",
          }}
        >
          {repo.name}
        </h3>
        <span
          className="flex items-center gap-1"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--fg-mute)",
          }}
        >
          ★ {repo.stargazers_count}
        </span>
      </div>
      <p className="line-clamp-2 flex-1 text-sm" style={{ color: "var(--fg-mute)" }}>
        {repo.description}
      </p>
      <div className="flex items-center justify-between pt-2">
        <span
          className="rounded border px-1.5 py-0.5"
          style={{
            borderColor: "var(--line)",
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "var(--fg-faint)",
          }}
        >
          {repo.language || "Plain Text"}
        </span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--fg-faint)" }}>
          {new Date(repo.updated_at).getFullYear()}
        </span>
      </div>
    </a>
  );
}

export default function GithubStats() {
  const { t } = useLanguage();
  const [stats, setStats] = useState<GitHubStatsType | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [statsData, reposData] = await Promise.all([
          getGithubStats(),
          getGithubRepos()
        ]);
        setStats(statsData);
        setRepos(reposData.slice(0, 4)); // Mostrar top 4
      } catch (error) {
        console.error("Error loading GitHub data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return null;

  return (
    <section ref={sectionRef} id="github" className="py-24">
      <div className="container">
        <div className="section-head mb-12">
          <div>
            <div className="section-num">{t("github.pre")}</div>
            <h2 className="section-title">
              {t("github.title")} <em>{t("github.title.em")}</em>
            </h2>
          </div>
        </div>

        {stats && (
          <div className="mb-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label={t("github.stats.repos")} value={stats.totalRepos} index={0} />
            <StatCard label={t("github.stats.stars")} value={stats.totalStars} index={1} />
            <StatCard label={t("github.stats.forks")} value={stats.totalForks} index={2} />
            <StatCard
              label={t("github.stats.languages")}
              value={stats.topLanguages[0]?.name || "N/A"}
              index={3}
            />
          </div>
        )}

        <div className="flex flex-col gap-8">
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: 24,
              letterSpacing: "-0.02em",
            }}
          >
            {t("github.projects.title")}
          </h3>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {repos.map((repo, i) => (
              <RepoCard key={repo.id} repo={repo} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
