/**
 * Shared events store.
 *
 * NOTE: This site is a static Next.js app with no backend/database yet, so
 * events are persisted in the browser's localStorage. That means events
 * created in the admin dashboard are saved on that browser only — they are
 * NOT broadcast to every visitor. When the backend (see BACKEND.md) is wired
 * up, swap `loadEvents`/`saveEvents` for API calls and keep the same types.
 */

export type EventType = 'upcoming' | 'past';

export interface EventItem {
  id: string;
  title: string;
  date: string;        // human-readable, e.g. "June 15, 2026"
  time: string;        // e.g. "6:00 PM – 8:00 PM" (optional for past)
  location: string;
  description: string;
  category: string;    // e.g. "Workshop", "Networking", "Career"
  type: EventType;
  attendees?: string;  // for past events, e.g. "125 students"
}

export const EVENTS_STORAGE_KEY = 'msc_events';

/** Default events shown until/unless the admin changes them. */
export const SEED_EVENTS: EventItem[] = [
  {
    id: 'seed-1',
    title: 'Monthly Networking Dinner',
    date: 'June 15, 2026',
    time: '6:00 PM – 8:00 PM',
    location: 'School Auditorium',
    description: 'Connect with fellow club members and industry professionals over dinner.',
    category: 'Networking',
    type: 'upcoming',
  },
  {
    id: 'seed-2',
    title: 'Leadership Workshop',
    date: 'June 22, 2026',
    time: '3:30 PM – 5:00 PM',
    location: 'Room 301',
    description: 'Learn essential leadership skills from experienced mentors.',
    category: 'Workshop',
    type: 'upcoming',
  },
  {
    id: 'seed-3',
    title: 'Career Fair',
    date: 'July 10, 2026',
    time: '2:00 PM – 5:00 PM',
    location: 'School Gymnasium',
    description: 'Meet representatives from top companies and explore career opportunities.',
    category: 'Career',
    type: 'upcoming',
  },
  {
    id: 'seed-4',
    title: 'Orientation Event',
    date: 'May 1, 2026',
    time: '',
    location: 'School Auditorium',
    description: 'Welcome session introducing new members to the club and its programme.',
    category: 'Community',
    type: 'past',
    attendees: '125 students',
  },
  {
    id: 'seed-5',
    title: 'Spring Volunteer Drive',
    date: 'April 20, 2026',
    time: '',
    location: 'Community Centre',
    description: 'A day of community service organised by chapter members.',
    category: 'Community',
    type: 'past',
    attendees: '80 volunteers',
  },
  {
    id: 'seed-6',
    title: 'Winter Seminar Series',
    date: 'March 15, 2026',
    time: '',
    location: 'Main Hall',
    description: 'A series of seminars on leadership, habits, and digital skills.',
    category: 'Workshop',
    type: 'past',
    attendees: '200+ attendees',
  },
];

/** Read events from localStorage; seed on first use. Safe on the server (returns seed). */
export function loadEvents(): EventItem[] {
  if (typeof window === 'undefined') return SEED_EVENTS;
  try {
    const raw = window.localStorage.getItem(EVENTS_STORAGE_KEY);
    if (!raw) {
      window.localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(SEED_EVENTS));
      return SEED_EVENTS;
    }
    const parsed = JSON.parse(raw) as EventItem[];
    return Array.isArray(parsed) ? parsed : SEED_EVENTS;
  } catch {
    return SEED_EVENTS;
  }
}

/** Persist events to localStorage and notify listeners in this tab. */
export function saveEvents(events: EventItem[]): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(events));
  window.dispatchEvent(new Event('msc_events_changed'));
}

export function newEventId(): string {
  // Avoid Date.now()/Math.random pitfalls in non-browser contexts; this only runs in the browser.
  return 'evt-' + Date.now().toString(36) + '-' + Math.floor(Math.random() * 1e6).toString(36);
}
