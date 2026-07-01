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
  registrationUrl?: string;
}

export const EVENTS_STORAGE_KEY = 'msc_events';

/** Read events from localStorage; seed on first use. Safe on the server (returns seed). */
export function loadEvents(): EventItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(EVENTS_STORAGE_KEY);
    if (!raw) {
      window.localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify([]));
      return [];
    }
    const parsed = JSON.parse(raw) as EventItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
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
