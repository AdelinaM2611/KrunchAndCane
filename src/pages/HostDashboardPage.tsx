/**
 * Host dashboard (/host): create/edit/cancel events, view RSVPs per event, link to public event page.
 * Protected: redirects to /login if no token; 401 from API also clears token and redirects.
 * Includes idle timeout (30 min), cancel confirmation modal, and Retry on errors.
 */
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiFetch } from "../lib/api";
import { clearToken, getToken } from "../lib/auth";

type HostEvent = {
  id: string;
  name: string;
  location: string;
  startAt: string;
  endAt: string;
  description: string;
  status: string;
  imageUrl?: string | null;
  _count?: { rsvps: number };
};

type RsvpItem = {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  guests?: number | null;
  createdAt?: string;
};

type EventForm = {
  name: string;
  location: string;
  startAt: string;
  endAt: string;
  description: string;
  imageUrl: string;
};

const emptyForm: EventForm = {
  name: "",
  location: "",
  startAt: "",
  endAt: "",
  description: "",
  imageUrl: "",
};

function toLocalDatetime(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
}

export function HostDashboardPage() {
  const navigate = useNavigate();
  const [events, setEvents] = useState<HostEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [createForm, setCreateForm] = useState<EventForm>(emptyForm);
  const [createSubmitting, setCreateSubmitting] = useState(false);
  const [editingEvent, setEditingEvent] = useState<HostEvent | null>(null);
  const [editForm, setEditForm] = useState<EventForm>(emptyForm);
  const [editSubmitting, setEditSubmitting] = useState(false);
  const [cancelId, setCancelId] = useState<string | null>(null);
  const [cancelConfirmId, setCancelConfirmId] = useState<string | null>(null);
  const [rsvpModalEvent, setRsvpModalEvent] = useState<HostEvent | null>(null);
  const [rsvpList, setRsvpList] = useState<RsvpItem[]>([]);
  const [rsvpListLoading, setRsvpListLoading] = useState(false);

  /** Load host's events from GET /api/host/events; redirect to login on 401. */
  const fetchEvents = useCallback(async () => {
    const res = await apiFetch("/api/host/events");
    if (res.status === 401) {
      navigate("/login", { replace: true });
      return;
    }
    if (!res.ok) {
      setError("Failed to load events.");
      setEvents([]);
      return;
    }
    const data = await res.json();
    setEvents(Array.isArray(data) ? data : []);
    setError(null);
  }, [navigate]);

  /** On mount: require token, then load events; redirect to login if not authenticated. */
  useEffect(() => {
    if (!getToken()) {
      navigate("/login", { replace: true });
      return;
    }
    setLoading(true);
    fetchEvents().finally(() => setLoading(false));
  }, [navigate, fetchEvents]);

  /** Idle timeout: after 30 min without mousemove/keydown/click, clear token and redirect to login. */
  useEffect(() => {
    if (!getToken()) return;
    const IDLE_MS = 30 * 60 * 1000;
    let timeoutId: ReturnType<typeof setTimeout>;
    const resetTimer = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        clearToken();
        navigate("/login", { replace: true });
      }, IDLE_MS);
    };
    resetTimer();
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    window.addEventListener("click", resetTimer);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("click", resetTimer);
    };
  }, [navigate]);

  useEffect(() => {
    if (!successMessage) return;
    const t = setTimeout(() => setSuccessMessage(null), 4000);
    return () => clearTimeout(t);
  }, [successMessage]);

  /** Create event via POST /api/events; then refresh list and show success. */
  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setCreateSubmitting(true);
    setError(null);
    try {
      const startAt = createForm.startAt ? new Date(createForm.startAt).toISOString() : new Date().toISOString();
      const endAt = createForm.endAt ? new Date(createForm.endAt).toISOString() : new Date(Date.now() + 3600000).toISOString();
      const res = await apiFetch("/api/events", {
        method: "POST",
        body: JSON.stringify({
          name: createForm.name,
          location: createForm.location,
          startAt,
          endAt,
          description: createForm.description,
          imageUrl: createForm.imageUrl || undefined,
        }),
      });
      if (res.status === 401) {
        navigate("/login", { replace: true });
        return;
      }
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setError(err?.error?.message ?? "Failed to create event.");
        return;
      }
      setCreateForm(emptyForm);
      setSuccessMessage("Event created.");
      fetchEvents();
    } finally {
      setCreateSubmitting(false);
    }
  }

  /** Open edit modal and prefill form with event data. */
  function startEdit(event: HostEvent) {
    setEditingEvent(event);
    setEditForm({
      name: event.name,
      location: event.location,
      startAt: toLocalDatetime(event.startAt),
      endAt: toLocalDatetime(event.endAt),
      description: event.description,
      imageUrl: event.imageUrl ?? "",
    });
  }

  /** Update event via PUT /api/events/:id; then close modal and refresh list. */
  async function handleEdit(e: React.FormEvent) {
    e.preventDefault();
    if (!editingEvent) return;
    setEditSubmitting(true);
    setError(null);
    try {
      const startAt = editForm.startAt ? new Date(editForm.startAt).toISOString() : editingEvent.startAt;
      const endAt = editForm.endAt ? new Date(editForm.endAt).toISOString() : editingEvent.endAt;
      const res = await apiFetch(`/api/events/${editingEvent.id}`, {
        method: "PUT",
        body: JSON.stringify({
          name: editForm.name,
          location: editForm.location,
          startAt,
          endAt,
          description: editForm.description,
          imageUrl: editForm.imageUrl || null,
        }),
      });
      if (res.status === 401) {
        navigate("/login", { replace: true });
        return;
      }
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setError(err?.error?.message ?? "Failed to update event.");
        return;
      }
      setEditingEvent(null);
      setSuccessMessage("Event updated.");
      fetchEvents();
    } finally {
      setEditSubmitting(false);
    }
  }

  /** Cancel event via POST /api/events/:id/cancel; backend sends cancellation emails to RSVPs. */
  async function handleCancel(eventId: string) {
    setCancelId(eventId);
    setCancelConfirmId(null);
    setError(null);
    try {
      const res = await apiFetch(`/api/events/${eventId}/cancel`, { method: "POST" });
      if (res.status === 401) {
        navigate("/login", { replace: true });
        return;
      }
      if (!res.ok) {
        setError("Failed to cancel event.");
        return;
      }
      setSuccessMessage("Event cancelled.");
      fetchEvents();
    } finally {
      setCancelId(null);
    }
  }

  /** Open RSVP list modal and fetch GET /api/host/events/:eventId/rsvps. */
  async function openRsvpModal(event: HostEvent) {
    setRsvpModalEvent(event);
    setRsvpListLoading(true);
    setRsvpList([]);
    try {
      const res = await apiFetch(`/api/host/events/${event.id}/rsvps`);
      if (res.status === 401) {
        navigate("/login", { replace: true });
        return;
      }
      if (!res.ok) {
        setRsvpList([]);
        return;
      }
      const data = await res.json();
      setRsvpList(Array.isArray(data) ? data : []);
    } finally {
      setRsvpListLoading(false);
    }
  }

  if (!getToken()) return null;

  return (
    <main className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-6 text-4xl font-bold text-leaf-green">Host Dashboard</h1>

        {successMessage && (
          <p className="mb-4 rounded-lg bg-green-50 p-3 text-green-800" role="status">
            {successMessage}
          </p>
        )}
        {error && (
          <p className="mb-4 rounded-lg bg-red-50 p-3 text-red-700" role="alert">
            {error}
            <button
              type="button"
              onClick={() => { setError(null); fetchEvents(); }}
              className="ml-3 rounded-full border border-red-300 bg-white px-3 py-1 text-sm font-semibold text-red-700 hover:bg-red-50"
            >
              Retry
            </button>
          </p>
        )}

        {/* Create event form */}
        <section className="mb-10 rounded-2xl border border-green-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-2xl font-bold text-leaf-green">Create event</h2>
          <form onSubmit={handleCreate} className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                required
                value={createForm.name}
                onChange={(e) => setCreateForm((f) => ({ ...f, name: e.target.value }))}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-500 focus:border-leaf-green focus:outline-none focus:ring-2 focus:ring-leaf-green"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                required
                value={createForm.location}
                onChange={(e) => setCreateForm((f) => ({ ...f, location: e.target.value }))}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-500 focus:border-leaf-green focus:outline-none focus:ring-2 focus:ring-leaf-green"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Start (date & time)</label>
              <input
                type="datetime-local"
                required
                value={createForm.startAt}
                onChange={(e) => setCreateForm((f) => ({ ...f, startAt: e.target.value }))}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-500 focus:border-leaf-green focus:outline-none focus:ring-2 focus:ring-leaf-green"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">End (date & time)</label>
              <input
                type="datetime-local"
                required
                value={createForm.endAt}
                onChange={(e) => setCreateForm((f) => ({ ...f, endAt: e.target.value }))}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-500 focus:border-leaf-green focus:outline-none focus:ring-2 focus:ring-leaf-green"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">Description</label>
              <textarea
                required
                rows={3}
                value={createForm.description}
                onChange={(e) => setCreateForm((f) => ({ ...f, description: e.target.value }))}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-500 focus:border-leaf-green focus:outline-none focus:ring-2 focus:ring-leaf-green"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">Image URL (optional)</label>
              <input
                type="url"
                value={createForm.imageUrl}
                onChange={(e) => setCreateForm((f) => ({ ...f, imageUrl: e.target.value }))}
                placeholder="https://..."
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-500 focus:border-leaf-green focus:outline-none focus:ring-2 focus:ring-leaf-green"
              />
            </div>
            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={createSubmitting}
                className="rounded-full bg-leaf-green px-6 py-2 font-semibold text-white shadow-md hover:bg-leaf-deep disabled:opacity-70"
              >
                {createSubmitting ? "Creating…" : "Create event"}
              </button>
            </div>
          </form>
        </section>

        {/* Events list */}
        <section>
          <h2 className="mb-4 text-2xl font-bold text-leaf-green">Your events</h2>
          {loading && <p className="text-gray-700">Loading…</p>}
          {!loading && events.length === 0 && (
            <p className="rounded-xl border border-green-200 bg-white p-6 text-gray-600">No events yet. Create one above.</p>
          )}
          {!loading && events.length > 0 && (
            <ul className="space-y-4">
              {events.map((event) => (
                <li
                  key={event.id}
                  className="rounded-xl border border-green-200 bg-white p-4 shadow-sm"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{event.name}</h3>
                      <p className="text-sm text-gray-600">{formatDate(event.startAt)} · {formatTime(event.startAt)} – {formatTime(event.endAt)}</p>
                      <p className="text-sm text-gray-600">{event.location}</p>
                      <p className="mt-1 text-sm">
                        <span className="font-medium text-leaf-green">Status:</span>{" "}
                        <span className={event.status === "CANCELLED" ? "text-red-600" : "text-gray-700"}>{event.status}</span>
                        {" · "}
                        <span className="font-medium text-leaf-green">RSVPs:</span>{" "}
                        {event._count?.rsvps ?? 0}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <Link
                          to={`/events/${event.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-leaf-green underline hover:no-underline"
                        >
                          View event page
                        </Link>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => openRsvpModal(event)}
                        className="rounded-full border border-leaf-green bg-white px-4 py-2 text-sm font-semibold text-leaf-green hover:bg-green-50"
                      >
                        View RSVPs
                      </button>
                      <button
                        type="button"
                        onClick={() => startEdit(event)}
                        disabled={event.status === "CANCELLED"}
                        className="rounded-full border border-leaf-green bg-white px-4 py-2 text-sm font-semibold text-leaf-green hover:bg-green-50 disabled:opacity-50"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => setCancelConfirmId(event.id)}
                        disabled={event.status === "CANCELLED" || cancelId === event.id}
                        className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50"
                      >
                        {cancelId === event.id ? "Cancelling…" : event.status === "CANCELLED" ? "Cancelled" : "Cancel event"}
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Edit modal */}
        {editingEvent && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={() => setEditingEvent(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Edit event"
          >
            <div
              className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-green-200 bg-white p-6 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="mb-4 text-2xl font-bold text-leaf-green">Edit event</h2>
              <form onSubmit={handleEdit} className="grid gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    required
                    value={editForm.name}
                    onChange={(e) => setEditForm((f) => ({ ...f, name: e.target.value }))}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-500 focus:border-leaf-green focus:outline-none focus:ring-2 focus:ring-leaf-green"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Location</label>
                  <input
                    type="text"
                    required
                    value={editForm.location}
                    onChange={(e) => setEditForm((f) => ({ ...f, location: e.target.value }))}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-500 focus:border-leaf-green focus:outline-none focus:ring-2 focus:ring-leaf-green"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Start</label>
                  <input
                    type="datetime-local"
                    required
                    value={editForm.startAt}
                    onChange={(e) => setEditForm((f) => ({ ...f, startAt: e.target.value }))}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-500 focus:border-leaf-green focus:outline-none focus:ring-2 focus:ring-leaf-green"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">End</label>
                  <input
                    type="datetime-local"
                    required
                    value={editForm.endAt}
                    onChange={(e) => setEditForm((f) => ({ ...f, endAt: e.target.value }))}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-500 focus:border-leaf-green focus:outline-none focus:ring-2 focus:ring-leaf-green"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    required
                    rows={3}
                    value={editForm.description}
                    onChange={(e) => setEditForm((f) => ({ ...f, description: e.target.value }))}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-500 focus:border-leaf-green focus:outline-none focus:ring-2 focus:ring-leaf-green"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Image URL (optional)</label>
                  <input
                    type="url"
                    value={editForm.imageUrl}
                    onChange={(e) => setEditForm((f) => ({ ...f, imageUrl: e.target.value }))}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-500 focus:border-leaf-green focus:outline-none focus:ring-2 focus:ring-leaf-green"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={editSubmitting}
                    className="rounded-full bg-leaf-green px-6 py-2 font-semibold text-white shadow-md hover:bg-leaf-deep disabled:opacity-70"
                  >
                    {editSubmitting ? "Saving…" : "Save"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingEvent(null)}
                    className="rounded-full border border-gray-300 bg-white px-6 py-2 font-semibold text-gray-700 hover:bg-gray-50"
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Cancel confirmation modal */}
        {cancelConfirmId && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={() => setCancelConfirmId(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Confirm cancel event"
          >
            <div
              className="w-full max-w-md rounded-2xl border border-green-200 bg-white p-6 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="mb-2 text-xl font-bold text-leaf-green">Cancel event?</h2>
              <p className="mb-6 text-gray-700">
                This event will be cancelled and all RSVPs will be notified by email. This cannot be undone.
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleCancel(cancelConfirmId)}
                  disabled={cancelId === cancelConfirmId}
                  className="rounded-full bg-red-600 px-6 py-2 font-semibold text-white hover:bg-red-700 disabled:opacity-70"
                >
                  {cancelId === cancelConfirmId ? "Cancelling…" : "Yes, cancel event"}
                </button>
                <button
                  type="button"
                  onClick={() => setCancelConfirmId(null)}
                  className="rounded-full border border-gray-300 bg-white px-6 py-2 font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        )}

        {/* View RSVPs modal */}
        {rsvpModalEvent && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={() => setRsvpModalEvent(null)}
            role="dialog"
            aria-modal="true"
            aria-label="View RSVPs"
          >
            <div
              className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-green-200 bg-white p-6 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="mb-4 text-2xl font-bold text-leaf-green">RSVPs – {rsvpModalEvent.name}</h2>
              {rsvpListLoading && <p className="text-gray-600">Loading…</p>}
              {!rsvpListLoading && rsvpList.length === 0 && (
                <p className="text-gray-600">No RSVPs yet.</p>
              )}
              {!rsvpListLoading && rsvpList.length > 0 && (
                <ul className="space-y-3">
                  {rsvpList.map((r) => (
                    <li key={r.id} className="rounded-lg border border-green-100 bg-green-50/50 p-3">
                      <p className="font-medium text-gray-900">{r.name}</p>
                      <p className="text-sm text-gray-600">{r.email}</p>
                      {r.phone && <p className="text-sm text-gray-600">Phone: {r.phone}</p>}
                      {r.guests != null && r.guests > 0 && (
                        <p className="text-sm text-gray-600">Guests: {r.guests}</p>
                      )}
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => setRsvpModalEvent(null)}
                  className="rounded-full border border-gray-300 bg-white px-6 py-2 font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
