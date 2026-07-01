'use client';

import { useState, useMemo, useEffect, Dispatch, SetStateAction } from 'react';
import {
  loadEvents,
  saveEvents,
  newEventId,
  SEED_EVENTS,
  type EventItem,
  type EventType,
} from '../lib/events';

/* ── Types ── */
interface SchoolApplication {
  id: string;
  schoolName: string;
  contactName: string;
  email: string;
  phone?: string;
  location: string;
  role: string;
  studentsEstimate: number;
  message?: string;
  createdAt: string;
  status: 'PENDING' | 'REVIEWED' | 'SCHEDULED' | 'TRAINING' | 'LAUNCHED' | 'REJECTED';
}

interface School {
  id: string;
  name: string;
  city: string;
  region: string;
  status: 'Registered' | 'Active' | 'Inactive';
  approvalDate: string;
  studentCount: number;
}
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
  { name: 'Ayomide Idowu', role: 'Visuals and Designs' },
  { name: 'Happiness Obochi', role: 'Team Member' },
];

type TabKey = 'overview' | 'applications' | 'schools' | 'events' | 'analytics' | 'team';

const NAV: { key: TabKey; label: string; icon: string }[] = [
  { key: 'overview', label: 'Overview', icon: 'M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z' },
  { key: 'applications', label: 'Applications', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
  { key: 'schools', label: 'Schools', icon: 'M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.42a12 12 0 01.84 4.42 12 12 0 01-7 1 12 12 0 01-7-1 12 12 0 01.84-4.42L12 14z' },
  { key: 'events', label: 'Events', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { key: 'analytics', label: 'Analytics', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
  { key: 'team', label: 'Team', icon: 'M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1a4 4 0 100-8 4 4 0 000 8z' },
];

/* ── Login ── */
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(false);

    try {
      // 1. Fetch CSRF Token
      const csrfRes = await fetch('/api/auth/csrf', { 
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include' // CRITICAL: Tells the browser to save the CSRF cookie!
      });
      const { csrfToken } = await csrfRes.json();

      // 2. Submit Login 
      const loginRes = await fetch('/api/auth/callback/credentials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // CRITICAL: Tells the browser to SEND the CSRF cookie back!
        body: JSON.stringify({
          email,
          password,
          csrfToken,
          redirect: false,
        }),
      });

      // NextAuth returns ok: true or redirects on success!
      if (loginRes.ok || loginRes.redirected) {
        // Success! 
        sessionStorage.setItem('msc_admin', '1');
        onLogin();
        return; // Exit early!
      }

      // If we reach here, it failed. NOW we can safely parse the error JSON.
      const data = await loginRes.json();
      console.error("Login failed:", data.error);
      setError(true);
    } catch (err) {
      console.error("Network/Parsing error:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f3eee5] grid place-items-center p-6">
      <div className="bg-white rounded-2xl border border-[#e7e0d4] p-10 w-[min(92vw,400px)] shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <img src="/MSC%20logo.png" alt="MSC" className="w-10 h-10 object-contain" />
          <div>
            <div className="font-bold text-[#003e45] text-sm leading-tight">Mikaelson School Club</div>
            <div className="text-xs text-[#6e675c] font-mono uppercase tracking-widest">Admin</div>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-[#003e45] mb-1" style={{ fontFamily: 'var(--font-display)' }}>Sign in</h1>
        <p className="text-sm text-[#6e675c] mb-6">Enter your email and password to continue.</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={e => { setEmail(e.target.value); setError(false); }}
            className="w-full border border-[#e7e0d4] rounded-xl px-4 py-3 text-sm bg-[#f3eee5] text-[#201d16] outline-none focus:border-[#5ce1e6] transition-colors"
            autoFocus
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => { setPassword(e.target.value); setError(false); }}
            className="w-full border border-[#e7e0d4] rounded-xl px-4 py-3 text-sm bg-[#f3eee5] text-[#201d16] outline-none focus:border-[#5ce1e6] transition-colors"
            required
          />
          {error && <p className="text-red-500 text-xs">Invalid credentials. Try again.</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#5ce1e6] text-[#003e45] font-bold rounded-full py-3 text-sm hover:translate-y-0.5 transition-transform disabled:opacity-50 disabled:hover:translate-y-0"
            style={{ boxShadow: '0 8px 0 -2px #003e45' }}
          >
            {loading ? 'Signing in...' : 'Access Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ── Empty event form ── */
const emptyEvent = (): Omit<EventItem, 'id'> => ({
  title: '', date: '', time: '', location: '', description: '', category: 'Workshop', type: 'upcoming', attendees: '', registrationUrl: '',
});

/* ── Dashboard ── */
function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState<TabKey>('overview');
  const [applications, setApplications] = useState<SchoolApplication[]>([]);
  const [schools, setSchools] = useState<School[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const appsRes = await fetch('/api/admin/applications', { credentials: 'include' });
        if (appsRes.ok) {
          const data = await appsRes.json();
          setApplications(Array.isArray(data) ? data : data.applications || []);
        }

        const schoolsRes = await fetch('/api/admin/schools', { credentials: 'include' });
        if (schoolsRes.ok) {
          const data = await schoolsRes.json();
          setSchools(Array.isArray(data) ? data : data.schools || []);
        }

        const eventsRes = await fetch('/api/admin/events', { credentials: 'include', cache: 'no-store' });
        if (eventsRes.ok) {
          const data = await eventsRes.json();
          const mappedEvents = (Array.isArray(data) ? data : data.events || []).map((e: any) => ({
            ...e,
            type: e.isPast ? 'past' : 'upcoming',
            date: e.date.split('T')[0],
            category: e.category || 'Other',
            registrationUrl: e.registrationUrl || '',
          }));
          setEvents(mappedEvents);
        }
      } catch (err) {
        console.error('Error fetching admin data:', err);
      }
    }
    fetchData();
  }, []);

  // Events (now fetched from backend)
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => { setMounted(true); }, []);

  // Filters
  const [appFilter, setAppFilter] = useState<'ALL' | 'PENDING' | 'REVIEWED' | 'SCHEDULED' | 'TRAINING' | 'LAUNCHED' | 'REJECTED'>('ALL');
  const [schoolSortField, setSchoolSortField] = useState<keyof School>('name');
  const [schoolSortOrder, setSchoolSortOrder] = useState<'asc' | 'desc'>('asc');
  const [schoolSearch, setSchoolSearch] = useState('');

  // Event editor state
  const [eventForm, setEventForm] = useState<Omit<EventItem, 'id'>>(emptyEvent());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showEventForm, setShowEventForm] = useState(false);

  const stats = useMemo(() => {
    const approvedChapters = schools.filter(s => s.status === 'Active' || s.status === 'Registered').length;
    const activeChapters = schools.filter(s => s.status === 'Active').length;
    const totalStudents = schools.reduce((acc, s) => acc + s.studentCount, 0);
    const pendingApps = applications.filter(a => a.status === 'PENDING').length;
    return { approvedChapters, activeChapters, totalStudents, pendingApps, totalApps: applications.length };
  }, [schools, applications]);

  const filteredApplications = applications.filter(app => appFilter === 'ALL' ? true : app.status === appFilter);

  const sortedSchools = useMemo(() => {
    return [...schools]
      .filter(s => s.name.toLowerCase().includes(schoolSearch.toLowerCase()) || s.city.toLowerCase().includes(schoolSearch.toLowerCase()))
      .sort((a, b) => {
        const valA = a[schoolSortField]; const valB = b[schoolSortField];
        if (typeof valA === 'string' && typeof valB === 'string') return schoolSortOrder === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
        if (typeof valA === 'number' && typeof valB === 'number') return schoolSortOrder === 'asc' ? valA - valB : valB - valA;
        return 0;
      });
  }, [schools, schoolSortField, schoolSortOrder, schoolSearch]);

  const upcomingCount = events.filter(e => e.type === 'upcoming').length;

  const handleStatusChange = async (appId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/applications/${appId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setApplications(apps => apps.map(a => a.id === appId ? { ...a, status: newStatus as any } : a));
        if (newStatus === 'LAUNCHED') {
          const app = applications.find(a => a.id === appId);
          if (app) {
            const newSchool: School = {
              id: `school-${Date.now()}`,
              name: app.schoolName,
              city: app.location.split(',')[0].trim(),
              region: app.location.split(',')[1]?.trim() || 'Lagos',
              status: 'Registered',
              approvalDate: new Date().toISOString().split('T')[0],
              studentCount: app.studentsEstimate,
            };
            setSchools(prev => [...prev, newSchool]);
          }
        }
      } else {
        const errText = await res.text();
        alert(`Failed to update status. Error: ${res.status} ${errText}`);
      }
    } catch (e) {
      alert(`Network error updating status: ${e instanceof Error ? e.message : String(e)}`);
    }
  };

  const exportEnrollmentData = () => {
    const csvContent = "data:text/csv;charset=utf-8,"
      + "School Name,City,Region,Status,Approval Date,Student Count\n"
      + schools.map(s => `${s.name},${s.city},${s.region},${s.status},${s.approvalDate},${s.studentCount}`).join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", `msc_enrollment_data_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link); link.click(); document.body.removeChild(link);
  };

  /* ── Events CRUD ── */
  const openNewEvent = () => { setEventForm(emptyEvent()); setEditingId(null); setShowEventForm(true); };
  const openEditEvent = (ev: EventItem) => {
    const { id, ...rest } = ev; void id;
    setEventForm({ ...emptyEvent(), ...rest });
    setEditingId(ev.id);
    setShowEventForm(true);
  };
  const cancelEventForm = () => { setShowEventForm(false); setEditingId(null); setEventForm(emptyEvent()); };
  const submitEventForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventForm.title.trim() || !eventForm.date.trim()) return;

    const payload = {
      title: eventForm.title,
      date: eventForm.date,
      time: eventForm.time,
      location: eventForm.location,
      description: eventForm.description,
      category: eventForm.category,
      isPast: eventForm.type === 'past',
      attendees: eventForm.attendees || undefined,
      registrationUrl: eventForm.registrationUrl || undefined,
    };

    if (editingId) {
      const res = await fetch(`/api/admin/events/${editingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setEvents(events.map(ev => ev.id === editingId ? { ...eventForm, id: editingId } : ev));
        cancelEventForm();
      } else {
        const errorData = await res.json().catch(() => ({}));
        alert(`Failed to update event: ${errorData.error || 'Unknown error'}`);
      }
    } else {
      const res = await fetch('/api/admin/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const data = await res.json();
        setEvents([...events, { ...eventForm, id: data.id }]);
        cancelEventForm();
      } else {
        const errorData = await res.json().catch(() => ({}));
        alert(`Failed to create event: ${errorData.error || 'Unknown error'}`);
      }
    }
  };
  const deleteEvent = async (id: string) => {
    if (typeof window !== 'undefined' && !window.confirm('Delete this event?')) return;
    const res = await fetch(`/api/admin/events/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    if (res.ok) {
      setEvents(events.filter(ev => ev.id !== id));
    } else {
      alert("Failed to delete event.");
    }
  };

  const inputCls = "w-full bg-[#f9f7f3] border border-[#e7e0d4] rounded-xl px-4 py-2.5 text-sm text-[#201d16] outline-none focus:border-[#5ce1e6] transition-colors";
  const labelCls = "text-[10px] font-mono uppercase tracking-widest text-[#6e675c] mb-1.5 block";

  return (
    <div className="min-h-screen bg-[#f9f7f3] flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="lg:w-[230px] lg:shrink-0 bg-white border-b lg:border-b-0 lg:border-r border-[#e7e0d4] lg:min-h-screen lg:sticky lg:top-0 flex lg:flex-col">
        <div className="hidden lg:flex items-center gap-3 px-6 py-5 border-b border-[#e7e0d4]">
          <img src="/MSC%20logo.png" alt="MSC" className="w-9 h-9 object-contain" />
          <div>
            <div className="font-bold text-[#003e45] text-[13px] leading-tight" style={{ fontFamily: 'var(--font-display)' }}>Mikaelson</div>
            <div className="text-[10px] text-[#6e675c] font-mono uppercase tracking-widest">Admin</div>
          </div>
        </div>

        {/* Mobile brand */}
        <div className="flex lg:hidden items-center gap-2 px-4 py-3">
          <img src="/MSC%20logo.png" alt="MSC" className="w-7 h-7 object-contain" />
        </div>

        {/* Nav */}
        <nav className="flex lg:flex-col gap-1 p-3 lg:p-3 overflow-x-auto flex-1 min-w-0">
          {NAV.map(item => {
            const active = activeTab === item.key;
            const badge = item.key === 'applications' && stats.pendingApps > 0 ? stats.pendingApps : null;
            return (
              <button
                key={item.key}
                onClick={() => setActiveTab(item.key)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${active ? 'bg-[#003e45] text-white' : 'text-[#6e675c] hover:bg-[#f3eee5]'}`}
              >
                <svg className="w-[18px] h-[18px] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d={item.icon} /></svg>
                <span>{item.label}</span>
                {badge && <span className={`ml-auto text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-full ${active ? 'bg-[#5ce1e6] text-[#003e45]' : 'bg-[#5ce1e6] text-[#003e45]'}`}>{badge}</span>}
              </button>
            );
          })}
        </nav>

        <div className="hidden lg:block p-3 border-t border-[#e7e0d4]">
          <button onClick={onLogout} className="w-full text-xs font-mono uppercase tracking-widest text-[#6e675c] hover:text-[#003e45] transition-colors border border-[#e7e0d4] rounded-xl px-4 py-2.5">
            Sign out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-[#e7e0d4] sticky top-0 z-40">
          <div className="px-5 md:px-8 py-3.5 flex items-center justify-between gap-4">
            <div>
              <h1 className="text-xl md:text-2xl font-extrabold text-[#003e45] tracking-tight capitalize" style={{ fontFamily: 'var(--font-display)' }}>{activeTab}</h1>
              <p className="text-xs text-[#6e675c] hidden sm:block">Mikaelson School Club network management</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-[#6e675c] font-mono hidden md:block">
                {mounted ? new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : ''}
              </span>
              {activeTab === 'schools' && (
                <button onClick={exportEnrollmentData} className="bg-[#003e45] text-white px-4 py-2 rounded-full text-[11px] font-mono uppercase tracking-widest font-bold hover:bg-[#005a63] transition-colors">
                  Export .CSV
                </button>
              )}
              {activeTab === 'events' && (
                <button onClick={openNewEvent} className="bg-[#5ce1e6] text-[#003e45] px-4 py-2 rounded-full text-[11px] font-mono uppercase tracking-widest font-bold hover:brightness-95 transition">
                  + New Event
                </button>
              )}
              <button onClick={onLogout} className="lg:hidden text-[11px] font-mono uppercase tracking-widest text-[#6e675c] border border-[#e7e0d4] rounded-full px-3 py-1.5">
                Exit
              </button>
            </div>
          </div>
        </header>

        <div className="p-5 md:p-8">
          {/* Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-10">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {[
                  { label: 'Chapters', value: stats.approvedChapters, sub: 'In network', color: 'bg-[#5ce1e6]', text: 'text-[#003e45]' },
                  { label: 'Active', value: stats.activeChapters, sub: 'Operational', color: 'bg-[#003e45]', text: 'text-white' },
                  { label: 'Students', value: stats.totalStudents, sub: 'Enrolled', color: 'bg-white', text: 'text-[#003e45]' },
                  { label: 'Pending Apps', value: stats.pendingApps, sub: 'To review', color: 'bg-[#5ce1e6]', text: 'text-[#003e45]' },
                  { label: 'Events', value: upcomingCount, sub: 'Upcoming', color: 'bg-white', text: 'text-[#003e45]' },
                  { label: 'Team', value: TEAM.length, sub: 'Core team', color: 'bg-[#003e45]', text: 'text-white' },
                ].map(m => (
                  <div key={m.label} className={`${m.color} rounded-2xl p-5 shadow-sm border border-[#e7e0d4]`}>
                    <div className={`text-3xl font-extrabold tracking-tight leading-none ${m.text}`} style={{ fontFamily: 'var(--font-display)' }}>{m.value}</div>
                    <div className={`text-[13px] font-semibold mt-2 ${m.text}`}>{m.label}</div>
                    <div className={`text-[11px] mt-0.5 opacity-70 ${m.text}`}>{m.sub}</div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl border border-[#e7e0d4] p-6 shadow-sm">
                  <h2 className="text-sm font-mono uppercase tracking-widest text-[#003e45] font-bold mb-6">Recent Applications</h2>
                  <div className="space-y-4">
                    {applications.slice(0, 3).map(app => (
                      <div key={app.id} className="flex items-center justify-between p-4 bg-[#f9f7f3] rounded-xl border border-[#e7e0d4]">
                        <div>
                          <div className="font-bold text-[#003e45] text-sm">{app.schoolName}</div>
                          <div className="text-xs text-[#6e675c]">{app.location} • {app.studentsEstimate} students</div>
                        </div>
                        <button onClick={() => { setActiveTab('applications'); setAppFilter('PENDING'); }} className="text-[10px] font-mono uppercase font-bold text-[#003e45] bg-[#5ce1e6] px-3 py-1 rounded-full">Review</button>
                      </div>
                    ))}
                    {applications.length === 0 && <p className="text-sm text-[#6e675c] italic">No new applications.</p>}
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-[#e7e0d4] p-6 shadow-sm">
                  <h2 className="text-sm font-mono uppercase tracking-widest text-[#003e45] font-bold mb-6">Upcoming Events</h2>
                  <div className="space-y-3">
                    {events.filter(e => e.type === 'upcoming').slice(0, 4).map(ev => (
                      <div key={ev.id} className="flex items-center justify-between p-3 bg-[#f9f7f3] rounded-xl border border-[#e7e0d4]">
                        <div>
                          <div className="font-bold text-[#003e45] text-sm">{ev.title}</div>
                          <div className="text-xs text-[#6e675c]">{ev.date}{ev.time ? ` • ${ev.time}` : ''}</div>
                        </div>
                        <button onClick={() => setActiveTab('events')} className="text-[10px] font-mono uppercase font-bold text-[#6e675c] border border-[#e7e0d4] px-3 py-1 rounded-full hover:border-[#003e45]">Manage</button>
                      </div>
                    ))}
                    {upcomingCount === 0 && <p className="text-sm text-[#6e675c] italic">No upcoming events. Add one from the Events tab.</p>}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Applications */}
          {activeTab === 'applications' && (
            <div className="space-y-6">
              <div className="flex gap-2 flex-wrap">
                {(['ALL', 'PENDING', 'REVIEWED', 'SCHEDULED', 'TRAINING', 'LAUNCHED', 'REJECTED'] as const).map(f => (
                  <button key={f} onClick={() => setAppFilter(f)} className={`px-4 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-widest font-bold border transition-all ${appFilter === f ? 'bg-[#003e45] text-white border-[#003e45]' : 'bg-white text-[#6e675c] border-[#e7e0d4]'}`}>{f}</button>
                ))}
              </div>
              <div className="bg-white rounded-2xl border border-[#e7e0d4] overflow-hidden shadow-sm overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[640px]">
                  <thead>
                    <tr className="bg-[#f9f7f3] border-b border-[#e7e0d4]">
                      {['School & Contact', 'Location', 'Students', 'Date', 'Status', 'Actions'].map(h => (
                        <th key={h} className="px-6 py-4 text-[10px] font-mono uppercase tracking-widest text-[#6e675c]">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f3eee5]">
                    {filteredApplications.map(app => (
                      <tr key={app.id} className="hover:bg-[#faf9f6] transition-colors">
                        <td className="px-6 py-4"><div className="font-bold text-[#003e45] text-sm">{app.schoolName}</div><div className="text-xs text-[#6e675c]">{app.contactName} • {app.email}</div></td>
                        <td className="px-6 py-4 text-sm text-[#201d16]">{app.location}</td>
                        <td className="px-6 py-4 text-sm text-[#201d16] font-mono">{app.studentsEstimate}</td>
                        <td className="px-6 py-4 text-xs text-[#6e675c]">{new Date(app.createdAt).toLocaleDateString()}</td>
                        <td className="px-6 py-4">
                          <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full ${['LAUNCHED', 'TRAINING'].includes(app.status) ? 'bg-[#e0f6f7] text-[#003e45]' : app.status === 'REJECTED' ? 'bg-red-50 text-red-600' : 'bg-[#f3eee5] text-[#6e675c]'}`}>{app.status}</span>
                        </td>
                        <td className="px-6 py-4">
                          {app.status !== 'REJECTED' && app.status !== 'LAUNCHED' && (
                            <div className="flex gap-1.5 flex-wrap">
                              {app.status === 'PENDING' && <button onClick={() => handleStatusChange(app.id, 'REVIEWED')} className="bg-[#f3eee5] text-[#6e675c] text-[9px] font-mono font-bold px-2.5 py-1 rounded-full hover:brightness-95">Review</button>}
                              {app.status === 'REVIEWED' && <button onClick={() => handleStatusChange(app.id, 'SCHEDULED')} className="bg-[#f3eee5] text-[#6e675c] text-[9px] font-mono font-bold px-2.5 py-1 rounded-full hover:brightness-95">Schedule</button>}
                              {app.status === 'SCHEDULED' && <button onClick={() => handleStatusChange(app.id, 'TRAINING')} className="bg-[#f3eee5] text-[#6e675c] text-[9px] font-mono font-bold px-2.5 py-1 rounded-full hover:brightness-95">Train</button>}
                              {(app.status === 'TRAINING' || app.status === 'SCHEDULED' || app.status === 'REVIEWED') && <button onClick={() => handleStatusChange(app.id, 'LAUNCHED')} className="bg-[#5ce1e6] text-[#003e45] text-[9px] font-mono font-bold px-2.5 py-1 rounded-full hover:brightness-95">Launch</button>}
                              <button onClick={() => handleStatusChange(app.id, 'REJECTED')} className="bg-white border border-[#e7e0d4] text-[#6e675c] text-[9px] font-mono font-bold px-2.5 py-1 rounded-full hover:bg-red-50 hover:text-red-600 hover:border-red-200">Reject</button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                    {filteredApplications.length === 0 && (
                      <tr><td colSpan={6} className="px-6 py-10 text-center text-sm text-[#6e675c] italic">No applications in this view.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Schools */}
          {activeTab === 'schools' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                  <input type="text" placeholder="Search schools or cities..." value={schoolSearch} onChange={(e) => setSchoolSearch(e.target.value)} className="w-full bg-white border border-[#e7e0d4] rounded-full px-10 py-2 text-sm outline-none focus:border-[#5ce1e6]" />
                  <svg className="absolute left-3.5 top-2.5 w-4 h-4 text-[#6e675c]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase text-[#6e675c]">Sort by:</span>
                  <select className="bg-white border border-[#e7e0d4] rounded-full px-4 py-2 text-xs outline-none cursor-pointer" value={schoolSortField} onChange={(e) => setSchoolSortField(e.target.value as keyof School)}>
                    <option value="name">School Name</option>
                    <option value="studentCount">Student Count</option>
                    <option value="approvalDate">Approval Date</option>
                    <option value="region">Region</option>
                    <option value="status">Status</option>
                  </select>
                  <button onClick={() => setSchoolSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')} className="bg-white border border-[#e7e0d4] rounded-full p-2 hover:border-[#5ce1e6] w-9 h-9">{schoolSortOrder === 'asc' ? '↑' : '↓'}</button>
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-[#e7e0d4] overflow-hidden shadow-sm overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[560px]">
                  <thead>
                    <tr className="bg-[#f9f7f3] border-b border-[#e7e0d4]">
                      {['School Name', 'Region', 'Students', 'Approved', 'Status'].map(h => (
                        <th key={h} className="px-6 py-4 text-[10px] font-mono uppercase tracking-widest text-[#6e675c]">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f3eee5]">
                    {sortedSchools.map(school => (
                      <tr key={school.id} className="hover:bg-[#faf9f6] transition-colors">
                        <td className="px-6 py-4"><div className="font-bold text-[#003e45] text-sm">{school.name}</div><div className="text-xs text-[#6e675c]">{school.city}</div></td>
                        <td className="px-6 py-4 text-sm text-[#201d16]">{school.region}</td>
                        <td className="px-6 py-4 text-sm font-mono text-[#003e45] font-bold">{school.studentCount}</td>
                        <td className="px-6 py-4 text-xs text-[#6e675c]">{school.approvalDate}</td>
                        <td className="px-6 py-4"><span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full ${school.status === 'Active' ? 'bg-[#e0f6f7] text-[#003e45]' : 'bg-[#f3eee5] text-[#6e675c]'}`}>{school.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Events */}
          {activeTab === 'events' && (
            <div className="space-y-6">
              {showEventForm && (
                <form onSubmit={submitEventForm} className="bg-white rounded-2xl border border-[#e7e0d4] p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="text-sm font-mono uppercase tracking-widest text-[#003e45] font-bold">{editingId ? 'Edit Event' : 'New Event'}</h2>
                    <button type="button" onClick={cancelEventForm} className="text-[#6e675c] hover:text-[#003e45] text-xl leading-none">×</button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className={labelCls}>Title *</label>
                      <input className={inputCls} value={eventForm.title} onChange={e => setEventForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. Leadership Workshop" required />
                    </div>
                    <div>
                      <label className={labelCls}>Type</label>
                      <select className={inputCls} value={eventForm.type} onChange={e => setEventForm(f => ({ ...f, type: e.target.value as EventType }))}>
                        <option value="upcoming">Upcoming</option>
                        <option value="past">Past</option>
                      </select>
                    </div>
                    <div>
                      <label className={labelCls}>Category</label>
                      <select className={inputCls} value={eventForm.category} onChange={e => setEventForm(f => ({ ...f, category: e.target.value }))}>
                        {['Workshop', 'Networking', 'Career', 'Community', 'Seminar', 'Other'].map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className={labelCls}>Date *</label>
                      <input type="date" className={inputCls} value={eventForm.date} onChange={e => setEventForm(f => ({ ...f, date: e.target.value }))} required />
                    </div>
                    <div>
                      <label className={labelCls}>Time</label>
                      <input className={inputCls} value={eventForm.time} onChange={e => setEventForm(f => ({ ...f, time: e.target.value }))} placeholder="e.g. 3:30 PM – 5:00 PM" />
                    </div>
                    <div>
                      <label className={labelCls}>Location</label>
                      <input className={inputCls} value={eventForm.location} onChange={e => setEventForm(f => ({ ...f, location: e.target.value }))} placeholder="e.g. Room 301" />
                    </div>
                    {eventForm.type === 'upcoming' ? (
                      <div>
                        <label className={labelCls}>Registration URL (Optional)</label>
                        <input className={inputCls} type="url" value={eventForm.registrationUrl || ''} onChange={e => setEventForm(f => ({ ...f, registrationUrl: e.target.value }))} placeholder="e.g. https://forms.gle/..." />
                      </div>
                    ) : (
                      <div>
                        <label className={labelCls}>Attendees count (Optional)</label>
                        <input className={inputCls} value={eventForm.attendees || ''} onChange={e => setEventForm(f => ({ ...f, attendees: e.target.value }))} placeholder="e.g. 150 students" />
                      </div>
                    )}
                    <div className="md:col-span-2">
                      <label className={labelCls}>Description</label>
                      <textarea className={`${inputCls} min-h-[90px] resize-y`} value={eventForm.description} onChange={e => setEventForm(f => ({ ...f, description: e.target.value }))} placeholder="Short description of the event..." />
                    </div>
                  </div>
                  <div className="flex gap-3 mt-5">
                    <button type="submit" className="bg-[#003e45] text-white px-6 py-2.5 rounded-full text-xs font-mono uppercase tracking-widest font-bold hover:bg-[#005a63] transition-colors">{editingId ? 'Save Changes' : 'Create Event'}</button>
                    <button type="button" onClick={cancelEventForm} className="border border-[#e7e0d4] text-[#6e675c] px-6 py-2.5 rounded-full text-xs font-mono uppercase tracking-widest font-bold hover:border-[#003e45]">Cancel</button>
                  </div>
                </form>
              )}

              {!showEventForm && (
                <p className="text-xs text-[#6e675c] bg-[#f3eee5] border border-[#e7e0d4] rounded-xl px-4 py-3">
                  Events are published instantly to the public <span className="font-mono">/events</span> page.
                </p>
              )}

              {(['upcoming', 'past'] as const).map(group => {
                const list = events.filter(e => e.type === group);
                return (
                  <div key={group} className="bg-white rounded-2xl border border-[#e7e0d4] overflow-hidden shadow-sm">
                    <div className="px-6 py-4 border-b border-[#e7e0d4] flex items-center justify-between">
                      <h2 className="text-sm font-mono uppercase tracking-widest text-[#003e45] font-bold capitalize">{group} ({list.length})</h2>
                    </div>
                    <div className="divide-y divide-[#f3eee5]">
                      {list.map(ev => (
                        <div key={ev.id} className="px-6 py-4 flex items-center gap-4 hover:bg-[#faf9f6] transition-colors">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-bold text-[#003e45] text-sm">{ev.title}</span>
                              <span className="text-[9px] font-mono uppercase tracking-widest bg-[#e0f6f7] text-[#003e45] px-2 py-0.5 rounded-full">{ev.category}</span>
                            </div>
                            <div className="text-xs text-[#6e675c] mt-0.5">
                              {ev.date}{ev.time ? ` • ${ev.time}` : ''}{ev.location ? ` • ${ev.location}` : ''}{ev.attendees ? ` • ${ev.attendees}` : ''}
                              {ev.registrationUrl && (
                                <span className="ml-2 inline-flex items-center gap-1 text-[#003e45] font-medium">
                                  <span>🔗</span> <a href={ev.registrationUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">Link</a>
                                </span>
                              )}
                            </div>
                          </div>
                          <button onClick={() => openEditEvent(ev)} className="text-[10px] font-mono uppercase font-bold text-[#003e45] border border-[#e7e0d4] px-3 py-1 rounded-full hover:border-[#003e45] hover:bg-[#f3eee5]">Edit</button>
                          <button onClick={() => deleteEvent(ev.id)} className="text-[10px] font-mono uppercase font-bold text-red-600 border border-[#e7e0d4] px-3 py-1 rounded-full hover:bg-red-50 hover:border-red-200">Delete</button>
                        </div>
                      ))}
                      {list.length === 0 && <div className="px-6 py-8 text-center text-sm text-[#6e675c] italic">No {group} events.</div>}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Analytics */}
          {activeTab === 'analytics' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white rounded-2xl border border-[#e7e0d4] p-8 shadow-sm">
                  <h2 className="text-sm font-mono uppercase tracking-widest text-[#003e45] font-bold mb-8">Enrollment Distribution</h2>
                  <div className="h-64 flex items-end gap-4">
                    {schools.filter(s => s.studentCount > 0).slice(0, 10).map(s => (
                      <div key={s.id} className="flex-1 flex flex-col items-center gap-2 group">
                        <div className="w-full bg-[#5ce1e6] rounded-t-lg relative group-hover:bg-[#003e45] transition-colors" style={{ height: `${(s.studentCount / 200) * 100}%` }}>
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#003e45] text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{s.studentCount} students</div>
                        </div>
                        <div className="text-[9px] font-mono text-[#6e675c] rotate-45 origin-left truncate w-16 mt-2">{s.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-2xl border border-[#e7e0d4] p-8 shadow-sm">
                  <h2 className="text-sm font-mono uppercase tracking-widest text-[#003e45] font-bold mb-8">Regional Reach</h2>
                  <div className="space-y-6">
                    {Object.entries(schools.reduce((acc, s) => { acc[s.region] = (acc[s.region] || 0) + 1; return acc; }, {} as Record<string, number>)).sort((a, b) => b[1] - a[1]).map(([region, count]) => (
                      <div key={region}>
                        <div className="flex justify-between text-xs mb-2"><span className="font-semibold text-[#003e45]">{region}</span><span className="font-mono text-[#6e675c]">{count} chapters</span></div>
                        <div className="h-2 bg-[#f3eee5] rounded-full overflow-hidden"><div className="h-full bg-[#003e45] rounded-full" style={{ width: `${(count / schools.length) * 100}%` }} /></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#f3eee5] p-6 rounded-2xl border border-[#e7e0d4]"><div className="text-xs font-mono uppercase text-[#6e675c] mb-2">Average Enrollment</div><div className="text-3xl font-bold text-[#003e45]">{Math.round(stats.totalStudents / stats.approvedChapters) || 0}</div><div className="text-[10px] text-[#6e675c] mt-1">Students per chapter</div></div>
                <div className="bg-[#e0f6f7] p-6 rounded-2xl border border-[#5ce1e6]"><div className="text-xs font-mono uppercase text-[#003e45] mb-2">Conversion Rate</div><div className="text-3xl font-bold text-[#003e45]">{Math.round((stats.approvedChapters / stats.totalApps) * 100) || 0}%</div><div className="text-[10px] text-[#003e45] mt-1">Apps to Chapters</div></div>
                <div className="bg-white p-6 rounded-2xl border border-[#e7e0d4]"><div className="text-xs font-mono uppercase text-[#6e675c] mb-2">Projected Growth</div><div className="text-3xl font-bold text-[#003e45]">+{stats.pendingApps * 40}</div><div className="text-[10px] text-[#6e675c] mt-1">Est. students in pipeline</div></div>
                <div className="bg-[#003e45] p-6 rounded-2xl"><div className="text-xs font-mono uppercase text-white/70 mb-2">Active Chapters</div><div className="text-3xl font-bold text-white">{Math.round((stats.activeChapters / stats.approvedChapters) * 100) || 0}%</div><div className="text-[10px] text-white/70 mt-1">Operational readiness</div></div>
              </div>
            </div>
          )}

          {/* Team */}
          {activeTab === 'team' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {TEAM.map(t => (
                <div key={t.name} className="bg-white rounded-2xl border border-[#e7e0d4] p-6 flex items-center gap-4 shadow-sm">
                  <div className="w-12 h-12 rounded-full bg-[#f3eee5] flex items-center justify-center text-[#003e45] font-bold text-lg">{t.name.charAt(0)}</div>
                  <div><div className="font-bold text-[#003e45] text-sm">{t.name}</div><div className="text-xs text-[#6e675c] font-mono uppercase tracking-widest">{t.role}</div></div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (sessionStorage.getItem('msc_admin') === '1') setAuthed(true);
  }, []);

  if (!mounted) return null;
  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />;
  return <Dashboard onLogout={() => { sessionStorage.removeItem('msc_admin'); setAuthed(false); }} />;
}
