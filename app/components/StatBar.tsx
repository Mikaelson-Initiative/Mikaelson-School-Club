"use client";

import { useEffect, useState } from 'react';
import Reveal from './Reveal';
import Counter from './Counter';

export default function StatBar() {
  const [statsData, setStatsData] = useState({
    totalSchools: 0,
    activeChapters: 0,
    totalStudents: 0,
    retentionRate: 0,
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/stats');
        if (res.ok) {
          const data = await res.json();
          setStatsData({
            totalSchools: data.totalSchools,
            activeChapters: data.activeChapters,
            totalStudents: data.totalStudents,
            retentionRate: data.retentionRate,
          });
        }
      } catch (err) {
        console.error("Failed to fetch stats", err);
      }
    }
    fetchStats();
  }, []);

  const STATS = [
    { n: statsData.activeChapters, s: '', label: 'Active chapters' },
    { n: statsData.totalStudents, s: '+', label: 'Students engaged' },
    { n: statsData.totalSchools, s: '', label: 'Partner schools' },
    { n: statsData.retentionRate, s: '%', label: 'Stay through the year' },
  ];

  return (
    <div
      className="max-w-[1180px] mx-auto px-8 max-sm:px-[18px] xs:px-4 relative z-[2]"
      style={{ marginTop: -30, marginBottom: 10 }}
    >
      <Reveal>
        {/* Stats grid: 4 cols desktop → 2 cols tablet → 1 col mobile */}
        <div className="grid grid-cols-4 max-md:grid-cols-2 max-sm:grid-cols-1 gap-px overflow-hidden bg-line border border-line rounded-[22px]">
          {STATS.map((s) => (
            <div key={s.label} className="bg-surface py-[34px] px-[28px]">
              <div
                className="font-display font-[800] leading-none tracking-[-0.03em] text-site-text"
                style={{ fontSize: 'clamp(38px, 5vw, 58px)' }}
              >
                <Counter to={s.n} suffix={s.s} />
              </div>
              <div className="font-mono text-muted text-[12px] tracking-[0.08em] uppercase mt-3">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
