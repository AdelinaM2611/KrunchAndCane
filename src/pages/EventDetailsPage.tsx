import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type EventDetail = {
  id?: string;
  name?: string;
  location?: string;
  startAt?: string;
  endAt?: string;
  description?: string;
  imageUrl?: string | null;
  [key: string]: unknown;
};

const API_BASE = import.meta.env.VITE_API_URL ?? (import.meta.env.DEV ? "http://localhost:4000" : "");
const PLACEHOLDER_IMAGE = "https://placehold.co/1200x520?text=Event";

function formatDate(iso?: string): string {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

function formatTime(iso?: string): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
}

export function EventDetailsPage() {
  const { eventId } = useParams<"eventId">();
  const [event, setEvent] = useState<EventDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showRsvpForm, setShowRsvpForm] = useState(false);
  const [rsvpName, setRsvpName] = useState("");
  const [rsvpEmail, setRsvpEmail] = useState("");
  const [rsvpPhone, setRsvpPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: "success" | "duplicate" | "error"; text: string } | null>(null);

  useEffect(() => {
    if (!eventId) {
      setLoading(false);
      setError("Invalid event");
      return;
    }
    setLoading(true);
    setError(null);
    fetch(`${API_BASE}/api/events/${eventId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Event not found");
        return res.json();
      })
      .then(setEvent)
      .catch(() => {
        setEvent(null);
        setError("Couldn’t load this event.");
      })
      .finally(() => setLoading(false));
  }, [eventId]);

  async function handleRsvpSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!eventId || submitting) return;
    setSubmitMessage(null);
    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/api/events/${eventId}/rsvps`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: rsvpName.trim(),
          email: rsvpEmail.trim(),
          phone: rsvpPhone.trim() || undefined,
        }),
      });
      if (res.status === 201) {
        setSubmitMessage({ type: "success", text: "Thanks! Your RSVP has been recorded." });
        setRsvpName("");
        setRsvpEmail("");
        setRsvpPhone("");
      } else if (res.status === 409) {
        setSubmitMessage({ type: "duplicate", text: "An RSVP with this email already exists for this event." });
      } else {
        setSubmitMessage({ type: "error", text: "Something went wrong. Please try again later." });
      }
    } catch {
      setSubmitMessage({ type: "error", text: "Something went wrong. Please try again later." });
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <main className="px-4 py-12 sm:px-6 lg:px-8">
        <p className="text-lg text-gray-700">Loading…</p>
      </main>
    );
  }

  if (error || !event) {
    return (
      <main className="px-4 py-12 sm:px-6 lg:px-8">
        <p className="text-lg text-red-600">{error ?? "Event not found."}</p>
      </main>
    );
  }

  const startTime = formatTime(event.startAt);
  const endTime = formatTime(event.endAt);
  const timeRange = startTime !== "—" && endTime !== "—" ? `${startTime} – ${endTime}` : startTime;

  return (
    <main className="px-4 py-12 sm:px-6 lg:px-8">
      <article className="mx-auto max-w-3xl">
        <h1 className="mb-6 text-4xl font-bold text-leaf-green sm:text-5xl">
          {event.name ?? "Event"}
        </h1>

        <div className="mb-6 overflow-hidden rounded-2xl">
          <img
            src={event.imageUrl ?? PLACEHOLDER_IMAGE}
            alt=""
            className="h-auto w-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE;
            }}
          />
        </div>

        <div className="space-y-4 rounded-2xl border border-green-200 bg-white p-6 shadow-sm sm:p-8">
          {event.location && (
            <p className="text-lg text-gray-700">
              <span className="font-semibold text-leaf-green">Location:</span>{" "}
              {event.location}
            </p>
          )}
          <p className="text-lg text-gray-700">
            <span className="font-semibold text-leaf-green">Date:</span>{" "}
            {formatDate(event.startAt)}
          </p>
          <p className="text-lg text-gray-700">
            <span className="font-semibold text-leaf-green">Time:</span>{" "}
            {timeRange}
          </p>
          {event.description && (
            <p className="text-lg leading-relaxed text-gray-700">
              {event.description}
            </p>
          )}
        </div>

        <div className="mt-10">
          <button
            type="button"
            onClick={() => setShowRsvpForm(true)}
            className="rounded-full bg-leaf-green px-6 py-3 text-lg font-semibold text-white shadow-md transition-colors hover:bg-leaf-deep"
          >
            To confirm that you will be attending please RSVP
          </button>
        </div>

        {showRsvpForm && (
          <div className="mt-8 rounded-2xl border border-green-200 bg-white p-6 shadow-lg sm:p-8">
            <h2 className="mb-6 text-2xl font-bold text-leaf-green">RSVP</h2>
            <form
              onSubmit={handleRsvpSubmit}
              className="grid max-w-md gap-5"
            >
              <div>
                <label htmlFor="rsvp-name" className="mb-1 block text-sm font-medium text-gray-700">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="rsvp-name"
                  type="text"
                  required
                  value={rsvpName}
                  onChange={(e) => setRsvpName(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-leaf-green focus:outline-none focus:ring-2 focus:ring-leaf-green focus:ring-offset-0"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="rsvp-email" className="mb-1 block text-sm font-medium text-gray-700">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="rsvp-email"
                  type="email"
                  required
                  value={rsvpEmail}
                  onChange={(e) => setRsvpEmail(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-leaf-green focus:outline-none focus:ring-2 focus:ring-leaf-green focus:ring-offset-0"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="rsvp-phone" className="mb-1 block text-sm font-medium text-gray-700">
                  Phone <span className="text-gray-400">(optional)</span>
                </label>
                <input
                  id="rsvp-phone"
                  type="tel"
                  value={rsvpPhone}
                  onChange={(e) => setRsvpPhone(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-leaf-green focus:outline-none focus:ring-2 focus:ring-leaf-green focus:ring-offset-0"
                  placeholder="+44 …"
                />
              </div>
              {submitMessage && (
                <p
                  className={
                    submitMessage.type === "success"
                      ? "text-leaf-green font-medium"
                      : submitMessage.type === "duplicate"
                        ? "text-amber-700 font-medium"
                        : "text-red-600 font-medium"
                  }
                >
                  {submitMessage.text}
                </p>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="rounded-full bg-gradient-to-r from-sugarcane-yellow to-orange-accent px-6 py-3 text-lg font-semibold text-gray-900 shadow-md transition-all hover:opacity-95 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {submitting ? "Submitting…" : "Submit RSVP"}
              </button>
            </form>
          </div>
        )}
      </article>
    </main>
  );
}
