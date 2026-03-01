import { useParams } from "react-router-dom";

export function EventDetailsPage() {
  const { eventId } = useParams<"eventId">();

  return (
    <main className="px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-4xl font-bold text-leaf-green">Event Details</h1>
      <p className="text-lg text-gray-700">
        Event ID: <strong>{eventId ?? "—"}</strong>
      </p>
      <p className="mt-4 text-gray-600">Event details page coming soon.</p>
    </main>
  );
}
