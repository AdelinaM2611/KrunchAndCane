import { Link, NavLink } from "react-router-dom";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo/Text */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-2xl font-bold text-leaf-green ${isActive ? "underline" : ""}`
          }
        >
          Krunch &amp; Cane
        </NavLink>

        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          <Link
            to="/?section=about"
            className="text-lg font-medium text-gray-800 transition-colors hover:text-leaf-green"
          >
            About Us
          </Link>
          <Link
            to="/?section=contact"
            className="text-lg font-medium text-gray-800 transition-colors hover:text-leaf-green"
          >
            Contact Us
          </Link>
          <Link
            to="/events"
            className="text-lg font-medium text-gray-800 transition-colors hover:text-leaf-green"
          >
            Upcoming Events
          </Link>
          <Link
            to="/login"
            className="text-lg font-medium text-gray-800 transition-colors hover:text-leaf-green"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
