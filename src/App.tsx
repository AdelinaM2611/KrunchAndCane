import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { UpcomingEventsPage } from "./pages/UpcomingEventsPage";
import { EventDetailsPage } from "./pages/EventDetailsPage";
import { LoginPage } from "./pages/LoginPage";
import { HostDashboardPage } from "./pages/HostDashboardPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/events" element={<UpcomingEventsPage />} />
          <Route path="/events/:eventId" element={<EventDetailsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/host" element={<HostDashboardPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
