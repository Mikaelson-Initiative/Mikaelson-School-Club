'use client';

import { useState, useMemo, useEffect } from 'react';

const PIN = '2026';

interface SchoolApplication {
  id: string;
  schoolName: string;
  contactName: string;
  email: string;
  phone: string;
  location: string;
  role: string;
  studentsCount: number;
  message: string;
  submissionDate: string;
  status: 'pending' | 'approved' | 'rejected';
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

/* ── Initial Data ── */
const INITIAL_APPLICATIONS: SchoolApplication[] = [
  {
    id: 'app-1',
    schoolName: 'Greenwood Academy',
    contactName: 'John Doe',
    email: 'john@greenwood.edu',
    phone: '+234 801 234 5678',
    location: 'Lagos, Nigeria',
    role: 'Principal',
    studentsCount: 45,
    message: 'We want to bring STEM excellence to our students.',
    submissionDate: '2026-06-01',
    status: 'pending'
  },
  {
    id: 'app-2',
    schoolName: 'Riverside High',
    contactName: 'Jane Smith',
    email: 'jane@riverside.edu',
    phone: '+234 802 345 6789',
    location: 'Ikeja, Lagos',
    role: 'Teacher',
    studentsCount: 30,
    message: 'Looking for more extracurricular activities for our students.',
    submissionDate: '2026-06-02',
    status: 'pending'
  }
];

const INITIAL_SCHOOLS: School[] = [
  { id: '1', name: 'Igbobi College', city: 'Lagos', region: 'Yaba', status: 'Active', approvalDate: '2026-05-01', studentCount: 120 },
  { id: '2', name: 'St Finbars College', city: 'Lagos', region: 'Akoka', status: 'Active', approvalDate: '2026-05-01', studentCount: 85 },
  { id: '3', name: "St Gregory's College", city: 'Lagos', region: 'Obalende', status: 'Active', approvalDate: '2026-05-01', studentCount: 150 },
  { id: '4', name: 'Methodist Girls & Boys', city: 'Lagos', region: 'Yaba', status: 'Registered', approvalDate: '2026-05-01', studentCount: 0 },
  { id: '5', name: 'Dowen College', city: 'Lagos', region: 'Lekki', status: 'Registered', approvalDate: '2026-05-01', studentCount: 0 },
  { id: '6', name: 'Yabatech Secondary School', city: 'Lagos', region: 'Yaba', status: 'Registered', approvalDate: '2026-05-01', studentCount: 0 },
  { id: '7', name: "King's College", city: 'Lagos', region: 'Lagos Island', status: 'Active', approvalDate: '2026-05-01', studentCount: 200 },
  { id: '8', name: "Kay's International College", city: 'Lagos', region: 'Victoria Island', status: 'Registered', approvalDate: '2026-05-01', studentCount: 0 },
  { id: '9', name: 'Our Lady of Apostles Secondary School', city: 'Lagos', region: 'Yaba', status: 'Registered', approvalDate: '2026-05-01', studentCount: 0 },
  { id: '10', name: 'Cathedral Missionary School (CMS)', city: 'Lagos', region: 'Lagos Island', status: 'Registered', approvalDate: '2026-05-01', studentCount: 0 },
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
  const [activeTab, setActiveTab] = useState<'overview' | 'applications' | 'schools' | 'analytics' | 'team'>('overview');
  const [applications, setApplications] = useState<SchoolApplication[]>(INITIAL_APPLICATIONS);
  const [schools, setSchools] = useState<School[]>(INITIAL_SCHOOLS);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Filtering & Sorting State
  const [appFilter, setAppFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [schoolSortField, setSchoolSortField] = useState<keyof School>('name');
  const [schoolSortOrder, setSchoolSortOrder] = useState<'asc' | 'desc'>('asc');
  const [schoolSearch, setSchoolSearch] = useState('');

  // Statistics
  const stats = useMemo(() => {
    const approvedChapters = schools.filter(s => s.status === 'Active' || s.status === 'Registered').length;
    const activeChapters = schools.filter(s => s.status === 'Active').length;
    const totalStudents = schools.reduce((acc, s) => acc + s.studentCount, 0);
    const pendingApps = applications.filter(a => a.status === 'pending').length;
    
    return {
      approvedChapters,
      activeChapters,
      totalStudents,
      pendingApps,
      totalApps: applications.length
    };
  }, [schools, applications]);

  const filteredApplications = applications.filter(app => 
    appFilter === 'all' ? true : app.status === appFilter
  );

  const sortedSchools = useMemo(() => {
    return [...schools]
      .filter(s => s.name.toLowerCase().includes(schoolSearch.toLowerCase()) || s.city.toLowerCase().includes(schoolSearch.toLowerCase()))
      .sort((a, b) => {
        const valA = a[schoolSortField];
        const valB = b[schoolSortField];
        if (typeof valA === 'string' && typeof valB === 'string') {
          return schoolSortOrder === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
        }
        if (typeof valA === 'number' && typeof valB === 'number') {
          return schoolSortOrder === 'asc' ? valA - valB : valB - valA;
        }
        return 0;
      });
  }, [schools, schoolSortField, schoolSortOrder, schoolSearch]);

  const handleApprove = (appId: string) => {
    const app = applications.find(a => a.id === appId);
    if (!app) return;

    setApplications(apps => apps.map(a => a.id === appId ? { ...a, status: 'approved' } : a));
    
    const newSchool: School = {
      id: `school-${Date.now()}`,
      name: app.schoolName,
      city: app.location.split(',')[0].trim(),
      region: app.location.split(',')[1]?.trim() || 'Lagos',
      status: 'Registered',
      approvalDate: new Date().toISOString().split('T')[0],
      studentCount: app.studentsCount
    };
    setSchools(prev => [...prev, newSchool]);
  };

  const handleReject = (appId: string) => {
    setApplications(apps => apps.map(a => a.id === appId ? { ...a, status: 'rejected' } : a));
  };

  const exportEnrollmentData = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "School Name,City,Region,Status,Approval Date,Student Count\n"
      + schools.map(s => `${s.name},${s.city},${s.region},${s.status},${s.approvalDate},${s.studentCount}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `msc_enrollment_data_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#f9f7f3]">
      {/* Top bar */}
      <header className="bg-white border-b border-[#e7e0d4] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/MSC%20logo.png" alt="MSC" className="w-8 h-8 object-contain" />
            <div>
              <span className="font-bold text-[#003e45] text-sm" style={{ fontFamily: 'var(--font-display)' }}>Mikaelson School Club</span>
              <span className="text-xs text-[#6e675c] font-mono ml-2 uppercase tracking-widest">Admin</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-[#6e675c] font-mono hidden sm:block">
              {mounted ? new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : ''}
            </span>
            <button onClick={onLogout} className="text-xs font-mono uppercase tracking-widest text-[#6e675c] hover:text-[#003e45] transition-colors border border-[#e7e0d4] rounded-full px-4 py-1.5">
              Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Page title */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-[#003e45] tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>Dashboard</h1>
            <p className="text-sm text-[#6e675c] mt-1">Real-time snapshot of the Mikaelson School Club network.</p>
          </div>
          {activeTab === 'schools' && (
            <button 
              onClick={exportEnrollmentData}
              className="bg-[#003e45] text-white px-5 py-2 rounded-full text-xs font-mono uppercase tracking-widest font-bold hover:bg-[#005a63] transition-colors"
            >
              Export Data (.CSV)
            </button>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {(['overview', 'applications', 'schools', 'analytics', 'team'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-xs font-mono uppercase tracking-widest font-bold border transition-all ${activeTab === tab ? 'bg-[#003e45] text-white border-[#003e45]' : 'bg-white text-[#6e675c] border-[#e7e0d4] hover:border-[#003e45]'}`}
            >
              {tab === 'applications' && stats.pendingApps > 0 ? `${tab} (${stats.pendingApps})` : tab}
            </button>
          ))}
        </div>

        {/* Overview tab */}
        {activeTab === 'overview' && (
          <div className="space-y-10">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                { label: 'Chapters Approved', value: stats.approvedChapters, sub: 'Total in network', color: 'bg-[#5ce1e6]', text: 'text-[#003e45]' },
                { label: 'Active Chapters', value: stats.activeChapters, sub: 'Fully operational', color: 'bg-[#003e45]', text: 'text-white' },
                { label: 'Total Students', value: stats.totalStudents, sub: 'Across all chapters', color: 'bg-[#f3eee5]', text: 'text-[#003e45]' },
                { label: 'Pending Apps', value: stats.pendingApps, sub: 'Awaiting review', color: 'bg-[#5ce1e6]', text: 'text-[#003e45]' },
                { label: 'Team Members', value: 11, sub: 'Core team', color: 'bg-[#003e45]', text: 'text-white' },
              ].map(m => (
                <div key={m.label} className={`${m.color} rounded-2xl p-5 shadow-sm`}>
                  <div className={`text-4xl font-extrabold tracking-tight leading-none ${m.text}`} style={{ fontFamily: 'var(--font-display)' }}>
                    {m.value}
                  </div>
                  <div className={`text-sm font-semibold mt-2 ${m.text}`}>{m.label}</div>
                  <div className={`text-xs mt-1 opacity-70 ${m.text}`}>{m.sub}</div>
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
                        <div className="text-xs text-[#6e675c]">{app.location} • {app.studentsCount} students</div>
                      </div>
                      <button 
                        onClick={() => setActiveTab('applications')}
                        className="text-[10px] font-mono uppercase font-bold text-[#003e45] bg-[#5ce1e6] px-3 py-1 rounded-full"
                      >
                        Review
                      </button>
                    </div>
                  ))}
                  {applications.length === 0 && <p className="text-sm text-[#6e675c] italic">No new applications.</p>}
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-[#e7e0d4] p-6 shadow-sm">
                <h2 className="text-sm font-mono uppercase tracking-widest text-[#003e45] font-bold mb-6">Enrollment Snapshot</h2>
                <div className="space-y-4">
                  {schools.filter(s => s.studentCount > 0).sort((a,b) => b.studentCount - a.studentCount).slice(0, 4).map(s => (
                    <div key={s.id}>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="font-semibold text-[#003e45]">{s.name}</span>
                        <span className="font-mono text-[#6e675c]">{s.studentCount} students</span>
                      </div>
                      <div className="h-2 bg-[#f3eee5] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#5ce1e6] rounded-full"
                          style={{ width: `${Math.min((s.studentCount / 250) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Applications Tab */}
        {activeTab === 'applications' && (
          <div className="space-y-6">
            <div className="flex gap-2">
              {(['all', 'pending', 'approved', 'rejected'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setAppFilter(f)}
                  className={`px-4 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-widest font-bold border transition-all ${appFilter === f ? 'bg-[#003e45] text-white border-[#003e45]' : 'bg-white text-[#6e675c] border-[#e7e0d4]'}`}
                >
                  {f}
                </button>
              ))}
            </div>

            <div className="bg-white rounded-2xl border border-[#e7e0d4] overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#f9f7f3] border-b border-[#e7e0d4]">
                      <th className="px-6 py-4 text-[10px] font-mono uppercase tracking-widest text-[#6e675c]">School & Contact</th>
                      <th className="px-6 py-4 text-[10px] font-mono uppercase tracking-widest text-[#6e675c]">Location</th>
                      <th className="px-6 py-4 text-[10px] font-mono uppercase tracking-widest text-[#6e675c]">Students</th>
                      <th className="px-6 py-4 text-[10px] font-mono uppercase tracking-widest text-[#6e675c]">Date</th>
                      <th className="px-6 py-4 text-[10px] font-mono uppercase tracking-widest text-[#6e675c]">Status</th>
                      <th className="px-6 py-4 text-[10px] font-mono uppercase tracking-widest text-[#6e675c]">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f3eee5]">
                    {filteredApplications.map(app => (
                      <tr key={app.id} className="hover:bg-[#faf9f6] transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-bold text-[#003e45] text-sm">{app.schoolName}</div>
                          <div className="text-xs text-[#6e675c]">{app.contactName} • {app.email}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-[#201d16]">{app.location}</td>
                        <td className="px-6 py-4 text-sm text-[#201d16] font-mono">{app.studentsCount}</td>
                        <td className="px-6 py-4 text-xs text-[#6e675c]">{app.submissionDate}</td>
                        <td className="px-6 py-4">
                          <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full ${
                            app.status === 'approved' ? 'bg-[#e0f6f7] text-[#003e45]' : 
                            app.status === 'rejected' ? 'bg-red-50 text-red-600' : 
                            'bg-[#f3eee5] text-[#6e675c]'
                          }`}>
                            {app.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {app.status === 'pending' && (
                            <div className="flex gap-2">
                              <button 
                                onClick={() => handleApprove(app.id)}
                                className="bg-[#5ce1e6] text-[#003e45] text-[10px] font-mono font-bold px-3 py-1 rounded-full hover:brightness-95"
                              >
                                Approve
                              </button>
                              <button 
                                onClick={() => handleReject(app.id)}
                                className="bg-white border border-[#e7e0d4] text-[#6e675c] text-[10px] font-mono font-bold px-3 py-1 rounded-full hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                              >
                                Reject
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Schools Tab */}
        {activeTab === 'schools' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <input 
                  type="text" 
                  placeholder="Search schools or cities..." 
                  value={schoolSearch}
                  onChange={(e) => setSchoolSearch(e.target.value)}
                  className="w-full bg-white border border-[#e7e0d4] rounded-full px-10 py-2 text-sm outline-none focus:border-[#5ce1e6]"
                />
                <svg className="absolute left-3.5 top-2.5 w-4 h-4 text-[#6e675c]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase text-[#6e675c]">Sort by:</span>
                <select 
                  className="bg-white border border-[#e7e0d4] rounded-full px-4 py-2 text-xs outline-none cursor-pointer"
                  value={schoolSortField}
                  onChange={(e) => setSchoolSortField(e.target.value as keyof School)}
                >
                  <option value="name">School Name</option>
                  <option value="studentCount">Student Count</option>
                  <option value="approvalDate">Approval Date</option>
                  <option value="region">Region</option>
                  <option value="status">Status</option>
                </select>
                <button 
                  onClick={() => setSchoolSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                  className="bg-white border border-[#e7e0d4] rounded-full p-2 hover:border-[#5ce1e6]"
                >
                  {schoolSortOrder === 'asc' ? '↑' : '↓'}
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#e7e0d4] overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#f9f7f3] border-b border-[#e7e0d4]">
                      <th className="px-6 py-4 text-[10px] font-mono uppercase tracking-widest text-[#6e675c]">School Name</th>
                      <th className="px-6 py-4 text-[10px] font-mono uppercase tracking-widest text-[#6e675c]">Region</th>
                      <th className="px-6 py-4 text-[10px] font-mono uppercase tracking-widest text-[#6e675c]">Students</th>
                      <th className="px-6 py-4 text-[10px] font-mono uppercase tracking-widest text-[#6e675c]">Approved</th>
                      <th className="px-6 py-4 text-[10px] font-mono uppercase tracking-widest text-[#6e675c]">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f3eee5]">
                    {sortedSchools.map(school => (
                      <tr key={school.id} className="hover:bg-[#faf9f6] transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-bold text-[#003e45] text-sm">{school.name}</div>
                          <div className="text-xs text-[#6e675c]">{school.city}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-[#201d16]">{school.region}</td>
                        <td className="px-6 py-4 text-sm font-mono text-[#003e45] font-bold">{school.studentCount}</td>
                        <td className="px-6 py-4 text-xs text-[#6e675c]">{school.approvalDate}</td>
                        <td className="px-6 py-4">
                          <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full ${
                            school.status === 'Active' ? 'bg-[#e0f6f7] text-[#003e45]' : 
                            'bg-[#f3eee5] text-[#6e675c]'
                          }`}>
                            {school.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-white rounded-2xl border border-[#e7e0d4] p-8 shadow-sm">
                <h2 className="text-sm font-mono uppercase tracking-widest text-[#003e45] font-bold mb-8">Enrollment Distribution</h2>
                <div className="h-64 flex items-end gap-4">
                  {schools.filter(s => s.studentCount > 0).slice(0, 10).map(s => (
                    <div key={s.id} className="flex-1 flex flex-col items-center gap-2 group">
                      <div className="w-full bg-[#5ce1e6] rounded-t-lg relative group-hover:bg-[#003e45] transition-colors" 
                           style={{ height: `${(s.studentCount / 200) * 100}%` }}>
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#003e45] text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {s.studentCount} students
                        </div>
                      </div>
                      <div className="text-[9px] font-mono text-[#6e675c] rotate-45 origin-left truncate w-16 mt-2">{s.name}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-[#e7e0d4] p-8 shadow-sm">
                <h2 className="text-sm font-mono uppercase tracking-widest text-[#003e45] font-bold mb-8">Regional Reach</h2>
                <div className="space-y-6">
                  {Object.entries(schools.reduce((acc, s) => {
                    acc[s.region] = (acc[s.region] || 0) + 1;
                    return acc;
                  }, {} as Record<string, number>))
                  .sort((a,b) => b[1] - a[1])
                  .map(([region, count]) => (
                    <div key={region}>
                      <div className="flex justify-between text-xs mb-2">
                        <span className="font-semibold text-[#003e45]">{region}</span>
                        <span className="font-mono text-[#6e675c]">{count} chapters</span>
                      </div>
                      <div className="h-2 bg-[#f3eee5] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#003e45] rounded-full"
                          style={{ width: `${(count / schools.length) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[#f3eee5] p-6 rounded-2xl border border-[#e7e0d4]">
                <div className="text-xs font-mono uppercase text-[#6e675c] mb-2">Average Enrollment</div>
                <div className="text-3xl font-bold text-[#003e45]">{Math.round(stats.totalStudents / stats.approvedChapters) || 0}</div>
                <div className="text-[10px] text-[#6e675c] mt-1">Students per chapter</div>
              </div>
              <div className="bg-[#e0f6f7] p-6 rounded-2xl border border-[#5ce1e6]">
                <div className="text-xs font-mono uppercase text-[#003e45] mb-2">Conversion Rate</div>
                <div className="text-3xl font-bold text-[#003e45]">{Math.round((stats.approvedChapters / stats.totalApps) * 100) || 0}%</div>
                <div className="text-[10px] text-[#003e45] mt-1">Apps to Chapters</div>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-[#e7e0d4]">
                <div className="text-xs font-mono uppercase text-[#6e675c] mb-2">Projected Growth</div>
                <div className="text-3xl font-bold text-[#003e45]">+{stats.pendingApps * 40}</div>
                <div className="text-[10px] text-[#6e675c] mt-1">Est. students in pipeline</div>
              </div>
              <div className="bg-[#003e45] p-6 rounded-2xl">
                <div className="text-xs font-mono uppercase text-white/70 mb-2">Active Chapters</div>
                <div className="text-3xl font-bold text-white">{Math.round((stats.activeChapters / stats.approvedChapters) * 100) || 0}%</div>
                <div className="text-[10px] text-white/70 mt-1">Operational readiness</div>
              </div>
            </div>
          </div>
        )}

        {/* Team tab */}
        {activeTab === 'team' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEAM.map(t => (
              <div key={t.name} className="bg-white rounded-2xl border border-[#e7e0d4] p-6 flex items-center gap-4 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-[#f3eee5] flex items-center justify-center text-[#003e45] font-bold text-lg">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-[#003e45] text-sm">{t.name}</div>
                  <div className="text-xs text-[#6e675c] font-mono uppercase tracking-widest">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isAuthed = sessionStorage.getItem('msc_admin') === '1';
    if (isAuthed) setAuthed(true);
  }, []);

  if (!mounted) return null; // Or a loading spinner

  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />;
  return <Dashboard onLogout={() => { sessionStorage.removeItem('msc_admin'); setAuthed(false); }} />;
}
