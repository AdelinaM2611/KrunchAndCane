import { useEffect, useState } from "react";

type EventItem = { id?: string; name?: string; title?: string; [key: string]: unknown };

export function UpcomingEventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("/api/events")
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error("Failed to fetch"))))
      .then((data) => {
        const list = Array.isArray(data) ? data : data?.events ?? [];
        setEvents(list);
      })
      .catch(() => setEvents([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-4xl font-bold text-leaf-green">Upcoming Events</h1>

      {loading && (
        <p className="text-lg text-gray-700">Loading…</p>
      )}

      {!loading && events.length === 0 && (
        <p className="text-lg text-gray-700">No upcoming events yet.</p>
      )}

      {!loading && events.length > 0 && (
        <ul className="space-y-4">
          {events.map((event, index) => (
            <li
              key={event.id ?? event.name ?? event.title ?? index}
              className="rounded-xl border border-green-200 bg-white p-4 shadow-sm"
            >
              <span className="text-lg text-gray-800">
                {event.name ?? event.title ?? "Event"}
              </span>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
