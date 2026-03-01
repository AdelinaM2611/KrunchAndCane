import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE } from "../lib/api";

type EventItem = { id?: string; name?: string; title?: string; imageUrl?: string | null; startAt?: string; endAt?: string; [key: string]: unknown };

const PLACEHOLDER_IMAGE = "https://placehold.co/600x340?text=Event";
const BANNER_PLACEHOLDER = "/images/dough.jpg";

function formatDate(iso?: string): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
}

function formatTime(iso?: string): string {
  if (!iso) return "";
  return new Date(iso).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
}

export function UpcomingEventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`${API_BASE}/api/events`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch events");
        return res.json();
      })
      .then((data) => {
        const raw = Array.isArray(data) ? data : (data?.events ?? []);
        const list = Array.isArray(raw) ? raw : [];
        setEvents(list);
      })
      .catch(() => {
        setEvents([]);
        setError("Couldn’t load events. Make sure the API server is running (npm run dev in the server folder).");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-4xl font-bold text-leaf-green">Upcoming Events</h1>

      {error && (
        <p className="mb-4 text-lg text-red-600">{error}</p>
      )}

      {loading && (
        <p className="text-lg text-gray-700">Loading…</p>
      )}

      {!loading && !error && events.length === 0 && (
        <p className="text-lg text-gray-700">No upcoming events yet.</p>
      )}

      {!loading && events.length > 0 && (
        <>
          <p className="mb-6 text-sm text-gray-500">Only active upcoming events are shown. Cancelled events are not listed.</p>
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event, index) => (
              <li key={event.id ?? event.name ?? event.title ?? index} className="flex">
                <Link
                  to={`/events/${event.id ?? index}`}
                  className="flex w-full flex-col overflow-hidden rounded-xl border border-green-200 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:border-leaf-green/40 hover:-translate-y-0.5"
                >
                  <div className="aspect-[4/3] w-full shrink-0 overflow-hidden bg-gray-100">
                    <img
                      src={event.imageUrl ?? PLACEHOLDER_IMAGE}
                      alt=""
                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = PLACEHOLDER_IMAGE;
                      }}
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <span className="text-lg font-medium text-gray-800">
                      {event.name ?? event.title ?? "Event"}
                    </span>
                    {(event.startAt || event.endAt) && (
                      <p className="mt-1 text-sm text-gray-600">
                        {event.startAt && formatDate(event.startAt)}
                        {event.startAt && event.endAt && " · "}
                        {event.startAt && formatTime(event.startAt)}
                        {event.startAt && event.endAt && " – "}
                        {event.endAt && formatTime(event.endAt)}
                      </p>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-10 overflow-hidden rounded-3xl">
            <img
              src={BANNER_PLACEHOLDER}
              alt=""
              className="min-h-[320px] w-full object-cover sm:min-h-[380px] lg:min-h-[420px]"
            />
          </div>
        </>
      )}
    </main>
  );
}

