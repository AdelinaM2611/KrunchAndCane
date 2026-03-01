import { NavLink } from "react-router-dom";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-2xl font-bold text-leaf-green ${isActive ? "underline" : ""}`
          }
        >
          Krunch &amp; Cane
        </NavLink>

        <div className="flex items-center gap-8">
          <NavLink
            to="/#about"
            className={({ isActive }) =>
              `text-lg font-medium transition-colors hover:text-leaf-green ${
                isActive ? "text-leaf-green" : "text-gray-800"
              }`
            }
          >
            About Us
          </NavLink>
          <NavLink
            to="/#contact"
            className={({ isActive }) =>
              `text-lg font-medium transition-colors hover:text-leaf-green ${
                isActive ? "text-leaf-green" : "text-gray-800"
              }`
            }
          >
            Contact Us
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
