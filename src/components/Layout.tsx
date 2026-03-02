/**
 * Wraps all routes: navbar, main content (Outlet), footer. Handles scroll-to-section for ?section= or hash.
 */
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";

export function Layout() {
  const location = useLocation();

  /** Scroll to hash when navigating to /#about or /#contact (e.g. from another page). */
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      const el = document.getElementById(id);
      if (el) {
        const offset = 100;
        const top = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
  }, [location.pathname, location.hash]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream-light to-cream">
      <Navbar />
      <div className="flex flex-col">
        <Outlet />
        <div className="mx-auto w-full max-w-7xl">
          <footer className="mt-16 border-t border-green-200 px-4 py-8 text-center text-sm text-gray-600 sm:px-6 lg:px-8">
            <p>© {new Date().getFullYear()} Krunch &amp; Cane. All rights reserved.</p>
          </footer>
        </div>
      </div>
    </div>
  );
}
