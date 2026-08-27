import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Award, 
  GitFork,
  Star, 
  Code2, 
  ExternalLink, 
  Sparkles,
  Layers,
  CheckCircle2,
  FolderGit2,
  ArrowUpRight,
  RefreshCw
} from 'lucide-react';
import { CODING_PROFILES, PERSONAL_INFO, PROJECTS } from '../data/portfolioData';

interface GitHubRepoData {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  homepage?: string | null;
}

interface GitHubUserData {
  public_repos: number;
  followers: number;
  following: number;
  avatar_url: string;
  login: string;
  bio: string | null;
  created_at: string;
}

export const GitHubStatsSection: React.FC = () => {
  const [userData, setUserData] = useState<GitHubUserData | null>(null);
  const [repos, setRepos] = useState<GitHubRepoData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    async function fetchGitHubDetails() {
      setIsLoading(true);
      setFetchError(false);
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch('https://api.github.com/users/suhas935'),
          fetch('https://api.github.com/users/suhas935/repos?sort=updated&per_page=6')
        ]);

        if (userRes.ok && isMounted) {
          const userJson = await userRes.json();
          setUserData({
            public_repos: userJson.public_repos ?? 2,
            followers: userJson.followers ?? 0,
            following: userJson.following ?? 0,
            avatar_url: userJson.avatar_url || 'https://github.com/suhas935.png',
            login: userJson.login || 'suhas935',
            bio: userJson.bio || 'Computer Science Student | Software Developer',
            created_at: userJson.created_at || '2023',
          });
        }

        if (reposRes.ok && isMounted) {
          const reposJson = await reposRes.json();
          if (Array.isArray(reposJson) && reposJson.length > 0) {
            setRepos(reposJson);
          }
        }
      } catch (err) {
        if (isMounted) setFetchError(true);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchGitHubDetails();

    return () => {
      isMounted = false;
    };
  }, []);

  // Fallback real repositories if GitHub API is rate-limited or offline
  const verifiedRepos: GitHubRepoData[] = repos.length > 0 ? repos : [
    {
      id: 1,
      name: 'careerforge-ai',
      description: 'Full-stack AI-powered career development platform featuring 9 modules including resume analysis, internship recommendations, and interactive mock interview coaching.',
      html_url: 'https://github.com/suhas935/careerforge-ai',
      language: 'Python / Django',
      stargazers_count: 0,
      forks_count: 0,
      updated_at: '2025',
      homepage: 'https://careerforge-ai-production-d453.up.railway.app'
    },
    {
      id: 2,
      name: 'College_Transportation_System',
      description: 'College Transportation Management System with bus route registration, automated PDF receipt generation via ReportLab, and Google Maps API route tracking.',
      html_url: 'https://github.com/suhas935/College_Transportation_System',
      language: 'Python / Django',
      stargazers_count: 0,
      forks_count: 0,
      updated_at: '2024',
      homepage: null
    }
  ];

  const getProfileIcon = (iconName: string) => {
    switch (iconName) {
      case 'Github':
        return Github;
      case 'Linkedin':
        return Linkedin;
      case 'Award':
        return Award;
      default:
        return Code2;
    }
  };

  return (
    <section id="github" className="relative py-24 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono-code bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 mb-3">
            <Github className="w-3.5 h-3.5" />
            <span>AUTHENTIC CODE & REPOSITORIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            GitHub & Developer Profiles
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 rounded-full mt-3 mb-4" />
          <p className="text-slate-400 max-w-2xl text-sm sm:text-base">
            Verified software repositories, production codebases, and authenticated profiles across platforms.
          </p>
        </div>

        {/* Real Profile Card + Real Repository Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Real GitHub Account Card */}
          <div className="lg:col-span-4 glass-card rounded-2xl p-6 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 mb-5">
                <img
                  src={userData?.avatar_url || 'https://github.com/suhas935.png'}
                  alt="Suhas G GitHub Avatar"
                  className="w-16 h-16 rounded-2xl border-2 border-indigo-500/40 object-cover bg-slate-900"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = 'https://github.com/suhas935.png';
                  }}
                />
                <div>
                  <h3 className="text-lg font-bold text-white leading-snug">
                    {PERSONAL_INFO.name}
                  </h3>
                  <a
                    href="https://github.com/suhas935"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-mono-code text-indigo-300 hover:text-indigo-200 flex items-center gap-1"
                  >
                    <span>@suhas935</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                  <div className="text-[11px] text-slate-400 mt-1">
                    GitHub Member
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                {userData?.bio || 'Computer Science undergraduate specializing in Django backend engineering, REST APIs, and full-stack web applications.'}
              </p>

              {/* Truthful Stats from GitHub API */}
              <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
                <div>
                  <div className="text-lg font-bold text-white">
                    {userData ? userData.public_repos : '2+'}
                  </div>
                  <div className="text-[10px] font-mono-code text-slate-400">Public Repos</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-white">
                    {userData ? userData.followers : '0'}
                  </div>
                  <div className="text-[10px] font-mono-code text-slate-400">Followers</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-white">
                    {userData ? userData.following : '0'}
                  </div>
                  <div className="text-[10px] font-mono-code text-slate-400">Following</div>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-800/80">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all hover:scale-101 cursor-pointer"
              >
                <Github className="w-4 h-4" />
                <span>View github.com/suhas935</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </div>
          </div>

          {/* Real Public Repositories List */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FolderGit2 className="w-4 h-4 text-indigo-400" />
                <span>Public Repositories & Verified Source Code</span>
              </h3>
              <span className="text-xs font-mono-code text-slate-400">
                Direct from GitHub
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {verifiedRepos.map((repo) => (
                <div
                  key={repo.id}
                  className="glass-card rounded-xl p-5 border border-slate-800 hover:border-indigo-500/40 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors flex items-center gap-1.5 break-all"
                      >
                        <span>{repo.name}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono-code bg-slate-900 border border-slate-800 text-slate-400 shrink-0">
                        Public
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed mb-4">
                      {repo.description || 'Public software repository maintained by Suhas G.'}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-slate-300 font-mono-code text-[11px]">
                      <span className="w-2.5 h-2.5 rounded-full bg-indigo-400" />
                      <span>{repo.language || 'Python / Django'}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      {repo.homepage && (
                        <a
                          href={repo.homepage}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[11px] font-mono-code text-emerald-400 hover:text-emerald-300 font-semibold"
                        >
                          Live Site ↗
                        </a>
                      )}
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] font-mono-code text-slate-400 hover:text-white"
                      >
                        Code ↗
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 font-mono-code">
              <span>All repositories follow clean version control with Git branching and clear documentation.</span>
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="text-indigo-300 hover:text-indigo-200 font-semibold shrink-0"
              >
                Browse All Repositories →
              </a>
            </div>
          </div>

        </div>

        {/* Verified Coding & Professional Profiles */}
        <div>
          <div className="text-center mb-6">
            <h3 className="text-lg font-bold text-white">Verified Profiles & Professional Links</h3>
            <p className="text-xs font-mono-code text-slate-400 mt-0.5">DIRECT AUTHENTIC CONNECTIONS</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {CODING_PROFILES.map((profile, pIdx) => {
              const ProfileIcon = getProfileIcon(profile.icon);
              return (
                <a
                  key={pIdx}
                  id={`profile-card-${profile.platform.toLowerCase()}`}
                  href={profile.profileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="glass-card rounded-xl p-5 border border-slate-800 hover:border-indigo-500/40 transition-all hover:scale-102 flex flex-col justify-between group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 group-hover:text-indigo-300 transition-colors">
                      <ProfileIcon className="w-5 h-5" />
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-white">{profile.platform}</h4>
                    <span className="text-xs font-mono-code text-slate-400">@{profile.username}</span>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <span className="font-bold text-indigo-300">{profile.metric}</span>
                    <span className="text-[10px] font-mono-code text-slate-500">{profile.metricLabel}</span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
