'use client';

import { useState, useMemo, useEffect, useId } from 'react';
import {
  loadEvents,
  saveEvents,
  newEventId,
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

interface StudentApplication {
  id: string;
  name: string;
  school: string;
  year: string;
  city: string;
  goal?: string;
  createdAt: string;
  status: string;
}

interface MentorApplication {
  id: string;
  name: string;
  email: string;
  role: string;
  school: string;
  city: string;
  experience?: string;
  createdAt: string;
  status: string;
}

interface VolunteerApplication {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  motivation: string;
  createdAt: string;
  status: string;
}

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  type: string;
  message: string;
  status: 'UNREAD' | 'READ' | 'RESPONDED';
  replyNote?: string;
  createdAt: string;
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
// Team data is now fetched from the API

type TabKey = 'overview' | 'applications' | 'students' | 'mentors' | 'volunteers' | 'contacts' | 'schools' | 'events' | 'analytics' | 'team';

const NAV: { key: TabKey; label: string; icon: string }[] = [
  { key: 'overview', label: 'Overview', icon: 'M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z' },
  { key: 'applications', label: 'Schools', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
  { key: 'students', label: 'Students', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
  { key: 'mentors', label: 'Mentors', icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  { key: 'volunteers', label: 'Volunteers', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
  { key: 'contacts', label: 'Contacts', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  { key: 'schools', label: 'Chapters', icon: 'M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.42a12 12 0 01.84 4.42 12 12 0 01-7 1 12 12 0 01-7-1 12 12 0 01.84-4.42L12 14z' },
  { key: 'events', label: 'Events', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { key: 'analytics', label: 'Analytics', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
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
      const csrfRes = await fetch('/api/auth/csrf', { 
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include' 
      });
      const { csrfToken } = await csrfRes.json();

      const loginRes = await fetch('/api/auth/callback/credentials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password, csrfToken, redirect: false }),
      });

      if (loginRes.ok || loginRes.redirected) {
        sessionStorage.setItem('msc_admin', '1');
        onLogin();
        return;
      }

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

const emptyEvent = (): Omit<EventItem, 'id'> => ({
  title: '', date: '', time: '', location: '', description: '', category: 'Workshop', type: 'upcoming', attendees: '', registrationUrl: '',
});

// Collapse legacy absolute "/team/<file>" avatar URLs (stored on the wrong host)
// to a relative path served from this site's /public/team; leave others as-is.
function teamImageSrc(url?: string | null): string | undefined {
  if (!url) return undefined;
  try {
    const path = new URL(url, 'https://local').pathname;
    return path.startsWith('/team/') ? path : url;
  } catch {
    return url;
  }
}

/* Circular avatar with drag-and-drop / click-to-browse photo upload for a team member. */
function TeamPhotoDropzone({ avatarUrl, name, uploading, onFile }: { avatarUrl?: string; name: string; uploading: boolean; onFile: (f: File) => void }) {
  const [drag, setDrag] = useState(false);
  const inputId = useId();
  return (
    <label
      htmlFor={inputId}
      onDragOver={e => { e.preventDefault(); setDrag(true); }}
      onDragLeave={() => setDrag(false)}
      onDrop={e => { e.preventDefault(); setDrag(false); const f = e.dataTransfer.files?.[0]; if (f) onFile(f); }}
      className={`group relative w-[108px] h-[108px] rounded-full grid place-items-center overflow-hidden cursor-pointer transition-colors ${avatarUrl ? 'border border-[#e7e0d4]' : 'border-2 border-dashed'} ${drag ? 'border-[#5ce1e6] bg-[#e0f6f7]' : (avatarUrl ? '' : 'border-[#c9c0ae] bg-[#faf9f6]')}`}
    >
      <input id={inputId} type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) onFile(f); e.currentTarget.value = ''; }} />
      {uploading ? (
        <span className="text-[10px] font-mono text-[#6e675c]">Uploading…</span>
      ) : avatarUrl ? (
        <>
          <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
          <span className="absolute inset-0 bg-black/45 text-white text-[10px] font-mono grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity">Change</span>
        </>
      ) : (
        <span className="text-center text-[11px] leading-tight text-[#6e675c] px-3">Drop an<br/>image<br/><span className="underline">or browse files</span></span>
      )}
    </label>
  );
}

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState<TabKey>('overview');
  const [applications, setApplications] = useState<SchoolApplication[]>([]);
  const [students, setStudents] = useState<StudentApplication[]>([]);
  const [mentors, setMentors] = useState<MentorApplication[]>([]);
  const [volunteers, setVolunteers] = useState<VolunteerApplication[]>([]);
  const [schools, setSchools] = useState<School[]>([]);
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [team, setTeam] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [appsRes, studRes, mentRes, volRes, contactsRes, schoolsRes, eventsRes, teamRes] = await Promise.all([
          fetch('/api/admin/applications', { credentials: 'include' }),
          fetch('/api/admin/students', { credentials: 'include' }),
          fetch('/api/admin/mentors', { credentials: 'include' }),
          fetch('/api/admin/volunteers', { credentials: 'include' }),
          fetch('/api/admin/contacts', { credentials: 'include' }),
          fetch('/api/admin/schools', { credentials: 'include' }),
          fetch('/api/admin/events', { credentials: 'include', cache: 'no-store' }),
          fetch('/api/team')
        ]);

        // Middleware rejects unauthenticated admin calls with 401; in-handler
        // role checks use 403. Treat either as "not authorised".
        const unauthorised = [appsRes, studRes, mentRes, volRes, contactsRes, schoolsRes, eventsRes]
          .some(r => r.status === 401 || r.status === 403);
        if (unauthorised) {
          setIsAdmin(false);
          return;
        }
        setIsAdmin(true);

        if (appsRes.ok) {
          const data = await appsRes.json();
          setApplications(Array.isArray(data) ? data : data.applications || []);
        }

        if (studRes.ok) {
          const data = await studRes.json();
          console.log('Students data:', data);
          setStudents(data.applications || []);
        }

        if (mentRes.ok) {
          const data = await mentRes.json();
          console.log('Mentors data:', data);
          setMentors(data.applications || []);
        }

        if (volRes.ok) {
          const data = await volRes.json();
          console.log('Volunteers data:', data);
          setVolunteers(data.volunteers || []);
        }

        if (contactsRes.ok) {
          const data = await contactsRes.json();
          setContacts(data.messages || []);
        }

        if (schoolsRes.ok) {
          const data = await schoolsRes.json();
          setSchools(Array.isArray(data) ? data : data.schools || []);
        }

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

        if (teamRes.ok) setTeam(await teamRes.json());
      } catch (err) {
        console.error('Error fetching admin data:', err);
      } finally {
        setIsLoadingData(false);
      }
    }
    fetchData();
  }, []);

  const [events, setEvents] = useState<EventItem[]>([]);

  useEffect(() => { setMounted(true); }, []);

  const [appFilter, setAppFilter] = useState<'ALL' | 'PENDING' | 'REVIEWED' | 'SCHEDULED' | 'TRAINING' | 'LAUNCHED' | 'REJECTED'>('ALL');
  const [schoolSortField, setSchoolSortField] = useState<keyof School>('name');
  const [schoolSortOrder, setSchoolSortOrder] = useState<'asc' | 'desc'>('asc');
  const [schoolSearch, setSchoolSearch] = useState('');

  const [eventForm, setEventForm] = useState<Omit<EventItem, 'id'>>(emptyEvent());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showEventForm, setShowEventForm] = useState(false);
  
  const [viewingRegistrationsFor, setViewingRegistrationsFor] = useState<EventItem | null>(null);
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [regsLoading, setRegsLoading] = useState(false);
  
  // Details Modal state
  const [viewingDetails, setViewingDetails] = useState<any | null>(null);
  
  // Team member form state
  const emptyTeamMember = () => ({ name: '', role: '', email: '', bio: '', avatarUrl: '', linkedinUrl: '' });
  const [teamForm, setTeamForm] = useState(emptyTeamMember());
  const [showTeamForm, setShowTeamForm] = useState(false);
  const [teamSubmitting, setTeamSubmitting] = useState(false);
  const [editingTeamId, setEditingTeamId] = useState<string | null>(null);
  const [teamUploadingId, setTeamUploadingId] = useState<string | null>(null);

  const submitTeamForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamForm.name.trim() || !teamForm.role.trim()) return;
    setTeamSubmitting(true);
    try {
      const payload = {
        name: teamForm.name,
        role: teamForm.role,
        bio: teamForm.bio || undefined,
        avatarUrl: teamForm.avatarUrl || undefined,
        linkedinUrl: teamForm.linkedinUrl || undefined,
      };
      if (editingTeamId) {
        const res = await fetch(`/api/admin/team/${editingTeamId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          setTeam(arr => arr.map(m => m.id === editingTeamId ? { ...m, ...payload } : m));
          setShowTeamForm(false); setEditingTeamId(null); setTeamForm(emptyTeamMember());
        } else {
          const d = await res.json().catch(() => ({})); alert(`Failed to update team member: ${d.error || 'Unknown error'}`);
        }
      } else {
        const res = await fetch('/api/admin/team', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ ...payload, sortOrder: team.length }),
        });
        if (res.ok) {
          const data = await res.json();
          setTeam([...team, { ...payload, id: data.id }]);
          setShowTeamForm(false); setTeamForm(emptyTeamMember());
        } else {
          const d = await res.json().catch(() => ({})); alert(`Failed to add team member: ${d.error || 'Unknown error'}`);
        }
      }
    } catch (err) {
      console.error(err);
      alert("Error saving team member.");
    } finally {
      setTeamSubmitting(false);
    }
  };

  const startEditTeam = (m: any) => {
    setTeamForm({ name: m.name || '', role: m.role || '', email: m.email || '', bio: m.bio || '', avatarUrl: m.avatarUrl || '', linkedinUrl: m.linkedinUrl || '' });
    setEditingTeamId(m.id);
    setShowTeamForm(true);
  };

  const deleteTeamMemberCard = async (id: string) => {
    if (typeof window !== 'undefined' && !window.confirm('Remove this team member?')) return;
    const res = await fetch(`/api/admin/team/${id}`, { method: 'DELETE', credentials: 'include' });
    if (res.ok) setTeam(arr => arr.filter(m => m.id !== id));
    else alert('Failed to delete team member.');
  };

  const uploadTeamPhoto = async (id: string, file: File) => {
    setTeamUploadingId(id);
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('category', 'team');
      const up = await fetch('/api/admin/upload', { method: 'POST', credentials: 'include', body: fd });
      if (!up.ok) { const d = await up.json().catch(() => ({})); alert(`Upload failed: ${d.error || up.status}`); return; }
      const { url } = await up.json();
      const res = await fetch(`/api/admin/team/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ avatarUrl: url }),
      });
      if (res.ok) setTeam(arr => arr.map(m => m.id === id ? { ...m, avatarUrl: url } : m));
      else alert('Photo uploaded but failed to save it to the member.');
    } catch (e) {
      alert('Error uploading photo.');
    } finally {
      setTeamUploadingId(null);
    }
  };

  const seedTeam = async () => {
    const HARDCODED_OFFICERS = [
      { name: 'Michael Olukayode', role: 'Team Lead', avatarUrl: '/team/Michael%20Olukayode.jpg', linkedinUrl: 'https://www.linkedin.com/in/michael-olukayode-73890b214/' },
      { name: 'Boluwatife Adeleke', role: 'Project Manager', avatarUrl: '/team/Boluwatife%20Mercy%20Adeleke.jpeg', linkedinUrl: 'https://www.linkedin.com/in/boluwatifemercyadeleke/' },
      { name: 'Irene Ezechi', role: 'Program Manager', avatarUrl: '/team/Irene%20Ezechi.jpg', linkedinUrl: 'https://www.linkedin.com/in/ireneezechi/' },
      { name: 'Mariam Jimoh', role: 'ESG and Impact', avatarUrl: '/team/Mariam%20Jimoh.jpeg', linkedinUrl: 'https://www.linkedin.com/in/jimohmariamajoke/' },
      { name: 'Bright Temitope Ayegbusi', role: 'Visuals and Designs', avatarUrl: '/team/Ayegbusi%20Bright%20Temitope.jpg', linkedinUrl: '' },
      { name: 'Feranmi Oluwole', role: 'Operations Manager', avatarUrl: '/team/Feranmi%20Oluwole.JPG', linkedinUrl: 'https://www.linkedin.com/in/feranmi-oluwole-675712339/' },
      { name: 'Theresa Asiedu Gyamfi', role: 'GRC and Policy Engineer', avatarUrl: '/team/Asiedu%20Gyamfi.jpg', linkedinUrl: 'https://www.linkedin.com/in/theresa-gyamfi/' },
      { name: 'Esther Adeoye', role: 'Social Media Manager', avatarUrl: '/team/Adeoye%20Esther.jpg', linkedinUrl: 'https://www.linkedin.com/in/adeoye-esther-4151a62b8/' },
      { name: 'Ariyo Aresa', role: 'Front-end Engineer', avatarUrl: '/team/AriyoAresa.avif', linkedinUrl: 'https://www.linkedin.com/in/ariyoaresa/' },
      { name: 'Ayomide Idowu', role: 'Visuals and Designs', avatarUrl: '/team/Ayomide%20Idowu.jpg', linkedinUrl: 'https://www.linkedin.com/in/ayomide-idowu-4a852623a/' },
      { name: 'Happiness Obochi', role: 'Team Member', avatarUrl: '/team/Happiness%20Obochi.jpg', linkedinUrl: 'https://www.linkedin.com/in/happinessobochi/' },
    ];
    
    const token = sessionStorage.getItem('msc_admin_token') || '';
    for (let i = 0; i < HARDCODED_OFFICERS.length; i++) {
      const o = HARDCODED_OFFICERS[i];
      const res = await fetch('/api/admin/team', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: o.name,
          role: o.role,
          email: o.name.split(' ')[0].toLowerCase() + '@mikaelsoninitiative.org',
          avatarUrl: o.avatarUrl ? `https://mikaelsoninitiative.org${o.avatarUrl}` : undefined,
          linkedinUrl: o.linkedinUrl || undefined,
          sortOrder: i
        })
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        alert(`Failed to add ${o.name}: ${errorData.error || 'Unknown error'}`);
      }
    }
    alert("Team Seeded! Please refresh the page.");
  };

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

  const handleStudentStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/students/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setStudents(arr => arr.map(a => a.id === id ? { ...a, status: newStatus } : a));
      }
    } catch (e) { alert('Error updating status'); }
  };

  const handleMentorStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/mentors/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setMentors(arr => arr.map(a => a.id === id ? { ...a, status: newStatus } : a));
      }
    } catch (e) { alert('Error updating status'); }
  };

  const handleVolunteerStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/volunteers/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setVolunteers(arr => arr.map(a => a.id === id ? { ...a, status: newStatus } : a));
      }
    } catch (e) { alert('Error updating status'); }
  };

  const handleContactStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/contacts/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setContacts(arr => arr.map(c => c.id === id ? { ...c, status: newStatus as ContactMessage['status'] } : c));
      }
    } catch (e) { alert('Error updating status'); }
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
      setEvents(events.filter(s => s.id !== id));
    } else {
      alert("Failed to delete event.");
    }
  };

  async function openRegistrations(ev: EventItem) {
    setViewingRegistrationsFor(ev);
    setRegistrations([]);
    setRegsLoading(true);
    try {
      const res = await fetch(`/api/admin/events/${ev.id}/registrations`, { credentials: 'include' });
      if (res.ok) {
        setRegistrations(await res.json());
      }
    } catch (error) {
      console.error(error);
    } finally {
      setRegsLoading(false);
    }
  }

  // Change-password modal state
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [pwForm, setPwForm] = useState({ current: '', next: '', confirm: '' });
  const [pwSubmitting, setPwSubmitting] = useState(false);
  const [pwError, setPwError] = useState<string | null>(null);
  const [pwSuccess, setPwSuccess] = useState(false);

  const closePasswordModal = () => {
    setShowPasswordModal(false);
    setPwForm({ current: '', next: '', confirm: '' });
    setPwError(null);
    setPwSuccess(false);
  };

  const submitPasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwError(null);
    if (pwForm.next.length < 8) { setPwError('New password must be at least 8 characters.'); return; }
    if (pwForm.next !== pwForm.confirm) { setPwError('New passwords do not match.'); return; }
    setPwSubmitting(true);
    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ currentPassword: pwForm.current, newPassword: pwForm.next }),
      });
      if (res.ok) {
        setPwSuccess(true);
        setPwForm({ current: '', next: '', confirm: '' });
      } else {
        const d = await res.json().catch(() => ({}));
        setPwError(d.error || 'Could not change password.');
      }
    } catch {
      setPwError('Network error. Please try again.');
    } finally {
      setPwSubmitting(false);
    }
  };

  const inputCls = "w-full bg-[#f9f7f3] border border-[#e7e0d4] rounded-xl px-4 py-2.5 text-sm text-[#201d16] outline-none focus:border-[#5ce1e6] transition-colors";
  const labelCls = "text-[10px] font-mono uppercase tracking-widest text-[#6e675c] mb-1.5 block";

  if (!isLoadingData && !isAdmin) {
    return (
      <div className="min-h-screen bg-[#f3eee5] grid place-items-center p-6 text-center">
        <div className="bg-white rounded-2xl border border-[#e7e0d4] p-10 w-[min(92vw,420px)] shadow-sm">
          <h1 className="text-xl font-bold text-[#003e45] mb-2" style={{ fontFamily: 'var(--font-display)' }}>Session expired</h1>
          <p className="text-sm text-[#6e675c] mb-6">Your admin session isn&apos;t valid or has expired. Please sign in again to continue.</p>
          <button onClick={onLogout} className="bg-[#5ce1e6] text-[#003e45] font-bold rounded-full py-2.5 px-6 text-sm hover:brightness-95 transition">Back to sign in</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9f7f3] flex flex-col lg:flex-row">
      <aside className="lg:w-[230px] lg:shrink-0 bg-white border-b lg:border-b-0 lg:border-r border-[#e7e0d4] lg:min-h-screen lg:sticky lg:top-0 flex lg:flex-col">
        <div className="hidden lg:flex items-center gap-3 px-6 py-5 border-b border-[#e7e0d4]">
          <img src="/MSC%20logo.png" alt="MSC" className="w-9 h-9 object-contain" />
          <div>
            <div className="font-bold text-[#003e45] text-[13px] leading-tight" style={{ fontFamily: 'var(--font-display)' }}>Mikaelson</div>
            <div className="text-[10px] text-[#6e675c] font-mono uppercase tracking-widest">Admin</div>
          </div>
        </div>

        <div className="flex lg:hidden items-center gap-2 px-4 py-3">
          <img src="/MSC%20logo.png" alt="MSC" className="w-7 h-7 object-contain" />
        </div>

        <nav className="flex lg:flex-col gap-1 p-3 lg:p-3 overflow-x-auto flex-1 min-w-0">
          {NAV.map(item => {
            const active = activeTab === item.key;
            const unreadContacts = contacts.filter(c => c.status === 'UNREAD').length;
            const badge = item.key === 'applications' && stats.pendingApps > 0 ? stats.pendingApps
              : item.key === 'contacts' && unreadContacts > 0 ? unreadContacts
              : null;
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

        <div className="hidden lg:block p-3 border-t border-[#e7e0d4] space-y-2">
          <button onClick={() => setShowPasswordModal(true)} className="w-full text-xs font-mono uppercase tracking-widest text-[#6e675c] hover:text-[#003e45] border border-[#e7e0d4] rounded-xl px-4 py-2.5 transition-colors">
            Change password
          </button>
          <button onClick={onLogout} className="w-full text-xs font-mono uppercase tracking-widest text-white bg-[#003e45] hover:bg-[#005a63] transition-colors rounded-xl px-4 py-2.5">
            Sign out
          </button>
        </div>
      </aside>

      <main className="flex-1 min-w-0">
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
              {activeTab === 'team' && (
                <button onClick={seedTeam} className="bg-orange-500 text-white px-4 py-2 rounded-full text-[11px] font-mono uppercase tracking-widest font-bold hover:bg-orange-600 transition-colors">
                  Seed Team (Temp)
                </button>
              )}
              <button onClick={onLogout} className="lg:hidden text-[11px] font-mono uppercase tracking-widest text-[#6e675c] border border-[#e7e0d4] rounded-full px-3 py-1.5">
                Exit
              </button>
            </div>
          </div>
        </header>

        <div className="p-5 md:p-8">
          {activeTab === 'overview' && (
            <div className="space-y-10">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {[
                  { label: 'Chapters', value: stats.approvedChapters, sub: 'In network', color: 'bg-[#5ce1e6]', text: 'text-[#003e45]' },
                  { label: 'Active', value: stats.activeChapters, sub: 'Operational', color: 'bg-[#003e45]', text: 'text-white' },
                  { label: 'Students', value: stats.totalStudents, sub: 'Enrolled', color: 'bg-white', text: 'text-[#003e45]' },
                  { label: 'Pending Apps', value: stats.pendingApps, sub: 'To review', color: 'bg-[#5ce1e6]', text: 'text-[#003e45]' },
                  { label: 'Events', value: upcomingCount, sub: 'Upcoming', color: 'bg-white', text: 'text-[#003e45]' },
                  { label: 'Team', value: team.length, sub: 'Core team', color: 'bg-[#003e45]', text: 'text-white' },
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
                              <button onClick={() => setViewingDetails({ type: 'School', data: app })} className="bg-[#f3eee5] text-[#6e675c] text-[9px] font-mono font-bold px-2.5 py-1 rounded-full hover:brightness-95">View</button>
                              {app.status === 'PENDING' && <button onClick={() => handleStatusChange(app.id, 'REVIEWED')} className="bg-[#f3eee5] text-[#6e675c] text-[9px] font-mono font-bold px-2.5 py-1 rounded-full hover:brightness-95">Review</button>}
                              {app.status === 'REVIEWED' && <button onClick={() => handleStatusChange(app.id, 'SCHEDULED')} className="bg-[#f3eee5] text-[#6e675c] text-[9px] font-mono font-bold px-2.5 py-1 rounded-full hover:brightness-95">Schedule</button>}
                              {app.status === 'SCHEDULED' && <button onClick={() => handleStatusChange(app.id, 'TRAINING')} className="bg-[#f3eee5] text-[#6e675c] text-[9px] font-mono font-bold px-2.5 py-1 rounded-full hover:brightness-95">Train</button>}
                              {(app.status === 'TRAINING' || app.status === 'SCHEDULED' || app.status === 'REVIEWED') && <button onClick={() => handleStatusChange(app.id, 'LAUNCHED')} className="bg-[#5ce1e6] text-[#003e45] text-[9px] font-mono font-bold px-2.5 py-1 rounded-full hover:brightness-95">Launch</button>}
                              <button onClick={() => handleStatusChange(app.id, 'REJECTED')} className="bg-white border border-[#e7e0d4] text-[#6e675c] text-[9px] font-mono font-bold px-2.5 py-1 rounded-full hover:bg-red-50 hover:text-red-600 hover:border-red-200">Reject</button>
                            </div>
                          )}
                          {(app.status === 'REJECTED' || app.status === 'LAUNCHED') && (
                            <button onClick={() => setViewingDetails({ type: 'School', data: app })} className="bg-[#f3eee5] text-[#6e675c] text-[9px] font-mono font-bold px-2.5 py-1 rounded-full hover:brightness-95">View</button>
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

          {/* Students */}
          {activeTab === 'students' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-[#e7e0d4] overflow-hidden shadow-sm overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[640px]">
                  <thead>
                    <tr className="bg-[#f9f7f3] border-b border-[#e7e0d4]">
                      {['Name', 'School', 'Year & Goal', 'Location', 'Date', 'Status', 'Actions'].map(h => (
                        <th key={h} className="px-6 py-4 text-[10px] font-mono uppercase tracking-widest text-[#6e675c]">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f3eee5]">
                    {students.map(app => (
                      <tr key={app.id} className="hover:bg-[#faf9f6] transition-colors">
                        <td className="px-6 py-4"><div className="font-bold text-[#003e45] text-sm">{app.name}</div></td>
                        <td className="px-6 py-4 text-sm text-[#201d16]">{app.school}</td>
                        <td className="px-6 py-4 text-sm text-[#201d16] max-w-[200px]"><span className="font-bold">{app.year}</span><div className="text-xs text-[#6e675c] truncate">{app.goal || '-'}</div></td>
                        <td className="px-6 py-4 text-sm text-[#201d16]">{app.city}</td>
                        <td className="px-6 py-4 text-xs text-[#6e675c]">{new Date(app.createdAt).toLocaleDateString()}</td>
                        <td className="px-6 py-4">
                          <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full ${app.status === 'REVIEWED' ? 'bg-[#e0f6f7] text-[#003e45]' : 'bg-[#f3eee5] text-[#6e675c]'}`}>{app.status}</span>
                        </td>
                        <td className="px-6 py-4 flex gap-1.5 flex-wrap">
                          <button onClick={() => setViewingDetails({ type: 'Student', data: app })} className="bg-[#f3eee5] text-[#6e675c] text-[9px] font-mono font-bold px-2.5 py-1 rounded-full hover:brightness-95">View</button>
                          {app.status === 'PENDING' && <button onClick={() => handleStudentStatus(app.id, 'REVIEWED')} className="bg-[#5ce1e6] text-[#003e45] text-[9px] font-mono font-bold px-2.5 py-1 rounded-full hover:brightness-95">Mark Reviewed</button>}
                        </td>
                      </tr>
                    ))}
                    {students.length === 0 && (
                      <tr><td colSpan={7} className="px-6 py-10 text-center text-sm text-[#6e675c] italic">No student applications yet.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Mentors */}
          {activeTab === 'mentors' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-[#e7e0d4] overflow-hidden shadow-sm overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[640px]">
                  <thead>
                    <tr className="bg-[#f9f7f3] border-b border-[#e7e0d4]">
                      {['Name & Email', 'Role & School', 'Experience', 'Location', 'Date', 'Status', 'Actions'].map(h => (
                        <th key={h} className="px-6 py-4 text-[10px] font-mono uppercase tracking-widest text-[#6e675c]">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f3eee5]">
                    {mentors.map(app => (
                      <tr key={app.id} className="hover:bg-[#faf9f6] transition-colors">
                        <td className="px-6 py-4"><div className="font-bold text-[#003e45] text-sm">{app.name}</div><div className="text-xs text-[#6e675c]">{app.email}</div></td>
                        <td className="px-6 py-4 text-sm text-[#201d16]"><div>{app.role}</div><div className="text-xs text-[#6e675c]">{app.school}</div></td>
                        <td className="px-6 py-4 text-sm text-[#201d16] max-w-[200px] truncate">{app.experience || '-'}</td>
                        <td className="px-6 py-4 text-sm text-[#201d16]">{app.city}</td>
                        <td className="px-6 py-4 text-xs text-[#6e675c]">{new Date(app.createdAt).toLocaleDateString()}</td>
                        <td className="px-6 py-4">
                          <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full ${app.status === 'REVIEWED' ? 'bg-[#e0f6f7] text-[#003e45]' : 'bg-[#f3eee5] text-[#6e675c]'}`}>{app.status}</span>
                        </td>
                        <td className="px-6 py-4 flex gap-1.5 flex-wrap">
                          <button onClick={() => setViewingDetails({ type: 'Mentor', data: app })} className="bg-[#f3eee5] text-[#6e675c] text-[9px] font-mono font-bold px-2.5 py-1 rounded-full hover:brightness-95">View</button>
                          {app.status === 'PENDING' && <button onClick={() => handleMentorStatus(app.id, 'REVIEWED')} className="bg-[#f3eee5] text-[#6e675c] text-[9px] font-mono font-bold px-2.5 py-1 rounded-full hover:brightness-95">Mark Reviewed</button>}
                        </td>
                      </tr>
                    ))}
                    {mentors.length === 0 && (
                      <tr><td colSpan={7} className="px-6 py-10 text-center text-sm text-[#6e675c] italic">No champion applications yet.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Volunteers */}
          {activeTab === 'volunteers' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-[#e7e0d4] overflow-hidden shadow-sm overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[640px]">
                  <thead>
                    <tr className="bg-[#f9f7f3] border-b border-[#e7e0d4]">
                      {['Name & Contact', 'Role', 'Motivation', 'Date', 'Status', 'Actions'].map(h => (
                        <th key={h} className="px-6 py-4 text-[10px] font-mono uppercase tracking-widest text-[#6e675c]">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f3eee5]">
                    {volunteers.map(app => (
                      <tr key={app.id} className="hover:bg-[#faf9f6] transition-colors">
                        <td className="px-6 py-4"><div className="font-bold text-[#003e45] text-sm">{app.name}</div><div className="text-xs text-[#6e675c]">{app.email}<br/>{app.phone}</div></td>
                        <td className="px-6 py-4 text-sm text-[#201d16]">{app.role}</td>
                        <td className="px-6 py-4 text-sm text-[#201d16] max-w-[200px] truncate">{app.motivation}</td>
                        <td className="px-6 py-4 text-xs text-[#6e675c]">{new Date(app.createdAt).toLocaleDateString()}</td>
                        <td className="px-6 py-4">
                          <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full ${app.status === 'LAUNCHED' ? 'bg-[#e0f6f7] text-[#003e45]' : app.status === 'REJECTED' ? 'bg-red-50 text-red-600' : 'bg-[#f3eee5] text-[#6e675c]'}`}>{app.status}</span>
                        </td>
                        <td className="px-6 py-4 flex gap-1.5 flex-wrap">
                          <button onClick={() => setViewingDetails({ type: 'Volunteer', data: app })} className="bg-[#f3eee5] text-[#6e675c] text-[9px] font-mono font-bold px-2.5 py-1 rounded-full hover:brightness-95">View</button>
                          {app.status === 'PENDING' && <button onClick={() => handleVolunteerStatus(app.id, 'REVIEWED')} className="bg-[#f3eee5] text-[#6e675c] text-[9px] font-mono font-bold px-2.5 py-1 rounded-full hover:brightness-95">Review</button>}
                          {app.status === 'REVIEWED' && <button onClick={() => handleVolunteerStatus(app.id, 'SCHEDULED')} className="bg-[#f3eee5] text-[#6e675c] text-[9px] font-mono font-bold px-2.5 py-1 rounded-full hover:brightness-95">Schedule</button>}
                          {app.status === 'SCHEDULED' && <button onClick={() => handleVolunteerStatus(app.id, 'TRAINING')} className="bg-[#f3eee5] text-[#6e675c] text-[9px] font-mono font-bold px-2.5 py-1 rounded-full hover:brightness-95">Train</button>}
                          {app.status === 'TRAINING' && <button onClick={() => handleVolunteerStatus(app.id, 'LAUNCHED')} className="bg-[#5ce1e6] text-[#003e45] text-[9px] font-mono font-bold px-2.5 py-1 rounded-full hover:brightness-95">Launch</button>}
                          {app.status !== 'REJECTED' && app.status !== 'LAUNCHED' && <button onClick={() => handleVolunteerStatus(app.id, 'REJECTED')} className="bg-white border border-[#e7e0d4] text-[#6e675c] text-[9px] font-mono font-bold px-2.5 py-1 rounded-full hover:bg-red-50 hover:text-red-600 hover:border-red-200">Reject</button>}
                        </td>
                      </tr>
                    ))}
                    {volunteers.length === 0 && (
                      <tr><td colSpan={6} className="px-6 py-10 text-center text-sm text-[#6e675c] italic">No volunteer applications yet.</td></tr>
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

          {/* Contacts */}
          {activeTab === 'contacts' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-[#e7e0d4] overflow-hidden shadow-sm overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[640px]">
                  <thead>
                    <tr className="bg-[#f9f7f3] border-b border-[#e7e0d4]">
                      {['Name & Email', 'Type', 'Message', 'Date', 'Status', 'Actions'].map(h => (
                        <th key={h} className="px-6 py-4 text-[10px] font-mono uppercase tracking-widest text-[#6e675c]">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f3eee5]">
                    {contacts.map(c => (
                      <tr key={c.id} className="hover:bg-[#faf9f6] transition-colors">
                        <td className="px-6 py-4"><div className="font-bold text-[#003e45] text-sm">{c.name}</div><div className="text-xs text-[#6e675c]">{c.email}</div></td>
                        <td className="px-6 py-4 text-sm text-[#201d16]">{c.type}</td>
                        <td className="px-6 py-4 text-sm text-[#201d16] max-w-[260px] truncate">{c.message}</td>
                        <td className="px-6 py-4 text-xs text-[#6e675c]">{new Date(c.createdAt).toLocaleDateString()}</td>
                        <td className="px-6 py-4">
                          <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full ${c.status === 'RESPONDED' ? 'bg-[#e0f6f7] text-[#003e45]' : c.status === 'READ' ? 'bg-[#f3eee5] text-[#6e675c]' : 'bg-[#5ce1e6] text-[#003e45]'}`}>{c.status}</span>
                        </td>
                        <td className="px-6 py-4 flex gap-1.5 flex-wrap">
                          <button onClick={() => setViewingDetails({ type: 'Contact', data: c })} className="bg-[#f3eee5] text-[#6e675c] text-[9px] font-mono font-bold px-2.5 py-1 rounded-full hover:brightness-95">View</button>
                          {c.status === 'UNREAD' && <button onClick={() => handleContactStatus(c.id, 'READ')} className="bg-[#f3eee5] text-[#6e675c] text-[9px] font-mono font-bold px-2.5 py-1 rounded-full hover:brightness-95">Mark Read</button>}
                          {c.status !== 'RESPONDED' && <button onClick={() => handleContactStatus(c.id, 'RESPONDED')} className="bg-[#5ce1e6] text-[#003e45] text-[9px] font-mono font-bold px-2.5 py-1 rounded-full hover:brightness-95">Mark Responded</button>}
                          <a
                            href={`https://mail.google.com/mail/?view=cm&fs=1&authuser=msc@mikaelsoninitiative.org&to=${encodeURIComponent(c.email)}&su=${encodeURIComponent('Re: Your message to Mikaelson School Club')}&body=${encodeURIComponent(`Hi ${c.name},\n\n\n\n———\nYou wrote to us on ${new Date(c.createdAt).toLocaleDateString()}:\n"${c.message}"`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => { if (c.status === 'UNREAD') handleContactStatus(c.id, 'READ'); }}
                            className="bg-[#003e45] text-white text-[9px] font-mono font-bold px-2.5 py-1 rounded-full hover:brightness-110"
                          >Reply</a>
                        </td>
                      </tr>
                    ))}
                    {contacts.length === 0 && (
                      <tr><td colSpan={6} className="px-6 py-10 text-center text-sm text-[#6e675c] italic">No contact messages yet.</td></tr>
                    )}
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
                          <button onClick={() => openRegistrations(ev)} className="text-[10px] font-mono uppercase font-bold text-accent-2 border border-[#e7e0d4] px-3 py-1 rounded-full hover:border-accent-2 hover:bg-accent-soft mr-2">Guests</button>
                          <button onClick={() => openEditEvent(ev)} className="text-[10px] font-mono uppercase font-bold text-[#003e45] border border-[#e7e0d4] px-3 py-1 rounded-full hover:border-[#003e45] hover:bg-[#f3eee5]">Edit</button>
                          <button onClick={() => deleteEvent(ev.id)} className="text-[10px] font-mono uppercase font-bold text-red-600 border border-[#e7e0d4] px-3 py-1 rounded-full hover:bg-red-50 hover:border-red-200 ml-2">Delete</button>
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
            <div className="space-y-6">
              <div className="flex justify-end">
                <button
                  onClick={() => { if (showTeamForm) { setEditingTeamId(null); setTeamForm(emptyTeamMember()); } setShowTeamForm(!showTeamForm); }}
                  className="bg-[#003e45] text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-sm transition-transform hover:scale-105"
                >
                  {showTeamForm ? "Cancel" : "+ Add Member"}
                </button>
              </div>

              {showTeamForm && (
                <form onSubmit={submitTeamForm} className="bg-white rounded-2xl border border-[#e7e0d4] p-6 shadow-sm mb-6">
                  <h3 className="font-display font-bold text-lg text-[#003e45] mb-4">{editingTeamId ? 'Edit Team Member' : 'Add Team Member'}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <input className={inputCls} value={teamForm.name} onChange={e => setTeamForm(f => ({ ...f, name: e.target.value }))} placeholder="Name" required />
                    <input className={inputCls} value={teamForm.role} onChange={e => setTeamForm(f => ({ ...f, role: e.target.value }))} placeholder="Role (e.g. President)" required />
                    <input className={inputCls} value={teamForm.linkedinUrl} onChange={e => setTeamForm(f => ({ ...f, linkedinUrl: e.target.value }))} type="url" placeholder="LinkedIn URL (optional)" />
                  </div>
                  <textarea className={`${inputCls} min-h-[90px] resize-y mb-4`} value={teamForm.bio} onChange={e => setTeamForm(f => ({ ...f, bio: e.target.value }))} placeholder="Short bio (e.g. Final-year student building community and academic excellence across chapters.)" />
                  <p className="text-xs text-[#6e675c] mb-4">{editingTeamId ? 'To change the photo, drop a new image on the member’s card.' : 'After saving, drop a photo on the new member’s card to add their picture.'}</p>
                  <div className="flex justify-end gap-3">
                    <button type="button" onClick={() => { setShowTeamForm(false); setEditingTeamId(null); setTeamForm(emptyTeamMember()); }} className="px-5 py-2 rounded-full border border-[#e7e0d4] text-[#6e675c] font-bold text-sm">Cancel</button>
                    <button type="submit" disabled={teamSubmitting} className="px-5 py-2 rounded-full bg-[#5ce1e6] text-[#003e45] font-bold text-sm disabled:opacity-50">
                      {teamSubmitting ? "Saving..." : editingTeamId ? "Save Changes" : "Save Member"}
                    </button>
                  </div>
                </form>
              )}

              {team.length === 0 ? (
                <p className="text-sm text-[#6e675c] italic">No team members yet. Add one to get started.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {team.map(t => (
                    <div key={t.id || t.name} className="bg-white rounded-[22px] border border-[#e7e0d4] p-8 flex flex-col items-center text-center shadow-sm">
                      <TeamPhotoDropzone
                        avatarUrl={teamImageSrc(t.avatarUrl || t.img)}
                        name={t.name}
                        uploading={teamUploadingId === t.id}
                        onFile={(f) => uploadTeamPhoto(t.id, f)}
                      />
                      <h3 className="font-display font-bold text-[20px] text-[#111] mt-6 mb-2">{t.name}</h3>
                      <div className="font-mono text-[12px] font-bold uppercase tracking-[0.12em] text-[#40727e] mb-4">{t.role}</div>
                      {t.bio && <p className="text-[#6e675c] text-[14px] leading-[1.6] m-0 mb-4">{t.bio}</p>}
                      {t.linkedinUrl && (
                        <a href={t.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-[#0A66C2] opacity-80 hover:opacity-100 transition-opacity" aria-label={`LinkedIn profile for ${t.name}`}>
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                        </a>
                      )}
                      <div className="flex gap-2 mt-5">
                        <button onClick={() => startEditTeam(t)} className="text-[10px] font-mono uppercase font-bold text-[#003e45] border border-[#e7e0d4] px-3 py-1 rounded-full hover:bg-[#f3eee5]">Edit</button>
                        <button onClick={() => deleteTeamMemberCard(t.id)} className="text-[10px] font-mono uppercase font-bold text-red-600 border border-[#e7e0d4] px-3 py-1 rounded-full hover:bg-red-50 hover:border-red-200">Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Registrations Viewer Modal */}
      {viewingRegistrationsFor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-[2px]">
          <div className="bg-[#f9f8f6] w-full max-w-2xl rounded-2xl shadow-xl flex flex-col max-h-[85vh]">
            <div className="flex items-center justify-between p-6 border-b border-[#e7e0d4]">
              <h2 className="font-display font-bold text-xl text-[#201d16]">
                Registrations: {viewingRegistrationsFor.title}
              </h2>
              <button onClick={() => setViewingRegistrationsFor(null)} className="text-[#6e675c] hover:text-[#201d16]">
                ✕
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              {regsLoading ? (
                <div className="text-center py-10 text-sm text-[#6e675c]">Loading registrations...</div>
              ) : registrations.length === 0 ? (
                <div className="text-center py-10 text-sm text-[#6e675c]">No one has registered for this event yet.</div>
              ) : (
                <div className="border border-[#e7e0d4] rounded-xl overflow-hidden bg-white">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-[#f3eee5] text-[#6e675c] text-xs uppercase font-mono font-bold tracking-wider">
                      <tr>
                        <th className="px-4 py-3 border-b border-[#e7e0d4]">Name</th>
                        <th className="px-4 py-3 border-b border-[#e7e0d4]">Email</th>
                        <th className="px-4 py-3 border-b border-[#e7e0d4]">School</th>
                        <th className="px-4 py-3 border-b border-[#e7e0d4]">Registered At</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e7e0d4]">
                      {registrations.map(reg => (
                        <tr key={reg.id} className="hover:bg-[#faf9f7]">
                          <td className="px-4 py-3 font-medium text-[#201d16]">{reg.name}</td>
                          <td className="px-4 py-3 text-[#6e675c]">{reg.email}</td>
                          <td className="px-4 py-3 text-[#6e675c]">{reg.schoolName || '—'}</td>
                          <td className="px-4 py-3 text-[#6e675c] text-xs">{new Date(reg.createdAt).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    {/* Application Details Modal */}
    {viewingDetails && (
      <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/30 p-4 backdrop-blur-[2px]">
        <div className="bg-[#f9f8f6] w-full max-w-2xl rounded-2xl shadow-xl flex flex-col max-h-[85vh]">
          <div className="flex items-center justify-between p-6 border-b border-[#e7e0d4]">
            <h2 className="font-display font-bold text-xl text-[#201d16]">
              {viewingDetails.type} Application
            </h2>
            <button onClick={() => setViewingDetails(null)} className="text-[#6e675c] hover:text-[#201d16] text-xl leading-none">
              ✕
            </button>
          </div>
          <div className="p-6 overflow-y-auto space-y-4 text-sm text-[#201d16]">
            {Object.entries(viewingDetails.data).map(([key, value]) => {
              if (key === 'id' || key === 'status' || key === 'createdAt') return null;
              return (
                <div key={key}>
                  <div className="font-mono uppercase tracking-widest text-[10px] text-[#6e675c] mb-1">{key}</div>
                  <div className="bg-white p-4 rounded-xl border border-[#e7e0d4] whitespace-pre-wrap">{String(value)}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    )}

    {/* Change Password Modal */}
    {showPasswordModal && (
      <div
        className="fixed inset-0 z-[70] grid place-items-center p-4 bg-black/40 backdrop-blur-[2px]"
        onClick={(e) => { if (e.target === e.currentTarget) closePasswordModal(); }}
      >
        <div className="bg-white w-[min(92vw,420px)] rounded-2xl border border-[#e7e0d4] shadow-xl p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-[#003e45]" style={{ fontFamily: 'var(--font-display)' }}>Change password</h2>
              <p className="text-sm text-[#6e675c] mt-1">Update your admin password.</p>
            </div>
            <button onClick={closePasswordModal} aria-label="Close" className="text-[#6e675c] hover:text-[#201d16] text-2xl leading-none -mt-1">×</button>
          </div>
          {pwSuccess ? (
            <div className="text-center py-4">
              <div className="bg-[#e0f6f7] text-[#003e45] w-14 h-14 rounded-full grid place-items-center mx-auto mb-4 text-2xl">✓</div>
              <p className="text-[15px] text-[#201d16] mb-6">Your password has been changed.</p>
              <button onClick={closePasswordModal} className="w-full bg-[#5ce1e6] text-[#003e45] font-bold rounded-full py-3 text-sm hover:translate-y-0.5 transition-transform" style={{ boxShadow: '0 8px 0 -2px #003e45' }}>Done</button>
            </div>
          ) : (
            <form onSubmit={submitPasswordChange} className="flex flex-col gap-4">
              {[
                { key: 'current' as const, label: 'Current password', ac: 'current-password', hint: '' },
                { key: 'next' as const, label: 'New password', ac: 'new-password', hint: 'At least 8 characters.' },
                { key: 'confirm' as const, label: 'Confirm new password', ac: 'new-password', hint: '' },
              ].map(f => (
                <div key={f.key}>
                  <label className="block text-xs font-semibold text-[#003e45] mb-1.5">{f.label}</label>
                  <input
                    type="password"
                    className="w-full border border-[#e7e0d4] rounded-xl px-4 py-3 text-sm bg-[#f3eee5] text-[#201d16] outline-none focus:border-[#5ce1e6] transition-colors"
                    value={pwForm[f.key]}
                    onChange={e => setPwForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                    autoComplete={f.ac}
                    required
                    minLength={f.key === 'current' ? undefined : 8}
                  />
                  {f.hint && <p className="text-[11px] text-[#6e675c] mt-1.5">{f.hint}</p>}
                </div>
              ))}
              {pwError && <p className="text-red-600 text-xs">{pwError}</p>}
              <button
                type="submit"
                disabled={pwSubmitting}
                className="w-full mt-2 bg-[#5ce1e6] text-[#003e45] font-bold rounded-full py-3 text-sm hover:translate-y-0.5 transition-transform disabled:opacity-50 disabled:hover:translate-y-0"
                style={{ boxShadow: '0 8px 0 -2px #003e45' }}
              >
                {pwSubmitting ? 'Saving…' : 'Update password'}
              </button>
              <button type="button" onClick={closePasswordModal} className="text-xs text-[#6e675c] hover:text-[#003e45] mt-1">Cancel</button>
            </form>
          )}
        </div>
      </div>
    )}

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
