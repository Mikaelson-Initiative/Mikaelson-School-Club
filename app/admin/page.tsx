'use client';

import { useState } from 'react';

const PIN = '2026';

/* ── Static data pulled from site ── */
const SCHOOLS = [
  { name: 'Igbobi College', city: 'Lagos', status: 'Registered', date: '2026-05-01' },
  { name: 'St Finbars College', city: 'Lagos', status: 'Registered', date: '2026-05-01' },
  { name: "St Gregory's College", city: 'Lagos', status: 'Registered', date: '2026-05-01' },
  { name: 'Methodist Girls & Boys', city: 'Lagos', status: 'Registered', date: '2026-05-01' },
  { name: 'Dowen College', city: 'Lagos', status: 'Registered', date: '2026-05-01' },
  { name: 'Yabatech Secondary School', city: 'Lagos', status: 'Registered', date: '2026-05-01' },
  { name: "King's College", city: 'Lagos', status: 'Registered', date: '2026-05-01' },
  { name: "Kay's International College", city: 'Lagos', status: 'Registered', date: '2026-05-01' },
  { name: 'Our Lady of Apostles Secondary School', city: 'Lagos', status: 'Registered', date: '2026-05-01' },
  { name: 'Cathedral Missionary School (CMS)', city: 'Lagos', status: 'Registered', date: '2026-05-01' },
];

const TEAM = [
  { name: 'Michael Olukayode', role: 'Team Lead' },
  { name: 'Boluwatife Adeleke', role: 'Project Manager' },
  { name: 'Irene Ezechi', role: 'Program Manager' },
  { name: 'Mariam Jimoh', role: 'ESG and Impact' },
  { name: 'Bright Temitope Ayegbusi', role: 'Visuals and Designs' },
  { name: 'Feranmi Oluwole', role: 'Operations Manager' },
  { name: 'Theresa Asiedu Gyamfi', role: 'GRC and Policy Engineer' },
  { name: 'Esther Adeoye', role: 'Social Media Manager' },
  { name: 'Ariyo Aresa', role: 'Front-end Engineer' },
  { name: 'Blessing Olusola', role: 'Technical Writer' },
  { name: 'Ayomide Idowu', role: 'Visuals and Designs' },
];

const METRICS = [
  { label: 'Schools Registered', value: 10, sub: 'Lagos chapters', color: 'bg-[#5ce1e6]', text: 'text-[#003e45]' },
  { label: 'Active Chapters', value: 0, sub: 'Launching 2025', color: 'bg-[#003e45]', text: 'text-white' },
  { label: 'Students Enrolled', value: 0, sub: 'Enrolling soon', color: 'bg-[#f3eee5]', text: 'text-[#003e45]' },
  { label: 'Partner Schools', value: 10, sub: 'Total in network', color: 'bg-[#5ce1e6]', text: 'text-[#003e45]' },
  { label: 'Sponsors', value: 0, sub: 'Seeking sponsors', color: 'bg-[#f3eee5]', text: 'text-[#003e45]' },
  { label: 'Partner Organisations', value: 0, sub: 'Outreach ongoing', color: 'bg-[#f3eee5]', text: 'text-[#003e45]' },
  { label: 'Team Members', value: 11, sub: 'Core team', color: 'bg-[#003e45]', text: 'text-white' },
  { label: 'Cities Covered', value: 1, sub: 'Lagos, Nigeria', color: 'bg-[#5ce1e6]', text: 'text-[#003e45]' },
  { label: 'Volunteer Applications', value: 0, sub: 'Applications open', color: 'bg-[#f3eee5]', text: 'text-[#003e45]' },
  { label: 'School Enquiries', value: 0, sub: 'Via website form', color: 'bg-[#f3eee5]', text: 'text-[#003e45]' },
  { label: 'Sponsor Enquiries', value: 0, sub: 'Via website form', color: 'bg-[#f3eee5]', text: 'text-[#003e45]' },
  { label: 'Trained Champions', value: 0, sub: 'Target: 10 by Q3', color: 'bg-[#003e45]', text: 'text-white' },
];

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (pin === PIN) {
      sessionStorage.setItem('msc_admin', '1');
      onLogin();
    } else {
      setError(true);
      setPin('');
    }
  }

  return (
    <div className="min-h-screen bg-[#f3eee5] flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl border border-[#e7e0d4] p-10 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <img src="/MSC%20logo.png" alt="MSC" className="w-10 h-10 object-contain" />
          <div>
            <div className="font-bold text-[#003e45] text-sm leading-tight">Mikaelson School Club</div>
            <div className="text-xs text-[#6e675c] font-mono uppercase tracking-widest">Admin</div>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-[#003e45] mb-1" style={{ fontFamily: 'var(--font-display)' }}>Sign in</h1>
        <p className="text-sm text-[#6e675c] mb-6">Enter your admin PIN to continue.</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            placeholder="Enter PIN"
            value={pin}
            onChange={e => { setPin(e.target.value); setError(false); }}
            className="w-full border border-[#e7e0d4] rounded-xl px-4 py-3 text-sm bg-[#f3eee5] text-[#201d16] outline-none focus:border-[#5ce1e6] transition-colors"
            autoFocus
          />
          {error && <p className="text-red-500 text-xs">Incorrect PIN. Try again.</p>}
          <button
            type="submit"
            className="w-full bg-[#5ce1e6] text-[#003e45] font-bold rounded-full py-3 text-sm hover:translate-y-0.5 transition-transform"
            style={{ boxShadow: '0 8px 0 -2px #003e45' }}
          >
            Access Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState<'overview' | 'schools' | 'team'>('overview');

  return (
    <div className="min-h-screen bg-[#f9f7f3]">
      {/* Top bar */}
      <header className="bg-white border-b border-[#e7e0d4] sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/MSC%20logo.png" alt="MSC" className="w-8 h-8 object-contain" />
            <div>
              <span className="font-bold text-[#003e45] text-sm" style={{ fontFamily: 'var(--font-display)' }}>Mikaelson School Club</span>
              <span className="text-xs text-[#6e675c] font-mono ml-2 uppercase tracking-widest">Admin</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-[#6e675c] font-mono hidden sm:block">{new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            <button onClick={onLogout} className="text-xs font-mono uppercase tracking-widest text-[#6e675c] hover:text-[#003e45] transition-colors border border-[#e7e0d4] rounded-full px-4 py-1.5">
              Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Page title */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-[#003e45] tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>Dashboard</h1>
          <p className="text-sm text-[#6e675c] mt-1">Real-time snapshot of the Mikaelson School Club network.</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {(['overview', 'schools', 'team'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-xs font-mono uppercase tracking-widest font-bold border transition-all ${activeTab === tab ? 'bg-[#003e45] text-white border-[#003e45]' : 'bg-white text-[#6e675c] border-[#e7e0d4] hover:border-[#003e45]'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Overview tab */}
        {activeTab === 'overview' && (
          <>
            <div className="grid grid-cols-2 max-sm:grid-cols-3 max-lg:grid-cols-4 gap-4 mb-10">
              {METRICS.map(m => (
                <div key={m.label} className={`${m.color} rounded-2xl p-5`}>
                  <div className={`text-4xl font-extrabold tracking-tight leading-none ${m.text}`} style={{ fontFamily: 'var(--font-display)' }}>
                    {m.value}
                  </div>
                  <div className={`text-sm font-semibold mt-2 ${m.text}`}>{m.label}</div>
                  <div className={`text-xs mt-1 opacity-70 ${m.text}`}>{m.sub}</div>
                </div>
              ))}
            </div>

            {/* Status overview */}
            <div className="grid grid-cols-1 max-md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl border border-[#e7e0d4] p-6">
                <h2 className="text-sm font-mono uppercase tracking-widest text-[#003e45] font-bold mb-4">Programme Status</h2>
                {[
                  { label: 'Website', status: 'Live', ok: true },
                  { label: 'Lagos Chapters', status: 'Launching 2025', ok: false },
                  { label: 'Champion Training', status: 'Not started', ok: false },
                  { label: 'Sponsor Partnerships', status: 'Seeking', ok: false },
                  { label: 'School Onboarding', status: 'In progress', ok: true },
                  { label: 'Volunteer Programme', status: 'Open', ok: true },
                ].map(r => (
                  <div key={r.label} className="flex items-center justify-between py-2.5 border-b border-[#f3eee5] last:border-0">
                    <span className="text-sm text-[#201d16]">{r.label}</span>
                    <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-full ${r.ok ? 'bg-[#e0f6f7] text-[#003e45]' : 'bg-[#f3eee5] text-[#6e675c]'}`}>{r.status}</span>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-2xl border border-[#e7e0d4] p-6">
                <h2 className="text-sm font-mono uppercase tracking-widest text-[#003e45] font-bold mb-4">Key Targets</h2>
                {[
                  { label: 'Partner schools by end of 2025', target: 10, current: 10 },
                  { label: 'Active chapters by Q3 2025', target: 5, current: 0 },
                  { label: 'Students enrolled', target: 250, current: 0 },
                  { label: 'Trained Champions', target: 10, current: 0 },
                  { label: 'Sponsors secured', target: 3, current: 0 },
                ].map(t => (
                  <div key={t.label} className="mb-4 last:mb-0">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-[#201d16]">{t.label}</span>
                      <span className="font-mono text-[#6e675c]">{t.current}/{t.target}</span>
                    </div>
                    <div className="h-1.5 bg-[#f3eee5] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#5ce1e6] rounded-full transition-all"
                        style={{ width: `${Math.min((t.current / t.target) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Schools tab */}
        {activeTab === 'schools' && (
          <div className="bg-white rounded-2xl border border-[#e7e0d4] overflow-hidden">
            <div className="px-6 py-4 border-b border-[#e7e0d4] flex items-center justify-between">
              <h2 className="text-sm font-mono uppercase tracking-widest text-[#003e45] font-bold">Registered Schools</h2>
              <span className="text-xs font-mono text-[#6e675c]">{SCHOOLS.length} schools</span>
            </div>
            <div className="divide-y divide-[#f3eee5]">
              {SCHOOLS.map((s, i) => (
                <div key={s.name} className="px-6 py-4 flex items-center gap-4 hover:bg-[#f9f7f3] transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-[#e0f6f7] text-[#003e45] flex items-center justify-center font-mono font-bold text-xs flex-shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm text-[#201d16]">{s.name}</div>
                    <div className="text-xs text-[#6e675c] font-mono">{s.city}</div>
                  </div>
                  <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#f3eee5] text-[#6e675c] flex-shrink-0">{s.status}</span>
                  <span className="text-xs text-[#6e675c] font-mono hidden sm:block flex-shrink-0">{s.date}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Team tab */}
        {activeTab === 'team' && (
          <div className="bg-white rounded-2xl border border-[#e7e0d4] overflow-hidden">
            <div className="px-6 py-4 border-b border-[#e7e0d4] flex items-center justify-between">
              <h2 className="text-sm font-mono uppercase tracking-widest text-[#003e45] font-bold">Core Team</h2>
              <span className="text-xs font-mono text-[#6e675c]">{TEAM.length} members</span>
            </div>
            <div className="divide-y divide-[#f3eee5]">
              {TEAM.map((t, i) => (
                <div key={t.name} className="px-6 py-4 flex items-center gap-4 hover:bg-[#f9f7f3] transition-colors">
                  <div className="w-9 h-9 rounded-full bg-[#5ce1e6] text-[#003e45] flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {t.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm text-[#201d16]">{t.name}</div>
                    <div className="text-xs text-[#6e675c]">{t.role}</div>
                  </div>
                  <a
                    href={`mailto:${t.name.split(' ')[0].toLowerCase()}@mikaelsoninitiative.org`}
                    className="text-xs font-mono text-[#6e675c] hover:text-[#003e45] transition-colors hidden sm:block"
                  >
                    {t.name.split(' ')[0].toLowerCase()}@mikaelsoninitiative.org
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(() => {
    if (typeof window !== 'undefined') return sessionStorage.getItem('msc_admin') === '1';
    return false;
  });

  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />;
  return <Dashboard onLogout={() => { sessionStorage.removeItem('msc_admin'); setAuthed(false); }} />;
}
